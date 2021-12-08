/*
    BagItem will show all items that are added by user to their bag.
    It will have 2 buttons, one for removing item from bag 
    and the other one is to checkout.
    User can increase or decrease the quantity of each product
*/

import "../style/style.css";
import {db} from "../lib/firebase";
import React, {useState, useEffect} from 'react';

function BagItem({product}) {
    //set it to 1 
    const [quantity, setQuantity] = useState(1);

    //increase the quantity
    const increase = ()=>{
        setQuantity(quantity+1);
    }

    //decrease the quantity
    const decrease = ()=>{
        //can decrease if quantity above 0
        if (quantity>1){
            setQuantity(quantity-1);
        }
    }

    //remove value of userId from product collection
    const remove = (id)=>{
        db.collection('products').doc(id).update({
            userId: "",
        }).then(() => {
            alert("Removing item from bag."); 
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

    //remove all userId from product when they checkout
    const checkout = (id)=>{
        db.collection('products').doc(id).update({
            userId: "",
        }).then(() => {
            alert("Checkout Complete. Your order has been placed"); 
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

    return (
        <div>
            <div className="products-card" key={product.key}>
                <div className="products-img">
                    <img src={product.imageUrl}/>
                </div>
                <div className="products-name">
                    {product.name}
                </div>
                <div className="products-price">
                    ${product.price},00
                </div>
                <div className="products-price">
                    <button className="bag-btn" onClick={decrease}>-</button>
                    <input name="qty" className="bag-input"
                    key={product.key} value={quantity} onChange={(e)=>{
                        setQuantity(e.target.value)
                    }}/>
                    <button className="bag-btn" onClick={increase}>+</button>
                    
                </div>
                <button className="addcart-btn" onClick={()=>remove(product.key)}>Remove From Bag
                </button>
                <br/>
            </div>

            <div>
                <div className="cart-summary-heading">Summary </div>
                <br/>
                    <div className="cart-price" key={product.key}>
                        <p>Product Name: {product.name}</p>
                        <p>Product Price: ${product.price},00</p>
                        <p>Quantity: {quantity}</p>
                        <p>Total Price: ${quantity*product.price},00</p>
                        <br/>
                    <button onClick={()=>checkout(product.key)}>CHECKOUT</button>
                    <br/><br/>
                </div>
            </div>
        </div>

        
    );
}

export default BagItem;