import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { FormEvent, useState } from "react";
import API from "../utils/api";
import Success from "../components/Success"; // Import Success component

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success message state

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const url = isSignUp ? "/register" : "/login";

    try {
      const response = await API.post(
        url,
        { username, password, role: "USER" },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", response.data?.token);
      
      if (isSignUp) {
        setSuccessMessage("Account created successfully!");
        
        // setTimeout(() => setSuccessMessage(null), 3000); // Remove after 3 seconds
      } else {
        setSuccessMessage("Logged in successfully!");

      }
      navigate("/home");
      
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {successMessage && <Success msg={successMessage} customCSS="top-5"/>} {/* Show Success message */}
      <AuthForm
        buttonValue={isSignUp ? "Sign Up" : "Login"}
        password={password}
        username={username}
        handleSubmit={handleSubmit}
        setPassword={setPassword}
        setUsername={setUsername}
        setIsSignUp={setIsSignUp}
        isSignUp={isSignUp}
        error={error}
      />
      <button
        onClick={() => navigate("/guest")}
        className="mt-1 px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-300"
      >
        Continue as Guest
      </button>
    </div>
  );
};

export default Auth;
