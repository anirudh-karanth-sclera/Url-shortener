import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RedirectHandler() {
  const { shortUrl } = useParams(); // Get short URL from route
console.log("G")
  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        window.location.href = `http://localhost:8080/go/${shortUrl}`
        
      } catch (error) {
        console.error("Error fetching URL:", error);
      }
    };

    fetchAndRedirect();
  }, [shortUrl]);

  return <p className="text-white text-center mt-10">Redirecting...</p>;
}
