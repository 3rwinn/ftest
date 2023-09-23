import React from "react";
import { useFormikContext } from "formik";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

function FormUpload({
  label,
  name,
  type = "PNG, JPG, GIF jusqu'a 10MB autorisé",
  accept = "image/png, image/jpeg",
}) {
  const { setFieldValue, setFieldTouched, errors, touched, values } =
    useFormikContext();

  return (
    <div className="mb-4">
      <div className="mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <div className="w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-ctam-primary hover:text-ctamp-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-mde-gray"
            >
              <span>Charger un fichier</span>

              <input
                onChange={(params) =>
                  setFieldValue(name, params.target.files[0])
                }
                onBlur={() => setFieldTouched(name)}
                id="file-upload"
                name={name}
                type="file"
                className="sr-only"
                accept={accept}
              />
            </label>
            <p className="pl-1">ou glisser & deposer</p>
          </div>
          <p className="text-xs text-gray-500">{type}</p>
          {values[name] != null && (
            <p className="text-xs text-green-500 font-bold">
              Fichier chargé: {values[name]?.name}
            </p>
          )}
        </div>
      </div>
      {errors[name] && touched[name] && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ExclamationCircleIcon
            className="h-5 w-5 text-red-500"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}

export default FormUpload;
