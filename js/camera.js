(function(){
  let stream=null,activeViewer=null,cleanupGestures=null;
  function stop(){cleanupGestures?.();cleanupGestures=null;activeViewer?.destroy?.();activeViewer=null;stream?.getTracks().forEach(track=>track.stop());stream=null;document.querySelector('.camera-viewer')?.remove();document.body.classList.remove('camera-open');}
  function gestures(element){
    const pointers=new Map();let x=0,y=0,scale=1,rotation=0,startX=0,startY=0,startPointerX=0,startPointerY=0,startDistance=0,startAngle=0,startScale=1,startRotation=0;
    const draw=()=>{element.style.transform='translate(calc(-50% + '+x+'px),calc(-50% + '+y+'px)) rotate('+rotation+'deg) scale('+scale+')';};
    const points=()=>[...pointers.values()];
    const down=event=>{event.preventDefault();element.setPointerCapture?.(event.pointerId);pointers.set(event.pointerId,event);const p=points();if(p.length===1){startX=x;startY=y;startPointerX=event.clientX;startPointerY=event.clientY;}if(p.length===2){startDistance=Math.hypot(p[0].clientX-p[1].clientX,p[0].clientY-p[1].clientY);startAngle=Math.atan2(p[1].clientY-p[0].clientY,p[1].clientX-p[0].clientX)*180/Math.PI;startScale=scale;startRotation=rotation;}};
    const move=event=>{if(!pointers.has(event.pointerId))return;event.preventDefault();pointers.set(event.pointerId,event);const p=points();if(p.length===1){x=startX+event.clientX-startPointerX;y=startY+event.clientY-startPointerY;}else if(p.length===2){const angle=Math.atan2(p[1].clientY-p[0].clientY,p[1].clientX-p[0].clientX)*180/Math.PI;const distance=Math.hypot(p[0].clientX-p[1].clientX,p[0].clientY-p[1].clientY);scale=Math.max(.35,Math.min(3,startScale*distance/startDistance));rotation=startRotation+angle-startAngle;}draw();};
    const up=event=>pointers.delete(event.pointerId);
    element.addEventListener('pointerdown',down,{passive:false});element.addEventListener('pointermove',move,{passive:false});element.addEventListener('pointerup',up);element.addEventListener('pointercancel',up);
    return ()=>{element.removeEventListener('pointerdown',down);element.removeEventListener('pointermove',move);element.removeEventListener('pointerup',up);element.removeEventListener('pointercancel',up);};
  }
  function open(product){
    const caps=window.PLAAR.detect3DCapabilities();if(!caps.camera||!caps.secureContext){window.PLAThree.showCameraError(product);return;}stop();
    const modal=document.createElement('section');modal.className='camera-viewer';modal.innerHTML='<div class="camera-backdrop"><video autoplay playsinline muted aria-label="Cámara del dispositivo"></video><div class="camera-model" aria-label="Modelo 3D sobre la cámara"></div><div class="camera-status"><strong>Ver en mi mesa</strong><span>Arrastrá para mover · pellizcá para tamaño · dos dedos para rotar</span></div><div class="camera-actions"><button type="button" data-camera-rotate>↻ Rotar</button><button type="button" data-camera-minus>− Tamaño</button><button type="button" data-camera-plus>＋ Tamaño</button><button type="button" data-camera-center>✓ Centrar</button><button type="button" data-camera-close>× Cerrar</button></div></div>';
    document.body.appendChild(modal);document.body.classList.add('camera-open');const host=modal.querySelector('.camera-model');cleanupGestures=gestures(host);
    modal.querySelector('[data-camera-close]').addEventListener('click',stop);modal.querySelector('[data-camera-center]').addEventListener('click',()=>{host.style.transform='translate(-50%,-50%)';activeViewer?.reset();});
    modal.querySelector('[data-camera-plus]').addEventListener('click',()=>host.style.transform+=' scale(1.12)');modal.querySelector('[data-camera-minus]').addEventListener('click',()=>host.style.transform+=' scale(.9)');modal.querySelector('[data-camera-rotate]').addEventListener('click',()=>host.style.transform+=' rotate(15deg)');
    navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'},width:{ideal:1280},height:{ideal:720}},audio:false}).then(media=>{stream=media;modal.querySelector('video').srcObject=media;return window.PLAThree.mountCameraModel(host,product);}).then(viewer=>{activeViewer=viewer;}).catch(()=>{stop();window.PLAThree.showCameraError(product);});
    window.PLA.trackEvent('camera_view',{productId:product.id});
  }
  window.PLACamera={open,stop};
})();
