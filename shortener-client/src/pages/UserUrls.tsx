import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UrlCard from "../components/UrlCard";

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

  const fetchUrls = async () => {
    try {
      const response = await fetch("http://localhost:8080/urls", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch URLs");
      }

      const data = await response.json();
      setUrls(data);
      // console.log(data)
    } catch (error) {
      console.error("Error fetching URLs:", error);
      setError("Failed to load URLs. Please try again later.");
    }
  };
  const handleSearch = async (name: string) => {
    if(name===""){
      fetchUrls();
      return
    }
    const res = await fetch(`http://localhost:8080/search/${name}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      throw new Error("failed to fetch");
    }

    const data = await res.json();
    setUrls(data);
  };

  const handleDelete = async (shortUrl: string) => {
    const res = await fetch(`http://localhost:8080/delete/${shortUrl}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res);
    if (!res.ok) {
      throw new Error("Failed to fetch URLs");
    }

    alert("success");

    fetchUrls();
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

      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 text-gray-900 mt-10">
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
