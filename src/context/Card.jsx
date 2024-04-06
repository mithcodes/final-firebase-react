import React from "react";
import { useFirebase } from "./firebase";

const BookCard = ({ price, description, category }) => {
    const firebase = useFirebase();

    return (
        <div className="row">
            <div className="header">
                Your product is here, order some more products
            </div>
            <div className="row">
                <div className="col">
                    Price: {price}
                </div>
                <div className="col">
                    Description: {description}
                </div>
                <div className="col">
                    Category: {category}
                </div>
            </div>
        </div>
    );
};

export default BookCard;
