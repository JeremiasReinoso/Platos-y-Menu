"use client";
import { useState } from "react";

type Props={modelUrl?:string; productName:string; imageUrl:string; arEnabled?:boolean};
export function ProductViewer3D({modelUrl,productName,imageUrl,arEnabled=false}:Props){
  const [error,setError]=useState(false);
  if(!modelUrl || error) return <div className="viewer"><div className="viewer-content"><div className="plate-art" aria-hidden="true">🍝</div><strong>{error?"No pudimos cargar el modelo 3D.":"Modelo 3D próximamente"}</strong><span className="viewer-label">{error?"Podés continuar viendo la foto del plato.":"Este producto todavía no tiene un modelo 3D publicado."}</span>{error&&<button className="button ghost" style={{marginTop:16}} onClick={()=>setError(false)}>Reintentar</button>}</div></div>;
  return <div className="viewer"><model-viewer src={modelUrl} alt={`Modelo 3D de ${productName}`} camera-controls auto-rotate ar={arEnabled?'':undefined} style={{width:'100%',height:'100%'}} onError={()=>setError(true)} /></div>;
}
