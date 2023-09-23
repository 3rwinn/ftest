import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormComboSelect,
  FormDatePicker,
  FormField,
  FormSelect,
  SubmitButton,
} from "../forms";
import * as Yup from "yup";
import { createMouvement } from "../../features/engagement/engagementSlice";
import { getMissions, getPaliers } from "../../features/settings/settingsSlice";
import { getMembres } from "../../features/quotidien/quotidienSlice";
import { useAppContext } from "../../context/AppState";
import {
  formatDataToSelect,
  formatLocaleEn,
  formatNumberToMoney,
} from "../../utils/helpers";
import { getEngagements } from "../../features/engagement/engagementSlice";

const validationSchema = Yup.object().shape({
  engagement: Yup.mixed().required("Ce champ est requis."),
  montant: Yup.mixed().required("Ce champ est requis."),
  date: Yup.string().required("Ce champ est requis"),
});

function NewMouvement() {
  const dispatch = useDispatch();
  const { isLoading, engagements } = useSelector((state) => state.engagement);
  const { membres } = useSelector((state) => state.quotidien);
  const { missions, paliers } = useSelector((state) => state.settings);
  const { switchSlideOver, setNotificationContent, switchNotification } =
    useAppContext();

  const { user } = useSelector((state) => state.auth);

  React.useEffect(() => {
    dispatch(getEngagements());
    dispatch(getMissions());
    dispatch(getPaliers());
    dispatch(getMembres());
  }, []);

  const [formatedEngagements, setFormatedEngagements] = React.useState([]);
  React.useEffect(() => {
    if (engagements.length > 0) {
      const formatedEngagements = engagements.map((engagement) => {
        const membre = membres.find((m) => m.id === engagement?.membre);
        const mission = missions.find((m) => m.id === engagement?.mission);
        const palier = paliers.find((p) => p.id === engagement?.palier);
        return {
          libelle:
            mission?.libelle +
            " - " +
            membre?.nom +
            " " +
            membre?.prenom +
            " - " +
            formatNumberToMoney(palier?.montant),
          ...engagement,
        };
      });
      let engagementToShow = user?.mission?.id !== 0 ? formatedEngagements.filter((e) => e.mission === user?.mission?.id) : formatedEngagements;
      setFormatedEngagements(engagementToShow);
    }
  }, [engagements]);

  const handleSubmit = (values) => {
    const mouvementData = {
      engagement: values.engagement,
      montant: values.montant,
      date: formatLocaleEn(values.date),
    };
    // console.log("MBDT", mouvementData);
    dispatch(createMouvement(mouvementData))
      .unwrap()
      .then(() => {
        switchSlideOver(false);
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "L'entrée a bien été créé.",
        });
        switchNotification(true);
      })
      .catch((error) => {
        // console.log("ERR", error);
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
          engagement: null,
          montant: null,
          date: new Date(),
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        
        <FormComboSelect  label={"Engagement"}
          name={"engagement"}
          datas={formatDataToSelect(formatedEngagements)} />

        <div className="mb-4" />

        <FormField label={"Montant"} type={"number"} name={"montant"} />

        <FormDatePicker name={"date"} label={"Date"} />

        <SubmitButton loading={isLoading}>Ajouter</SubmitButton>
      </Form>
    </div>
  );
}

export default NewMouvement;
