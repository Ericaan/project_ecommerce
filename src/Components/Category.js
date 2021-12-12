/*
    Category will get all categories from Firestore.
    It will also link user to each products that are in the same category
*/

import "../style/style.css";
import {db} from "../lib/firebase";
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function Category() {
    const [categories, setCategories] = useState([]);

    //get categories from firestore
    const getCategories = () =>{
        db.collection('categories').onSnapshot((querySnapshot) => {
            const saveFirebaseBoards = [];
             querySnapshot.forEach((doc) => {
                 saveFirebaseBoards.push({
                     ...doc.data(),
                    key: doc.id, 
                 });
             });
             setCategories(saveFirebaseBoards);
        });
    }

    useEffect(()=>{
        getCategories();
    }, [])

  return (
      <div className="products-container">
          {categories.map(category =>
          <div className="products-card" key={category.key}>
              <div className="products-img">
                  <img src={category.imageUrl}/>
              </div>
              <div className="products-name">
                  <Link to={`/product/${category.key}`} >{category.name}</Link>
              </div>
            <br/>
            </div>
            )}
      </div>
      
  );
}

export default Category;