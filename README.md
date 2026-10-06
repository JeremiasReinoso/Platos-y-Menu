# PLATO

PLATO es una plataforma SaaS para restaurantes: menús digitales visuales, productos 3D y experiencias AR para convertir la curiosidad en pedidos.

## Estado actual

La base inicial ya incluye:

- menú público de La Nonna en `/menu/la-nonna`;
- páginas individuales de productos;
- fallback explícito cuando no existe un modelo 3D;
- dashboard restaurante en `/dashboard` con creación local de productos;
- panel independiente en `/admin`;
- esquema Prisma/PostgreSQL multi-tenant;
- contratos separados para 3D, AR, UI y base de datos;
- endpoint de salud en `/api/health`.

Los datos demo de menú usan imágenes de Unsplash y están identificados como contenido demo. No se presenta ningún placeholder como modelo 3D real.

## Stack

Next.js 15, React 19, TypeScript, Prisma, PostgreSQL, Zod y `model-viewer` como dirección de integración futura para GLB/GLTF + AR. La aplicación mantiene 3D/AR desacoplados del menú para cargar assets solo en la página del producto.

## Instalación

```bash
npm install
cp .env.example .env
npm run typecheck
npm run dev
```

Para conectar la base PostgreSQL:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

## Estructura

```text
app/                 rutas públicas, dashboard, admin y API
components/          UI de experiencia
lib/                 datos y utilidades de dominio inicial
packages/             límites reutilizables de UI, 3D, AR y database
prisma/               esquema y seed
docs/                 arquitectura, datos y API
```

## Roadmap

1. Persistencia real y autenticación con roles.
2. CRUD de categorías/productos con storage validado.
3. Upload y optimización GLB/GLTF.
4. AR compatible por dispositivo con fallback.
5. Analytics y QR descargable.
6. Gestión global de admin.
7. Pedidos reales, sin pagos ni delivery en este MVP.
