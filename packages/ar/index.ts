export type ARConfig = { modelUrl:string; name:string; scale?:string };
export function detectARSupport(){ if(typeof window === "undefined") return false; return "xr" in navigator || /Android|iPhone|iPad/i.test(navigator.userAgent); }
export const arSupportMessage = "AR depende del navegador, el dispositivo y de que el producto tenga un modelo 3D publicado.";
