import React, { useState } from "react";
import authService from "./appwrite/auth";
import "./App.css";

interface User {
  name: string;
}

const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  async function login(email: string, password: string) {
    await authService.login({ email, password });
    setLoggedInUser(await authService.getUser());
  }

  return (
    <div className="container">
      <p className="status">
        {loggedInUser ? `Logged in as ${loggedInUser.name}` : "Not logged in"}
      </p>

      <form className="auth-form">
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
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          type="button"
          className="btn login-btn"
          onClick={() => login(email, password)}
        >
          Login
        </button>

        <button
          type="button"
          className="btn register-btn"
          onClick={async () => {
            await authService.createAccount({ email, password, name });
            login(email, password);
          }}
        >
          Register
        </button>

        <button
          type="button"
          className="btn logout-btn"
          onClick={async () => {
            await authService.logout();
            setLoggedInUser(null);
          }}
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default App;
