// Global Variables
let myLibrary = [];

const formButton = document.querySelector('#form-button');

const formPopup = document.querySelector('#popup-book-add');
const titleError = document.querySelector('#title-error');
const authorError = document.querySelector('#author-error');
const pagesError = document.querySelector('#pages-error');
const submit = document.querySelector('#submit');

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');

const empty = document.querySelector('#empty');

let isEmpty = emptyLibrary();

formButton.addEventListener('click', () => {
    formPopup.style.display = 'block';
});

submit.addEventListener('click', () => {
    formValidation();
    if (title.value != '' && author.value != '' && pages.value != '') {
        const book = new Book(title.value, author.value, pages.value, read.checked)
        addBookToLibrary(book);
        console.table(myLibrary);
        formPopup.style.display = 'none';
        formReset();
        isEmpty = emptyLibrary();
    }
}); 

// Constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//Prototype for all books
Book.prototype.info = function () {
    let finished = '';
    if (this.read) {
        finished = 'Read';
    }
    else {
        finished = 'Not Read';
    }
    let string = this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ' + finished;
    return string;
}

// Add book to library array
function addBookToLibrary(book) {
    myLibrary.push(book);
}

// Validate form
function formValidation() {
    if (title.value === '') {
        titleError.style.visibility = 'visible';
    }
    else {
        titleError.style.visibility = 'hidden';
    }

    if (author.value === '') {
        authorError.style.visibility = 'visible';
    }
    else {
        authorError.style.visibility = 'hidden';
    }

    if (pages.value === '') {
        pagesError.style.visibility = 'visible';
    }
    else {
        pagesError.style.visibility = 'hidden';
    }
}

// Reset form
function formReset() {
    title.value = author.value = pages.value = '';
    read.checked = false;
}

// Close Modal clicking anywhere in screen except inside modal
window.onclick = function (e) {
    if (e.target == formPopup) {
        formPopup.style.display = "none";
    }
}

// Check if library is empty
function emptyLibrary() {
    if (myLibrary.length === 0) {
        empty.style.display = 'block';
        return true;
    }
    else {
        empty.style.display = 'none';
        return false;
    }
}