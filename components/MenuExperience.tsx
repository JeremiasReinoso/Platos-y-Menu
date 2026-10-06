"use client";
import Link from "next/link";
import { useState } from "react";
import { demoProducts, demoRestaurant, formatPrice } from "@/lib/demo-data";

export function MenuExperience(){
  const [category,setCategory]=useState("Todos");
  const products=category==="Todos"?demoProducts:demoProducts.filter(p=>p.category===category);
  return <>
    <div className="hero"><div><div className="eyebrow">Cocina italiana · desde 1987</div><h1 className="serif">Una mesa llena de historias.</h1><p>{demoRestaurant.description}</p></div></div>
    <main className="menu-wrap"><div className="category-nav" aria-label="Categorías del menú">{["Todos",...demoRestaurant.categories].map(item=><button className={`category-button ${category===item?"active":""}`} onClick={()=>setCategory(item)} key={item}>{item}</button>)}</div>
      <div className="section-heading"><h2 className="serif">El menú</h2><span>{products.length} opciones para elegir sin apuro</span></div>
      <div className="product-grid">{products.map(product=><article className="product-card" key={product.slug}><Link href={`/menu/${demoRestaurant.slug}/product/${product.slug}`}><div className="product-image" style={{backgroundImage:`url(${product.image})`}}><div className="badges">{product.has3d&&<span className="badge">3D</span>}{product.arEnabled&&<span className="badge">AR</span>}</div></div><div className="product-info"><h3>{product.name}</h3><p>{product.description}</p><div className="product-meta"><span className="price">{formatPrice(product.price)}</span><span className="view-link">Ver plato →</span></div></div></Link></article>)}</div>
    </main>
  </>;
}
