import CreateUrl from "../components/CreateUrl";
import Navbar from "../components/Navbar";
import { FormEvent, useState } from "react";
import { UrlType } from "./UserUrls";

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
        console.log(response);
        throw new Error(errorData.message || "Failed to shorten URL");
      }

      const data = await response.json();
      setUrlData(data);

      setOriginalUrl("");
      setAlias("");
    } catch (error: any) {
      setError(error.message);
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
