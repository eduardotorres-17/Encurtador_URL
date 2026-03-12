import { useState, useEffect, useCallback } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingLinks, setLoadingLinks] = useState(true);
  const [error, setError] = useState("");
  const [copiado, setCopiado] = useState("");

  const [novoLink, setNovoLink] = useState(null);

  const fetchLinks = useCallback(async () => {
    try {
      setLoadingLinks(true);
      const response = await fetch("/api/listar");
      if (response.ok) {
        const data = await response.json();
        setLinks(data);
      }
    } catch (err) {
      console.error("Erro ao buscar links:", err);
    } finally {
      setLoadingLinks(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const handleEncurtar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setNovoLink(null); 

    try {
      const response = await fetch("/api/encurtar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao encurtar o link");
      }

      setNovoLink({
        originalUrl: url,
        code: data.code,
        clicks: 0,
      });

      setUrl("");
      fetchLinks(); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copiarLink = (codigo) => {
    const linkCompleto = `${window.location.origin}/${codigo}`;
    navigator.clipboard.writeText(linkCompleto);
    setCopiado(codigo);
    setTimeout(() => setCopiado(""), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans p-6 md:p-12 selection:bg-green-500/30">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Encurtador{" "}
          <span className="text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
            de URL
          </span>
        </h1>
        <p className="text-zinc-400 text-lg">
          Transforme links gigantes em URLs curtas e rastreie seus cliques em
          tempo real.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-10">
        <div className="bg-zinc-900 p-6 md:p-8 rounded-2xl border-2 border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.15)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>

          <form
            onSubmit={handleEncurtar}
            className="flex flex-col md:flex-row gap-4 relative z-10"
          >
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Cole seu link gigante aqui..."
              required
              className="flex-1 bg-zinc-950 border-2 border-zinc-800 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all font-medium"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-black text-lg py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-green-500/40 whitespace-nowrap uppercase tracking-wide border border-transparent active:scale-95"
            >
              {loading ? "Processando..." : "Encurtar"}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-950/80 border-2 border-red-500 rounded-xl text-red-400 text-sm font-bold text-center">
              {error}
            </div>
          )}
        </div>

        {novoLink && (
          <div className="bg-zinc-900 p-6 md:p-8 rounded-2xl border-4 border-green-500 shadow-[0_0_40px_rgba(34,197,94,0.2)] relative transform transition-all animate-fadeIn mt-10">
            <div className="absolute -top-4 left-6 bg-green-500 text-zinc-950 font-black px-4 py-1 rounded-full text-sm uppercase tracking-widest shadow-lg">
              ✨ Seu link está pronto!
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-4">
              <div className="flex-1 min-w-0 overflow-hidden">
                <p
                  className="text-zinc-400 text-sm mb-2 truncate"
                  title={novoLink.originalUrl}
                >
                  {novoLink.originalUrl}
                </p>
                <a
                  href={`${window.location.origin}/${novoLink.code}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-400 font-mono text-2xl md:text-3xl font-black hover:text-green-300 transition-colors inline-block break-all"
                >
                  {window.location.host}/{novoLink.code}
                </a>
              </div>

              <div className="shrink-0">
                <button
                  onClick={() => copiarLink(novoLink.code)}
                  className="w-full md:w-auto px-6 py-4 bg-green-500 hover:bg-green-400 text-zinc-950 font-black text-lg rounded-xl transition-all shadow-lg hover:shadow-green-500/50 flex items-center justify-center gap-3 active:scale-95"
                >
                  {copiado === novoLink.code ? "Copiado! ✅" : "Copiar Link 📋"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="pt-8">
          <h2 className="text-2xl font-bold text-zinc-100 mb-6 flex items-center gap-3">
            <span className="bg-green-500 text-zinc-950 p-2 rounded-lg">
              📊
            </span>
            Links Recentes
          </h2>

          {loadingLinks ? (
            <div className="p-10 text-center text-green-500 animate-pulse font-bold text-lg bg-zinc-900/50 rounded-2xl border-2 border-green-500/20">
              Buscando seus links na base de dados... ⏳
            </div>
          ) : links.length === 0 ? (
            <div className="p-10 text-center text-zinc-500 bg-zinc-900/50 rounded-2xl border-2 border-zinc-800">
              Nenhum link encurtado ainda. Seja o primeiro!
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {links
                .filter((link) => link.code !== novoLink?.code)
                .map((link) => (
                  <li
                    key={link._id}
                    className="p-5 bg-zinc-900 border-2 border-green-500/30 hover:border-green-500 rounded-xl hover:bg-zinc-800/80 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 group shadow-lg"
                  >
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <p
                        className="text-zinc-400 text-sm mb-2 truncate"
                        title={link.originalUrl}
                      >
                        {link.originalUrl}
                      </p>
                      <a
                        href={`${window.location.origin}/${link.code}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-400 font-mono text-xl font-bold hover:text-green-300 transition-colors inline-block break-all"
                      >
                        {window.location.host}/{link.code}
                      </a>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 mt-2 md:mt-0">
                      <div className="flex items-center gap-2 bg-zinc-950 px-4 py-2.5 rounded-lg border-2 border-green-500/40 group-hover:border-green-500 transition-colors shadow-inner">
                        <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
                          Cliques
                        </span>
                        <span className="text-green-400 font-black text-xl">
                          {link.clicks}
                        </span>
                      </div>

                      <button
                        onClick={() => copiarLink(link.code)}
                        className="p-3 bg-zinc-950 hover:bg-green-500 hover:text-zinc-950 rounded-lg transition-all border-2 border-zinc-700 hover:border-green-500 group/btn"
                        title="Copiar Link"
                      >
                        <span className="text-xl">
                          {copiado === link.code ? "✅" : "📋"}
                        </span>
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
