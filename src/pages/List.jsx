import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext, useFirebase } from '../context/firebase';

import Navbar from '../components/Navbar'


const ListingPage = () => {
  const firebase = useFirebase();




  const {inputs, setInputs ,price, setPrice,description,setDescription,category, setCategory} = useContext(FirebaseContext);

  useEffect(()=>{
setInputs({

  price : price,
  description : description,
  category: category

})
  },[setPrice,setDescription,setCategory])

  // setInputs()

  const {login} = useContext(FirebaseContext);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.handleCreateNewListing(price,description,category);

    alert("✔ successfully Added")
  };

  return (
    <div className="">
    {

      login ? console.log() : <Navbar/>
    }
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Price of product</label>
          <input 
            type="number" 
            className="form-control" 
            id="price" 
            aria-describedby="emailHelp"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">describe your product</label>
          <input 
            type="text" 
            className="form-control" 
            id="description" 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Enter Price</label>
          <select 
                        className="form-select" 
                        id="Category" 
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    >
                        <option value="Food">Food</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Salary">Shopping</option>
                    </select>
        </div>
        <button className='btn btn-success'>create</button>
      </form>
    </div>
  );
};

export default ListingPage;