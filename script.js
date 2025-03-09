const addBookButton = document.getElementById('add-book');
const formContainer = document.querySelector('form');
const closeButton = document.getElementById('close-button');
const submitButton = document.getElementById('submit-button');
const readStatus = document.getElementById('read-status');

// inputs (title, author, pages)
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const bodyTag = document.querySelector('body');

const myLibrary = [];

addBookButton.addEventListener('click', () => {
    formContainer.style.display = 'grid';
})

function Book(bookTitle, bookAuthor, bookPages, bookRead) {
  // the constructor...
  this.bookTitle = bookTitle;
  this.bookAuthor = bookAuthor;
  this.bookPages = bookPages;
  if(bookRead){
    this.bookRead = true;
  }
  else if(!bookRead){
    this.bookRead = false;
  }
}

function addBookToLibrary() {
  const titleVal = title.value;
  const authorVal = author.value;
  const pagesVal = pages.value;
  const readStats = readStatus.checked;
  const addBook = new Book(titleVal, authorVal, pagesVal, readStats);
  myLibrary.push(addBook);
  display();
}

function display(){
    // Library container
    const libraryContainer = document.getElementById('library-container');
    libraryContainer.textContent = '';
    libraryContainer.classList = 'library-container';

    myLibrary.forEach((book, index) => {
        // Card container
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        // Card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardElement.append(cardBody);

        // Text contents
        const titleText = document.createElement('h3');
        titleText.classList.add('title-text');
        titleText.textContent = `${book.bookTitle}`;
        
        const authorText = document.createElement('h4');
        authorText.textContent = `Author: ${book.bookAuthor}`;
        
        const pagesText = document.createElement('h4');
        pagesText.textContent = `Pages: ${book.bookPages}`;
        
        // Read status
        const readStatus = document.createElement('h4');
        if(book.bookRead){
            readStatus.textContent = `Read`;
        }
        else if(!book.bookRead){
            readStatus.textContent = `Not read`;
        }
        // ================================================

        // Delete and Change read status
        const deleteChangeContainer = document.createElement('div');
        deleteChangeContainer.classList.add('delete-change');
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-primary');

        deleteButton.addEventListener('click', () => {
          myLibrary.splice(index, 1);
          display();
        })

        const changeReadButton = document.createElement('button');
        if(book.bookRead){
          changeReadButton.textContent = 'Not read';
        }
        else if(!book.bookRead){
          changeReadButton.textContent = 'Read';
        }
        changeReadButton.classList.add('btn', 'btn-primary');

        changeReadButton.addEventListener('click', () => {
          book.bookRead = !book.bookRead; // Toggle read status
          if(book.bookRead){
            readStatus.textContent = 'Read';
            changeReadButton.textContent = 'Not read';
          }
          else if(!book.bookRead){
            readStatus.textContent = 'Not read';
            changeReadButton.textContent = 'Read';
          }
        })

        deleteChangeContainer.append(deleteButton, changeReadButton);
        cardBody.append(titleText, authorText, pagesText, readStatus, deleteChangeContainer);
        libraryContainer.append(cardElement);
    })
}

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    addBookToLibrary();
})

closeButton.addEventListener('click', () => {
    formContainer.style.display = 'none';
})