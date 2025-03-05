import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UrlCard from "../components/UrlCard";
import API from "../utils/api";
import Success from "../components/Success"; // Import Success component

export interface UrlType {
  url: string;
  shortUrl: string;
  name: string;
}

export default function UserUrls() {
  const navigate = useNavigate();
  const [urls, setUrls] = useState<UrlType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success message state

  const fetchUrls = async () => {
    try {
      const response = await API.get("/urls", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUrls(response.data);
    } catch (error: any) {
      console.error("Error fetching URLs:", error);
      setError("Failed to load URLs. Please try again later.");
    }
  };

  const handleSearch = async (name: string) => {
    if (name === "") {
      fetchUrls();
      return;
    }

    try {
      const response = await API.get(`/search/${name}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUrls(response.data);
    } catch (error: any) {
      console.error("Failed to fetch search results:", error);
    }
  };

  const handleDelete = async (shortUrl: string) => {
    try {
      await API.delete(`/delete/${shortUrl}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSuccessMessage("URL deleted successfully!"); 
      setTimeout(() => setSuccessMessage(null), 2000);
      fetchUrls();
    } catch (error: any) {
      console.error("Failed to delete URL:", error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      {/* Navbar */}
      <nav className="w-full bg-gray-800 p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Your Shortened URLs</h1>
        <div className="flex items-center bg-gray-700 px-3 py-2 rounded-lg shadow-sm w-64">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-400"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </div>

        <button
          onClick={() => navigate("/home")}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Home
        </button>
      </nav>

      {successMessage && <Success msg={successMessage} customCSS="top-20" />} {/* Show success message */}

      <div className="bg-white p-6  rounded-2xl shadow-lg w-96 text-gray-900 mt-16">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : urls.length > 0 ? (
          urls.map((url, index) => (
            <UrlCard
              url={url}
              index={index + 1}
              handleDelete={handleDelete}
              key={index}
            />
          ))
        ) : (
          <p className="text-gray-600">No URLs found.</p>
        )}
      </div>
    </div>
  );
}
