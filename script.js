class BookList {
  form = document.querySelector('.form');

  bookBtns = document.querySelectorAll('.remove');

  constructor() {
    this.title = document.getElementById('title');
    this.author = document.getElementById('author');
    this.newBooks = document.querySelector('.books');
    this.storage = JSON.parse(window.localStorage.getItem('allBooks')) || [];
    this.allBooks = this.storage;

    this.storage.forEach((book, index) => {
      const displayBook = `
      <div class="book-container">
      <div class="title-author">
      <p class="book">"${book.title}" by ${book.author} </p>
      </div>
        <button class="remove" id=${index}>Remove</button>
      </div>
      `;
      this.newBooks.innerHTML += displayBook;
    });
    this.bookBtns = document.querySelectorAll('.remove');
  }

  // function to compare incoming and existing book
  bookExist = (existiingTitle,
    newTitle) => JSON.stringify(existiingTitle) === JSON.stringify(newTitle);

  /* add book */
  addBook() {
    /* check if book exist */
    let exist = false;
    this.allBooks.forEach((book) => {
      if (this.bookExist(book.title, this.title.value)) {
        exist = true;
      }
    });

    /* add book if it doesn't exist already */
    if (exist === false) {
      this.allBooks.unshift({ title: this.title.value, author: this.author.value });
      window.localStorage.setItem('allBooks', JSON.stringify(this.storage));
      window.location.reload();
    }
  }

  /* remove book */
  remove(buttonId) {
    this.allBooks = this.allBooks.filter((book, index) => index !== buttonId);
    window.localStorage.setItem('allBooks', JSON.stringify(this.allBooks));
    window.location.reload();
  }
}

/* eslint-disable */
const freshBook = new BookList();

freshBook.form.addEventListener('submit', (e) => {
  e.preventDefault();
  freshBook.addBook("title", "author");
});

/* compare and remove */
freshBook.bookBtns.forEach((bookBtn) => {
  bookBtn.addEventListener('click', (e) => {
    const buttonId = parseInt(e.target.getAttribute('id'), 10);
    freshBook.remove(buttonId);
  });
});