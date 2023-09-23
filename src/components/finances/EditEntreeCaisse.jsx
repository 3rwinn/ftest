import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormField,
  FormSelect,
  FormSelectWithAction,
  FormDatePicker,
  SubmitButton,
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
import { editCaisseEntree } from "../../features/finance/financeSlice";
import dayjs from "dayjs";

const validationSchema = Yup.object().shape({
  mission: Yup.mixed().required("Ce champ est requis."),
  montant: Yup.number().required("Ce champ est requis."),
  type_entree: Yup.mixed().required("Ce champ est requis."),
  commentaire: Yup.string(),
  date: Yup.date().required("Ce champ est requis."),
  auteur: Yup.mixed().required("Ce champ est requis."),
});

function EditEntreeCaisse({ entreeId, currentEntree }) {
  const dispatch = useDispatch();
  const { missions, entrees } = useSelector((state) => state.settings);
  const { isLoading } = useSelector((state) => state.finances);
  const { user } = useSelector((state) => state.auth);

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
      title: "Nouveau type de sortie de caisse",
      description: <NewEntree />,
      noConfirm: true,
    });
  };

  const handleSubmit = (values) => {
    const entreeData = {
      id: entreeId,
      datas: {
        mission: values.mission,
        montant: values.montant,
        type_entree: values.type_entree,
        commentaire: values.commentaire,
        date: formatLocaleEn(values.date),
        auteur: values.auteur,
      },
    };

    dispatch(editCaisseEntree(entreeData))
      .unwrap()
      .then(() => {
        switchSlideOver(false);
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "La sortie de caisse a bien été modifiée.",
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
      <div className="p-4">
        <Form
          initialValues={{
            mission: currentEntree.mission,
            montant: currentEntree.montant,
            type_entree: currentEntree.type_entree,
            commentaire: currentEntree.commentaire,
            date: dayjs(currentEntree.date).toDate(),
            auteur: currentEntree.auteur,
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

          <SubmitButton loading={isLoading}>Modifier</SubmitButton>
        </Form>
      </div>
    </div>
  );
}

export default EditEntreeCaisse;
