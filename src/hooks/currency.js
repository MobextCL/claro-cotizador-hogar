import { useEffect, useState } from "react";

const useCurrency = (number) => {
  const [currency, setCurrency] = useState("");
  useEffect(() => {
    const numberToCurrency = number
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setCurrency(numberToCurrency);
  }, [number]);
  return `$ ${currency}`;
};

export default useCurrency;
