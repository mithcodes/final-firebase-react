import React, { useState, useEffect } from 'react';
import BookCard from "../context/BookCard";
import Navbar from '../components/Navbar';
import Nav from '../components/Navbar';
import { useContext } from "react";
import { FirebaseContext, useFirebase } from "../context/firebase";

const Home = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);
    const { login } = useContext(FirebaseContext);

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
            setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    const handleUpdateBook = async (id, price, description, category) => {
        try {
            await firebase.updateBook(id, price, description, category);
            const updatedBooks = await firebase.listAllBooks();
            setBooks(updatedBooks);
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };

    return (
        <div className="home-container">
            {login ? (
                <ul>
                    {books.map((book, index) => (
                        <BookCard
                            key={index}
                            {...book}
                            onRemove={() => handleRemoveBook(book.id)}
                            onUpdate={handleUpdateBook}
                        />
                    ))}
                </ul>
            ) : (
                <Nav />
            )}
        </div>
    );
};

export default Home;
