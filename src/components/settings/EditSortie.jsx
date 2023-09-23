import { useDispatch, useSelector } from "react-redux";
import { Form, FormField, SubmitButton } from "../forms";
import * as Yup from "yup";
import { editSortie } from "../../features/settings/settingsSlice";
import { useAppContext } from "../../context/AppState";

const validationSchema = Yup.object().shape({
  libelle: Yup.string().required("Ce champ est requis."),
});

function EditSortie({ sortieId, currentSortie }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.settings);
  const { switchSlideOver, setNotificationContent, switchNotification } =
    useAppContext();

  const handleSubmit = (values) => {
    const sortieData = {
      id: sortieId,
      datas: {
        libelle: values.libelle,
      },
    };
    dispatch(editSortie(sortieData))
      .unwrap()
      .then(() => {
        switchSlideOver(false);
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "Le type de sortie a bien été modifiée.",
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
        initialValues={{ libelle: currentSortie?.libelle }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormField
          name={"libelle"}
          type={"text"}
          label={"Libellé du type de sortie"}
        />

        <SubmitButton loading={isLoading}>Enregistrer</SubmitButton>
      </Form>
    </div>
  );
}

export default EditSortie;
