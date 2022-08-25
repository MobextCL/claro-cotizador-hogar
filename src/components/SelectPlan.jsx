import React from "react";

const SelectPlan = ({
  id,
  addclass,
  type,
  value,
  onComboChange,
  planes,
  onPlanChange,
}) => {
  const combos = [
    { value: 1, name: "Telefonía fija" },
    { value: 2, name: "Televisión" },
    { value: 4, name: "Internet" },
    { value: 3, name: "TV + Telefonía" },
    { value: 6, name: "TV + Internet" },
    { value: 5, name: "Telefonía + Internet" },
    { value: 7, name: "TV + Telefonía + Internet" },
  ];

  return (
    <div className={addclass ? `wrapper-select ${addclass}` : "wrapper-select"}>
      <select
        className={`select-plan ${type}`}
        name={id}
        id={id}
        onChange={onComboChange ? onComboChange : onPlanChange}
        defaultValue={type === "combos" ? value : false}
      >
        {type === "combos"
          ? combos.map((option) => (
              <option
                key={option.value}
                value={option.value}
                // selected={option.value === value ? true : false}
              >
                {option.name}
              </option>
            ))
          : planes.map((plan, i) => (
              <option key={plan.id} value={plan.id}>
                {plan.plan}
              </option>
            ))}
        {}
      </select>
    </div>
  );
};

export default SelectPlan;
