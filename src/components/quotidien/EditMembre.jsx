import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormField,
  FormSelect,
  FormSelectWithAction,
  SubmitButton,
} from "../forms";
import * as Yup from "yup";
import { getMissions } from "../../features/settings/settingsSlice";
import { editMembre } from "../../features/quotidien/quotidienSlice";
import { useAppContext } from "../../context/AppState";
import React from "react";
import { formatDataToSelect } from "../../utils/helpers";
import NewMission from "../settings/NewMission";

const validationSchema = Yup.object().shape({
  nom: Yup.string().required("Ce champ est requis."),
  prenom: Yup.string().required("Ce champ est requis."),
  sexe: Yup.mixed().required("Ce champ est requis."),
  fonction: Yup.string().required("Ce champ est requis."),
  marie: Yup.mixed().required("Ce champ est requis."),
  baptise: Yup.mixed().required("Ce champ est requis."),
  contact: Yup.string().required("Ce champ est requis."),
  mission: Yup.mixed().required("Ce champ est requis."),
  habitation: Yup.string().required("Ce champ est requis."),
});

const sexeChoices = [
  { id: 1, value: "homme", name: "Homme" },
  { id: 2, value: "femme", name: "Femme" },
];

const marieChoices = [
  { id: 1, value: true, name: "Marié(e)" },
  { id: 2, value: false, name: "Célibataire" },
];

const baptiseChoices = [
  { id: 1, value: true, name: "Oui" },
  { id: 2, value: false, name: "Non" },
];

function EditMembre({ membreId, currentMembre }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.quotidien);
  const { missions } = useSelector((state) => state.settings);
  const {
    switchSlideOver,
    setNotificationContent,
    switchNotification,
    switchModal,
  } = useAppContext();
  const { user } = useSelector((state) => state.auth);

  React.useEffect(() => {
    dispatch(getMissions());
  }, []);

  const handleAddQuickAdd = () => {
    switchModal(true, {
      type: "success",
      title: "Succès",
      description: <NewMission />,
      noConfirm: true,
    });
  };

  const handleSubmit = (values) => {
    const membreData = {
      id: membreId,
      datas: {
        nom: values.nom,
        prenom: values.prenom,
        sexe: values.sexe,
        fonction: values.fonction,
        marie: values.marie,
        baptise: values.baptise,
        contact: values.contact,
        habitation: values.habitation,
        mission: values.mission,
      },
    };
    dispatch(editMembre(membreData))
      .unwrap()
      .then(() => {
        switchSlideOver(false);
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "Le membre a bien été modifié.",
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
        initialValues={{
          nom: currentMembre.nom,
          prenom: currentMembre.prenom,
          sexe: currentMembre.sexe,
          fonction: currentMembre.fonction,
          marie: currentMembre.marie,
          baptise: currentMembre.baptise,
          contact: currentMembre.contact,
          habitation: currentMembre.habitation,
          mission: currentMembre.mission,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {/* Mission */}
        {/* <FormSelect
          label={"Mission"}
          name={"mission"}
          datas={formatDataToSelect(missions)}
        /> */}

        {user?.mission?.id === 0 && (
          <FormSelectWithAction
            name={"mission"}
            label={"Mission"}
            datas={formatDataToSelect(missions)}
            actionEvent={handleAddQuickAdd}
          />
        )}

        <FormField name={"nom"} type={"text"} label={"Nom"} />
        <FormField name={"prenom"} type={"text"} label={"Prenom"} />
        {/* Sexe */}
        <FormSelect label={"Sexe"} name={"sexe"} datas={sexeChoices} />
        <FormField name={"fonction"} type={"text"} label={"Fonction"} />
        {/* Situation matrimonial */}
        <FormSelect
          label={"Situation matrimoniale"}
          name={"marie"}
          datas={marieChoices}
        />
        {/* Baptisé */}
        <FormSelect label={"Baptisé"} name={"baptise"} datas={baptiseChoices} />
        <FormField name={"contact"} type={"text"} label={"Contact"} />
        <FormField
          name={"habitation"}
          type={"text"}
          label={"Lieu d'habitation"}
        />

        <SubmitButton loading={isLoading}>Enregistrer</SubmitButton>
      </Form>
    </div>
  );
}

export default EditMembre;
