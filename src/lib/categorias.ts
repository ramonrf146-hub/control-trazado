import type { Categoria } from "./tipos";

/**
 * Lista fija de categorías del sitio. Cambiar aquí se propaga a filtros,
 * páginas de categoría y navegación.
 */
export const CATEGORIAS: Categoria[] = [
  {
    slug: "automatizacion-hogar-inteligente",
    nombre: "Automatización y Hogar Inteligente",
    descripcion: "Enchufes, relés y controladores WiFi para automatizar tu casa o un proyecto DIY — Tuya, Matter, ESP32, Node-RED.",
  },
  {
    slug: "control-industrial-b2b",
    nombre: "Control Industrial B2B",
    descripcion: "Variadores de frecuencia, gateways RS485/Modbus y hardware de control para talleres, plantas y proyectos de automatización industrial.",
  },
];

export function getCategoriaPorSlug(slug: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.slug === slug);
}
