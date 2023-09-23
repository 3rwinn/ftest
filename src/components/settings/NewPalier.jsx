import { useDispatch, useSelector } from "react-redux";
import { Form, FormField, SubmitButton } from "../forms";
import * as Yup from "yup";
import { createPalier } from "../../features/settings/settingsSlice";
import { useAppContext } from "../../context/AppState";

const validationSchema = Yup.object().shape({
  montant: Yup.number().required("Ce champ est requis."),
});

function NewPalier() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.settings);
  const { switchSlideOver, setNotificationContent, switchNotification } =
    useAppContext();

  const handleSubmit = (values) => {
    const palierData = {
      montant: values.montant,
    };
    dispatch(createPalier(palierData))
      .unwrap()
      .then(() => {
        // switchSlideOver(false);
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "La palier a bien été créé.",
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
        initialValues={{ montant: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormField
          name={"montant"}
          type={"text"}
          label={"Montant du palier"}
        />

        <SubmitButton loading={isLoading}>Ajouter</SubmitButton>
      </Form>
    </div>
  );
}

export default NewPalier;
