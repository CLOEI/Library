const form = document.querySelector('form');
const bookContainer = document.querySelector('.book-container')
let bookList = [];


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const bname = e.target[0].value;
    const bauthor = e.target[1].value;
    const bpage = e.target[2].value;
    const breaded = e.target[3].checked;

    for (let i = 0; i < 3; i++) {
        e.target[i].value = '';
    }
    if (breaded) e.target[3].checked = false;

    createBook(bname, bauthor, bpage, breaded)
})


function createBook(bname, bauthor, bpage, breaded) {
    const newBook = new Book(bname, bauthor, bpage, breaded);
    bookList.push(newBook);
    renderBook();
}

function renderBook() {
    bookContainer.innerHTML = '';
    for (let i = 0; i < bookList.length; i++) {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book');
        //bookCard.dataset.bookOrder = i;

        const bookName = document.createElement('h2');
        const bookNameText = document.createTextNode(bookList[i].name);

        const bookAuthor = document.createElement('h3');
        const bookAuthorText = document.createTextNode(bookList[i].author);

        const bookPage = document.createElement('p');
        const bookPageText = document.createTextNode(bookList[i].page);

        const bookReadedLabel = document.createElement('label');
        const bookReaded = document.createElement('input');
        bookReadedLabel.setAttribute('for', 'readed');
        bookReadedLabel.innerText = 'Readed: ';

        bookReaded.id = 'readed';
        bookReaded.type = 'checkbox';
        bookReaded.checked = bookList[i].readed;

        const bookDelete = document.createElement('div');
        bookDelete.classList.add('book-delete')
        bookDelete.innerHTML = '<span>X</span>';

        bookReadedLabel.append(bookReaded);
        bookPage.append(bookPageText);
        bookAuthor.append(bookAuthorText);
        bookName.append(bookNameText);
        bookCard.append(bookName, bookAuthor, bookPage, bookReadedLabel, bookDelete);
        bookContainer.append(bookCard);

        bookReaded.addEventListener('click', e => {
            bookList[i].changeStatus();
        });
        bookDelete.addEventListener('click', e => {
            bookList.splice(i, 1);
            renderBook();
        })
    }
}

function Book(bname, bauthor, bpage, breaded) {
    this.name = bname;
    this.author = bauthor;
    this.page = bpage;
    this.readed = breaded;

    this.changeStatus = function () {
        if (this.readed) this.readed = false;
        else this.readed = true;
    }
}
