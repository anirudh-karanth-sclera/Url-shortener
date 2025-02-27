import { useNavigate } from "react-router-dom";

const Navbar = ({ isGuest }: { isGuest: boolean }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {isGuest ? (
        <nav className="w-full bg-gray-800 p-4 flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-bold">URL Shortener</h1>

          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Back
          </button>
        </nav>
      ) : (
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
      )}
    </>
  );
};

export default Navbar;
