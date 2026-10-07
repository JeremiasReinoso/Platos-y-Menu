(function(){
  function detect(){
    const canvas=document.createElement('canvas');
    const gl=canvas.getContext('webgl2')||canvas.getContext('webgl');
    return {
      webgl:!!gl,
      camera:!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia),
      secureContext:window.isSecureContext===true,
      webxr:!!(navigator.xr&&navigator.xr.isSessionSupported),
      touch:'ontouchstart' in window||navigator.maxTouchPoints>0,
      orientation:'orientation' in screen
    };
  }
  async function supportsAR(){try{return!!(navigator.xr&&await navigator.xr.isSessionSupported('immersive-ar'));}catch(_){return false;}}
  window.PLACapabilities={detect,supportsAR};
})();
