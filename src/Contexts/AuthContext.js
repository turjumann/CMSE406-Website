import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";

const AuthContext = createContext({
  currentUser: null,
  allUsers: null,
  news: null,
  addNews: () => Promise,
  register: () => Promise,
  login: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [news, setNews] = useState([{ title: "Loading..." }]);

  //Getting the current logged in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //Getting all users registered from database
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "allUsers"), (snapshot) => {
      setAllUsers(snapshot.docs.map((doc) => doc.data()));
    });
    return () => {
      unsubscribe();
    };
  }, []);
  //Getting news from database
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "news"), orderBy("time", "desc")),
      (snapshot) => {
        setNews(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    signOut(auth);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email, {
      url: "http://localhost:3000/login",
    });
  };

  const resetPassword = (oobCode, newPassword) => {
    return confirmPasswordReset(auth, oobCode, newPassword);
  };

  const addNews = async ({ author, title, body }) => {
    const collectionRef = collection(db, "news");
    const payload = { author, title, body, time: serverTimestamp() };
    await addDoc(collectionRef, payload);
  };

  const value = {
    currentUser,
    allUsers,
    news,
    addNews,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
