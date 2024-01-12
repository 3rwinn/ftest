import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormField,
  FormSelect,
  FormDatePicker,
  SubmitButton,
  FormSelectWithAction,
} from "../forms";
import * as Yup from "yup";
import { useAppContext } from "../../context/AppState";
import {
  editSuiviBanque,
} from "../../features/finance/financeSlice";
import { formatDataToSelect, formatLocaleEn } from "../../utils/helpers";
import dayjs from "dayjs";
import { getMissions } from "../../features/settings/settingsSlice";
import NewMission from "../settings/NewMission";

const validationSchema = Yup.object().shape({
  date: Yup.date().required("Ce champ est requis."),
  montant: Yup.number().required("Ce champ est requis."),
  action: Yup.mixed().required("Ce champ est requis."),
  commentaire: Yup.string(),
});

const typeActions = [
    { id: 1, value: "versement", name: "Versement" },
    { id: 2, value: "retrait", name: "Retrait" },
  ]

function EditSuiviBanque({ transactionId, currentTransaction }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.finances);
  //   const { user } = useSelector((state) => state.auth.user);
  const { missions } = useSelector((state) => state.settings);

  React.useEffect(() => {
    dispatch(getMissions());
  }, []);

  const {
    switchSlideOver,
    setNotificationContent,
    switchNotification,
    switchModal,
  } = useAppContext();

  const handleQuickAddMission = () => {
    switchModal(true, {
      type: "success",
      title: "Nouvelle mission",
      description: <NewMission />,
      noConfirm: true,
    });
  };

  const handleSubmit = (values) => {
    const transactionDatas = {
      id: transactionId,
      datas: {
        date: formatLocaleEn(values.date),
        montant: values.montant,
        mission: values.mission,
        action: values.action,
        commentaire: values.commentaire,
        // auteur: user.id,
      },
    };

    dispatch(editSuiviBanque(transactionDatas))
      .unwrap()
      .then(() => {
        switchSlideOver(false);
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "La transaction a bien été modifiée.",
        });
        switchNotification(true);
      })
      .catch((error) => {
        console.log("SUIVI TRANSAC ERR", error);
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
          date: dayjs(currentTransaction.date).toDate(),
          montant: currentTransaction.montant,
          mission: currentTransaction.mission,
          action: currentTransaction.action,
          commentaire: currentTransaction.commentaire,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormDatePicker label={"Date"} name={"date"} />
        <FormSelectWithAction
          name={"mission"}
          label={"Mission"}
          datas={formatDataToSelect(missions)}
          actionEvent={handleQuickAddMission}
        />
        <FormField label={"Montant"} type={"number"} name={"montant"} />
        <FormSelect
          name={"action"}
          label={"Action"}
          datas={typeActions}
        />
        <FormField label={"Commentaire"} name={"commentaire"} />

        <SubmitButton loading={isLoading}>Modifier</SubmitButton>
      </Form>
    </div>
  );
}

export default EditSuiviBanque;
