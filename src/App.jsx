import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEncurtar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await fetch("/api/encurtar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }), 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao encurtar o link");
      }

      setShortUrl(data.shortUrl);
      setUrl(""); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 font-sans text-zinc-100">
      <div className="max-w-xl w-full bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-2">
          Encurtador <span className="text-orange-500">Vibe</span>
        </h1>
        <p className="text-zinc-400 text-center mb-8">
          Cole seu link gigante abaixo para encurtar.
        </p>

        <form onSubmit={handleEncurtar} className="flex flex-col gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://seulinkgigante.com/..."
            required
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            {loading ? "Encurtando a mágica..." : "Encurtar Link 🚀"}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-center">
            {error}
          </div>
        )}

        {shortUrl && (
          <div className="mt-6 p-6 bg-green-500/10 border border-green-500/30 rounded-xl text-center animate-fadeIn">
            <p className="text-green-400 text-sm mb-2 uppercase tracking-wider font-bold">
              Link Encurtado com Sucesso!
            </p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-mono text-white hover:text-orange-400 transition-colors break-all"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
