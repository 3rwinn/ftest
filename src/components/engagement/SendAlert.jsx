import React from "react";
import { Form, SubmitButton, Textarea } from "../forms";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { sendAlertSms } from "../../features/quotidien/quotidienSlice";
import { useAppContext } from "../../context/AppState";

const validationSchema = Yup.object().shape({
  message: Yup.string().required("Ce champ est requis."),
});

// const DEFAULT_MESSAGE =
//   "Cher(e) membre, nous vous rappellons le paiement de votre engagement pour l'année 2024.";

function SendAlert({ contact, name, engagement, versement, reste }) {
  const dispatch = useDispatch();

  // function to replace space with dot in given text
  const replaceSpaceWithDot = (text) => {
    return text.replace(/\s/g, ".");
  };

  const DEFAULT_MESSAGE =
    // `Cher(e) membre, nous vous rappellons le paiement de votre engagement pour l'année 2024.`;
    // `Cher(e) ${name}, nous vous remercions pour votre engagement ; Votre Alliance pour l'année 2024 est de ${replaceSpaceWithDot(engagement)} FCFA.
    // Pour vos versements veuillez approcher le CTAM (Arnaud BOTI : 0777248466). Soyons des Fils ! DIEU VOUS BENISSE.`;
    `Cher(e) ${name}, ci-dessous la situation de votre alliance 2024 au 06 Mars. Votre alliance: ${replaceSpaceWithDot(
      engagement
    )} FCFA. Total versement: ${replaceSpaceWithDot(versement)} FCFA.
     Montant restant: ${replaceSpaceWithDot(reste)} FCFA. DIEU VOUS BENISSE.`;

  const { switchModal, switchNotification, setNotificationContent } =
    useAppContext();

  const handleSubmit = (values) => {
    const smsDatas = {
      message: values.message,
      recipients: JSON.stringify([`225${contact}`]),
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
          description:
            "Une erreur est survenue lors de l'envoi de l'alerte SMS.",
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
