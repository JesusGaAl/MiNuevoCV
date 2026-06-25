// Año dinámico en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// Sombra/borde del navbar al hacer scroll
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 10);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Menú móvil
const toggle = document.getElementById("navToggle");
const links = document.querySelector(".nav__links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// Formulario de contacto → guarda en D1 vía /api/contact
const form = document.getElementById("contactForm");
if (form) {
  const status = document.getElementById("contactStatus");
  const submit = document.getElementById("contactSubmit");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const data = {
      name: (fd.get("name") || "").toString().trim(),
      email: (fd.get("email") || "").toString().trim(),
      message: (fd.get("message") || "").toString().trim(),
    };

    if (!data.name || !data.email || !data.message) {
      status.textContent = "Por favor completa todos los campos.";
      status.className = "contact-form__status is-error";
      return;
    }

    submit.disabled = true;
    submit.textContent = "Enviando…";
    status.textContent = "";
    status.className = "contact-form__status";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.ok) {
        status.textContent = "¡Mensaje enviado! Gracias, te responderé pronto.";
        status.className = "contact-form__status is-ok";
        form.reset();
      } else {
        status.textContent = json.error || "No se pudo enviar. Intenta de nuevo.";
        status.className = "contact-form__status is-error";
      }
    } catch (err) {
      status.textContent = "Error de conexión. Intenta más tarde.";
      status.className = "contact-form__status is-error";
    } finally {
      submit.disabled = false;
      submit.textContent = "Enviar mensaje";
    }
  });
}

// Reveal al entrar en viewport
const items = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add("is-visible"));
}
