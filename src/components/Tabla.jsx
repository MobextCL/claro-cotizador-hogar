import React from "react";
import useCurrency from "../hooks/currency";
import "./Tabla.css";

const ofertaComercial = [
  { name: "Plan", field: "plan" },
  { name: "Tecnología de Acceso", field: "tecnologia_de_acceso" },
  {
    name: "Cargo Fijo Plan Oferta Conjunta",
    field: "cargo_fijo_plan_oferta_conjunta",
  },
  { name: "Precio Internet", field: "precio_internet" },
  { name: "Precio Televisión", field: "precio_television" },
  { name: "Precio Telefonía", field: "precio_telefonia" },
  {
    name: "Cargo Fijo Total sin Descuento",
    field: "cargo_fijo_total_sin_descuento",
  },
  { name: "Descuento Internet", field: "descuento_internet" },
  { name: "Descuento Televisión", field: "descuento_television" },
  { name: "Descuento Telefonía", field: "descuento_telefonia" },
  { name: "Costo de instalación", field: "costo_de_instalacion" },
];

const descripcionInternet = [
  { name: "Velocidad Bajada", field: "velocidad_bajada_mbps" },
  { name: "Velocidad Subida", field: "velocidad_subida_mbps" },
  {
    name: "Velocidad Bajada Promedio Nacional",
    field: "velocidad_bajada_promedio_nacional_mbps",
  },
  {
    name: "Velocidad Bajada Promedio Internacional",
    field: "velocidad_bajada_promedio_internacional_mbps",
  },
  {
    name: "Velocidad Subida Promedio Nacional",
    field: "velocidad_subida_promedio_nacional_mbps",
  },
  {
    name: "Velocidad Subida Promedio Internacional",
    field: "velocidad_subida_promedio_internacional_mbps",
  },
  {
    name: "Cuota de Navegación",
    field: "cuota_de_navegacion_gb",
  },
  { name: "Restricciones Internet", field: "restricciones_internet" },
];

const descripcionTelevision = [
  { name: "Canales HD", field: "canales_hd" },
  { name: "Canales SD", field: "canales_sd" },
  { name: "Canales Audio", field: "canales_audio" },
  { name: "Deco HD incluido", field: "deco_hd_incluido" },
  { name: "Valor Deco SD Adicional", field: "valor_deco_sd_adicional" },
  { name: "Valor Deco HD Adicional", field: "valor_deco_hd_adicional" },
  { name: "Link Canales", field: "link_canales" },
];

const descripcionTelefonia = [
  { name: "Minutos a Fijos", field: "minutos_a_fijos" },
  { name: "Minutos a Móviles", field: "minutos_a_moviles" },
  { name: "Máximo de destinos", field: "maximo_de_destinos" },
  { name: "SMS incluidos", field: "q_sms_incluidos" },
  { name: "Restricciones Telefonía", field: "restricciones_telefonia" },
  { name: "SVA", field: "sva" },
  { name: "Valor Minuto Adicional", field: "valor_del_min_adicional" },
  { name: "Valor SMS adicional", field: "valor_sms_adicional" },
  { name: "Bolsas", field: "bolsas" },
  { name: "Características Diferenciadoras", field: "otras_caracteristicas_diferenciadoras" },
];

const Tabla = ({ selectedPlans, title }) => {
  let campos = [];
  if (title === "Oferta Comercial") {
    campos = ofertaComercial;
  } else if (title === "Descripción Internet") {
    campos = descripcionInternet;
  } else if (title === "Descripción Televisión") {
    campos = descripcionTelevision;
  } else if (title === "Descripción Telefonía") {
    campos = descripcionTelefonia;
  }
  return (
    <div>
      <h3 className="secundary-title border-table-star">{title}</h3>
      <div className="tables">
        {selectedPlans.map(
          (plan, i) =>
            plan != undefined && (
              <div key={`${plan.id}-${i}`} className={i === 2 ? "table hide-mobile" : "table"}>
                {campos.map((item) => (
                  <div key={item.field}>
                    <div className="row-title">{item.name}</div>
                    <div className=" row-info">{plan[`${item.field}`] ? plan[`${item.field}`] : "No Aplica"}</div>
                  </div>
                ))}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Tabla;
