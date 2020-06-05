class Book{
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn
  }
}

class UI{
  addBookToList (book){
    const list = document.querySelector('#book-list');

  //  create table row element
  const row = document.createElement('tr');
  // Insert columns

  row.innerHTML = `
   <td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><a href="#" class="delete">X<a></td>
  `

  list.appendChild(row)
  }

  clearFields(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }

  showAlert(message, className){
     // create div
  const div = document.createElement('div');

  // add classes

  div.className = `alert ${className}`;

  // add text

  div.appendChild(document.createTextNode(message));

  // append to dom

  // get parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  // insert alert

  container.insertBefore(div, form)

  // timeout after 3 seconds

  setTimeout(function (){
    document.querySelector('.alert').remove()
  }, 3000)
  }

  deleteBook(target){
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
     
   }

  }
}


// Local Storage 

class Store{
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks(){
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI;

      ui.addBookToList(book)
      
    });
  }

  static addBook(book){
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn){
    const books = Store.getBooks();

    books.forEach(function(book, index) {
      if(book.isbn === isbn){
        books.splice(index, 1)
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}


//DOM event load

document.addEventListener('DOMContentLoaded', Store.displayBooks)


//event listeners for add book
document.querySelector('#book-form').addEventListener('submit', function(e){
 
  // Get Form Values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

 // instatiating the book constructor function

  const book = new Book(title, author, isbn);
 
 // Instantiate the UI

 const ui = new UI();
// Validation
  if(title === '' || author === '' || isbn === ''){
    //error handling
    ui.showAlert('Please Fill Out The Form', 'error')
  }else{
    //add book to list
  ui.addBookToList(book)

  // add book to local storage
  Store.addBook(book);

  // show alert success
  ui.showAlert('Book Added Successfully', 'success')

  // clear fields

  ui.clearFields()
  }

  //show alert



  e.preventDefault();
});

//event listener for delete book

document.querySelector('#book-list').addEventListener('click', function(e){

  // Instantiate the UI
  const ui = new UI();
  ui.deleteBook(e.target);

  //Remove from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //show alert
  ui.showAlert('Book Deleted successfully', 'success')



  e.preventDefault()
})