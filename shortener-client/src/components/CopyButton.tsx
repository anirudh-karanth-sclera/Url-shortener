import  { useState } from 'react'
import { TiTick } from "react-icons/ti";
import { FaRegCopy } from "react-icons/fa6";

const CopyButton = ({ shortUrl, isGuest }: { shortUrl: string , isGuest:boolean}) => {
  const [copiedUrl, setCopiedUrl] = useState<string>("");

  const handleCopy = () => {
    const fullUrl = `http://localhost:5173/${isGuest?"gi":"G"}/${shortUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(fullUrl);

    setTimeout(() => {
      setCopiedUrl("");
    }, 750);
  };
  return (
    <>



      <button
        onClick={() => handleCopy()}
        className="ml-2 px-3 py-1"
        disabled={copiedUrl?.length > 0}
      >
        {copiedUrl.length < 1 ? <FaRegCopy /> : <TiTick />}
      </button>


    </>
  )
}

export default CopyButton