document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const notificationList = document.getElementById('notificationList');
    const reserveButton = document.getElementById('reserveButton');
    const reserveBookTitle = document.getElementById('reserveBookTitle');

    // Load books from localStorage (if present) or use default data
    const books = JSON.parse(localStorage.getItem('books')) || getBooks();
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];

    // Function to display notifications
    function updateNotifications() {
        notificationList.innerHTML = notifications.map(n => `<li>${n}</li>`).join('');
    }

    // Search for available books and show Borrow button
    searchButton.addEventListener('click', function () {
        const query = document.getElementById('searchQuery').value;
        const results = aStarSearch(query, true); // Search for available books
        searchResults.innerHTML = results.length
            ? results.map((book, index) => `
                <div>
                    ${book.title} by ${book.author} - Available
                    <button onclick="borrowBook(${index})">Borrow</button>
                </div>
            `).join('')
            : 'No available books found.';
    });

    // Function to borrow a book
    window.borrowBook = function (index) {
        const book = books[index];
        if (book.available) {
            const borrowDate = new Date();
            book.available = false; // Mark the book as borrowed
            updateBooksInLocalStorage(books); // Save the updated books list
            notifications.push(`You borrowed "${book.title}" on ${borrowDate.toLocaleString()}.`);
            updateNotifications();
            alert(`You borrowed "${book.title}" successfully!`);
        }
    };

    // Search for unavailable books for reservation
    reserveButton.addEventListener('click', function () {
        const title = reserveBookTitle.value.toLowerCase();
        const reservedBook = books.find(book => book.title.toLowerCase() === title && !book.available);

        if (reservedBook) {
            reservedBook.reserved = true; // Mark the book as reserved
            updateBooksInLocalStorage(books); // Save the updated books list
            notifications.push(`You reserved "${reservedBook.title}".`);
            updateNotifications();
            alert(`Book "${reservedBook.title}" reserved successfully!`);
        } else {
            alert('Book not found or already available!');
        }
    });

    // A* Search Algorithm for book searching
    function aStarSearch(query, onlyAvailable = false) {
        return books.filter(book =>
            (book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())) &&
            (!onlyAvailable || book.available) // Show only available books if requested
        );
    }

    // Function to update books data in localStorage
    function updateBooksInLocalStorage(updatedBooks) {
        localStorage.setItem('books', JSON.stringify(updatedBooks));
    }

    // Display notifications on page load
    updateNotifications();
});
