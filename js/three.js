(function(){
  const MODEL_VIEWER_URL='https://unpkg.com/@google/model-viewer@4.1.0/dist/model-viewer.min.js';
  function loadLibrary(){return new Promise((resolve,reject)=>{if(customElements.get('model-viewer'))return resolve();const script=document.createElement('script');script.type='module';script.src=MODEL_VIEWER_URL;script.onload=resolve;script.onerror=()=>reject(new Error('No se pudo cargar el visor 3D.'));document.head.appendChild(script);});}
  function getProductModel(product){return product&&product.model3dEnabled&&product.model3d?product.model3d:'';}
  function fallback(container,message){container.innerHTML='<div class="viewer-content"><div class="plate-art" aria-hidden="true">🍽️</div><strong>'+window.PLA.esc(message)+'</strong><span class="viewer-label">La fotografía sigue disponible como referencia del menú.</span></div>';}
  function makeModel(host,product){const model=getProductModel(product);if(!model)return null;host.innerHTML='<model-viewer src="'+window.PLA.esc(model)+'" alt="Modelo 3D real de '+window.PLA.esc(product.name)+'" camera-controls touch-action="none" shadow-intensity="1" exposure="1" interaction-prompt="auto" loading="eager"></model-viewer>';const viewer=host.querySelector('model-viewer');return{viewer,reset(){viewer.cameraOrbit='auto auto auto';viewer.fieldOfView='auto';},destroy(){viewer.remove();}};}
  function render(container,product){
    if(!getProductModel(product)){fallback(container,'Este producto todavía no tiene un modelo 3D real.');return;}
    container.innerHTML='<div class="model-loading" role="status">Cargando modelo 3D...</div>';
    loadLibrary().then(()=>{
      container.innerHTML='<div class="model-stage"><div class="model-canvas"></div><div class="model-controls" aria-label="Controles del modelo 3D"><button type="button" data-3d-action="rotate">Rotar</button><button type="button" data-3d-action="zoom-in">Zoom +</button><button type="button" data-3d-action="zoom-out">Zoom −</button><button type="button" data-3d-action="reset">Restablecer</button></div></div>';
      const instance=makeModel(container.querySelector('.model-canvas'),product),viewer=instance.viewer;
      viewer.addEventListener('error',()=>fallback(container,'No pudimos cargar el modelo 3D real.'));
      container.querySelectorAll('[data-3d-action]').forEach(button=>button.addEventListener('click',()=>{
        const action=button.dataset['3dAction'];
        if(action==='reset')instance.reset();
        if(action==='rotate')viewer.autoRotate=!viewer.autoRotate;
        if(action==='zoom-in')viewer.fieldOfView=Math.max(10,(parseFloat(viewer.fieldOfView)||30)-5)+'deg';
        if(action==='zoom-out')viewer.fieldOfView=Math.min(60,(parseFloat(viewer.fieldOfView)||30)+5)+'deg';
      }));
      window.PLA.trackEvent('3d_view',{productId:product.id});
    }).catch(()=>fallback(container,'No pudimos cargar el visor 3D.'));
  }
  function mountCameraModel(container,product){return loadLibrary().then(()=>makeModel(container,product)).catch(()=>null);}
  function showCameraError(product){const notice=document.querySelector('#viewer-notice');if(notice)notice.innerHTML='<strong>No pudimos acceder a la cámara.</strong> Podés seguir viendo el producto en 3D.';render(document.querySelector('#viewer'),product);}
  window.PLAThree={getProductModel,render,mountCameraModel,showCameraError};
})();
