import React, { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { useAppDispatch } from "./hooks/rtkHooks";
import { login } from "./store/slices/authSlice";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const App: React.FC = () => {
  // const dispatch: Dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const [loading, setLoding] = useState(true);

  useEffect(() => {
    authService
      .getUser()
      .then((user) => {
        if (user) {
          console.log(user);
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
