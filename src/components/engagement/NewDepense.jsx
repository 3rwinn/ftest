import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormDatePicker,
  FormField,
  FormSelectWithAction,
  FormUpload,
  SubmitButton,
} from "../forms";
import * as Yup from "yup";
import { createDepense } from "../../features/engagement/engagementSlice";
import { useAppContext } from "../../context/AppState";
import dayjs from "dayjs";
import { formatDataToSelect, formatLocaleEn } from "../../utils/helpers";
import { getMissions } from "../../features/settings/settingsSlice";
import NewMission from "../settings/NewMission";

const validationSchema = Yup.object().shape({
  libelle: Yup.string().required("Ce champ est requis."),
  montant: Yup.string().required("Ce champ est requis."),
  date: Yup.string().required("Ce champ est requis."),
});

function NewDepense() {
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
      libelle: values.libelle,
      montant: values.montant,
      date: formatLocaleEn(values.date),
      facture: values.facture,
    };
    dispatch(createDepense(depenseData))
      .unwrap()
      .then(() => {
        switchSlideOver(false);
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "La dépense a bien été créé.",
        });
        switchNotification(true);
      })
      .catch((error) => {
        console.log("error", error);
        setNotificationContent({
          type: "error",
          title: "Erreur",
          description:
            "Erreur lors de l'ajout de la dépense merci de ré-essayer plus tard.",
        });
        switchNotification(true);
      });
  };

  return (
    <div className="p-4">
      <Form
        initialValues={{
          libelle: "",
          montant: null,
          date: new Date(),
          facture: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormField
          name={"libelle"}
          type={"text"}
          label={"Libellé de la dépense"}
        />
        <FormField name={"montant"} type={"number"} label={"Montant"} />

        <FormDatePicker name={"date"} libelle={"Date"} />

        <FormUpload
          name={"facture"}
          label={"Fichier"}
          type="Fichier en .pdf autorisé"
          accept=".pdf,"
        />

        <SubmitButton loading={isLoading}>Ajouter</SubmitButton>
      </Form>
    </div>
  );
}

export default NewDepense;
