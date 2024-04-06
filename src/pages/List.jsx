import React, { useState } from 'react';
import { useFirebase } from '../context/firebase';

const ListingPage = () => {
  const firebase = useFirebase();

  const [price, setPrice] = useState('');
  const [description,setDescription] = useState('');
  const [category,setCategory] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.handleCreateNewListing(price,description,category);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Price of product</label>
          <input 
            type="number" 
            className="form-control" 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">describe your product</label>
          <input 
            type="number" 
            className="form-control" 
            id="exampleInputPassword1" 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Enter Price</label>
          <input 
            type="number" 
            className="form-control" 
            id="exampleInputPassword1" 
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
        </div>
        <button className='btn btn-success'>create</button>
      </form>
    </div>
  );
};

export default ListingPage;