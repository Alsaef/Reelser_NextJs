"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthButton = () => {
  const {data:session,status}=useSession()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
    } 
  };


  useEffect(()=>{
    if (session?.user.email) {
      router.push('/');
    }
  },[session])

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles.input}
        />
        <button onClick={handleLogin} className={styles.button}>Sign In</button>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      </div>
  );
};

export default AuthButton;

// Tailwind CSS styles for the login component
const styles = {
  container: "flex items-center justify-center min-h-screen bg-gray-100",
  loginBox: "w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md",
  input: "w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300",
  button: "w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700",
  error: "mt-2 text-red-500",
};