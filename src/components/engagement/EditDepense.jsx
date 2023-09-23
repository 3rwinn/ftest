import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormDatePicker,
  FormField,
  FormSelectWithAction,
  SubmitButton,
} from "../forms";
import * as Yup from "yup";
import { editDepense } from "../../features/engagement/engagementSlice";
import { useAppContext } from "../../context/AppState";
import { formatDataToSelect, formatLocaleEn } from "../../utils/helpers";
import dayjs from "dayjs";
import NewMission from "../settings/NewMission";
import { getMissions } from "../../features/settings/settingsSlice";

const validationSchema = Yup.object().shape({
  libelle: Yup.string().required("Ce champ est requis."),
});

function EditDepense({ depenseId, currentDepense }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.engagement);
  const {
    switchSlideOver,
    setNotificationContent,
    switchNotification,
    // switchModal,
  } = useAppContext();

  React.useEffect(() => {
    dispatch(getMissions());
  }, []);

  const handleSubmit = (values) => {
    const depenseData = {
      id: depenseId,
      datas: {
        libelle: values.libelle,
        montant: values.montant,
        date: formatLocaleEn(values.date),
      },
    };
    dispatch(editDepense(depenseData))
      .unwrap()
      .then(() => {
        switchSlideOver(false);
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "La dépense a bien été modifiée.",
        });
        switchNotification(true);
      })
      .catch((error) => {
        setNotificationContent({
          type: "error",
          title: "Erreur",
          description: error,
        });
        switchNotification(true);
      });
  };

  return (
    <div className="p-4">
      <Form
        initialValues={{
          libelle: currentDepense?.libelle,
          montant: currentDepense?.montant,
          date: dayjs(currentDepense?.date).toDate(),
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormField
          name={"libelle"}
          type={"text"}
          label={"Libellé de la depense"}
        />

        <FormField name={"montant"} type={"text"} label={"Montant"} />

        <FormDatePicker name={"date"} libelle={"Date"} />

        <SubmitButton loading={isLoading}>Enregistrer</SubmitButton>
      </Form>
    </div>
  );
}

export default EditDepense;
