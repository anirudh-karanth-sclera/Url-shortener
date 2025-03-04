import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAndRedirect } from "../utils";

export default function RedirectHandler() {
  const { shortUrl } = useParams(); 

  useEffect(() => {

    fetchAndRedirect(`/go/${shortUrl}`);
  }, [shortUrl]);

  return ( <div className="h-screen w-full flex items-center justify-center">


    <p className="text-white text-center mt-10">Redirecting...</p>
    
  </div>
    )
}
