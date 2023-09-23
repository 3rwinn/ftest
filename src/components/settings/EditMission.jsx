import { useDispatch, useSelector } from "react-redux";
import { Form, FormField, SubmitButton } from "../forms";
import * as Yup from "yup";
import { editMission } from "../../features/settings/settingsSlice";
import { useAppContext } from "../../context/AppState";

const validationSchema = Yup.object().shape({
  libelle: Yup.string().required("Ce champ est requis."),
});

function EditMission({ missionId, currentMission }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.settings);
  const { switchSlideOver, setNotificationContent, switchNotification } =
    useAppContext();

  const handleSubmit = (values) => {
    const missionData = {
      id: missionId,
      datas: {
        libelle: values.libelle,
      },
    };
    dispatch(editMission(missionData))
      .unwrap()
      .then(() => {
        switchSlideOver(false);
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "La mission a bien été modifiée.",
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
        initialValues={{ libelle: currentMission?.libelle }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormField
          name={"libelle"}
          type={"text"}
          label={"Libellé de la mission"}
        />

        <SubmitButton loading={isLoading}>Enregistrer</SubmitButton>
      </Form>
    </div>
  );
}

export default EditMission;
