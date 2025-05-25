import React, { useState } from 'react';
import { account, ID } from './appwrite/auth';
import './App.css'; // Import CSS styles

interface User {
  name: string;
}

const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');

  async function login(email: string, password: string) {
    await account.createEmailPasswordSession(email, password);
    setLoggedInUser(await account.get() as User);
  }

  return (
    <div className="container">
      <p className="status">
        {loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Not logged in'}
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

        <button type="button" className="btn login-btn" onClick={() => login(email, password)}>
          Login
        </button>

        <button
          type="button"
          className="btn register-btn"
          onClick={async () => {
            await account.create(ID.unique(), email, password, name);
            login(email, password);
          }}
        >
          Register
        </button>

        <button
          type="button"
          className="btn logout-btn"
          onClick={async () => {
            await account.deleteSession('current');
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
