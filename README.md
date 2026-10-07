# PLATO

PLATO es un menú visual para restaurantes y cafeterías: catálogo por categorías, detalle de producto, carrito local, visor 3D GLB, QR y paneles de gestión locales.

## Arquitectura

La aplicación es 100% estática: HTML5, CSS3, JavaScript vanilla, datos base en `data/*.js` y overrides en `localStorage`. No hay Node, build, API propia, base de datos, autenticación de servidor ni SSR.

```text
index.html                 landing
menu.html?restaurant=...   menú público compatible con GitHub Pages
producto.html?...          detalle, visor 3D opcional y carrito
dashboard.html             gestión local del restaurante + QR
admin.html                 resumen administrativo local
css/                       estilos separados por pantalla
js/                        storage, datos, menú, producto, visor 3D y QR
data/                      restaurantes, categorías y productos iniciales
assets/                    iconos y espacio para imágenes/modelos propios
```

## Uso

Se puede abrir `index.html` directamente o publicar la carpeta completa en GitHub Pages. Para probarlo localmente no se necesita instalar nada; un servidor estático opcional permite probar APIs como AR con más fidelidad.

El menú demo es:

```text
menu.html?restaurant=la-nonna
```

Los productos usan `producto.html?restaurant=la-nonna&product=pizza-napolitana`. Para agregar un restaurante, sumalo a `data/restaurants.js`, sus categorías a `data/categories.js` y sus productos a `data/products.js`.

## Imágenes, GLB y QR

Los modelos demo reales están en `assets/models/` y se cargan desde rutas relativas. Para agregar uno propio, colocá el `.glb` en esa carpeta y completá `model3d: "assets/models/mi-plato.glb"` junto con `model3dEnabled: true`. El visor se carga únicamente al pulsar **Ver en 3D**. Si no hay modelo o el archivo falla, se muestra un fallback claro sin romper la página.

El dashboard genera un QR en el navegador usando QRious desde jsDelivr. Si no hay red para cargar la librería, la URL queda visible para copiar. No se generan endpoints ni URLs de backend.

## Datos locales y límites

Los datos base versionables viven en `data/*.js`. Los cambios hechos desde el dashboard se guardan en el `localStorage` del navegador actual bajo claves `plato-static:*`; no se sincronizan entre clientes, dispositivos ni navegadores. Analytics, carrito y pedidos son demostraciones locales. Pagos, delivery, autenticación y AR requieren servicios o APIs futuras y no están simulados como si existieran.

## GitHub Pages

1. Subí el contenido del repositorio a GitHub.
2. En **Settings → Pages**, elegí la rama y la carpeta raíz `/`.
3. Usá enlaces relativos como los incluidos en el proyecto; funcionan bajo `https://usuario.github.io/plato/`.

No hace falta `npm install`, `npm run build` ni un servidor Node.
