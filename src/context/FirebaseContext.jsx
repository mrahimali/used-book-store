import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";


import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";


import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs
} from "firebase/firestore";




const firebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBAfu1ekJlR4ByNcc-isiNS12VzrTZ_Pgs",
  authDomain: "old-book-house.firebaseapp.com",
  projectId: "old-book-house",
  storageBucket: "old-book-house.appspot.com",
  messagingSenderId: "379671922124",
  appId: "1:379671922124:web:8b25b3f9a72925b2a74969"
};


export const useFirebase = () => useContext(firebaseContext);

const FirebaseApp = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(FirebaseApp);
const db = getFirestore(FirebaseApp);
const storage = getStorage();


export const FirebaseProvider = (props) => {

  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, user => {
      if (user) setUser(user);
      else setUser(null)
    });
  }, []);



 //  LOGIN LOGIC

 const loginWithEmailAndPassword = async (email, password) => {
  try {
    const authResult = await signInWithEmailAndPassword(FirebaseAuth, email, password);

    // Create a reference to the users collection
    const userRef = collection(db, "users");

    // Create a query against the collection.
    const q = query(userRef, where("userEmail", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // If no matching user is found in Firestore, return a special result
      return {
        user: authResult.user,
        userInfo: null, // or an empty object, depending on your preference
      };
    }
    // console.log("User Info from Firestore", querySnapshot.docs[0].data())
    const userInfo = querySnapshot.docs[0].data(); // Assuming there is only one matching user
    setUserInfo(userInfo)
    setUser(authResult.user)
    // console.log("User from Firebase new console", user.email)
    return {
      user: authResult.user,
      userInfo: userInfo,
    };
  } catch (err) {
    console.error("Error during login:", err);
    throw err; // Re-throw the error for the calling function to handle
  }
};


  //  SIGN UP LOGIC

  const signUpUserWithEmailAndPassword = async (name, email, password, phone, city, state) => {
    try {
      const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

      const profileData = {
        userId: res.user.uid,
        userEmail: res.user.email,
        userName: name,
        userPhone: phone,
        userCity: city,
        userState: state,
      };

      const docRef = await addDoc(collection(db, 'users'), profileData);
      console.log("User Created in Firestore with id: ", docRef.id);
    } catch (error) {
      console.error("Error signing up: ", error.message);
      // Handle the error (e.g., display an error message to the user)
    }
  };




 


  // ADD BOOK TO DATABASE

  const addBookToSell = async (title, price, isbn, author, img, city, state, zip) => {
    if (isLoggedIn) {
      try {
        const imgRef = ref(storage, `uploads/images/${Date.now()}-${img.name}`);
        const uploadRes = await uploadBytes(imgRef, img);
        const imgDownloadUrl = await getDownloadURL(imgRef);
        console.log("img path : ", uploadRes.metadata.fullPath);
        const bookData = {
          title,
          price,
          isbn,
          author,
          imgDownloadUrl: imgDownloadUrl,
          imgPath: uploadRes.metadata.fullPath,
          city,
          state,
          zip,
          email: user.email
        }
  
        const bookRef = await addDoc(collection(db, "books"), bookData);
        console.log("Book added!! Response : ", bookRef);
        console.log("img path : ", uploadRes.fullPath);
  
      } catch (error) {
        console.error("Error adding book:", error.message);
        // Handle the error, notify the user, or perform other actions as needed
      }
    } else {
      console.warn("Please Login");
    }
  }
  


  const getBooksByUserEmail = async () => {
    // if(!user) return null
    try {
      const q = query(collection(db, "books"), where("email", "==", user.email));
      const books = await getDocs(q); 
      return books
    } catch (error) {
      console.error(`Error fetching books: ${error.message}`);
    }
  };
  


  const getImageUrl = (path) => {
    return getDownloadURL(ref(storage, path))
  }


  //  LOGOUT LOGIC


  const logOutuser = () => signOut(FirebaseAuth).then(() => {
    console.log("Logged Out!")
  }).catch((error) => {
    console.log("Error in Logout Function!")
  });

  const isLoggedIn = user ? true : false;

  return (
    <firebaseContext.Provider value={{ user, userInfo, signUpUserWithEmailAndPassword, loginWithEmailAndPassword, isLoggedIn, logOutuser, addBookToSell, getBooksByUserEmail }}>
      {props.children}
    </firebaseContext.Provider>
  )
}