"use client";

import { useEffect, useState } from "react";

export default function CajaComentarios({ peliId }) {
  const [texto, setTexto] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);

  const [editandoId, setEditandoId] = useState(null);
  const [textoEditado, setTextoEditado] = useState("");
  const [guardandoEdicion, setGuardandoEdicion] = useState(false);

  useEffect(() => {
    fetch(`/api/comentarios?peliId=${peliId}`)
      .then((res) => res.json())
      .then(setComentarios)
      .catch(() => setError("No se pudieron cargar los comentarios."));
  }, [peliId]);

  async function enviarComentario(e) {
    e.preventDefault();
    if (!texto.trim() || enviando) return;

    setEnviando(true);
    setError(null);

    try {
      const res = await fetch("/api/comentarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ peliId, texto }),
      });

      if (!res.ok) throw new Error();

      const nuevoComentario = await res.json();
      setComentarios((prev) => [...prev, nuevoComentario]);
      setTexto("");
    } catch {
      setError("No se pudo enviar el comentario. Inténtalo de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  function empezarEdicion(comentario) {
    setError(null);
    setEditandoId(comentario.id);
    setTextoEditado(comentario.texto);
  }

  function cancelarEdicion() {
    setEditandoId(null);
    setTextoEditado("");
  }

  async function guardarEdicion(id) {
    if (!textoEditado.trim() || guardandoEdicion) return;

    setGuardandoEdicion(true);
    setError(null);

    try {
      const res = await fetch("/api/comentarios", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, texto: textoEditado }),
      });

      if (!res.ok) throw new Error();

      const actualizado = await res.json();
      setComentarios((prev) => prev.map((c) => (c.id === id ? actualizado : c)));
      setEditandoId(null);
      setTextoEditado("");
    } catch {
      setError("No se pudo actualizar el comentario. Inténtalo de nuevo.");
    } finally {
      setGuardandoEdicion(false);
    }
  }

  async function borrarComentario(id) {
    if (!window.confirm("¿Seguro que quieres borrar este comentario?")) return;

    setError(null);
    const anteriores = comentarios;
    setComentarios((prev) => prev.filter((c) => c.id !== id));

    try {
      const res = await fetch(`/api/comentarios?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
    } catch {
      setComentarios(anteriores);
      setError("No se pudo borrar el comentario. Inténtalo de nuevo.");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={enviarComentario} className="flex flex-col gap-3">
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe tu opinión..."
          rows={4}
          className="bg-[#16151C] border border-[#2A2833] focus-visible:ring-2 focus-visible:ring-[#7C5CFC]/60 text-[#F5F5F5] placeholder:text-[#5C5670] rounded-xl px-4 py-3 text-sm outline-none resize-none transition-colors duration-200"
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={enviando || !texto.trim()}
            className="self-start bg-[#7C5CFC] hover:bg-[#9B7FFF] active:bg-[#6B4EE0] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D12]"
          >
            {enviando ? "Enviando..." : "Enviar comentario"}
          </button>
          {error && <p className="text-red-400 text-xs">{error}</p>}
        </div>
      </form>

      {comentarios.length > 0 && (
        <ul className="flex flex-col gap-3">
          {comentarios.map((c) => (
            <li
              key={c.id}
              className="bg-[#16151C] border border-[#2A2833] rounded-xl px-4 py-3 text-sm text-[#A09BB5]"
            >
              {editandoId === c.id ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={textoEditado}
                    onChange={(e) => setTextoEditado(e.target.value)}
                    rows={3}
                    className="bg-[#0D0D12] border border-[#2A2833] focus-visible:ring-2 focus-visible:ring-[#7C5CFC]/60 text-[#F5F5F5] rounded-lg px-3 py-2 text-sm outline-none resize-none transition-colors duration-200"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => guardarEdicion(c.id)}
                      disabled={guardandoEdicion || !textoEditado.trim()}
                      className="bg-[#7C5CFC] hover:bg-[#9B7FFF] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-medium px-4 py-1.5 rounded-lg transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D12]"
                    >
                      {guardandoEdicion ? "Guardando..." : "Guardar"}
                    </button>
                    <button
                      onClick={cancelarEdicion}
                      className="text-[#5C5670] hover:text-[#A09BB5] text-xs font-medium px-4 py-1.5 rounded-lg transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC]"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <p>
                    {c.texto}
                    {c.editado && (
                      <span className="text-[#5C5670] italic"> (editado)</span>
                    )}
                  </p>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => empezarEdicion(c)}
                      aria-label="Editar comentario"
                      className="text-[#5C5670] hover:text-[#9B7FFF] text-xs font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => borrarComentario(c.id)}
                      aria-label="Borrar comentario"
                      className="text-[#5C5670] hover:text-red-400 text-xs font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] rounded"
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
