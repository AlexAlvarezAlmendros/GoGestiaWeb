<div align="center">

# GoGestia · web

**La landing de una consultora de automatización que, en vez de contarte lo que hace, te lo enseña funcionando en la propia página.**

[![En producción](https://img.shields.io/badge/en%20producci%C3%B3n-gogestia.vercel.app-4dd4ac)](https://gogestia.vercel.app)
[![React 19](https://img.shields.io/badge/React-19-61dafb)](package.json)
[![Vite + SWC](https://img.shields.io/badge/Vite-SWC-646cff)](vite.config.js)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)](tailwind.config.js)

[Qué es](#qué-es) ·
[Las demos](#las-demos-son-el-argumento) ·
[Arrancarlo](#arrancarlo) ·
[Cómo está montado](#cómo-está-montado)

</div>

---

## Qué es

El sitio público de **GoGestia**: automatización de procesos con IA para pymes. Cinco servicios
—automatización con IA, aplicaciones internas, portales de cliente, integraciones entre CRM/ERP y
agentes de IA ejecutándose en local—, un proceso de trabajo en cuatro pasos y una única llamada a
la acción: **el diagnóstico gratuito**.

Todo el sitio existe para llevar a ese formulario. Por eso no hay carrusel de logos ni blog activo
en la navegación: se probó, no aportaba, y se quitó.

## Las demos son el argumento

Vender automatización con capturas de pantalla no funciona: el cliente no distingue un dashboard de
otro. Así que cada servicio trae una **demo interactiva embebida en la página**, y se toca:

| Demo | Qué enseña |
|---|---|
| `ClientPortalDemo` | Cómo ve el cliente final su portal |
| `DocumentProcessorDemo` | Una factura entrando y saliendo como datos |
| `StockControlDemo` | Control de stock con avisos automáticos |
| `APIIntegrationDemo` | Dos sistemas dejando de duplicar datos |
| `LocalAIAgentDemo` | Un agente respondiendo con el modelo en tu máquina |

La de agentes locales es la que más se defiende sola: **datos que no salen de la empresa y sin
cuota por token**, que es exactamente la objeción que aparece en cuanto dices «IA» delante de un
gerente.

## Arrancarlo

```bash
npm install
npm run dev          # http://localhost:5173

npm run lint         # ESLint 9 (flat config)
npm run format       # Prettier
npm run build        # bundle de producción en dist/
```

Variables de entorno (todas opcionales, con valores por defecto en `src/config/contact.js`):

```env
VITE_API_URL=            # backend del formulario de contacto (GoGestiaAPI)
VITE_SITE_URL=           # URL canónica, para el SEO
VITE_CONTACT_EMAIL=
VITE_CONTACT_PHONE=
```

## Cómo está montado

```
src/
  pages/        Home · Services · Contact · Thanks · legal/ · NotFound
  components/   Header · Footer · Card · Modal · Input · Button · SEOHead
    demos/      las cinco demos interactivas
  services/     contactService.js — envío del formulario al backend
  config/       contact.js — teléfono, email, horarios y compromisos de respuesta
  hooks/        loading global y SEO por página
```

- **SEO por página** con `react-helmet-async` a través de `SEOHead`, no metadatos globales
  copiados en el `index.html`.
- **Datos de contacto en un solo sitio** (`src/config/contact.js`): cambiar el teléfono es una
  línea, no un `grep` por todo el repo.
- **Páginas legales** (privacidad, aviso legal, cookies) servidas por un componente común
  `LegalPage`, porque el texto cambia y el maquetado no.
- Analítica con **Vercel Web Analytics**; despliegue en **Vercel** (`vercel.json`), con
  `netlify.toml` heredado de un despliegue anterior.

## Estado

**En producción.** El formulario de contacto habla con [GoGestiaAPI](https://github.com/AlexAlvarezAlmendros/GoGestiaAPI);
el blog está implementado en el código pero fuera de la navegación (ver `BLOG_README.md`) a la
espera de tener artículos que justifiquen la sección.

## Licencia

Sin fichero de licencia: es el sitio corporativo de una empresa concreta, no una plantilla.
Todos los derechos reservados.
