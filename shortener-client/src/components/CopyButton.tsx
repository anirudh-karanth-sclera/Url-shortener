import React, { useState } from 'react'
import { TiTick } from "react-icons/ti";

const CopyButton = ({ shortUrl, isGuest }: { shortUrl: string , isGuest:boolean}) => {
  const [copiedUrl, setCopiedUrl] = useState<string>("");

  const handleCopy = () => {
    const fullUrl = `http://localhost:5173/${isGuest?"gi":"G"}/${shortUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(fullUrl);

    setTimeout(() => {
      setCopiedUrl("");
    }, 2000);
  };
  return (
    <>



      <button
        onClick={() => handleCopy()}
        className="ml-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        disabled={copiedUrl?.length > 0}
      >
        {copiedUrl.length < 1 ? "📋" : <TiTick />}
      </button>


    </>
  )
}

export default CopyButton