import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
  getDocs,
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
  wUser: null,
  allEcs: null,
  addNews: () => Promise,
  register: () => Promise,
  login: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
  addUsersToDb: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [news, setNews] = useState([{ title: "Loading..." }]);
  const [wUser, setWUser] = useState(null);
  const [allEcs, setAllEcs] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "websiteUsers"),
      (snapshot) => {
        snapshot.docs.map((doc) => {
          if (doc.data().email === currentUser?.email) {
            if (doc.data().role === "Admin") {
              setWUser("Admin");
            } else {
              setWUser("Gov");
            }
          }
        });
      }
    );
    return () => {
      unsubscribe();
    };
  }, [currentUser]);

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
    getEcUid2(getEcUid());

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

  const register = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setWUser(null);
    await signOut(auth);
  };

  const forgotPassword = async (email) => {
    return await sendPasswordResetEmail(auth, email, {
      url: "http://localhost:3000/login",
    });
  };

  const resetPassword = async (oobCode, newPassword) => {
    return await confirmPasswordReset(auth, oobCode, newPassword);
  };

  const addNews = async ({ author, title, body }) => {
    const collectionRef = collection(db, "news");
    const payload = { author, title, body, time: serverTimestamp() };
    await addDoc(collectionRef, payload);
  };

  const addUsersToDb = async (email, role) => {
    const collectionRef = collection(db, "websiteUsers");
    const payload = { email, role };
    await addDoc(collectionRef, payload);
  };

  const getEcUid = async () => {
    let collectionRef = collection(db, "EC-Forms");
    let querySnap = await getDocs(collectionRef);
    let arr = [];
    querySnap.docs.forEach((doc) => {
      arr.push(doc.id);
    });

    return arr;
  };

  const getEcUid2 = async () => {
    const arr = await getEcUid();

    arr.forEach(async (item) => {
      let collection2 = query(
        collection(db, "EC-Forms", item, "EC-History"),
        orderBy("id")
      );
      let querySnap = await getDocs(collection2);
      let arr2 = [];

      querySnap.docs.forEach((doc) => {
        setAllEcs((oldAllEcs) => [...oldAllEcs, doc.data()]);
      });
    });
  };

  const value = {
    currentUser,
    allUsers,
    news,
    wUser,
    allEcs,
    addNews,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    addUsersToDb,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
