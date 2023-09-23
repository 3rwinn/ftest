import { useFormikContext } from "formik";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function FormField({ label, name, type, caption, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  return (
    <div className="mb-4">
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
        <input
          onChange={(params) => setFieldValue(name, params.target.value)}
          onBlur={() => setFieldTouched(name)}
          id={name}
          value={values[name]}
          name={name}
          type={type}
          className={classNames(
            errors[name] && touched[name]
              ? "block w-full px-3 py-2 border border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              : "block w-full px-3 py-2 shadow-sm focus:ring-mde-gray focus:border-mde-gray sm:text-sm border border-gray-300 rounded-md"
          )}
          {...otherProps}
        />
        {/* {errors[name] && touched[name] && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )} */}
      </div>
      {errors[name] && touched[name] && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errors[name]}
        </p>
      )}
      {caption && (
        <p className="mt-2 text-sm text-gray-500" id="email-description">
          {caption}
        </p>
      )}
    </div>
  );
}

export default FormField;
