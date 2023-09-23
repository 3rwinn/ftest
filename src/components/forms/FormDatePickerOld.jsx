import React from "react";
import { useFormikContext } from "formik";
import Datepicker from "react-tailwindcss-datepicker";

function FormDatePickerOld({ label, name }) {
  const { setFieldValue,  values } = useFormikContext();

  const handleValueChange = (newValue) => {
    setFieldValue(name, newValue);
  };
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-mde-gray">
        {label}
      </label>
      <Datepicker
        useRange={false}
        asSingle={true}
        value={values[name]}
        onChange={handleValueChange}
        primaryColor={"blue"} 
        // inputClassName="bg-red"
        // containerClassName={"bg-red"}
        // inputClassName="shadow-sm focus:ring-mde-gray focus:border-mde-gray block w-full sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  );
}

export default FormDatePickerOld;
