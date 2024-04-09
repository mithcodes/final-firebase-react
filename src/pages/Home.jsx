import React, { useState, useEffect } from 'react';
import BookCard from "../context/BookCard";
// import { useFirebase } from '../context/firebase';
import Navbar from '../components/Navbar';
import Nav from '../components/Navbar';


import { useContext } from "react";
import {FirebaseContext,useFirebase} from "../context/firebase"

const Home = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);
    const {login} = useContext(FirebaseContext);

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

            {
                        

                            login ? <ul>
                            {
            
            
                                books.map((book, index) => {
                                    return <BookCard
                                        key={console.log(index)}
                                        {...book}
                                        onRemove={() => handleRemoveBook(book.id)}  // Pass the handleRemoveBook function as a prop
                                        onEdit={() => handleEditBook(book.id)}  // Pass the handleEditBook function as a prop
                                    />
            
                                })
            
                            }
                        </ul>  : <Nav/>
                                    
            }


  


            
            

            










        </div>
    );
};

export default Home;
