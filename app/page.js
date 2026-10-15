"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [notas, setNotas] = useState([]);
  const [texto, setTexto] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function cargarNotas() {
    const { data, error } = await supabase
      .from("notas")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setNotas(data);
  }

  useEffect(() => {
    if (supabase) cargarNotas();
  }, []);

  async function agregar(e) {
    e.preventDefault();
    if (!texto.trim()) return;
    setCargando(true);
    setError("");
    const { error } = await supabase.from("notas").insert({ texto: texto.trim() });
    if (error) setError(error.message);
    else {
      setTexto("");
      await cargarNotas();
    }
    setCargando(false);
  }

  async function borrar(id) {
    const { error } = await supabase.from("notas").delete().eq("id", id);
    if (error) setError(error.message);
    else setNotas(notas.filter((n) => n.id !== id));
  }

  if (!supabase) {
    return (
      <main>
        <h1>Notas Demo</h1>
        <p className="aviso">
          Faltan las variables <code>NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>. Revisa el README (paso 3 o 5).
        </p>
      </main>
    );
  }

  return (
    <main>
      <h1>Notas Demo</h1>
      <p className="sub">Next.js en Vercel + base de datos en Supabase</p>

      <form onSubmit={agregar}>
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe una nota…"
        />
        <button disabled={cargando}>{cargando ? "Guardando…" : "Agregar"}</button>
      </form>

      {error && <p className="error">Error: {error}</p>}

      <ul>
        {notas.map((n) => (
          <li key={n.id}>
            <div>
              {n.texto}
              <br />
              <small>{new Date(n.created_at).toLocaleString("es-EC")}</small>
            </div>
            <button onClick={() => borrar(n.id)} aria-label="Borrar">✕</button>
          </li>
        ))}
      </ul>
      {notas.length === 0 && <p className="sub">Aún no hay notas.</p>}
    </main>
  );
}
