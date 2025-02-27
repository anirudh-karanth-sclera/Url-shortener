import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RedirectGuestHandler() {
  const { shortUrl } = useParams();
  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        window.location.href = `http://localhost:8080/unga/${shortUrl}`
        
      } catch (error) {
        console.error("Error fetching URL:", error);
      }
    };

    fetchAndRedirect();
  }, [shortUrl]);

  return <p className="text-white text-center mt-10">Redirecting...</p>;
}
