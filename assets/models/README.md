# Modelos 3D de PLATO

Esta carpeta solo acepta modelos GLB/GLTF reales del producto que indican en su nombre. La fotografía del menú nunca se convierte en una textura o en un modelo 3D.

## Modelos demo pendientes

La aplicación ya tiene referencias individuales para estos archivos, pero no se crean archivos vacíos ni placeholders:

- `pizza-margherita.glb`
- `pizza-napolitana.glb`
- `pasta-carbonara.glb`
- `lasagna.glb`
- `tiramisu.glb`
- `cafe-latte.glb`

Cuando se incorpore cada modelo, hay que comprobar que representa exactamente el producto, activar `model3dEnabled: true` en `data/products.js` y documentar aquí la fuente y la licencia.

## Archivos heredados

`pot.glb`, `plate.glb` y `pizza-box.glb` provienen de Kenney Food Kit y tienen licencia CC0 1.0 según `LICENSE.txt`. Son objetos auxiliares y no están asignados a ningún plato porque no representan los seis productos del menú.
