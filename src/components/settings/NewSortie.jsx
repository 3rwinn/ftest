import { useDispatch, useSelector } from "react-redux";
import { Form, FormField, SubmitButton } from "../forms";
import * as Yup from "yup";
import { createSortie } from "../../features/settings/settingsSlice";
import { useAppContext } from "../../context/AppState";

const validationSchema = Yup.object().shape({
  libelle: Yup.string().required("Ce champ est requis."),
});

function NewSortie() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.settings);
  const { switchSlideOver, setNotificationContent, switchNotification } =
    useAppContext();

  const handleSubmit = (values) => {
    const sortieData = {
      libelle: values.libelle,
    };
    dispatch(createSortie(sortieData))
      .unwrap()
      .then(() => {
        switchSlideOver(false);
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "Le type de sortie a bien été créé.",
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
        initialValues={{ libelle: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormField
          name={"libelle"}
          type={"text"}
          label={"Libellé du type de sortie"}
        />

        <SubmitButton loading={isLoading}>Ajouter</SubmitButton>
      </Form>
    </div>
  );
}

export default NewSortie;
