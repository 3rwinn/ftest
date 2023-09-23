import React from "react";
import { useFormikContext } from "formik";
import { getAllText } from "../../utils/helpers";

function Error({ name }) {
  const { errors, touched } = useFormikContext();
  return (
    <div className="mb-2">
      {errors[name] && touched[name] && (
        <p className="mt-2 mb-2 text-sm text-red-600" id="email-error">
          {getAllText(errors[name])}
        </p>
      )}
    </div>
  );
}

export default Error;
