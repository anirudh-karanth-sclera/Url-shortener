import { FormEvent, useState } from "react";
import CopyButton from "./CopyButton";
import { UrlShortenFormType } from "../pages/Home";
import { UrlType } from "../pages/UserUrls";
import { UrlGuestType } from "../pages/Guest";

export default function CreateUrl({handleShorten, urlData, isGuest }:{handleShorten:(e:FormEvent,data: UrlShortenFormType)=>void, urlData:UrlType|UrlGuestType|null, isGuest:boolean}) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex items-start justify-center  bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <form className="bg-white p-6 rounded-2xl min-h-78 shadow-lg w-96 text-center flex gap-2 flex-col" onSubmit={(e)=>handleShorten(e,{originalUrl, alias,setAlias,setError,setOriginalUrl})}>
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
          placeholder="Enter Alias (Optional - to search for saved URLS)"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />

        <button
          
          className="mt-4 w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        >
          Shorten URL
        </button>

        {error && <p className="mt-3 text-red-500">{error}</p>}

        {urlData && (
          <p className="mt-4 text-lg text-gray-900">
            Shortened URL:{" "}
            <a
              href={`${window.location.origin}/${isGuest?"gi":"G"}/${urlData.shortUrl}`}
              className="text-green-600 underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {window.location.origin}/{isGuest?"gi":"G"}/{urlData.shortUrl}
            </a>

           <CopyButton shortUrl={urlData.shortUrl.toString()} isGuest={isGuest}/>
          </p>
        )}
      </form>
    </div>
  );
}
