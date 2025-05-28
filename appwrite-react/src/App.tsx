import React, { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { login } from "./store/slices/authSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const [loading, setLoding] = useState(true);

  useEffect(() => {
    authService
      .getUser()
      .then((user) => {
        if (user) {
          dispatch(login(user));
        } else {
          dispatch(login(null));
        }
      })
      .finally(() => setLoding(false));
  });

  return !loading ? (
    <div>
      <Header />
      <main></main>
      <Footer />
    </div>
  ) : null;
};

export default App;
