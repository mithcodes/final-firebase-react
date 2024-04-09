// import React from "react";


const BookCard = (data, onRemove, onEdit) => {


    const { id, price, description, category } = data;

    console.log(id);

    const handleRemoveProduct = async () => {
        try {
            await onRemove(id); // Call the onRemove callback to update the local state
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    const handleEditButton = () => {
        onEdit(id); // Call the onEdit callback to handle edit functionality
    };
    
    return (
        <div className="card-container">
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
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-primary" onClick={handleEditButton}>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
