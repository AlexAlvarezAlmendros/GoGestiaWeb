# GoGenAI Web

Web Landing de la empresa GoGenAI - Soluciones de automatización y digitalización empresarial.

## 🚀 Tecnologías

- **Frontend**: React 18 + JavaScript
- **Build Tool**: Vite + SWC
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios

## 📋 Características

### ✅ Completado - Setup Inicial
- ✅ Proyecto creado con Vite + React + SWC + Javascript
- ✅ Dependencias instaladas: `react-router-dom`, `axios`
- ✅ Estructura de carpetas configurada
- ✅ Prettier configurado para formateo de código

### ✅ Completado - Configuración Base
- ✅ React Router v6 configurado con todas las rutas
- ✅ Layout base (MainLayout.jsx)
- ✅ Sistema de estilos con Tailwind CSS
- ✅ Variables de entorno configuradas
- ✅ Componente de loading global

### ✅ Completado - Componentes Reutilizables
- ✅ Header con navegación responsive
- ✅ Footer con enlaces y redes sociales
- ✅ Botón CTA reutilizable
- ✅ Componente Input con validación
- ✅ Card para servicios
- ✅ Modal/Expandible para detalles

### ✅ Completado - Páginas
- ✅ **Página Home**: Hero, propuesta de valor, servicios, casos de uso, proceso, resultados, CTA
- ✅ **Página Servicios**: Layout de cards, modales con detalles, servicios futuros
- ✅ **Página Contacto**: Formulario completo, validación, integración con backend
- ✅ **Página Agradecimiento**: Mensaje personalizado, próximos pasos, CTAs secundarios
- ✅ **Página Blog**: Lista de artículos, newsletter, categorías
- ✅ **Páginas Legales**: Política de privacidad, aviso legal, política de cookies

### ✅ Completado - Servicios
- ✅ ContactService para gestión de formularios
- ✅ Validación de formularios en cliente
- ✅ Hook de Loading global

## 📁 Estructura del Proyecto

```
├── public/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Input.jsx
│   │   ├── LegalPage.jsx
│   │   └── Modal.jsx
│   ├── hooks/              # Custom hooks
│   │   └── LoadingProvider.jsx
│   ├── layouts/            # Layouts de página
│   │   └── MainLayout.jsx
│   ├── pages/              # Páginas principales
│   │   ├── legal/          # Páginas legales
│   │   │   ├── CookiePolicy.jsx
│   │   │   ├── LegalNotice.jsx
│   │   │   └── PrivacyPolicy.jsx
│   │   ├── Blog.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Services.jsx
│   │   └── Thanks.jsx
│   ├── services/           # Servicios y API calls
│   │   └── contactService.js
│   ├── tests/             # Tests (pendiente)
│   ├── App.jsx            # Componente raíz
│   ├── index.css          # Estilos globales con Tailwind
│   └── main.jsx           # Punto de entrada
├── .env                   # Variables de entorno
├── .env.example          # Ejemplo de variables de entorno
├── .prettierrc           # Configuración de Prettier
├── postcss.config.js     # Configuración de PostCSS
├── tailwind.config.js    # Configuración de Tailwind
└── vite.config.js        # Configuración de Vite
```

## 🎨 Paleta de Colores (Marca GoGenAI)

- **Verde Oscuro**: `#093A29` - Color principal de marca
- **Verde Lima**: `#C7F464` - Color de acento y CTAs
- **Blanco**: `#FFFFFF` - Fondo principal
- **Gris Claro**: `#EAEAEA` - Fondos secundarios
- **Negro**: `#000000` - Texto principal

## 🚦 Rutas Disponibles

- `/` - Página de inicio
- `/servicios` - Página de servicios
- `/contacto` - Formulario de contacto
- `/gracias` - Página de agradecimiento post-formulario
- `/blog` - Blog y recursos
- `/legal/privacidad` - Política de privacidad
- `/legal/aviso-legal` - Aviso legal
- `/legal/cookies` - Política de cookies

## ⚡ Comandos Disponibles

```bash
# Desarrollo
npm run dev                 # Inicia servidor de desarrollo

# Build
npm run build              # Construye para producción
npm run preview            # Preview del build de producción

# Linting y formato
npm run lint               # Ejecuta ESLint
npm run lint:fix           # Ejecuta ESLint y arregla errores automáticamente
npm run format             # Formatea código con Prettier
npm run format:check       # Verifica formato del código
```

## 🔧 Configuración de Desarrollo

### Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```env
VITE_API_URL=http://localhost:3001
VITE_SITE_NAME=GoGenAI
VITE_CONTACT_EMAIL=contacto@gogenaiweb.com
```

### Desarrollo Local

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```

3. **Abrir navegador**: El sitio estará disponible en `http://localhost:5173`

## 📦 Dependencias Principales

### Dependencias de Producción
- `react` - Librería principal de UI
- `react-dom` - Renderizado en DOM
- `react-router-dom` - Enrutamiento
- `axios` - Cliente HTTP

### Dependencias de Desarrollo
- `@vitejs/plugin-react-swc` - Plugin de React para Vite con SWC
- `tailwindcss` - Framework de CSS
- `autoprefixer` - PostCSS plugin para prefijos CSS
- `prettier` - Formateador de código
- `eslint` - Linter de JavaScript

## 🌐 Integración Backend

El proyecto está preparado para integrarse con un backend para:
- Envío de formularios de contacto
- Suscripción al newsletter
- Gestión de contenido del blog (futuro)

La configuración del backend se realiza a través de la variable `VITE_API_URL`.

## 📱 Responsive Design

- **Mobile First**: Diseñado primero para móviles
- **Breakpoints**: Utiliza el sistema estándar de Tailwind CSS
- **Navegación móvil**: Menú hamburguesa implementado
- **Formularios**: Optimizados para dispositivos táctiles

## 🔒 Cumplimiento Legal

- **RGPD**: Políticas de privacidad implementadas
- **LSSI**: Aviso legal completo
- **Cookies**: Política de cookies detallada
- **Consentimientos**: Formularios con checkboxes de aceptación

## 👥 Contribución

Este proyecto sigue las especificaciones funcionales definidas en la documentación del negocio GoGenAI.

## 📄 Licencia

Este proyecto está licenciado bajo GNU General Public License v3.0 - ver el archivo [LICENSE](LICENSE) para más detalles.

---

**GoGenAI** - Automatizando el futuro de tu empresa 🚀
