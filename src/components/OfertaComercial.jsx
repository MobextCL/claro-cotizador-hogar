import React from "react";
import useCurrency from "../hooks/currency";
import "./OfertaComercial.css";

const OfertaComercial = ({ selectedPlans }) => {
  return (
    <div>
      <h3 className="secundary-title border-table-star">Oferta Comercial</h3>
      <div className="tables">
        {selectedPlans.map(
          (plan, i) =>
            plan != undefined && (
              <div
                key={`${plan.id}-${i}`}
                className={i === 2 ? "table hide-mobile" : "table"}
              >
                <div className="row-title">Plan</div>
                <div className=" row-info">{plan.plan}</div>
                <div className="row-title">Tecnología de Acceso</div>
                <div className=" row-info">{plan.tecnologia_de_acceso}</div>
                <div className="row-title">Cargo Fijo Plan Oferta Conjunta</div>
                <div className=" row-info">
                  {useCurrency(parseInt(plan.cargo_fijo_plan_oferta_conjunta))}
                </div>
                <div className="row-title">Precio Internet</div>
                <div className=" row-info">
                  {useCurrency(parseInt(plan.precio_internet))}
                </div>
                <div className="row-title">Precio Televisión</div>
                <div className=" row-info">
                  {useCurrency(parseInt(plan.precio_television))}
                </div>
                <div className="row-title">Precio Telefonía</div>
                <div className=" row-info">
                  {useCurrency(parseInt(plan.precio_telefonia))}
                </div>
                <div className="row-title">Cargo Fijo Total sin Descuento</div>
                <div className=" row-info">
                  {useCurrency(parseInt(plan.cargo_fijo_total_sin_descuento))}
                </div>
                <div className="row-title">Descuento Internet</div>
                <div className=" row-info">
                  {useCurrency(parseInt(plan.descuento_internet))}
                </div>
                <div className="row-title">Descuento Televisión</div>
                <div className=" row-info">
                  {useCurrency(parseInt(plan.descuento_television))}
                </div>
                <div className="row-title">Descuento Telefonía</div>
                <div className=" row-info">
                  {useCurrency(parseInt(plan.descuento_telefonia))}
                </div>
                <div className="row-title">Costo de instalación</div>
                <div className=" row-info">{plan.costo_de_instalacion}</div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default OfertaComercial;
