import React, { useContext, useState } from 'react';
import { FirebaseContext, useFirebase } from '../context/firebase';

import Navbar from '../components/Navbar';

const ListingPage = () => {
  const firebase = useFirebase();

  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const { login } = useContext(FirebaseContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.handleCreateNewListing(price, description, category);

    alert("✔ successfully Added");
  };

  return (
    <div className="m-5">
      {login ? null : <Navbar />}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="priceInput" className="form-label">Price of product</label>
          <input 
            type="number" 
            className="form-control" 
            id="priceInput" 
            aria-describedby="priceHelp"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descriptionInput" className="form-label">Describe your product</label>
          <input 
            type="text" 
            className="form-control" 
            id="descriptionInput" 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categorySelect" className="form-label">Select your category</label>
          <select 
            className="form-select" 
            id="categorySelect" 
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>
        <button className='btn btn-success'>Create</button>
      </form>
    </div>
  );
};

export default ListingPage;
