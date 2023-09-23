import React from "react";
import { Form, FormField, SubmitButton, Textarea } from "../forms";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { sendAlertSms } from "../../features/quotidien/quotidienSlice";
import { useAppContext } from "../../context/AppState";
import { set } from "@project-serum/anchor/dist/cjs/utils/features";

const validationSchema = Yup.object().shape({
  message: Yup.string().required("Ce champ est requis."),
});

const DEFAULT_MESSAGE =
  "Cher(e) membre, nous vous rappellons le paiement de votre engagement pour l'année 2024.";

function SendAlert({ contact }) {
  const dispatch = useDispatch();

  const { switchModal, switchNotification, setNotificationContent } =
    useAppContext();

  const handleSubmit = (values) => {
    const smsDatas = {
      message: values.message,
      recipients: JSON.stringify([contact]),
    };
    console.log("smsDatas", smsDatas);
    dispatch(sendAlertSms(smsDatas))
      .unwrap()
      .then(() => {
        switchModal(false);
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "Alerte SMS envoyée avec succès.",
        });
        switchNotification(true);
        switchModal(false, null);
      })
      .catch((err) => {
        console.log("SMS NOT SENT", err);
        setNotificationContent({
          type: "error",
          title: "Erreur",
          description: "Une erreur est survenue lors de l'envoi de l'alerte SMS.",
        });
        switchNotification(true);

      });
  };

  return (
    <div className="p-4">
      <Form
        initialValues={{
          contact: contact,
          message: DEFAULT_MESSAGE,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Textarea name={"message"} type={"text"} label={"Message"} />
        <div className="mt-4" />
        <SubmitButton>Envoyer</SubmitButton>
      </Form>
    </div>
  );
}

export default SendAlert;
