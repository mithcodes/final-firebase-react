// import React from "react";
import { useContext } from "react";
import firebase from "firebase/compat/app";
import { FirebaseContext } from "./firebase";


const BookCard = (data, ) => {


    const { id, price, description, category } = data;
    const {editBook, setBooks ,deleteBook, inputs} = useContext(FirebaseContext);
    // console.log(onEdit);

    console.log(id);


    const handleRemoveBook = async (bookId) => {
      await deleteBook(bookId);
           await setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId)); // Remove the deleted book from the state
        
       
  
    };


    const {  setPrice,setDescription, setCategory} = useContext(FirebaseContext);

    const handleEditBook = async (data) => {


       

       await setPrice(data.price);
       await  setDescription(data.description);
       await setCategory(data.category);


       await setBooks(prevBooks => prevBooks.filter(book => book.id !== data.id)); 







        // await setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));

        // const { price, description,category, } = useContext(FirebaseContext);



      const obj =  {

            price : price,
            description : description,
            category : category
        }
        console.log(obj);

      


//   console.log(document.getElementById("price"));





       

      






       await editBook(data.id,obj);





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
                        <button type="button" className="btn btn-danger" onClick={()=>handleRemoveBook(id)}>
                            Remove
                        </button>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-primary" onClick={()=>handleEditBook(data)}>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
