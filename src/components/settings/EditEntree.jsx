import { useDispatch, useSelector } from "react-redux";
import { Form, FormField, SubmitButton } from "../forms";
import * as Yup from "yup";
import { editEntree } from "../../features/settings/settingsSlice";
import { useAppContext } from "../../context/AppState";

const validationSchema = Yup.object().shape({
  libelle: Yup.string().required("Ce champ est requis."),
});

function EditEntree({ entreeId, currentEntree }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.settings);
  const { switchSlideOver, setNotificationContent, switchNotification } =
    useAppContext();

  const handleSubmit = (values) => {
    const entreeData = {
      id: entreeId,
      datas: {
        libelle: values.libelle,
      },
    };
    dispatch(editEntree(entreeData))
      .unwrap()
      .then(() => {
        switchSlideOver(false);
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "Le type d'entree a bien été modifiée.",
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
        initialValues={{ libelle: currentEntree?.libelle }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormField
          name={"libelle"}
          type={"text"}
          label={"Libellé du type d'entree"}
        />

        <SubmitButton loading={isLoading}>Enregistrer</SubmitButton>
      </Form>
    </div>
  );
}

export default EditEntree;
