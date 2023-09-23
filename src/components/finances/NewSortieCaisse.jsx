import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormField,
  FormSelectWithAction,
  FormDatePicker,
  SubmitButton,
  FormUpload,
} from "../forms";
import * as Yup from "yup";
import {
  getSorties as getTypeSorties,
  getMissions,
} from "../../features/settings/settingsSlice";
import NewMission from "../settings/NewMission";
import { formatDataToSelect, formatLocaleEn } from "../../utils/helpers";
import { useAppContext } from "../../context/AppState";
import { addCaisseSortie } from "../../features/finance/financeSlice";
import NewSortie from "../settings/NewSortie";

const validationSchema = Yup.object().shape({
  mission: Yup.mixed().required("Ce champ est requis."),
  montant: Yup.number().required("Ce champ est requis."),
  type_sortie: Yup.mixed().required("Ce champ est requis."),
  commentaire: Yup.string(),
  date: Yup.date().required("Ce champ est requis."),
  auteur: Yup.mixed().required("Ce champ est requis."),
});

function NewSortieCaisse() {
  const dispatch = useDispatch();
  const { missions, sorties } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.auth);

  const {
    switchSlideOver,
    setNotificationContent,
    switchNotification,
    switchModal,
  } = useAppContext();

  React.useEffect(() => {
    dispatch(getMissions());
    dispatch(getTypeSorties());
  }, []);

  const handleQuickAddMission = () => {
    switchModal(true, {
      type: "success",
      title: "Nouvelle mission",
      description: <NewMission />,
      noConfirm: true,
    });
  };

  const handleQuickAddTypeSortie = () => {
    switchModal(true, {
      type: "success",
      title: "Nouveau type de sortie",
      description: <NewSortie />,
      noConfirm: true,
    });
  };

  const handleSubmit = (values) => {
    const sortieData = {
      mission: values.mission,
      montant: values.montant,
      type_sortie: values.type_sortie,
      commentaire: values.commentaire,
      date: formatLocaleEn(values.date),
      auteur: values.auteur,
      facture: values.facture
    };
    dispatch(addCaisseSortie(sortieData))
      .unwrap()
      .then(() => {
        switchSlideOver(false);
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "La sortie de caisse a bien été créée.",
        });
        switchNotification(true);
      })
      .catch((error) => {
        console.log("error", error)
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
          type_sortie: null,
          commentaire: "",
          date: new Date(),
          auteur: user?.user?.id,
          facture: null
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
          name={"type_sortie"}
          label={"Type de sortie"}
          datas={formatDataToSelect(sorties)}
          actionEvent={handleQuickAddTypeSortie}
        />

        <FormField name={"montant"} type={"number"} label={"Montant"} />
        <FormField name={"commentaire"} label={"Commentaire"} />
        <FormUpload name={"facture"} label="Fichier" type="Fichier en .pdf autorisé" accept=".pdf," />

        <SubmitButton>Ajouter</SubmitButton>
      </Form>
    </div>
  );
}

export default NewSortieCaisse;
