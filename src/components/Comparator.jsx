import React, { useEffect, useState } from "react";
import OfertaComercial from "./OfertaComercial";
import SelectPlan from "./SelectPlan";

const Comparator = () => {
  const [planes, setPlanes] = useState([]);
  const [combos, setCombos] = useState([1, 2, 4]);
  const [showPlans, setShowPlans] = useState([]);
  const [selectedPlans, setSelectedPlans] = useState([]);

  useEffect(() => {
    fetch("http://localhost:80/cotizador-hogar/planes.php")
      .then((response) => response.json())
      .then((data) => setPlanes(data));
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
        </div>
      </section>
      <OfertaComercial selectedPlans={selectedPlans}></OfertaComercial>
    </div>
  );
};

export default Comparator;
