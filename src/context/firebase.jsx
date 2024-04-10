import { useContext } from "react";
import { createContext,useState ,useEffect} from "react";

import { initializeApp } from "firebase/app";
import {  updateDoc } from "firebase/firestore";

import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup, onAuthStateChanged,signOut} from "firebase/auth"
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc 
  } from "firebase/firestore";
  import { getStorage } from 'firebase/storage';

export const FirebaseContext=createContext(null);



const firebaseConfig = {
  apiKey: "AIzaSyBvuf_9g6_lHhgvaHL9xa3TcVB1xrX8NnE",
  authDomain: "bookify-fe226.firebaseapp.com",
  projectId: "bookify-fe226",
  storageBucket: "bookify-fe226.appspot.com",
  messagingSenderId: "63078609226",
  appId: "1:63078609226:web:df99fe8a7917f1cbe4d1b3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth=getAuth(firebaseApp)
const googleProvider=new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


export const useFirebase=()=>useContext(FirebaseContext);
export const FirbaseProvider=(props)=>{

    const [user,setUser]=useState(null)

    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,(user)=>{
            if(user){
                setUser(user)
            }else{
                setUser(null)
            }
        })
    },[]);

    const signupUserWithEmailAndPassword=(email,password)=>{
   return createUserWithEmailAndPassword(firebaseAuth,email,password)
}


const signUserWithEmailAndPass=(email,password)=>{
   return signInWithEmailAndPassword(firebaseAuth,email,password);
}


const signWithGoogle=()=> signInWithPopup(firebaseAuth,googleProvider)
const logout = () =>( firebaseAuth.signOut());

const handleCreateNewListing = async (price, description, category) => {
  const userEmail = firebaseAuth.currentUser.email;
  await addDoc(collection(firestore, 'books/'), {
      price,
      description,
      category,
      userEmail,
  });
  console.log('created successfully');
};

   

const deleteBook = async (id) => {
  try {
      await deleteDoc(doc(firestore, `books/${id}`));
      console.log('deleted successfully');
  } catch (error) {
      console.error("Error deleting book:", error);
  }
};


const editBook = async (id, newData) => {
    try {

        // const updateDoc = (bookRef, newData)=>{
        //     bookRef = newData;
        // }
      // Construct a reference to the document in Firestore
      const bookRef = doc(firestore, `books/${id}`);
      
      // Use update function to update the document with new data
      await updateDoc(bookRef, newData);
      
      console.log('Book updated successfully');
    } catch (error) {
      console.error("Error editing book:", error);
    }
  };

const listAllBooks = async () => {
  const userEmail = firebaseAuth.currentUser.email;
  const booksSnapshot = await getDocs(collection(firestore, "books"));
  const booksData = booksSnapshot.docs
      .filter(doc => doc.data().userEmail === userEmail)
      .map(doc => ({ id: doc.id, ...doc.data() })); // Include the document ID in the returned data
  return booksData;
};
// ... (No changes here)




const [login, setLogin] = useState(false);
const [books, setBooks] = useState([]);
const [inputs, setInputs] = useState({});


const [price, setPrice] = useState('');
const [description,setDescription] = useState('');
const [category,setCategory] = useState('');


const isLoggedIn=user?true:false;


    return(
        <FirebaseContext.Provider
        
        value={{
            price, setPrice,description,setDescription,category,setCategory,
            
            inputs, editBook, setInputs,login,setLogin,signupUserWithEmailAndPassword,signUserWithEmailAndPass,signWithGoogle,isLoggedIn, handleCreateNewListing,listAllBooks,logout, deleteBook,books, setBooks}}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}