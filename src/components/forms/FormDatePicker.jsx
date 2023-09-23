import React from "react";
import { useFormikContext } from "formik";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";
registerLocale("fr", fr);

function FormDatePicker({ label, name, mode = "default", showTime = false, minDate = new Date() }) {
  const { setFieldValue, errors, touched, values } = useFormikContext();

  const handleValueChange = (newValue) => {
    setFieldValue(name, newValue);
  };

  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
      type="text"
      value={value}
      className="border px-3 py-2 shadow-sm focus:ring-mde-gray focus:border-mde-gray block w-full sm:text-sm border-gray-300 rounded-md"
      onClick={onClick}
      ref={ref}
    />
  ));

  return (
    <>
      <div className="mb-4">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-mde-gray"
        >
          {label}
        </label>
        <div className="mt-1">
          {mode === "year" ? (
            <DatePicker
              dateFormat="yyyy"
              // minDate={minDate}
              selected={values[name]}
              onChange={handleValueChange}
              locale="fr"
              showYearPicker
              customInput={<ExampleCustomInput />}
            />
          ) : (
            <DatePicker
              dateFormat="P"
              // minDate={minDate}
              selected={values[name]}
              onChange={handleValueChange}
              locale="fr"
              // timeFormat="p"
              // showTimeSelect={showTime}
              customInput={<ExampleCustomInput />}
            />
          )}
        </div>
        {errors[name] && touched[name] && (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {errors[name]}
          </p>
        )}
      </div>
    </>
  );
}

export default FormDatePicker;
