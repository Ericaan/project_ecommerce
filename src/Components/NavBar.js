/*
  NavBar will fetch user information that will be used as parameter for Bag
  NavBar will show two conditions, one if user has not logged in, 
  it will only show Login with Google
  The other one is if user has already logged in,
  they will be able to add items and see the items in their bag(access bag)
*/

import "../style/style.css";
import {logout, signInWithGoogle, db} from '../lib/firebase.js';
import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import {cart} from 'react-icons-kit/entypo/cart'

function NavBar({user}) {
  //image and name for user
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  //to navigate
  const navigate = useNavigate();

  //for user doc id 
  const [userDocId, setUserDocId] = useState("");

  //fetch the user information from firestore
  const fetchUserName = async () => {
    try {
      const query = await db.collection("users").where("uid", "==", user?.uid).get();
      const data = await query.docs[0].data();
      setName(data.name);
      setImage(data.photoUrl);
      const uDocId = query.docs[0].id;
      setUserDocId(uDocId);
      console.log("user doc id: ",uDocId);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
      }
  };
    
  useEffect(() => {
    //if it is not user, navigate back to Home
    if (!user) return navigate("/");
    fetchUserName();
  }, [user]);

  return (
    <div className="navbox">
        <div className="leftside">
          <h4>The Shop</h4>
        </div>

        {/* if user does not sign in, the page only shows button */}
        {!user && 
            <div className="rightside">
                <span><button className="logout-btn" onClick={signInWithGoogle}>
                    Login with Google
                </button></span>
        </div>}

        {/* if user signed in, the page will show their username, avatar, cart, logout button */}
        {user && 
            <div className="rightside">
                <span><img src={image}/></span>
                <span>{name}</span>
                <span>
                    <Link to={`/bag/${userDocId}`} className="navlink">
                    <Icon icon={cart}/>
                    </Link>
                </span>
                
                <span>
                    <button className="logout-btn" onClick={logout}>
                    Logout
                </button>
                </span>
            </div>
        }
      
      
    </div>
  );
}

export default NavBar;