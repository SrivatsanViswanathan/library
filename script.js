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
let counter = 0;

formButton.addEventListener('click', () => {
    formPopup.style.display = 'block';
});

submit.addEventListener('click', () => {
    let pass = formValidation();
    if (pass) {
        const book = new Book(title.value, author.value, pages.value, read.checked)
        addBookToLibrary(book);
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
    let pass = false;
    if (title.value != '' && author.value != '' && pages.value != '' && parseInt(pages.value) > 0) {
        pass = true;
    }

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
        pagesError.textContent = '* Required'
    }
    else if (parseInt(pages.value) <= 0) {
        pagesError.textContent = '* Number must be greater than 0'
        pagesError.style.visibility = 'visible';
    }
    else {
        pagesError.style.visibility = 'hidden';
        pagesError.textContent = '* Required'
    }
    return pass;
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

// Display Books User has added to Library
function displayBooks() {
    const showBooks = document.querySelector('#show-books');
    const divTable = document.querySelector('#table');
    const buttons = document.querySelector('#buttons');
    divTable.textContent = '';
    buttons.textContent = '';
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
        bookRead.classList.add('read-book')
        bookRead.setAttribute('id', 'read-book');
        const trash = document.createElement('img');
        trash.classList.add('delete-book');
        trash.setAttribute('src', './images/trash-can.png')
        trash.setAttribute('value', i);
        trash.setAttribute('name', i);
        bookTitle.textContent = myLibrary[i].title;
        bookAuthor.textContent = myLibrary[i].author;
        bookPages.textContent = myLibrary[i].pages;
        if (myLibrary[i].read) {
            bookRead.textContent = 'Finished';
            bookRead.style.color = 'green';
            bookRead.style.fontWeight = 'bold';
        }
        else {
            bookRead.textContent = 'Not Finished';
            bookRead.style.color = 'red';
            bookRead.style.fontWeight = 'bold';
        }

        row.appendChild(bookTitle);
        row.appendChild(bookAuthor);
        row.appendChild(bookPages);
        row.appendChild(bookRead);
        buttons.appendChild(trash);
        table.appendChild(row);
        let marginTest = (row.offsetHeight / 4.5);
        let windowAbove = window.matchMedia("(min-width: 701px)");
        let windowBelow = window.matchMedia("(max-width: 700px)");
        
        if (counter > 0 && windowAbove.matches === true && row.offsetHeight <= 35 && i != 0) {
            trash.style.marginTop = (marginTest / 1.5).toString() + 'px';
            counter--;
        }
        if (counter > 0 && windowBelow.matches === true && row.offsetHeight <= 54 && i != 0) {
            trash.style.marginTop = (marginTest / 2).toString() + 'px';
            counter--;
        }
        if (row.offsetHeight > 35 && windowAbove.matches === true) {
            trash.style.marginTop = (marginTest * 1.1).toString() + 'px';
            counter++;
        }
        if (row.offsetHeight > 54 && windowBelow.matches === true) {
            trash.style.marginTop = (marginTest / 1.4).toString() + 'px';
            counter++;
        }
    }

    const deleteButton = document.querySelectorAll('.delete-book');
    const changeRead = document.querySelectorAll('#read-book');
    
    for (let i = 0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener('click', () => {
            let removed = myLibrary.splice(parseInt(deleteButton[i].name), parseInt(1));
            displayBooks();
        });
    }

    for (let i = 0; i < changeRead.length; i++) {
        changeRead[i].addEventListener('click', () => {
            if (changeRead[i].textContent === 'Finished') {
                changeRead[i].textContent = 'Not Finished';
                changeRead[i].style.color = 'red';
                myLibrary[i].read = false;
            }
            else {
                changeRead[i].textContent = 'Finished';
                changeRead[i].style.color = 'green';
                myLibrary[i].read = true;
            }
        });
    }
}