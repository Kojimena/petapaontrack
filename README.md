# Petapa OnTrack

Frontend realizado en Next.js para consultar atracciones, mapas y preguntas frecuentes de IRTRA Petapa, consumiendo datos desde PocketBase.

## Requisitos
- Node 18+ (Next.js 15).
- npm 9+.

## Instalación
```bash
npm install
```

## Scripts
- `npm run dev` – Levanta el servidor de desarrollo.
- `npm run build` – Genera el build de producción.
- `npm run start` – Sirve el build ya generado.
- `npm run lint` – Ejecuta ESLint.

## Variables de entorno
Crear un archivo `.env.local` en la raíz con los valores apropiados:
```bash
NEXT_PUBLIC_PB_URL=https://<tu-pocketbase-host>
```

## Estructura
- `app/` – Rutas App Router (`page.jsx`, `/games`, `/game/[id]`, `/map/[id]`, `/faqs`, `not-found.jsx`).
- `components/` – UI reutilizable (cards, mapa con zoom, walkthrough, filtros, header/footer, loader, FAQ accordion).
- `public/` – Imágenes, íconos, fuentes (Gotham) y assets de UI.
- `styles/globals.css` – Tailwind 4 + DaisyUI, fuentes y reglas globales.

## Flujo principal
1) `/` muestra el Walkthrough; al cerrar/terminar envía a `/games`.  
2) `/games` lista atracciones desde `games` en PocketBase; permite buscar y filtrar por `tags`.  
3) `/game/[id]` muestra detalle, tiempos, alturas (`rules_height`), restricciones y botón “Ver en mapa”.  
4) `/map/[id]` carga la imagen `map_img` del juego y pines de referencia.  
5) `/faqs` consume la colección `faqs` y despliega preguntas frecuentes.

## Modelo de datos esperado (PocketBase)
- **games**: `name`, `image`, `map_img`, `time` (minutos), `tags`/`tag` (array/string), `out_color`, `inner_color`, `description` (HTML), `rules_height` (array de `{ min, max, condicion }`), `restrictions` (HTML), `closed` (bool).  
- **walkthrough**: `title`, `description` (HTML), `image` opcional.  
- **faqs**: `question`, `answer` (HTML).

## Estilos y librerías
- Next.js 15 (App Router), React 19, Tailwind CSS 4 + DaisyUI.
- Animaciones con `motion`/Framer Motion y `react-zoom-pan-pinch` para mapa.
- Íconos: `react-icons`.
- Clientes: `pocketbase` para llamadas al backend.

## Desarrollo
1) Configurar `.env.local`.  
2) `npm run dev` y abrir `http://localhost:3000`.  
3) Verificar que PocketBase responda (colecciones anteriores) y que las imágenes estén disponibles en `/api/files/...`.
