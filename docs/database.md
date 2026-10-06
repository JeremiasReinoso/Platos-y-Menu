# Modelo de datos

Prisma modela usuarios, membresías, restaurantes, categorías, productos, variantes, assets, modelos 3D, pedidos, analytics, QR y suscripciones. `Product` y `Category` tienen unicidad compuesta por restaurante para evitar colisiones entre tenants.

Los eventos anónimos usan `sessionId` y no requieren cuenta. `AnalyticsEvent` relaciona opcionalmente un producto y conserva solo metadata operacional.
