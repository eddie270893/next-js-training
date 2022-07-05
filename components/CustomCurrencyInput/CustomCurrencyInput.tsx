import React from "react";
import CurrencyInput from "react-currency-input-field";

const CustomCurrencyInput = (props: any) => {
  console.log('props.value', props.value);
  return (
    <CurrencyInput
      className={props.className}
      id="input-example"
      prefix="$"
      name={props.name}
      placeholder="Product price"
      defaultValue={props.value}
      decimalsLimit={2}
      onValueChange={(value, name) => props.onChange(name, value)}
    />
  );
};

export default CustomCurrencyInput;
