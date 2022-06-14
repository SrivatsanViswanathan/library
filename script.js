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
        console.log(myLibrary);
        formPopup.style.display = 'none';
        formReset();
        isEmpty = emptyLibrary();
        displayBooks();
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

function displayBooks() {
    const showBooks = document.querySelector('#show-books');
    const divTable = document.querySelector('#table');
    divTable.textContent = '';
    const table = document.createElement('table');
    if (divTable.getElementsByTagName('table').length <= 0 && myLibrary.length > 0) {
        const row1 = document.createElement('tr');
        row1.classList.add('table-heading');
        const heading1 = document.createElement('th');
        const heading2 = document.createElement('th');
        const heading3 = document.createElement('th');
        const heading4 = document.createElement('th');
        heading1.textContent = 'Title';
        heading2.textContent = 'Author';
        heading3.textContent = 'Pages';
        heading4.textContent = 'Read';
        row1.appendChild(heading1);
        row1.appendChild(heading2);
        row1.appendChild(heading3);
        row1.appendChild(heading4);
        table.appendChild(row1);
        divTable.appendChild(table);
    }
    else {
        emptyLibrary();
    }
    for (let i = 0; i < myLibrary.length; i++) {
        const row = document.createElement('tr');
        const bookTitle = document.createElement('td');
        const bookAuthor = document.createElement('td');
        const bookPages = document.createElement('td');
        const bookRead = document.createElement('td');
        const button = document.createElement('button');
        button.classList.add('delete-book');
        button.value = i;
        button.textContent = 'Remove';
        bookTitle.textContent = myLibrary[i].title;
        bookAuthor.textContent = myLibrary[i].author;
        bookPages.textContent = myLibrary[i].pages;
        if (myLibrary[i].read) {
            bookRead.textContent = 'Finished';
        }
        else {
            bookRead.textContent = 'Not Finished';
        }

        row.appendChild(bookTitle);
        row.appendChild(bookAuthor);
        row.appendChild(bookPages);
        row.appendChild(bookRead);
        row.appendChild(button);
        table.appendChild(row);

    }
    const deleteButton = document.querySelectorAll('.delete-book');

    console.log(deleteButton.length);
    for (let i = 0; i < deleteButton.length; i++) {
        console.log('s');
        deleteButton[i].addEventListener('click', () => {
            myLibrary.splice(deleteButton[i].value, deleteButton[i].value + 1);
            console.log(myLibrary);
            displayBooks();
        })
    }
}
