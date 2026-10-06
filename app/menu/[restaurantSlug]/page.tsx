import Link from "next/link";
import { MenuExperience } from "@/components/MenuExperience";
import { demoRestaurant } from "@/lib/demo-data";
export const metadata={title:"La Nonna — Menú"};
export default async function MenuPage({params}:{params:Promise<{restaurantSlug:string}>}){const {restaurantSlug}=await params;if(restaurantSlug!==demoRestaurant.slug)return <main className="container" style={{padding:"12vh 0"}}><h1 className="serif">Menú no encontrado</h1><Link className="view-link" href="/">Volver a PLATO</Link></main>;return <main className="container"><header className="topbar"><Link className="wordmark" href="/">PLATO</Link><span className="pill">{demoRestaurant.logo} &nbsp; {demoRestaurant.name}</span></header><MenuExperience/><footer className="footer">{demoRestaurant.name} · {demoRestaurant.address}<br/>Menú creado con PLATO</footer></main>}
