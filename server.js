const express = require("express");
const app = express();

app.use(express.json());

const bookRoutes = require("./routes/books");
app.use("/books", bookRoutes);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});