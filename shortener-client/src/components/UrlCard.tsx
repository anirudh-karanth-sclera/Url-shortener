import { UrlType } from "../pages/UserUrls"
import CopyButton from "./CopyButton"

const UrlCard = ({url, index}:{url:UrlType, index?:number}) => {
  return (
    <div key={index} className="mb-4 border-b pb-2 flex items-center justify-between">
    <div>
      <p className="text-green-600 font-semibold">
        {`${index? index + 1:""}`}. {url.name || "none"}:{" "}
        <a
          href={`http://localhost:5173/go/${url.shortUrl}`}
          className="underline hover:text-green-800 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          {`http://localhost:5173/go/${url.shortUrl}`}
        </a>
      </p>
    </div>
    <CopyButton shortUrl={url.shortUrl.toString()}/>
  </div>
  )
}

export default UrlCard