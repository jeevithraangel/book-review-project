const express = require("express");
const router = express.Router();

const books = require("../books");
const auth = require("../middleware/auth");


// GET ALL BOOKS
router.get("/", (req, res) => {
    res.json(books);
});


// ADD REVIEW
router.post("/:isbn/review", auth, (req, res) => {

    const book = books.find(
        b => b.isbn === req.params.isbn
    );

    if (!book) {
        return res.json({ message: "Book not found" });
    }

    const review = {
        user: req.user.username,
        comment: req.body.comment
    };

    book.reviews.push(review);

    res.json({
        message: "Review added successfully",
        reviews: book.reviews
    });
});


// UPDATE REVIEW
router.put("/:isbn/review", auth, (req, res) => {

    const book = books.find(
        b => b.isbn === req.params.isbn
    );

    if (!book) {
        return res.json({ message: "Book not found" });
    }

    const review = book.reviews.find(
        r => r.user === req.user.username
    );

    if (!review) {
        return res.json({ message: "Review not found" });
    }

    review.comment = req.body.comment;

    res.json({
        message: "Review updated successfully",
        reviews: book.reviews
    });
});


// DELETE REVIEW
router.delete("/:isbn/review", auth, (req, res) => {

    const book = books.find(
        b => b.isbn === req.params.isbn
    );

    if (!book) {
        return res.json({ message: "Book not found" });
    }

    book.reviews = book.reviews.filter(
        r => r.user !== req.user.username
    );

    res.json({
        message: "Review deleted successfully",
        reviews: book.reviews
    });
});


module.exports = router;