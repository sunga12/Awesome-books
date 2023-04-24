// create the page setup withhtml
// title h1
// initial empty list + add book form
// add book form: short inputs x2 button x1
// placeholders Title, Author, Add

const books = document.querySelector('.books');
const form = document.querySelector('.form');
const title = document.getElementById('title');
const author = document.getElementById('author');

let localStorage = JSON.parse(window.localStorage.getItem('allBooks'));

// create array []

if (localStorage === null || localStorage === undefined || localStorage.length === 0) {
  localStorage = [];
}

let allBooks = localStorage;

allBooks.forEach((book, index) => {
  const displayBook = `
<div class="book">
  <p class="book-title">Title: ${book.title}</p>
  <p class="book-author">Author: ${book.author}</p>
  <button class="remove" id=${index}>Remove</button>
</div>
`;
  books.innerHTML += displayBook;
});

// function to compare books to see if a new book already exists
const bookExist = (existingTitle,
  newTitle) => JSON.stringify(existingTitle) === JSON.stringify(newTitle);

