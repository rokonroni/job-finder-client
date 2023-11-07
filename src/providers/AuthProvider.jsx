import { createContext, useEffect, useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import PropTypes from "prop-types";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const GoogleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  // google login
  const googleLogin = () => {
    setLoading(true); 
    return signInWithPopup(auth, GoogleProvider);
  };
  // github login
  const githubLogin = () => {
    setLoading (true);
    return signInWithPopup (auth, githubProvider);
  }
  // Sign up with email and password
  const signUp = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in with email and password
  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  //Sign out
  const logOut = () => {
    setLoading(true)
    return signOut(auth);
  };

  // Setup observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
      setLoading(false)
    });
    return () => {
      unSubscribe();
    };
  }, []);

  // value of AuthContext
  const AuthInfo = {
    user,
    loading,
    googleLogin,
    githubLogin,
    signUp,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;
