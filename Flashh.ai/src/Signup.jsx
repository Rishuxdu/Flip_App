import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ onSignSuccess, onLogin, onClose }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    const response = await fetch("https://flip-app.onrender.com/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setPassword("");
      setUsername("");
      setEmail("");
      onSignSuccess("Signup successful!");
    } else {
      setMessage(data.message || "Signup failed");
    }

    console.log("User created:", data);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen w-full bg-gray-100 p-4">
        <div className="relative w-full max-w-md bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-4 sm:max-w-lg md:max-w-xl lg:max-w-2xl transition-all duration-300">
          <button
            onClick={() => {
              navigate("/app");
            }}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <input
            type="text"
            name="username"
            placeholder="Enter Your Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="bg-neutral-50 border border-blue-200 p-3 rounded w-full mt-8 focus:outline-none focus:ring-1 focus:ring-violet-200"
          />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
            <input
              type="text"
              name="email"
              placeholder="abc@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-neutral-50 border border-blue-200 p-3 rounded w-full md:w-1/2 focus:outline-none focus:ring-1 focus:ring-violet-200"
            />
            <input
              type="text"
              name="password"
              placeholder="Password here"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="  bg-neutral-50 border border-blue-200 p-3 rounded w-full md:w-1/2 focus:outline-none focus:ring-1 focus:ring-violet-200"
            />
          </div>

          <button
            className="text-sm  text-blue-500 hover:cursor-pointer underline underline-offset-2 mt-4 self-start"
            onClick={() => navigate("/login")}
          >
            Login instead
          </button>

          <button
            onClick={handleSignup}
            className="bg-violet-500 text-white py-3 rounded-md hover:bg-violet-600 hover:cursor-pointer transition-colors mt-6 w-full"
          >
            Create Account
          </button>

          {message && (
            <p className="text-center text-red-500 text-sm mt-2">{message}</p>
          )}
        </div>
      </div>
    </>
  );
}
