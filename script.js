const newBookButton = document.querySelector("#new-book-button");
const bookDialog = document.querySelector("#book-dialog");
const bookForm = document.querySelector("#book-form");

newBookButton.addEventListener("click", () => {
    bookDialog.showModal();
});

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value.trim();
    const author = document.querySelector("#author").value.trim();
    const pages = Number(document.querySelector("#pages").value);
    const isRead = document.querySelector("#is-read").checked;

    addBookToLibrary(title, author, pages, isRead);
    displayBooks();

    bookForm.reset();
    bookDialog.close();
});

const myLibrary = [];

function Book(title, author, pages, isRead) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.info = function() {
    const readStatus = this.isRead ? "read" : "not read";

    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
}

Book.prototype.toggleRead = function () {
    this.isRead = !this.isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}

function displayBooks() {
    const libraryContainer = document.querySelector("#library");
    libraryContainer.textContent = "";

    for(const book of myLibrary) {
        const bookElement = document.createElement("div");
        const bookInformation = document.createElement("p");
        const toggleReadButton = document.createElement("button");
        const removeButton = document.createElement("button");

        bookElement.dataset.bookId = book.id;
        bookInformation.textContent = book.info();

        bookElement.classList.add("book-card");
        bookInformation.classList.add("book-information");
        toggleReadButton.classList.add("toggle-button");
        removeButton.classList.add("remove-button");

        if (book.isRead) {
            bookElement.classList.add("book-card--read");
        }

        toggleReadButton.type = "button";
        toggleReadButton.textContent = book.isRead
          ? "Mark as unread"
          : "Mark as read";

        removeButton.textContent = "Remove";
        removeButton.type = "button";

        toggleReadButton.addEventListener("click", () => {
            const bookId = bookElement.dataset.bookId;
            toggleBookReadStatus(bookId);
        });    

        removeButton.addEventListener("click", () => {
            const bookId = bookElement.dataset.bookId;
            removeBookFromLibrary(bookId);
        });

        bookElement.appendChild(bookInformation);
        bookElement.appendChild(toggleReadButton);
        bookElement.appendChild(removeButton);
        libraryContainer.appendChild(bookElement);
    }
}

function removeBookFromLibrary(bookId) {
    const bookIndex = myLibrary.findIndex((book) => book.id === bookId);

    if (bookIndex === -1) {
    return;
    }

    myLibrary.splice(bookIndex, 1);
    displayBooks();
}

function toggleBookReadStatus (bookId) {
    const selectedBook = myLibrary.find((book) => {
        return book.id === bookId;
    });

    if(!selectedBook) {
        return 
    }

    selectedBook.toggleRead();
    displayBooks();
}


addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Atomic Habits", "James Clear", 320, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Atomic Habits", "James Clear", 320, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Atomic Habits", "James Clear", 320, true);

displayBooks();