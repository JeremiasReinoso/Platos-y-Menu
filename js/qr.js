(function () {
  window.PLAQR = {
    url(restaurant) {
      return new URL('menu.html?restaurant=' + encodeURIComponent(restaurant.slug), location.href).href;
    },
    render(canvas, url) {
      return new Promise(resolve => {
        const draw = () => {
          if (!window.QRious) { canvas.textContent = 'No se pudo cargar el generador QR. Copiá la URL para generarlo con otra herramienta.'; resolve(canvas); return; }
          new window.QRious({element: canvas, value: url, size: 180, level: 'H'});
          resolve(canvas);
        };
        if (window.QRious) { draw(); return; }
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/qrious@4.0.2/dist/qrious.min.js';
        script.onload = draw;
        script.onerror = draw;
        document.head.appendChild(script);
      });
    }
  };
})();
