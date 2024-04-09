import React, { useContext, useState } from 'react';
import { FirebaseContext, useFirebase } from '../context/firebase';

import Navbar from '../components/Navbar'


const ListingPage = () => {
  const firebase = useFirebase();

  const [price, setPrice] = useState('');
  const [description,setDescription] = useState('');
  const [category,setCategory] = useState('');

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
            id="exampleInputEmail1" 
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
            id="exampleInputPassword1" 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Enter Price</label>
          <select 
                        className="form-select" 
                        id="categorySelect" 
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