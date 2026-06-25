// Cloudflare Pages Function — POST /api/contact
// Guarda los mensajes del formulario de contacto en la base de datos D1 (binding "DB").

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function onRequestPost(context) {
  const { request, env } = context;

  // Si el binding no está configurado, avisamos claramente.
  if (!env.DB) {
    return Response.json(
      { ok: false, error: "Base de datos no configurada." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Petición inválida." }, { status: 400 });
  }

  const name = (body.name || "").toString().trim();
  const email = (body.email || "").toString().trim();
  const message = (body.message || "").toString().trim();

  // Validación
  if (!name || !email || !message) {
    return Response.json({ ok: false, error: "Faltan campos por completar." }, { status: 400 });
  }
  if (name.length > 100 || email.length > 200 || message.length > 2000) {
    return Response.json({ ok: false, error: "Algún campo es demasiado largo." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "El email no es válido." }, { status: 400 });
  }

  try {
    await env.DB.prepare(
      "INSERT INTO messages (name, email, message, created_at) VALUES (?, ?, ?, ?)"
    )
      .bind(name, email, message, new Date().toISOString())
      .run();

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { ok: false, error: "No se pudo guardar el mensaje. Intenta más tarde." },
      { status: 500 }
    );
  }
}
// Nota: al exportar solo onRequestPost, Pages responde 405 a GET/PUT/etc.
// automáticamente, así los mensajes guardados no quedan expuestos.

