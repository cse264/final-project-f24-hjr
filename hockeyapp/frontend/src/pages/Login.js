// src/pages/Login.js
import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = ({ setRole }) => {
  const handleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Simulate fetching user role from your backend
      const role = user.email.includes("admin") ? "admin" : "user"; // Example role determination
      setRole(role);
      alert(`Welcome ${user.displayName}, your role is ${role}`);
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;
