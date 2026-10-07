(function(){
  window.ProductViewer3D={
    capabilities:()=>window.PLAAR.detect3DCapabilities(),
    standard:(container,product)=>window.PLAThree.render(container,product),
    camera:product=>window.PLACamera.open(product),
    webXR:()=>window.PLAAR.isWebXRAvailable()
  };
})();
