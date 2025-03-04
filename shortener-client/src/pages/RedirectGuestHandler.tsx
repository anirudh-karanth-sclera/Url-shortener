import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAndRedirect } from "../utils";

export default function RedirectGuestHandler() {
  const { shortUrl } = useParams();

  useEffect(() => {

    fetchAndRedirect(`/unga/${shortUrl}`);
  }, [shortUrl]);


  return <p className="text-white text-center mt-10">Redirecting...</p>;
}
