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
  const [register, setRegister] = useState<boolean>(false);
  const [loginbtn, setLoginbtn] = useState<boolean>(false);

  useEffect(() => {
    async function fetchUser() {
      const user = await authService.getUser();
      setLoggedInUser(user);
    }
    fetchUser();
  }, []);

  async function login(email: string, password: string) {
    await authService.login({ email, password });
    const user = await authService.getUser();
    setLoggedInUser(user);
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
        {!register && (
          <button
            type="button"
            className="border p-2 mb-2 rounded-2xl hover:bg-gray-200 hover:cursor-pointer"
            onClick={() => {
              setRegister(true);
              setLoginbtn(false);
            }}
          >
            Register
          </button>
        )}

        {register && (
          <div>
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
              className="btn register-btn"
              onClick={async () => {
                await authService.createAccount({ email, password, name });
                login(email, password);
              }}
            >
              Register
            </button>
          </div>
        )}

        {!loginbtn && (
          <button
            type="button"
            className="border p-2 rounded-2xl hover:bg-gray-200 hover:cursor-pointer"
            onClick={() => {
              setLoginbtn(true);
              setRegister(false);
            }}
          >
            Login
          </button>
        )}

        {loginbtn && (
          <div>
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
              className="btn login-btn"
              onClick={() => login(email, password)}
            >
              Login
            </button>
          </div>
        )}

        {loggedInUser && (
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
        )}
      </form>
    </div>
  );
}
