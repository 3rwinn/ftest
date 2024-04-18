import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormField,
  FormSelect,
  FormSelectWithAction,
  FormDatePicker,
  SubmitButton,
  FormUpload,
} from "../forms";
import * as Yup from "yup";
import {
  getEntrees as getTypeEntress,
  getMissions,
} from "../../features/settings/settingsSlice";
import NewMission from "../settings/NewMission";
import { formatDataToSelect, formatLocaleEn } from "../../utils/helpers";
import NewEntree from "../settings/NewEntree";
import { useAppContext } from "../../context/AppState";
import { addCaisseEntree } from "../../features/finance/financeSlice";

const validationSchema = Yup.object().shape({
  mission: Yup.mixed().required("Ce champ est requis."),
  montant: Yup.number().required("Ce champ est requis."),
  type_entree: Yup.mixed().required("Ce champ est requis."),
  commentaire: Yup.string(),
  date: Yup.date().required("Ce champ est requis."),
  auteur: Yup.mixed().required("Ce champ est requis."),
});

function NewEntreeCaisse() {
  const dispatch = useDispatch();
  const { missions, entrees } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.auth);

  console.log("USR", user);

  const {
    switchSlideOver,
    setNotificationContent,
    switchNotification,
    switchModal,
  } = useAppContext();

  React.useEffect(() => {
    dispatch(getMissions());
    dispatch(getTypeEntress());
  }, []);

  const handleQuickAddMission = () => {
    switchModal(true, {
      type: "success",
      title: "Nouvelle mission",
      description: <NewMission />,
      noConfirm: true,
    });
  };

  const handleQuickAddTypeEntree = () => {
    switchModal(true, {
      type: "success",
      title: "Nouveau type d'entrée",
      description: <NewEntree />,
      noConfirm: true,
    });
  };

  const handleSubmit = (values) => {
    const entreeData = {
      mission: values.mission,
      montant: values.montant,
      type_entree: values.type_entree,
      commentaire: values.commentaire,
      date: formatLocaleEn(values.date),
      auteur: values.auteur,
      facture: values.facture
    };
    dispatch(addCaisseEntree(entreeData))
      .unwrap()
      .then(() => {
        switchSlideOver(false);
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "L'entrée en caisse a bien été créé.",
        });
        switchNotification(true);
      })
      .catch((error) => {
        console.log("ERR", error);
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
          mission: user?.mission?.id === 0 ? null : user?.mission?.id,
          montant: "",
          type_entree: null,
          commentaire: "",
          date: new Date(),
          auteur: user?.user?.id,
          facture: null,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormDatePicker name={"date"} label={"Date"} />

        {user?.mission?.id === 0 && (
          <FormSelectWithAction
            name={"mission"}
            label={"Mission"}
            datas={formatDataToSelect(missions)}
            actionEvent={handleQuickAddMission}
          />
        )}

        <FormSelectWithAction
          name={"type_entree"}
          label={"Type d'entrée"}
          datas={formatDataToSelect(entrees)}
          actionEvent={handleQuickAddTypeEntree}
        />

        <FormField name={"montant"} type={"number"} label={"Montant"} />
        <FormField name={"commentaire"} label={"Commentaire"} />
        <FormUpload
          name={"facture"}
          label="Fichier"
          type="Fichier en .pdf autorisé"
          accept=".pdf,"
        />

        <SubmitButton>Ajouter</SubmitButton>
      </Form>
    </div>
  );
}

export default NewEntreeCaisse;
