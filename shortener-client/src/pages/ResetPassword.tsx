import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import  API  from "../utils/api";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Invalid password reset link.");
      return;
    }
    try {
      const res = await API.post(`/reset-password?token=${token}&newPassword=${newPassword}` )
      toast.success("Password reset successful!");
      console.log(res)
      navigate("/auth");
    } catch (error) {
        console.log(error)
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800">Reset Password</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
