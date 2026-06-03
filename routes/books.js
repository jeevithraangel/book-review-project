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
// GET BOOKS BY TITLE
router.get("/title/:title", (req, res) => {

    const result = books.filter(
        b => b.title.toLowerCase() === req.params.title.toLowerCase()
    );

    if (result.length === 0) {
        return res.json({ message: "No book found with this title" });
    }

    res.json(result);
});
// GET BOOK REVIEW
router.get("/:isbn/review", (req, res) => {

    const book = books.find(
        b => b.isbn === req.params.isbn
    );

    if (!book) {
        return res.json({ message: "Book not found" });
    }

    res.json({
        isbn: book.isbn,
        reviews: book.reviews
    });
});
// TASK 10 - Get all books using async callback
router.get("/async", (req, res) => {
    setTimeout(() => {
        res.json(books);
    }, 1000);
});
// Search by ISBN using Promise
router.get("/promise/isbn/:isbn", (req, res) => {

    new Promise((resolve, reject) => {

        const book = books.find(
            b => b.isbn === req.params.isbn
        );

        if (book) {
            resolve(book);
        } else {
            reject("Book not found");
        }

    })
    .then(book => {
        res.json(book);
    })
    .catch(err => {
        res.json({ message: err });
    });

});
router.get("/author/:author", (req, res) => {
    const result = books.filter(
        b => b.author.toLowerCase() === req.params.author.toLowerCase()
    );

    res.json(result);
});

module.exports = router;