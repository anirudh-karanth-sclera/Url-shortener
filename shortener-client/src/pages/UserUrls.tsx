import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CopyButton from "../components/CopyButton";
import UrlCard from "../components/UrlCard";

export interface UrlType { url: string; shortUrl: string; name: string }

export default function UserUrls() {
  const navigate = useNavigate();
  const [urls, setUrls] = useState<UrlType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await fetch("http://localhost:8080/urls", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch URLs");
        }

        const data = await response.json();
        setUrls(data);
      } catch (error) {
        console.error("Error fetching URLs:", error);
        setError("Failed to load URLs. Please try again later.");
      }
    };

    fetchUrls();
  }, []);

  const handleCopy = (shortUrl: string) => {
    const fullUrl = `http://localhost:5173/go/${shortUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(fullUrl);

    setTimeout(() => {
      setCopiedUrl(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      {/* Navbar */}
      <nav className="w-full bg-gray-800 p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Your Shortened URLs</h1>
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
           <UrlCard url={url} index={index}/>
          ))
        ) : (
          <p className="text-gray-600">No URLs found.</p>
        )}
      </div>

    </div>
  );
}
