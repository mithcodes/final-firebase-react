import React from 'react'
import BookCard from '../context/Card'
import { useFirebase } from '../context/firebase'
import { useState } from 'react';
import { useEffect } from 'react';

const Home = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        firebase.listAllBooks().then((booksData) => {
            setBooks(booksData.docs.map(doc => doc.data()));
        });
    }, [firebase]);

    return (
        <div className="home-container">
            {books.map((book, index) => (
                
                <BookCard 
                    key={index}
                    {...book}
                />
            ))}
        </div>
    );
};
export default Home