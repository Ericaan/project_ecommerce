/*
    Product will show all products that are in the same category.
    For example: Watch SE and Watch Series 7 will be in the same page
    Product also has button to add the product to user bag. 
    
    Product also adds userId in Product collection 
    so that user can see their added products in their bag
*/

import "../style/style.css";
import { auth, db} from "../lib/firebase";
import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";

function Product() {
    //get parameter which is the categoryId
    let params = useParams();
    const catId = params.id;

    const [products, setProducts] = useState([]);
    const [user, loading] = useAuthState(auth);
    const [userDocId, setUserDocId] = useState("");

    //get products from firestore based on their category
    //using catId to get the category Id (parameter)
    const getProducts = () =>{
        db.collection('products').where('categoryId', '==', catId).onSnapshot((querySnapshot) => {
            const saveFirebaseBoards = [];
                querySnapshot.forEach((doc) => {
                    saveFirebaseBoards.push({
                        ...doc.data(),
                        key: doc.id, 
                    });
                });
                setProducts(saveFirebaseBoards);
        });
    }

    //fetch user information
    const fetchUserName = async () => {
        try {
            const query = await db.collection("users").where("uid", "==", user?.uid).get();
            const data = await query.docs[0].data();
            const uDocId = query.docs[0].id;
            console.log("user doc id: ",uDocId);
            setUserDocId(uDocId);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    //update and add userId to products collection when user add the product to their bag
    const addUserIdToProduct = (id)=>{
        console.log(id);
        db.collection("products").doc(id).update({          
            userId:userDocId,          
        }).then(() => {
            alert("Item is added to your bag."); 
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
        
    }

    useEffect(()=>{
        getProducts();
        fetchUserName();
    },[user]);


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
            {products.map(product =>
            <div className="products-card" id={product.key}>
                <div className="products-img">
                    <img src={product.imageUrl}/>
                </div>
                <div className="products-name">
                    {product.name}
                </div>
                <div className="products-price">
                    ${product.price},00
                </div>
                {/* called the addUserIdToProduct function with 
                    product.key  */}
                <button className="addcart-btn" onClick={()=>addUserIdToProduct(product.key)}>ADD TO BAG
                </button>
            <br/>
            </div>
            )}
        </div>
        </div>

        
    );
}

export default Product;