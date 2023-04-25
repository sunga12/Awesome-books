const books = document.querySelector('.books');
const form = document.querySelector('.form');
const title = document.getElementById('title');
const author = document.getElementById('author');

let localStorage = JSON.parse(window.localStorage.getItem('allBooks'));
if (localStorage === null || localStorage === undefined || localStorage.length === 0) {
  localStorage = [];
}

// create array []
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

/* add book */
const addBook = () => {
  const newBook = {
    title: title.value,
    author: author.value,
  };
  /* check if book exist */
  let exist = false;
  localStorage.forEach((book) => {
    if (bookExist(book.title, title.value)) {
      exist = true;
    }
  });

  /* Dont add if book exist */
  if (exist) return;

  /* add book if it doesn't exist */
  allBooks.unshift(newBook);
  window.localStorage.setItem('allBooks', JSON.stringify(localStorage));
  window.location.reload();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBook();
});

/* remove book */
function remove(buttonId) {
  allBooks = localStorage.filter((book, index) => index !== buttonId);
  window.localStorage.setItem('allBooks', JSON.stringify(allBooks));
  window.location.reload();
}

const bookBtns = document.querySelectorAll('.remove');
bookBtns.forEach((bookBtn) => {
  bookBtn.addEventListener('click', (e) => {
    const buttonId = parseInt(e.target.getAttribute('id'), 10);
    remove(buttonId);
  });
});