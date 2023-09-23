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
  getSorties as getTypeSorties,
  getMissions,
} from "../../features/settings/settingsSlice";
import NewMission from "../settings/NewMission";
import { formatDataToSelect, formatLocaleEn } from "../../utils/helpers";
import NewSortie from "../settings/NewSortie";
import { useAppContext } from "../../context/AppState";
import { editCaisseSortie } from "../../features/finance/financeSlice";
import dayjs from "dayjs";

const validationSchema = Yup.object().shape({
  mission: Yup.mixed().required("Ce champ est requis."),
  montant: Yup.number().required("Ce champ est requis."),
  type_sortie: Yup.mixed().required("Ce champ est requis."),
  commentaire: Yup.string(),
  date: Yup.date().required("Ce champ est requis."),
  auteur: Yup.mixed().required("Ce champ est requis."),
});

function EditSortieCaisse({ sortieId, currentSortie }) {
  const dispatch = useDispatch();
  const { missions, sorties } = useSelector((state) => state.settings);
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
      id: sortieId,
      datas: {
        mission: values.mission,
        montant: values.montant,
        type_sortie: values.type_sortie,
        commentaire: values.commentaire,
        date: formatLocaleEn(values.date),
        auteur: values.auteur,
      },
    };

    dispatch(editCaisseSortie(sortieData))
      .unwrap()
      .then(() => {
        switchSlideOver(false);
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "L'entrée en caisse a bien été modifiée.",
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
            mission: currentSortie.mission,
            montant: currentSortie.montant,
            type_sortie: currentSortie.type_sortie,
            commentaire: currentSortie.commentaire,
            date: dayjs(currentSortie.date).toDate(),
            auteur: currentSortie.auteur,
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
            label={"Type d'entrée"}
            datas={formatDataToSelect(sorties)}
            actionEvent={handleQuickAddTypeSortie}
          />

          <FormField name={"montant"} type={"number"} label={"Montant"} />
          <FormField name={"commentaire"} label={"Commentaire"} />

          <SubmitButton loading={isLoading}>Modifier</SubmitButton>
        </Form>
      </div>
    </div>
  );
}

export default EditSortieCaisse;
