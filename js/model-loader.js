(function(){
  const MODEL_VIEWER_URL='https://unpkg.com/@google/model-viewer@4.1.0/dist/model-viewer.min.js';
  let promise;
  function load(){
    if(customElements.get('model-viewer'))return Promise.resolve();
    if(promise)return promise;
    promise=new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.type='module'; script.src=MODEL_VIEWER_URL;
      script.onload=resolve; script.onerror=()=>reject(new Error('No se pudo cargar el visor 3D.'));
      document.head.appendChild(script);
    });
    return promise;
  }
  function path(product){return product&&product.model3d?product.model3d:'';}
  function enabled(product){return !!(product&&product.model3dEnabled&&path(product));}
  window.PLAModelLoader={load,path,enabled};
})();
