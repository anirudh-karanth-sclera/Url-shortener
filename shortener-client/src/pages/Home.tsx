import { useNavigate } from "react-router-dom";
import CreateUrl from "../components/CreateUrl";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      {/* Navbar */}
      <nav className="w-full bg-gray-800 p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">URL Shortener</h1>

        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/urls")}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            View All URLs
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-start space-y-8 mt-10">
        <CreateUrl />
      </div>
    </div>
  );
}
