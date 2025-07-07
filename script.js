const maindiv = document.querySelector('.main');
const dialog = document.querySelector('dialog');
const newBook = document.querySelector('.new-book');
const confirmBtn = document.querySelector('.confirm-btn');
const cancelBtn = document.querySelector('.cancel');
const bookDialog = document.querySelector('.book-dialog');
const bookForm = document.querySelector('.book-form');

const myLibrary = [];

function Book(title, author, numPages, hasRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.hasRead = hasRead;
    this.id = crypto.randomUUID();
}

function addBookToLib(title, author, numPages, hasRead) {
    const newBook = new Book(title, author, numPages, hasRead);
    myLibrary.push(newBook);
}

function displayBooks() {
    maindiv.innerHTML = "";
    for(const book of myLibrary) {
        const carddiv = document.createElement("div");
        carddiv.classList.add('card');

        const titlediv = document.createElement("div");
        titlediv.classList.add('title');
        titlediv.textContent = book.title;
        carddiv.appendChild(titlediv);
        const authordiv = document.createElement("div");
        authordiv.classList.add('author');
        authordiv.textContent = book.author;
        carddiv.appendChild(authordiv);
        const pagesdiv = document.createElement("div");
        pagesdiv.classList.add('pages');
        pagesdiv.textContent = `${book.numPages} pages`
        carddiv.appendChild(pagesdiv);

        const btnsdiv = document.createElement("div");
        btnsdiv.classList.add('btns');

        const readbtn = document.createElement("button");
        if(book.hasRead) {
            readbtn.classList.add('read');
            readbtn.textContent = 'Read';
        } else {
            readbtn.classList.add('not-read');
            readbtn.textContent = 'Not Read';
        }
        btnsdiv.appendChild(readbtn);
        const removebtn = document.createElement("button");
        removebtn.classList.add('remove');
        removebtn.textContent = 'Remove';
        btnsdiv.appendChild(removebtn);

        carddiv.appendChild(btnsdiv);

        maindiv.appendChild(carddiv);


        readbtn.addEventListener('click', () => {
            if(readbtn.classList.contains('read')) {
                readbtn.classList.remove('read');
                readbtn.classList.add('not-read');
                readbtn.textContent = 'Not Read';
                book.hasRead = false;
            } else {
                readbtn.classList.remove('not-read');
                readbtn.classList.add('read');
                readbtn.textContent = 'Read';
                book.hasRead = true;
            }
        });

        removebtn.addEventListener('click', () => {
            const i = myLibrary.indexOf(book);
            myLibrary.splice(i, 1);
            displayBooks();
        });
    }
}

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = bookForm.title.value.trim();
    const author = bookForm.author.value.trim();
    const pages = parseInt(bookForm.pages.value);
    const hasRead = bookForm.read.checked;

    const newBook = new Book(title, author, pages, hasRead);

    myLibrary.push(newBook);
    displayBooks();

    bookDialog.close();
    bookForm.reset();
});

newBook.addEventListener('click', () => {
    dialog.showModal();
});

cancelBtn.addEventListener('click', (e) => {
    dialog.close(); 
});


addBookToLib('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
addBookToLib('To Kill a Mockingbird', 'Harper Lee', 281, false);

displayBooks();