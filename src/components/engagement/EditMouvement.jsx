import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormDatePicker,
  FormField,
  FormSelect,
  SubmitButton,
} from "../forms";
import * as Yup from "yup";
import { editMouvement } from "../../features/engagement/engagementSlice";
import { getMissions, getPaliers } from "../../features/settings/settingsSlice";
import { getMembres } from "../../features/quotidien/quotidienSlice";
import { useAppContext } from "../../context/AppState";
import { formatDataToSelect, formatLocaleEn } from "../../utils/helpers";
import { getEngagements } from "../../features/engagement/engagementSlice";
import dayjs from "dayjs";

const validationSchema = Yup.object().shape({
  engagement: Yup.mixed().required("Ce champ est requis."),
  montant: Yup.mixed().required("Ce champ est requis."),
});

function EditMouvement({ mouvementId, currentMouvement }) {
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
        // const palier = paliers.find((p) => p.id === engagement?.palier);
        return {
          id: engagement.id,
          name: mission?.libelle + " - " + membre?.nom + " " + membre?.prenom,
          // + " - " +
          // palier?.montant,

          value: engagement.id,
          mission: mission?.id,
        };
      });
      let engagementToShow =
        user?.mission?.id !== 0
          ? formatedEngagements?.filter(
              (eng) => eng.mission === user?.mission?.id
            )
          : formatedEngagements;
      setFormatedEngagements(engagementToShow);
    }
  }, [engagements, membres, missions]);

  const handleSubmit = (values) => {
    const mouvementData = {
      id: mouvementId,
      datas: {
        engagement: values.engagement,
        montant: values.montant,
        date: formatLocaleEn(values.date),
      },
    };
    // console.log("MBDT", mouvementData);
    dispatch(editMouvement(mouvementData))
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
        console.log("ERR", error);
        setNotificationContent({
          type: "error",
          title: "Erreur",
          description: error,
        });
        switchNotification(true);
      });
  };

  console.log("EditMouvement", currentMouvement);

  return (
    <div className="p-4">
      <Form
        initialValues={{
          engagement: currentMouvement.engagement,
          montant: currentMouvement.montant,
          date: dayjs(currentMouvement.date).toDate(),
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormSelect
          label={"Engagement"}
          name={"engagement"}
          datas={formatedEngagements}
        />
        <FormField label={"Montant"} type={"number"} name={"montant"} />
        <FormDatePicker name={"date"} label={"Date"} />

        <SubmitButton loading={isLoading}>Ajouter</SubmitButton>
      </Form>
    </div>
  );
}

export default EditMouvement;
