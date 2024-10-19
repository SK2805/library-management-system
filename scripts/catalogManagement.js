// Sample book data (in-memory storage)
let books = [];

// Function to display the list of books
function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = ''; // Clear the list
    books.forEach((book, index) => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author}`;
        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => removeBook(index);
        li.appendChild(deleteButton);
        bookList.appendChild(li);
    });
}

// Function to add a book
document.getElementById('addBookForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    const newBook = { title, author };
    books.push(newBook);
    
    // Clear input fields
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    
    displayBooks(); // Refresh the book list
});

// Function to remove a book
function removeBook(index) {
    books.splice(index, 1); // Remove the book at the specified index
    displayBooks(); // Refresh the book list
}

// Display the initial book list
displayBooks();
