# Database package

El esquema Prisma vive en `prisma/schema.prisma`. Las consultas de aplicación deberán recibir siempre `restaurantId` y aplicar el scope de tenant en el repositorio, nunca confiar en filtros del cliente.
