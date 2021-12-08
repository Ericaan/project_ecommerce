/*
    Bag will call BagItem.js. 
*/ 

import "../style/style.css";
import { auth, db, logout } from "../lib/firebase";
import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import BagItem from "./BagItem";

function Bag() {
    //get parameter which is the userId
    let params = useParams();
    const userId = params.id;

    const [products, setProducts] = useState([]);

    //displaying the products that have the same userId as the parameter
    //showing the products that user added 
    const getProducts = () =>{
        db.collection('products').where('userId', '==', userId).onSnapshot((querySnapshot) => {
            const saveFirebaseBoards = [];
            querySnapshot.forEach((doc) => {
                saveFirebaseBoards.push({
                    ...doc.data(),
                    key: doc.id, 
                });
                
            });
            setProducts(saveFirebaseBoards);
            }
        );
    }

    useEffect(()=>{
        getProducts();
    },[]);

    return (
        <div>
            <div className="navbox">
                <div className="leftside">
                    <h4>The Shop</h4>
                </div>
                <div className="rightside">
                    <span>
                        <button className="logout-btn">
                            <Link to="/" className="link-back-btn">Back</Link>
                        </button>
                    </span>
                </div>
            </div>
            
            <div className="products-container">
                {
                    products.length === 0 && <>
                        <p>No items in your bag</p>
                    </>
                }
                {
                    products && products.map(product =>
                        // Called BagItem with product parameter
                        <BagItem product={product}/>
                    )
                }
            </div>
        </div>

        
    );
}

export default Bag;