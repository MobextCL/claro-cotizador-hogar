import React, { useEffect, useState } from "react";
import Tabla from "./Tabla";
import SelectPlan from "./SelectPlan";

const Comparator = () => {
  const [planes, setPlanes] = useState([]);
  const [combos, setCombos] = useState([1, 2, 4]);
  const [showPlans, setShowPlans] = useState([]);
  const [selectedPlans, setSelectedPlans] = useState([]);

  useEffect(() => {
    fetch("https://digital.clarochile.cl/wcm-inyect/cotizador-hogar/planes.php")
      .then((response) => response.json())
      .then((data) => {
        const toMoney = (number) => {
          return "$ " + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        };
        const planes = data.map((plan) => {
          // FOrmateo como precio los valores de la primera tabla
          plan.precio_internet =
            plan.precio_internet && toMoney(plan.precio_internet);
          plan.precio_television =
            plan.precio_television && toMoney(plan.precio_television);
          plan.cargo_fijo_total_sin_descuento =
            plan.cargo_fijo_total_sin_descuento &&
            toMoney(plan.cargo_fijo_total_sin_descuento);
          plan.precio_telefonia =
            plan.precio_telefonia && toMoney(plan.precio_telefonia);
          plan.descuento_internet =
            plan.descuento_internet && toMoney(plan.descuento_internet);
          plan.descuento_television =
            plan.descuento_television && toMoney(plan.descuento_television);
          plan.descuento_telefonia =
            plan.descuento_telefonia && toMoney(plan.descuento_telefonia);
          plan.cargo_fijo_plan_oferta_conjunta =
            plan.cargo_fijo_plan_oferta_conjunta &&
            toMoney(plan.cargo_fijo_plan_oferta_conjunta);
          plan.text_instalacion = (
            <p style={{ fontSize: "0.8em", paddingTop: "0px" }}>
              *Valor máximo $40.000.
              <br />
              El valor exacto se informará previa a la suscripción del
              respectivo contrato y dependerá de la ubicación geográfica y
              características del lugar de la instalación.
            </p>
          );

          // Agrego sufijo a velocidades y cuota
          plan.velocidad_bajada_mbps =
            plan.velocidad_bajada_mbps &&
            `${plan.velocidad_bajada_mbps.toLocaleString()} Mbps`;
          plan.velocidad_subida_mbps =
            plan.velocidad_subida_mbps &&
            `${plan.velocidad_subida_mbps.toLocaleString()} Mbps`;
          plan.velocidad_bajada_promedio_nacional_mbps =
            plan.velocidad_bajada_promedio_nacional_mbps &&
            `${plan.velocidad_bajada_promedio_nacional_mbps.toLocaleString()} Mbps`;
          plan.velocidad_bajada_promedio_internacional_mbps =
            plan.velocidad_bajada_promedio_internacional_mbps &&
            `${plan.velocidad_bajada_promedio_internacional_mbps.toLocaleString()} Mbps`;
          plan.velocidad_subida_promedio_nacional_mbps =
            plan.velocidad_subida_promedio_nacional_mbps &&
            `${plan.velocidad_subida_promedio_nacional_mbps.toLocaleString()} Mbps`;
          plan.velocidad_subida_promedio_internacional_mbps =
            plan.velocidad_subida_promedio_internacional_mbps &&
            `${plan.velocidad_subida_promedio_internacional_mbps.toLocaleString()} Mbps`;
          plan.cuota_de_navegacion_gb =
            (plan.cuota_de_navegacion_gb != null) &
            !isNaN(plan.cuota_de_navegacion_gb)
              ? `${plan.cuota_de_navegacion_gb} GB`
              : plan.cuota_de_navegacion_gb;

          // formatea link de canales
          plan.link_canales = plan.link_canales != "-" && (
            <a
              className="link-plan"
              href="https://www.clarochile.cl/personas/servicios/servicios-hogar/television/guia-de-programacion/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ver aquí
            </a>
          );
          plan.sva = !plan.sva ? (
            <span>
              No Aplica <br />
              <br />
              <br />
            </span>
          ) : (
            plan.sva
          );
          plan.restricciones_telefonia = !plan.restricciones_telefonia ? (
            <span>
              No Aplica <br />
              <br />
            </span>
          ) : (
            plan.restricciones_telefonia
          );
          plan.bolsas = !plan.bolsas ? (
            <span>
              No Aplica <br />
              <br />
              <br />
            </span>
          ) : (
            plan.bolsas
          );

          return plan;
        });
        setPlanes(planes);
      });
  }, []);
  useEffect(() => {
    let selectArr = [];
    combos.map((val) => {
      selectArr.push(
        planes.filter((plan) => {
          return plan.type == val;
        })
      );
    });
    setShowPlans(selectArr);
  }, [combos, planes]);

  useEffect(() => {
    onPlanChange();
  }, [showPlans]);

  const onComboChange = (e) => {
    let newCombos = [];
    newCombos = [...document.querySelectorAll(".combos")].map((plan) => {
      return parseInt(plan.value);
    });
    setCombos(newCombos);
  };

  const onPlanChange = () => {
    let newPlans = [];
    newPlans = [...document.querySelectorAll(".planes")].map((plan) => {
      return parseInt(plan.value);
    });
    newPlans.map((id) => planes.find((plan) => plan.id === id));
    setSelectedPlans(
      newPlans.map((id) => planes.find((plan) => plan.id === id))
    );
  };

  return (
    <div>
      <section className="comparator-container">
        <div className="comparator-wrapper">
          <h1 className="principal-title">
            Compara los planes Servicios Hogar de Claro
          </h1>
          <h3 className="principal-subtitle">Conoce las diferencias</h3>
          <div className="container-comparator-select">
            <div className="container-select">
              {combos.map((val, i) => (
                <SelectPlan
                  key={`combos${i + 1}`}
                  id={`combos${i + 1}`}
                  type="combos"
                  value={val}
                  addclass={i === 2 ? "hide-mobile" : ""}
                  onComboChange={onComboChange}
                ></SelectPlan>
              ))}
            </div>
            <div className="container-select">
              {showPlans.map((planes, i) => (
                <SelectPlan
                  key={`planes${i + 1}`}
                  id={`planes${i + 1}`}
                  type="planes"
                  onPlanChange={onPlanChange}
                  planes={planes}
                  value={planes.length > 0 && planes[0].id}
                  addclass={i === 2 ? "hide-mobile" : ""}
                ></SelectPlan>
              ))}
            </div>
          </div>
          <Tabla selectedPlans={selectedPlans} title="Oferta Comercial"></Tabla>
          <Tabla
            selectedPlans={selectedPlans}
            title="Descripción Internet"
          ></Tabla>
          <Tabla
            selectedPlans={selectedPlans}
            title="Descripción Televisión"
          ></Tabla>
          <Tabla
            selectedPlans={selectedPlans}
            title="Descripción Telefonía"
          ></Tabla>
        </div>
      </section>
    </div>
  );
};

export default Comparator;
