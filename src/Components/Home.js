import NavBar from './NavBar';
import Category from './Category';
import React, {useEffect} from 'react';
import {auth} from '../lib/firebase.js';
import { useAuthState } from "react-firebase-hooks/auth";
import "../style/style.css";

function Home() {
  const [user, loading] = useAuthState(auth);
  
  useEffect(() => {
  }, [user, loading]);

  return (
    <div>
      <NavBar user={user}/>
      <Category/>
    </div>
  );
}

export default Home;