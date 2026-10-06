# API inicial

`GET /api/health` confirma que la aplicación está viva.

En la siguiente etapa se agregarán endpoints REST versionados para restaurantes, categorías, productos, media, QR y eventos. Cada endpoint protegido validará payloads con Zod, comprobará sesión/membresía server-side y limitará recursos al `restaurantId` autorizado.
