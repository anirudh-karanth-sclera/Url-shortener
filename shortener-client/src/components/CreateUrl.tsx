import { useState } from "react";
import CopyButton from "./CopyButton";
export interface UrlType {
  shortUrl: number;
  url: string;
  name: string;
}
export default function CreateUrl() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [urlData, setUrlData] = useState<UrlType | null>(null);
  const [error, setError] = useState<string | null>(null);



  const handleShorten = async () => {
    setError("");
    setUrlData(null);

    try {
      const response = await fetch("http://localhost:8080/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ url: originalUrl, name: alias }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(response)
        throw new Error(errorData.message || "Failed to shorten URL");

      }

      const data = await response.json();
      setUrlData(data);
      console.log(data)
      setOriginalUrl("")
      setAlias("")
    } catch (error: any) {
      setError(error.message);
      console.log(error)
    }
  };

 

  return (
    <div className="flex items-start justify-center  bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">URL Shortener</h1>

        <input
          type="text"
          className="w-full p-2 rounded-lg bg-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />

        <input
          type="text"
          className="w-full p-2 mt-3 rounded-lg bg-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Enter Alias (Optional)"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />

        <button
          onClick={handleShorten}
          className="mt-4 w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        >
          Shorten URL
        </button>

        {error && <p className="mt-3 text-red-500">{error}</p>}

        {urlData && (
          <p className="mt-4 text-lg text-gray-900">
            Shortened URL:{" "}
            <a
              href={`http://localhost:5173/go/${urlData.shortUrl}`}
              className="text-green-600 underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://localhost:5173/go/{urlData.shortUrl}
            </a>

           <CopyButton shortUrl={urlData.shortUrl.toString()}/>
          </p>
        )}
      </div>
    </div>
  );
}
