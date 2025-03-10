import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import Success from "../components/Success"; // Import Success component

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 

    try {
      await API.post(`/forgot-password?`,{
        clientUrl : `${window.location.origin}`,
        email
      });
      setSuccessMessage("Password reset email sent!");
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to send reset email");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
        {successMessage && <Success msg={successMessage} customCSS="top-20" />}
      <div className="bg-white p-6 rounded-lg  shadow-lg w-96 relative">
        <h2 className="text-2xl font-bold text-center text-gray-800">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Send Reset Email
          </button>
        </form>

        {error && <p className="mt-3 text-red-500 text-center">{error}</p>}

        <button
          onClick={() => navigate("/")}
          className="w-full mt-4 bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
