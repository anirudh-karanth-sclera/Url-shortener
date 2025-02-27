import { FormEvent, useState } from "react";

import { UrlType } from "./UserUrls";
import CopyButton from "../components/CopyButton";
import Navbar from "../components/Navbar";

export interface UrlGuestType { url: string; shortUrl: string }

export const GuestPage = () => {
  const [originalUrl, setOriginalUrl] = useState("");

  const [urlData, setUrlData] = useState<UrlType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleShorten = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setUrlData(null);

    try {
      const response = await fetch("http://localhost:8080/unga/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: originalUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to shorten URL");
      }

      const data = await response.json();
      setUrlData(data);
      setOriginalUrl("");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-start gap-4  bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <Navbar isGuest={true} />
      <form
        className="bg-white p-6 mt-5 rounded-2xl shadow-lg w-96 text-center"
        onSubmit={handleShorten}
      >
        <h1 className="text-3xl font-bold mb-4 text-gray-900">URL Shortener</h1>

        <input
          type="text"
          className="w-full p-2 rounded-lg bg-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />

        <button
          type="submit"
          className="mt-4 w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        >
          Shorten URL
        </button>

        {error && <p className="mt-3 text-red-500">{error}</p>}

        {urlData && (
          <p className="mt-4 text-lg text-gray-900">
            Shortened URL:{" "}
            <a
              href={`http://localhost:5173/g/${urlData.shortUrl}`}
              className="text-green-600 underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://localhost:5173/g/{urlData.shortUrl}
            </a>
            <CopyButton shortUrl={urlData.shortUrl.toString()} />
          </p>
        )}
      </form>
    </div>
  );
};
