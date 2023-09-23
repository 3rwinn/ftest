import React from "react";
import { useFormikContext } from "formik";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Textarea({ label, name, caption, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-mde-gray">
        {label}
      </label>
      <div
        className={classNames(
          errors[name] && touched[name]
            ? "mt-1"
            : "mt-1 relative rounded-md shadow-sm"
        )}
      >
        <textarea
          rows={4}
          onChange={(params) => setFieldValue(name, params.target.value)}
          onBlur={() => setFieldTouched(name)}
          value={values[name]}
          name={name}
          className={classNames(
            errors[name] && touched[name]
              ? "block w-full border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              : "shadow-sm focus:ring-mde-gray focus:border-mde-gray mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          )}
          {...otherProps}
        />
        {errors[name] && touched[name] && (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {errors[name]}
          </p>
        )}
      </div>
    </>
  );
}

export default Textarea;
