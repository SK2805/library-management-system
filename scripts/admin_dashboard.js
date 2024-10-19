// Sample user data
let users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'student1', password: 'student123', role: 'student' },
    { username: 'student2', password: 'student456', role: 'student' }
];

// Sample book data (Load from localStorage if available)
let books = JSON.parse(localStorage.getItem('books')) || [];

// Sample borrowed books data (use localStorage to persist data)
let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];

// Get references to DOM elements
const logoutButton = document.getElementById('logoutButton');
const viewUsersButton = document.getElementById('viewUsers');
const viewCatalogButton = document.getElementById('viewCatalog');
const userList = document.getElementById('userList');
const catalogList = document.getElementById('catalogList');
const circulationStats = document.getElementById('circulationStats');
const addBookButton = document.getElementById('addBookButton');
const borrowedBooksList = document.getElementById('borrowedBooksList');
const bookTitleInput = document.getElementById('bookTitle');
const bookAuthorInput = document.getElementById('bookAuthor');

// Check if user is admin
const role = localStorage.getItem('role');
if (role !== 'admin') {
    window.location.href = 'login.html'; // Redirect if not admin
}

// View users
viewUsersButton.addEventListener('click', function() {
    userList.innerHTML = users.map(u => `<div>${u.username} - ${u.role}</div>`).join('');
});

// View catalog
viewCatalogButton.addEventListener('click', function() {
    catalogList.innerHTML = books.map(b => `<div>${b.title} by ${b.author} - ${b.available ? 'Available' : 'Unavailable'}</div>`).join('');
});

// Display borrowed books
function displayBorrowedBooks() {
    borrowedBooksList.innerHTML = borrowedBooks.map(b => 
        `<div>${b.title} borrowed by ${b.username} on ${new Date(b.borrowDate).toLocaleString()} - Return Date: ${b.returnDate ? new Date(b.returnDate).toLocaleString() : 'Not returned'}</div>`
    ).join('');
}

// Handle adding a book
addBookButton.addEventListener('click', function() {
    const title = bookTitleInput.value;
    const author = bookAuthorInput.value;

    if (title && author) {
        // Create new book and add to the array
        const newBook = { title, author, available: true };
        books.push(newBook);

        // Save updated books to localStorage
        localStorage.setItem('books', JSON.stringify(books));

        // Update catalog list
        catalogList.innerHTML += `<div>${title} by ${author} - Available</div>`;
        
        // Clear input fields
        bookTitleInput.value = ''; 
        bookAuthorInput.value = ''; 
    } else {
        alert('Please provide both title and author.');
    }
});

// Display statistics
circulationStats.innerHTML = `<div>Total Users: ${users.length}</div><div>Total Books: ${books.length}</div>`;

// Handle logout button click
logoutButton.addEventListener('click', function() {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    window.location.href = 'index.html'; // Redirect to login page
});

// Initialize borrowed books display
displayBorrowedBooks();
