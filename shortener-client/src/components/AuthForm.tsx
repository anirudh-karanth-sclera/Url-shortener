import React, { FormEvent } from "react";


interface AuthFormType {
  username: string;
  password: string;
  buttonValue: string;
  handleSubmit: (e: FormEvent) => void;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  isSignUp: boolean;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthForm = ({
  username,
  password,
  buttonValue,
  handleSubmit,
  setUsername,
  setPassword,
  isSignUp,
  setIsSignUp,
}: AuthFormType) => {
  return (
    <div className="flex flex-col items-center justify-center  bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <form
        className="bg-white p-8 rounded-lg shadow-lg flex flex-col w-96 transform transition-all hover:scale-105"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900">
          {buttonValue}
        </h2>

        <label htmlFor="username" className="text-gray-700 font-medium">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 text-black border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <label htmlFor="password" className="text-gray-700 font-medium mt-3">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border text-black rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          className="mt-5 p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300 shadow-lg"
        >
          {buttonValue}
        </button>
      </form>

      <span className="text-white mt-6 text-lg">
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-green-400 underline ml-1 cursor-pointer hover:text-green-300 transition"
        >
          {isSignUp ? "Login" : "Sign Up"}
        </button>
      </span>
    </div>
  );
};


export default AuthForm