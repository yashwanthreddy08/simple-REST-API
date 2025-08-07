// server.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory array to store books
let books = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

// GET /books - Retrieve all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
  const newBook = req.body;
  if (!newBook.id || !newBook.title || !newBook.author) {
    return res.status(400).json({ error: 'Missing book data (id, title, author)' });
  }
  books.push(newBook);
  res.status(201).json(newBook);
});
// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === bookId);
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  books[index] = { ...books[index], ...req.body };
  res.json(books[index]);
});

// DELETE /books/:id - Delete a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const originalLength = books.length;
  books = books.filter(book => book.id !== bookId);

  if (books.length === originalLength) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.status(204).send();
});
