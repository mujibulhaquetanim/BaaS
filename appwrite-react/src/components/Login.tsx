import { useState, useEffect } from "react";
import authService from "../appwrite/auth";

interface User {
  name: string;
}

export default function Login() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(null); //instead two state variables, we can use single state variable and check the value of it.

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await authService.getUser();
        setLoggedInUser(user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);

  async function loginUser(email: string, password: string) {
    try {
      await authService.login({ email, password });
      const user = await authService.getUser();
      setLoggedInUser(user);
    } catch (error) {
      console.log(error);
    }
  }

  async function logoutUser() {
    try {
      await authService.logout();
      setLoggedInUser(null);
    } catch (error) {
      console.log(error);
    }
  }

  async function createAccount(email: string, password: string, name: string) {
    try {
      await authService.createAccount({ email, password, name });
      await loginUser(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-4 text-red-700 text-center">
        Welcome to Appwrite
      </h1>
      <p className="status">
        {loggedInUser ? `Logged in as ${loggedInUser.name}` : "Not logged in"}
      </p>

      <form className="auth-form">
        {!authMode && (
          <>
            <button type="button" onClick={() => setAuthMode("login")}>
              Login
            </button>
            <button type="button" onClick={() => setAuthMode("signup")}>
              Signup
            </button>
          </>
        )}

        {authMode === "login" && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={() => loginUser(email, password)}>
              Login
            </button>
          </>
        )}

        {authMode === "signup" && (
          <>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => createAccount(email, password, name)}
            >
              Signup
            </button>
          </>
        )}

        {loggedInUser && (
          <button
            type="button"
            className="btn logout-btn"
            onClick={() => logoutUser()}
          >
            Logout
          </button>
        )}
      </form>
    </div>
  );
}
