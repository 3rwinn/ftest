import React from "react";
import H4 from "../common/H4";
import { FormRadio } from ".";

function FormRadioHorizontal({ element, index }) {
  return (
    <div className="mb-10" key={index}>
      <div className="flex items-center gap-4 after:h-px after:flex-1 after:bg-mde-red  after:content-['']">
        <H4 color="text-mde-red">{element.title}</H4>
      </div>
      {element?.modules?.map((module, indexB) => (
        <div key={indexB} className="inline-block min-w-full py-0 align-middle">
          <div className="mt-4">
            <h4 className="font-bold text-sm text-mde-red">{module.title}</h4>
            {module?.subModules?.map((subModule, indexB) => (
              <FormRadio
                id={subModule.id}
                key={indexB}
                label={subModule.title}
                name={`submodule-${subModule.id}`} // NOTES: utiliser le submodule-id pour recupérer les valeurs au niveau du backend
                // name="radio-test"
                choices={subModule.choix}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FormRadioHorizontal;
