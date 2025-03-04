import { FormEvent, useState } from "react";

import { UrlType } from "./UserUrls";
import Navbar from "../components/Navbar";
import { UrlShortenFormType } from "./Home";
import CreateUrl from "../components/CreateUrl";
export interface UrlGuestType { url: string; shortUrl: string }

export const GuestPage = () => {

  const [urlData, setUrlData] = useState<UrlType | null>(null);

  const handleShorten = async (e: FormEvent, {originalUrl, setError,setOriginalUrl}:UrlShortenFormType) => {
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
        console.log(errorData)
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
      <CreateUrl handleShorten={handleShorten} urlData={urlData} isGuest={true}/>
    </div>
  );
};
