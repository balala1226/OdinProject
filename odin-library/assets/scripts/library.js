const myLibrary = [];

let currentId = 0;
const bookIdPrefix = "bookId";

function onAddBookButtonClick()
{
    var addBookDialog = document.getElementById('addBookDialog');
    if (addBookDialog == null)
    {
        console.log("test");
    }
    addBookDialog.showModal();
}

function onDialogCloseButtonClick()
{
    event.preventDefault();
    var addBookDialog = document.getElementById('addBookDialog');
    addBookDialog.close();
}

function onDialogAddBookButtonClick()
{
    event.preventDefault();
    var addBookDialog = document.getElementById('addBookDialog');
    var title = document.getElementById('bookTitleForm').value;
    var author = document.getElementById('bookAuthorForm').value;
    var pages = document.getElementById('pages').value;
    var haveRead = document.getElementById('haveReadSelect').value;

    var havReadBool = false;
    if (haveRead == "Yes")
    {
        havReadBool = true;
    }

    addBookToLibrary(title, author, pages, havReadBool)
    addBookDialog.close();
}

function Book(id, title, author, pages, haveRead)
{
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;

    this.info = function()
    {
        var haveReadString = "not read yet";

        if (this.haveRead)
        {
            haveReadString = "have read"
        }
        return  (this.title + " by " + this.author + ", " + this.pages.tostring() + 
        " pages, " +haveReadString);
    };
}

function addBookToLibrary(title, author, pages, haveRead)
{
    var bookContainer = document.getElementById('bookContainer');
    var bookId = currentId;

    const book = document.createElement('div');
    book.id = bookIdPrefix+bookId.toString();
    book.classList.add('book');

    const titleAndAuthor = document.createElement('p');
    titleAndAuthor.innerText = title + " by " + author;
    book.appendChild(titleAndAuthor);

    const pagesHtml = document.createElement('p');
    pagesHtml.innerText = pages + " pages";
    book.appendChild(pagesHtml);

    const haveReadHtml = document.createElement('p');
    book.appendChild(haveReadHtml);

    if (haveRead)
    {
        haveReadHtml.innerText = "Have Read";
    } else {
        haveReadHtml.innerText = "Have Not Read";
        const haveReadButton = document.createElement('button');
        haveReadButton.classList.add('readBook');
        haveReadButton.innerText = "Read";
        book.appendChild(haveReadButton);

        haveReadButton.addEventListener("click", () => {
            haveReadHtml.innerText = "Have Read";
            haveReadButton.remove();
        });
    }

    const removeBookButton = document.createElement('button');
    removeBookButton.classList.add('removeBook');
    removeBookButton.innerText = "Remove Book";
    book.appendChild(removeBookButton);
    
    bookContainer.appendChild(book);

    var newBook = new Book(bookId, title, author, pages, haveRead);
    myLibrary.push(newBook);

    removeBookButton.addEventListener("click", () => {
        removeBook(bookId);
    });

    currentId++;
}

function removeBook(bookId)
{
    for(var index = 0; index < myLibrary.length; index++)
    {
        if (myLibrary[index].id == bookId)
        {
            var bookIdString = bookIdPrefix+bookId.toString();
            var book = document.getElementById(bookIdString);
            myLibrary.splice(index,1);
            book.remove();
            break;
        }
    }
}

