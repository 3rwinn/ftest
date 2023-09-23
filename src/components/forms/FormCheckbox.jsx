import React from "react";
import { useFormikContext } from "formik";
import FormCheckBoxSingle from "./FormCheckBoxSingle";
import { getAllText } from "../../utils/helpers";

function FormCheckbox({ label, name, choices = [], mode = "multi" }) {
  const { setFieldValue, values, errors, touched } = useFormikContext();

  const handleChoiceSelection = (e, value) => {
    const list = [...values[name]];
    const elementIsChecked = e.target.checked;
    const elementValue = value;

    let elementAlreadyExist = list.findIndex((el) => el.value === elementValue);
    if (elementAlreadyExist === -1) {
      list.push({ value: elementValue, checked: elementIsChecked });
    } else {
      list[elementAlreadyExist] = {
        value: elementValue,
        checked: elementIsChecked,
      };
    }

    setFieldValue(name, list);
  };

  const findObjectWithValue = (number, objects) => {
    if (objects?.length > 0) {
      for (let i = 0; i < objects?.length; i++) {
        if (objects[i].value === number) {
          return true;
        }
      }
    }
    return false;
  };

  if (choices.length === 0) {
    return (
      <div className="p-4 flex justify-center items-center">
        <p className="font-bold text-mde-gray">Aucun choix disponible</p>
      </div>
    );
  }
  return (
    <>
    {errors[name] && touched[name] && (
        <p className="mt-2 mb-2 text-sm text-red-600" id="email-error">
          {getAllText(errors[name])}
        </p>
      )}
      <fieldset className="space-y-2">
        <legend className="sr-only">{label}</legend>
        {mode === "multi"
          ? choices.map((choix, index) => (
              <div key={index} className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={`${name}_choix_${index}`}
                    aria-describedby={`${name}_choix_${index}_description`}
                    name={`${name}_choix_${index}`}
                    onChange={(e) => handleChoiceSelection(e, choix.id)}
                    type="checkbox"
                    className="focus:ring-mde-red h-4 w-4 text-mde-red-700 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor={`${name}_choix_${index}`}
                    className="font-medium text-gray-700"
                  >
                    {choix.libelle}
                  </label>
                  {choix.sub?.map((s, indexS) => (
                    <p
                      key={indexS}
                      id={`${index}-description`}
                      className="text-gray-500"
                    >
                      {s.libelle ? s.libelle : s.text}
                    </p>
                  ))}
                </div>
              </div>
            ))
          : choices.map((choix, index) => (
              <div key={index} className="relative flex items-start">
                <div className="flex items-center h-5">
                  <FormCheckBoxSingle
                    el_id={choix.id}
                    name={name}
                    index={index}
                    sideEvent={handleChoiceSelection}
                    previousChecking={findObjectWithValue(
                      choix.id,
                      values[name]
                    )}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor={`${name}_choix_${index}`}
                    className="font-bold text-gray-700"
                  >
                    {choix.libelle
                      ? choix.libelle
                      : choix.text
                      ? choix.text
                      : choix.nom_complet}
                  </label>
                  {/* <span id="comments-description" className="text-gray-500">
                    <span className="sr-only">New comments </span>so you always
                    know what's happening.
                  </span> */}
                </div>
              </div>
            ))}
      </fieldset>
    </>
  );
}

export default FormCheckbox;
