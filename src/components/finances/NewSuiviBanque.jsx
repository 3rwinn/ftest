import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormField,
  FormSelect,
  FormDatePicker,
  SubmitButton,
} from "../forms";
import * as Yup from "yup";
import { useAppContext } from "../../context/AppState";
import { addSuiviBanque } from "../../features/finance/financeSlice";
import { formatLocaleEn } from "../../utils/helpers";

const validationSchema = Yup.object().shape({
  date: Yup.date().required("Ce champ est requis."),
  montant: Yup.number().required("Ce champ est requis."),
  action: Yup.mixed().required("Ce champ est requis."),
  commentaire: Yup.string(),
});

function NewSuiviBanque() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.finances);
  //   const { user } = useSelector((state) => state.auth.user);

  const {
    switchSlideOver,
    setNotificationContent,
    switchNotification,
    // switchModal,
  } = useAppContext();

  const handleSubmit = (values) => {
    const transactionDatas = {
      date: formatLocaleEn(values.date),
      montant: values.montant,
      action: values.action,
      commentaire: values.commentaire,
      // auteur: user.id,
    };

    dispatch(addSuiviBanque(transactionDatas))
      .unwrap()
      .then(() => {
        switchSlideOver(false);
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "La transaction a bien été ajoutée.",
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
          date: new Date(),
          montant: "",
          action: null,
          commentaire: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormDatePicker label={"Date"} name={"date"} />
        <FormField label={"Montant"} type={"number"} name={"montant"} />
        <FormSelect
          name={"action"}
          label={"Action"}
          datas={[
            { id: 1, value: "versement", name: "Versement" },
            { id: 2, value: "retrait", name: "Retrait" },
          ]}
        />
        <FormField label={"Commentaire"} name={"commentaire"} />

        <SubmitButton loading={isLoading}>Ajouter</SubmitButton>
      </Form>
    </div>
  );
}

export default NewSuiviBanque;
