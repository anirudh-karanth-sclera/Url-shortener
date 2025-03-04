import { FormEvent, useState } from "react";

import { UrlType } from "./UserUrls";
import Navbar from "../components/Navbar";
import { UrlShortenFormType } from "./Home";
import CreateUrl from "../components/CreateUrl";
import API from "../utils/api";
export interface UrlGuestType { url: string; shortUrl: string }

export const GuestPage = () => {

  const [urlData, setUrlData] = useState<UrlType | null>(null);

  const handleShorten = async (
    e: FormEvent,
    { originalUrl, setError, setOriginalUrl }: UrlShortenFormType
  ) => {
    e.preventDefault();
    setError("");
    setUrlData(null);
  
    try {
      const response = await API.post("/unga/create", { url: originalUrl });
  
      setUrlData(response.data);
      setOriginalUrl("");
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to shorten URL");
    }
  };
  
  return (
    <div className="flex flex-col items-center h-screen justify-start gap-4  bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <Navbar isGuest={true} />
      <CreateUrl handleShorten={handleShorten} urlData={urlData} isGuest={true}/>
    </div>
  );
};
