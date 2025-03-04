import CreateUrl from "../components/CreateUrl";
import Navbar from "../components/Navbar";
import { FormEvent, useState } from "react";
import { UrlType } from "./UserUrls";
import API from "../utils/api";

export interface UrlShortenFormType {
  originalUrl: string;
  alias: string;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setOriginalUrl: React.Dispatch<React.SetStateAction<string>>;
  setAlias: React.Dispatch<React.SetStateAction<string>>;
}

export default function Home() {
  const [urlData, setUrlData] = useState<UrlType | null>(null);

  const handleShorten = async (
    e: FormEvent,
    {
      originalUrl,
      alias,
      setAlias,
      setError,
      setOriginalUrl,
    }: UrlShortenFormType
  ) => {
    e.preventDefault();
    console.log(originalUrl);
    setError("");
    setUrlData(null);

    try {
      const response = await API.post(
        "/create",
        { url: originalUrl, name: alias },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    
      setUrlData(response.data);
      setOriginalUrl("");
      setAlias("");
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to shorten URL");
    }
    
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <Navbar isGuest={false} />

      <div className="flex flex-col items-center justify-start space-y-8 mt-10">
        <CreateUrl
          handleShorten={handleShorten}
          urlData={urlData}
          isGuest={false}
        />
      </div>
    </div>
  );
}
