import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RedirectHandler() {
  const { shortUrl } = useParams(); // Get short URL from route

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        const response = await fetch(`http://localhost:8080/go/${shortUrl}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const longUrl = data.longUrl;
        console.log(longUrl)
        if (longUrl) {
          window.location.href = longUrl; // Redirect client-side
        } else {
          console.error("Invalid long URL received");
        }
      } catch (error) {
        console.error("Error fetching URL:", error);
      }
    };

    fetchAndRedirect();
  }, [shortUrl]);

  return ( <div className="h-screen w-full flex items-center justify-center">


    <p className="text-white text-center mt-10">Redirecting...</p>
    
  </div>
    )
}
