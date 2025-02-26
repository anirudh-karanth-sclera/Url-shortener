import React, { useState } from 'react'

const CopyButton = ({shortUrl}:{shortUrl:string}) => {
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

    const handleCopy = () => {
        const fullUrl = `http://localhost:5173/go/${shortUrl}`;
        navigator.clipboard.writeText(fullUrl);
        setCopiedUrl(fullUrl);
    
        setTimeout(() => {
          setCopiedUrl(null);
        }, 2000);
      };
  return (
    <>
    
    
    
    <button
    onClick={() => handleCopy()}
    className="ml-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
    >
    📋
  </button>

  {copiedUrl && <p className="mt-4 text-green-400 font-semibold">Copied: {copiedUrl}</p>}
      </>
  )
}

export default CopyButton