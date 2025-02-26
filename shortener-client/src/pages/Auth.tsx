import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { FormEvent, useState } from "react";

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
  
    const handlesubmit = async (e: FormEvent) => {
      e.preventDefault();
      const url = isSignUp ? "http://localhost:8080/register" : "http://localhost:8080/login";
  
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, role: "USER" }),
        });
  
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Something went wrong");
        }
  
        const data = await res.json();
        localStorage.setItem("token", data?.token);
        alert("Success");
        navigate("/home");
      } catch (error: any) {
        console.error(error);
        alert(error.message);
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <AuthForm
          buttonValue={isSignUp ? "Sign Up" : "Login"}
          password={password}
          username={username}
          handleSubmit={handlesubmit}
          setPassword={setPassword}
          setUsername={setUsername}
          setIsSignUp={setIsSignUp}
          isSignUp={isSignUp}
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
