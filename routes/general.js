public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    return res.status(200).json(books[isbn]);
});