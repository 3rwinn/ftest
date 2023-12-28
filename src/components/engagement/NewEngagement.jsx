import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormDatePicker,
  FormField,
  FormSelect,
  FormSelectWithAction,
  FormUpload,
  SubmitButton,
} from "../forms";
import * as Yup from "yup";
import { createEngagement } from "../../features/engagement/engagementSlice";
import { getMissions, getPaliers } from "../../features/settings/settingsSlice";
import { getMembres } from "../../features/quotidien/quotidienSlice";
import { useAppContext } from "../../context/AppState";
import {
  formatDataToSelect,
  formatLocaleEn,
  formatMembreToSelect,
} from "../../utils/helpers";
import NewMission from "../settings/NewMission";
import NewPalier from "../settings/NewPalier";

const validationSchema = Yup.object().shape({
  mission: Yup.mixed().required("Ce champ est requis."),
  palier: Yup.mixed().required("Ce champ est requis."),
  membre: Yup.mixed().required("Ce champ est requis."),
  date: Yup.string().required("Ce champ est requis."),
});

function NewEngagement() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.engagement);
  const { membres } = useSelector((state) => state.quotidien);
  const { missions, paliers } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.auth);
  console.log("userFromNewEngagement", user);
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
  const [filteredMembers, setFilteredMembers] = React.useState([]);
  React.useEffect(() => {
    if (selectedMission && user?.mission?.id === 0) {
      const filtered = membres.filter(
        (membre) => membre.mission === selectedMission
      );
      setFilteredMembers(filtered);
    } else {
      const filtered = membres.filter(
        (membre) => membre.mission === user?.mission?.id
      );
      setFilteredMembers(filtered);
    }
  }, [selectedMission, user]);

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
      mission: values.mission,
      palier: values.palier,
      membre: values.membre,
      annee: formatLocaleEn(values.date),
    };
    // console.log("MBDT", engagementData);
    dispatch(createEngagement(engagementData))
      .unwrap()
      .then(() => {
        switchSlideOver(false);
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "L'engagement a bien été créé.",
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
          mission: user?.mission?.id === 0 ? null : user?.mission?.id,
          palier: null,
          membre: null,
          // date: new Date(),
          // set date object to 1 jan 2024
          date: new Date(2024, 0, 1),
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
          datas={formatMembreToSelect(filteredMembers)}
        />
        <FormSelectWithAction
          label={"Palier"}
          name={"palier"}
          datas={formatDataToSelect(paliers)}
          actionEvent={handleQuickAddPalier}
        />

        <FormDatePicker label={"Année"} name={"date"} mode="year" />

        <SubmitButton loading={isLoading}>Ajouter</SubmitButton>
      </Form>
    </div>
  );
}

export default NewEngagement;
