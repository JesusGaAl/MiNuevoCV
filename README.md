# CV / Portafolio — Jesús García

Sitio web personal (CV + portafolio) de **Jesús García**, desarrollador Fullstack.
Una sola página, estática, con diseño dark minimalista. Sin framework ni paso de
build: **HTML, CSS y JavaScript puro**, lista para desplegar en cualquier hosting estático.

🔗 **Portafolio previo:** https://portafolio-react-93df.onrender.com

---

## ✨ Características

- Diseño dark minimalista y responsive (móvil / escritorio).
- Animaciones de entrada al hacer scroll (IntersectionObserver).
- Navegación con menú móvil.
- Cero dependencias y cero build → despliegue inmediato.

## 🧱 Stack

- **HTML5** semántico
- **CSS3** (variables, grid, flexbox)
- **JavaScript** vanilla (sin frameworks)

## 📂 Estructura

```
.
├── index.html            # Página principal (perfil, skills, proyectos, contacto)
├── assets/
│   ├── css/styles.css    # Estilos (tema dark)
│   └── js/main.js        # Navegación, menú móvil y animaciones
├── render.yaml           # Config de despliegue para Render
└── .nojekyll             # Compatibilidad con GitHub Pages
```

## 🚀 Ejecutar en local

Cualquier servidor estático sirve. Con Python:

```bash
python3 -m http.server 4321
```

Luego abre http://localhost:4321

## ☁️ Despliegue

Al ser un sitio estático, funciona igual en las tres plataformas:

- **Cloudflare Pages** — Connect to Git · Build command: *(vacío)* · Output dir: `/`
- **Render** — New Static Site (usa el `render.yaml` incluido)
- **GitHub Pages** — Settings → Pages → rama `main`, carpeta raíz

## 📬 Contacto

- **Email:** ukl117733@proton.me
- **GitHub:** https://github.com/JesusYG
- **LinkedIn:** https://www.linkedin.com/in/jesús-garcía-a07729222
