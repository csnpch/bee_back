const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


mongoose.connect(
    "mongodb://admin:KBGlyi82388@10.104.3.62:27017",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);  

const Book = mongoose.model("Book", {
    id: Number,
    title: String,
    author: String,
});

const app = express();
app.use(bodyParser.json());


app.post("/books", async (req, res) => {
    try {
        const book = new Book(req.body);
        book.id = (await Book.countDocuments()) + 1;
        await book.save();
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.get("/books", async (req, res) => {
    try {
        const book = await Book.find();
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.get("/books/:id", async (req, res) => {
    try {
        const book = await Book.findOne( req.params.id);
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.put("/books/:id", async (req, res) => {
    try {
        const book = await Book.findOneAndUpdate(req.params.id, req.body,{
            new: true,
        });
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.delete("/books/:id", async (req, res) => {
    try {
        const book = await Book.findOneAndDelete(req.params.id);
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});