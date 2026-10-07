(function(){
  function getProductModel(product){return window.PLAModelLoader.enabled(product)?window.PLAModelLoader.path(product):'';}
  function getExpectedModel(product){return product&&product.model3d?product.model3d:'';}
  function fallback(container,message,product){
    const path=getExpectedModel(product);
    container.innerHTML='<div class="viewer-content"><div class="viewer-empty-icon" aria-hidden="true">◌</div><strong>'+window.PLA.esc(message)+'</strong><span class="viewer-label">Archivo esperado: <code>'+window.PLA.esc(path||'sin referencia')+'</code></span><span class="viewer-label">La fotografía se mantiene separada como referencia del menú.</span></div>';
  }
  function setScale(viewer,scale){const value=Number(scale)||1;viewer.scale=value+' '+value+' '+value;}
  function makeModel(host,product){
    const model=getProductModel(product); if(!model)return null;
    host.innerHTML='<model-viewer src="'+window.PLA.esc(model)+'" alt="Modelo 3D real de '+window.PLA.esc(product.name)+'" camera-controls touch-action="none" shadow-intensity="1" shadow-softness=".7" exposure="1.1" environment-image="neutral" interaction-prompt="auto" loading="eager" reveal="auto"></model-viewer>';
    const viewer=host.querySelector('model-viewer'); setScale(viewer,product.model3dScale);
    return {viewer,reset(){viewer.cameraOrbit='auto auto auto';viewer.fieldOfView='auto';setScale(viewer,product.model3dScale);},destroy(){viewer.remove();host.replaceChildren();}};
  }
  function render(container,product){
    if(!window.PLAAR.detect3DCapabilities().webgl){fallback(container,'Tu dispositivo no admite WebGL para mostrar el modelo 3D.',product);return;}
    if(!getProductModel(product)){fallback(container,'Este producto todavía no tiene un modelo 3D real disponible.',product);return;}
    container.innerHTML='<div class="model-loading" role="status">Cargando modelo 3D real...</div>';
    window.PLAModelLoader.load().then(()=>{
      container.innerHTML='<div class="model-stage"><div class="model-canvas"></div><div class="model-controls" aria-label="Controles del modelo 3D"><button type="button" data-3d-action="rotate">Rotar</button><button type="button" data-3d-action="zoom-in">Zoom +</button><button type="button" data-3d-action="zoom-out">Zoom −</button><button type="button" data-3d-action="reset">Restablecer</button></div></div>';
      const instance=makeModel(container.querySelector('.model-canvas'),product),viewer=instance.viewer;
      viewer.addEventListener('error',()=>fallback(container,'No pudimos cargar el archivo GLB real.',product),{once:true});
      container.querySelectorAll('[data-3d-action]').forEach(button=>button.addEventListener('click',()=>{
        const action=button.dataset['3dAction'];
        if(action==='reset')instance.reset();
        if(action==='rotate')viewer.autoRotate=!viewer.autoRotate;
        if(action==='zoom-in')viewer.fieldOfView=Math.max(10,(parseFloat(viewer.fieldOfView)||30)-5)+'deg';
        if(action==='zoom-out')viewer.fieldOfView=Math.min(60,(parseFloat(viewer.fieldOfView)||30)+5)+'deg';
      }));
      window.PLA.trackEvent('3d_view',{productId:product.id});
    }).catch(()=>fallback(container,'No pudimos cargar el visor 3D.',product));
  }
  function mountCameraModel(container,product){return window.PLAModelLoader.load().then(()=>makeModel(container,product));}
  function showCameraError(product){
    const notice=document.querySelector('#viewer-notice');
    if(notice)notice.innerHTML='<strong>No pudimos acceder a la cámara.</strong> Revisá el permiso del navegador y usá un sitio HTTPS. Podés seguir viendo el producto en 3D.';
    render(document.querySelector('#viewer'),product);
  }
  window.PLAThree={getProductModel,getExpectedModel,render,mountCameraModel,showCameraError};
})();
