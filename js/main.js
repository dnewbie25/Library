"use strict";

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
            read: this.read,
            item: Book.itemNumber
        };
        Book.bookList.push(book);
        Book.itemNumber++;
    }

    static changeReadStatus(itemNumber) {
        const bookToUpdate = Book.bookList.findIndex(book=>book.item === itemNumber);
        if (Book.bookList[bookToUpdate].read === false) {
            Book.bookList[bookToUpdate].read = true;
        } else {
            Book.bookList[bookToUpdate].read = false;
        }
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
        this.createBookItem(book);
    }

    static createBookItem(book) {
        // creates each individual element and appends it to cardItem and then to booksContainer
        const booksContainer = document.querySelector('.books__card');
        const cardItem = document.createElement('div');
        cardItem.classList.add('books__card--item');
        cardItem.setAttribute('item', Book.itemNumber - 1);
        
        const titleP = document.createElement('p');
        titleP.textContent = book.title;
        titleP.classList.add('title')

        const authorP = document.createElement('p')
        authorP.textContent = book.author;
        authorP.classList.add('author');

        const pagesP = document.createElement('p')
        pagesP.textContent = book.pages;
        pagesP.classList.add('pages');

        const readDiv = document.createElement('div')
        readDiv.classList.add('read');
        
        const readP = document.createElement('p');
        readP.textContent = 'Read';
        const readButton = document.createElement('button');
        const readIcon = document.createElement('i');
        readIcon.classList.add('fas');
        readIcon.classList.add('fa-check');
        readDiv.appendChild(readP);
        if(book.read){
            readButton.classList.add('read_yes');
            readButton.appendChild(readIcon);
            readButton.style.display = 'block';
            readDiv.appendChild(readButton);
        }else{
            readButton.classList.add('read_no');
            readButton.textContent = 'X';
            readButton.style.display = 'block';
            readDiv.appendChild(readButton);
        }

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.textContent = 'DELETE';

        cardItem.appendChild(titleP);
        cardItem.appendChild(authorP);
        cardItem.appendChild(pagesP);
        cardItem.appendChild(readDiv);
        cardItem.appendChild(deleteButton);
        booksContainer.appendChild(cardItem);
    }

    static deleteBookFromUI(index){
        const booksContainer = document.querySelector('.books__card');
        const book = document.querySelector(`[item="${index}"]`);
        booksContainer.removeChild(book);
    }

}

// Event: Open modal and add listener to close button
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

// Event: Add to booklist
submit.addEventListener('submit', e => {
    e.preventDefault();
    UI.addBoookForm();
    // closes modal and reset fields
    formModal.style.display = 'none';
    document.getElementById('formFields').reset();
});

// Event: Delete book

window.addEventListener('click',e=>{
    const cardsContainer = document.querySelector('.books__card')
    if(e.target.classList.contains('delete')){
        const parent = e.target.parentElement;
        const item = Number(e.target.parentElement.getAttribute('item'));
        cardsContainer.removeChild(parent);
        Book.deleteBookFromList(item);
    }
});


// Event: Update read status
window.addEventListener('click',e=>{
    if(e.target.classList.contains('read_yes')){
        const item = Number(e.target.parentElement.parentElement.getAttribute('item'));
        e.target.classList.remove('read_yes');
        e.target.classList.add('read_no');
        e.target.textContent = 'X';
        Book.changeReadStatus(item);
    }else if(e.target.classList.contains('read_no')){
        const item = Number(e.target.parentElement.parentElement.getAttribute('item'));
        e.target.classList.remove('read_no');
        e.target.classList.add('read_yes');
        const readIcon = document.createElement('i');
        readIcon.classList.add('fas');
        readIcon.classList.add('fa-check');
        e.target.textContent = '';
        e.target.appendChild(readIcon);
        Book.changeReadStatus(item);
    }else if(e.target.parentElement.classList.contains('read_yes')){
        const item = Number(e.target.parentElement.parentElement.parentElement.getAttribute('item'));
        e.target.parentElement.classList.remove('read_yes');
        e.target.parentElement.classList.add('read_no');
        e.target.parentElement.textContent = 'X';
        Book.changeReadStatus(item);
    }
});