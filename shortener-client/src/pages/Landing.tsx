export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <h1 className="text-5xl font-extrabold mb-4 text-center">Shorten Your URLs in Seconds</h1>
      <p className="text-lg text-gray-300 mb-8 text-center max-w-2xl">
        A fast, secure, and simple URL shortener built for efficiency and ease of use.
      </p>
      <a href="/auth" className="px-6 py-3 text-lg font-semibold bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition">
        Get Started
      </a>
    </div>
  );
}