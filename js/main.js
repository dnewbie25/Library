"use strict";
// opening and closing the modal

// const addBook = document.querySelector('#add-book');
// const bookForm = document.querySelector('.books-form');
// const closeBtn = document.querySelector('.close-btn');

// addBook.addEventListener('click', e => {
//     if (bookForm.style.display != 'block') {
//         bookForm.style.display = 'block';
//     }
// });

// closeBtn.addEventListener('click', () => {
//     if (bookForm.style.display === 'block') {
//         bookForm.style.display = '';
//     }
// });

// submitting the form

// let myLibrary = [{
//     title: 'hobbit',
//     author: 'jr tolkiern',
//     pages: 232,
//     read: true,
// }];
// const submitBook = document.querySelector('.submitForm');

// function Book(title, author, pages, read) {
//     // the constructor
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
// }

// function addBookToLibrary() {
//     // do stuff here
//     const title = document.querySelector('#title');
//     const author = document.querySelector('#author');
//     const pages = document.querySelector('#pages');
//     const read = document.querySelector('#read');

//     return {
//         title: title.value,
//         author: author.value,
//         pages: pages.value,
//         read: read.checked
//     };
// }

// // book form submit listener
// submitBook.addEventListener('click', e => {
//     e.preventDefault();
//     myLibrary.push(addBookToLibrary());
//     // clear form inputs and close the form modal
//     bookForm.style.display = '';
//     document.querySelector('form').reset();
//     displayBooks();
// });

// // display books
// function displayBooks() {
//     deleteBooks();
//     myLibrary.forEach(book => {
//         const bookList = document.querySelector('.books__card');
//         const cardItem = document.createElement('div');
//         cardItem.classList.add('books__card--item');
//         cardItem.appendChild(setTitle(book));
//         cardItem.appendChild(setAuthor(book));
//         cardItem.appendChild(setPages(book));
//         cardItem.appendChild(readStatus(book));
//         const deleteBtn = document.createElement('button');
//         deleteBtn.textContent = 'DELETE';
//         deleteBtn.classList.add('delete');
//         cardItem.appendChild(deleteBtn);
//         bookList.appendChild(cardItem);
//     });
// }

// function setTitle(book) {
//     const title = document.createElement('p');
//     const value = document.createTextNode(book.title);
//     title.appendChild(value);
//     title.classList.add('title');
//     return title;
// }

// function setAuthor(book) {
//     const author = document.createElement('p');
//     const value = document.createTextNode(book.author);
//     author.appendChild(value);
//     author.classList.add('author');
//     return author;
// }

// function setPages(book) {
//     const pages = document.createElement('p');
//     const value = document.createTextNode(book.pages);
//     pages.appendChild(value);
//     pages.classList.add('pages');
//     return pages;
// }

// // deletes all books in DOM before creating them again to prevent duplicates
// function deleteBooks() {
//     const cardList = document.querySelector('.books__card')
//     cardList.innerHTML = '';
// }

// // read status
// function readStatus(book) {
//     const readDiv = document.createElement('div');
//     readDiv.classList.add('read');
//     const button = document.createElement('button');
//     const icon = document.createElement('i');
//     icon.classList.add('fas', 'fa-check');
//     const paragraph = document.createElement('p');
//     paragraph.textContent = 'Read';
//     button.style.display = 'block';
//     if (book.read === true) {
//         button.classList.add('read_yes');
//         button.appendChild(icon)
//         readDiv.appendChild(paragraph);
//         readDiv.appendChild(button);
//         return readDiv;
//     } else {
//         button.classList.add('read_no');
//         button.textContent = 'X';
//         readDiv.appendChild(paragraph);
//         readDiv.appendChild(button);
//         return readDiv;
//     }
// }

// // delete card
// window.addEventListener('click', e=>{
//     if(e.target.classList.contains('delete')){
//         e.target.parentElement.remove();
//         delete myLibrary[e.target];
//     }
//     if(e.target.classList.contains('read_yes')){
//         e.target.textContent = 'X';
//         e.target.classList.remove('read_yes');
//         e.target.classList.add('read_no');
//     }else if(e.target.classList.contains('read_no')){
//         e.target.textContent = '';
//         e.target.innerHTML = '<i class="fas fa-check"></i>';
//         e.target.classList.remove('read_no');
//         e.target.classList.add('read_yes');
//     }
// });

// Creating the book class
class Book {
    // list of books and item number. Class methods
    static itemNumber = 0;
    static bookList = [];

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    // instance methods
    addBookToList() {
        let book = {
            title: this.title,
            author: this.author,
            pages: this.pages,
            read: false,
            item: Book.itemNumber
        };
        Book.bookList.push(book);
        Book.itemNumber++;
    }

    changeReadStatus() {
        if (this.read === false) {
            this.read = true;
        } else {
            this.read = false;
        }
        return this.read;
    }

    // class method
    static deleteBookFromList(bookIndex) {
        // checks and finds the index of the book with X item value and splice 1 
        Book.bookList.splice(Book.bookList.findIndex(book => book.item === bookIndex), 1);
    }
}

// UI interactions
class UI {
    static addBoookForm() {
        const titleField = document.getElementById('title').value;
        const authorField = document.getElementById('author').value;
        const pagesField = document.getElementById('pages').value;
        const readField = document.getElementById('read').checked;
        const book = new Book(titleField, authorField, pagesField, readField);
        book.addBookToList();
    }

    #createBookItem(parent, book) {
        //make sure book points to last element in the array
        const cardItem = document.createElement('div');
        cardItem.classList.add('books__card--item');
        cardItem.setAttribute('item', book.item)
        parent.appendChild(cardItem);
    }
}

// open modal and add listener to button
const formModal = document.querySelector('.books-form');
let submit = document.querySelector('form');
document.addEventListener('click', e => {
    if (e.target.id === 'add-book') {
        formModal.style.display = 'block';
    }else if(e.target.classList.contains('close-btn')){
        formModal.style.display = 'none';
        document.getElementById('formFields').reset();
    }
});

// this event listeners add to booklist
submit.addEventListener('submit', e => {
    e.preventDefault();
    UI.addBoookForm();
    console.log(1);
    // closes modal and reset fields
    formModal.style.display = 'none';
    document.getElementById('formFields').reset();
});