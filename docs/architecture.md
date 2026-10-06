# Arquitectura de PLATO

PLATO empieza como un monolito modular Next.js para evitar complejidad operacional innecesaria. El código se separa por superficie y por capacidad:

- `app/menu`: experiencia pública mobile-first.
- `app/dashboard`: operaciones del restaurante.
- `app/admin`: control global aislado.
- `packages/three`: contrato del visor 3D.
- `packages/ar`: detección y contrato de AR; no afirma soporte que el dispositivo no tenga.
- `prisma`: persistencia PostgreSQL y relaciones multi-tenant.

La frontera de tenant es `restaurantId`. Todo repositorio y endpoint autenticado debe resolver primero la membresía del usuario y después consultar por `restaurantId`; el frontend nunca es una autoridad de autorización.

Storage se representa con `MediaAsset`, dejando al proveedor detrás de una futura interfaz `StorageProvider`. El MVP usa URLs públicas demo; la carga real de archivos queda para la fase de storage/auth.
