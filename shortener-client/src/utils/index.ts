import API from "./api";

export const fetchAndRedirect = async (url:string) => {
    try {
      const response = await API.get(url);
  
      const longUrl = response.data.longUrl;
      console.log(longUrl);
  
      if (longUrl) {
        window.location.href = longUrl; // Redirect client-side
      } else {
        console.error("Invalid long URL received");
      }
    } catch (error: any) {
      console.error("Error fetching URL:", error);
    }
  };