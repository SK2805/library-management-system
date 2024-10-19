let books = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', available: true },
    { title: '1984', author: 'George Orwell', available: false },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', available: true },
];

let borrowedBooks = [];

// Function to get all books
function getBooks() {
    return books;
}

// Function to update a book's availability
function updateBookAvailability(title, isAvailable) {
    let book = books.find(b => b.title === title);
    if (book) {
        book.available = isAvailable;
    }
}

// Function to add a new book
function addBook(title, author) {
    books.push({ title, author, available: true });
}
