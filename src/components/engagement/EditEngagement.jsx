import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormDatePicker,
  FormField,
  FormSelect,
  FormSelectWithAction,
  SubmitButton,
} from "../forms";
import * as Yup from "yup";
import { getMissions, getPaliers } from "../../features/settings/settingsSlice";
import { getMembres } from "../../features/quotidien/quotidienSlice";
import { editEngagement } from "../../features/engagement/engagementSlice";
import { useAppContext } from "../../context/AppState";
import React from "react";
import {
  formatDataToSelect,
  formatLocaleEn,
  formatMembreToSelect,
} from "../../utils/helpers";
import dayjs from "dayjs";
import NewMission from "../settings/NewMission";
import NewPalier from "../settings/NewPalier";

const validationSchema = Yup.object().shape({
  mission: Yup.mixed().required("Ce champ est requis."),
  palier: Yup.mixed().required("Ce champ est requis."),
  membre: Yup.mixed().required("Ce champ est requis."),
  date: Yup.string().required("Ce champ est requis"),
});

function EditEngagement({ engagementId, currentEngagement }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.engagement);
  const { membres } = useSelector((state) => state.quotidien);
  const { missions, paliers } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.auth);
  const {
    switchSlideOver,
    setNotificationContent,
    switchNotification,
    switchModal,
  } = useAppContext();

  React.useEffect(() => {
    dispatch(getMissions());
    dispatch(getPaliers());
    dispatch(getMembres());
  }, []);

  const [selectedMission, setSelectedMission] = React.useState(null);
  // const [filteredMembers, setFilteredMembers] = React.useState([]);
  // React.useEffect(() => {
  //   if (selectedMission) {
  //     const filtered = membres.filter(
  //       (membre) => membre.mission === selectedMission
  //     );
  //     setFilteredMembers(filtered);
  //   }
  // }, [selectedMission]);

  const handleQuickAddMission = () => {
    switchModal(true, {
      type: "success",
      title: "Nouvelle mission",
      description: <NewMission />,
      noConfirm: true,
    });
  };

  const handleQuickAddPalier = () => {
    switchModal(true, {
      type: "success",
      title: "Nouveau palier",
      description: <NewPalier />,
      noConfirm: true,
    });
  };

  const handleSubmit = (values) => {
    const engagementData = {
      id: engagementId,
      datas: {
        mission: values.mission,
        palier: values.palier,
        membre: values.membre,
        annee: formatLocaleEn(values.date),
      },
    };
    dispatch(editEngagement(engagementData))
      .unwrap()
      .then(() => {
        switchSlideOver(false);
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "L'engagement a bien été modifié.",
        });
        switchNotification(true);
      })
      .catch((error) => {
        console.log("ERR", error);
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
          mission: currentEngagement.mission,
          palier: currentEngagement.palier,
          membre: currentEngagement.membre,
          date: dayjs(currentEngagement.date).toDate(),
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {user?.mission?.id === 0 && (
          <FormSelectWithAction
            label={"Mission"}
            name={"mission"}
            datas={formatDataToSelect(missions)}
            sideEvent={(value) => setSelectedMission(value)}
            actionEvent={handleQuickAddMission}
          />
        )}
        <FormSelect
          label={"Membre"}
          name={"membre"}
          // datas={formatMembreToSelect(filteredMembers)}
          datas={formatMembreToSelect(membres)}
        />
        <FormSelectWithAction
          label={"Palier"}
          name={"palier"}
          datas={formatDataToSelect(paliers)}
          actionEvent={handleQuickAddPalier}
        />

        <FormDatePicker label={"Année"} name={"date"} mode="year" />

        <SubmitButton loading={isLoading}>Enregistrer</SubmitButton>
      </Form>
    </div>
  );
}

export default EditEngagement;
