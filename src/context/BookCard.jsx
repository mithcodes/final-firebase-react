import React, { useState } from "react";

const BookCard = ({ id, price, description, category, onRemove, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedPrice, setEditedPrice] = useState(price);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editedCategory, setEditedCategory] = useState(category);

    const handleRemoveProduct = async () => {
        try {
            await onRemove(id);
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    const handleEditProduct = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = async () => {
        try {
            await onUpdate(id, editedPrice, editedDescription, editedCategory);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };

    return (
        <div className="card-container">
            {isEditing ? (
                <div className="row m-2">
                    <div className="row">
                        <div className="col">
                            <input
                                type="number"
                                value={editedPrice}
                                onChange={(e) => setEditedPrice(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                value={editedCategory}
                                onChange={(e) => setEditedCategory(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <button className="btn btn-success" onClick={handleSaveEdit}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="row m-2">
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
                        <div className="col">
                            <button type="button" className="btn btn-danger" onClick={handleRemoveProduct}>
                                Remove
                            </button>
                            
                            <button type="button" className="btn btn-primary m-2" onClick={handleEditProduct}>
                                Edit
                            </button>
                        </div>
                        <hr/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookCard;
