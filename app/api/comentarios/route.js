import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "comentarios.json");

async function leerComentarios() {
  try {
    const contenido = await fs.readFile(filePath, "utf-8");
    return JSON.parse(contenido);
  } catch {
    return [];
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const peliId = searchParams.get("peliId");

  const comentarios = await leerComentarios();
  const resultado = peliId
    ? comentarios.filter((c) => String(c.peliId) === String(peliId))
    : comentarios;

  return Response.json(resultado);
}

export async function POST(req) {
  const { peliId, texto } = await req.json();

  if (!peliId || !texto?.trim()) {
    return Response.json({ error: "Faltan datos del comentario" }, { status: 400 });
  }

  const comentarios = await leerComentarios();
  const nuevoComentario = {
    id: Date.now(),
    peliId: String(peliId),
    texto: texto.trim(),
    fecha: new Date().toISOString(),
  };

  comentarios.push(nuevoComentario);
  await fs.writeFile(filePath, JSON.stringify(comentarios, null, 2));

  return Response.json(nuevoComentario, { status: 201 });
}

export async function PUT(req) {
  const { id, texto } = await req.json();

  if (!id || !texto?.trim()) {
    return Response.json({ error: "Faltan datos del comentario" }, { status: 400 });
  }

  const comentarios = await leerComentarios();
  const index = comentarios.findIndex((c) => c.id === id);

  if (index === -1) {
    return Response.json({ error: "Comentario no encontrado" }, { status: 404 });
  }

  comentarios[index] = {
    ...comentarios[index],
    texto: texto.trim(),
    editado: new Date().toISOString(),
  };

  await fs.writeFile(filePath, JSON.stringify(comentarios, null, 2));

  return Response.json(comentarios[index]);
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  if (!id) {
    return Response.json({ error: "Falta el id del comentario" }, { status: 400 });
  }

  const comentarios = await leerComentarios();
  const filtrados = comentarios.filter((c) => c.id !== id);

  if (filtrados.length === comentarios.length) {
    return Response.json({ error: "Comentario no encontrado" }, { status: 404 });
  }

  await fs.writeFile(filePath, JSON.stringify(filtrados, null, 2));

  return Response.json({ ok: true });
}
