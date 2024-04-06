import React, { useState, useEffect } from 'react';
import BookCard from '../context/Card';
import { useFirebase } from '../context/firebase';

const Home = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const booksData = await firebase.listAllBooks();
            setBooks(booksData);
        };

        fetchBooks();
    }, [firebase]);

    const handleRemoveBook = async (bookId) => {
        try {
            await firebase.deleteBook(bookId);
            setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId)); // Remove the deleted book from the state
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    const handleEditBook = (id) => {
        // Add your edit functionality here
        console.log("Edit button clicked for book:", id);
    };

    return (
        <div className="home-container">
            {books.map((book, index) => (
                <BookCard 
                    key={index}
                    {...book}
                    onRemove={() => handleRemoveBook(book.id)}  // Pass the handleRemoveBook function as a prop
                    onEdit={() => handleEditBook(book.id)}  // Pass the handleEditBook function as a prop
                />
            ))}
        </div>
    );
};

export default Home;
