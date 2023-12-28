import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormField,
  FormSelect,
  FormSelectWithAction,
  FormUpload,
  SubmitButton,
} from "../forms";
import * as Yup from "yup";
import { getMissions } from "../../features/settings/settingsSlice";
import {
  createMembre,
  getMembres,
  uploadMembres,
} from "../../features/quotidien/quotidienSlice";
import { useAppContext } from "../../context/AppState";
import { classNames, formatDataToSelect } from "../../utils/helpers";
import { Tab } from "@headlessui/react";
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
  // habitation: Yup.string().required("Ce champ est requis."),
});

const validationSchemaUpload = Yup.object().shape({
  fichier: Yup.mixed().required("Merci de charger un fichier."),
  mission: Yup.mixed().required("Merci de choisir une mission"),
});

function NewMembre() {
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

  const handleQuickAddMission = () => {
    switchModal(true, {
      type: "success",
      title: "Nouvelle mission",
      description: <NewMission />,
      noConfirm: true,
    });
  };

  const handleMembresUpload = (values) => {
    const membresData = {
      fichier: values.fichier,
      mission: values.mission,
      mode: "membre",
    };

    dispatch(uploadMembres(membresData))
      .unwrap()
      .then(() => {
        switchSlideOver(false);
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "Les membres ont bien été ajoutés.",
        });
        dispatch(getMembres());
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

  const handleSubmit = (values) => {
    const membreData = {
      nom: values.nom,
      prenom: values.prenom,
      sexe: values.sexe,
      fonction: values.fonction,
      marie: values.marie,
      baptise: values.baptise,
      contact: values.contact,
      habitation: values?.habitation ? values.habitation : "",
      mission: values.mission,
      nouveau: false,
    };
    // console.log("MBDT", values)
    dispatch(createMembre(membreData))
      .unwrap()
      .then(() => {
        switchSlideOver(false);
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "Le membre a bien été créé.",
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
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-transparent p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-ctam-primary",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-ctam-primary focus:outline-none focus:ring-2",
                selected
                  ? "bg-ctam-primary text-ctam-secondary shadow"
                  : "text-ctam-primary hover:bg-white/[0.12] hover:text-ctamp-700"
              )
            }
          >
            Ajout unique
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-ctam-primary",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-ctam-primary focus:outline-none focus:ring-2",
                selected
                  ? "bg-ctam-primary text-ctam-secondary shadow"
                  : "text-ctam-primary hover:bg-white/[0.12] hover:text-ctamp-700"
              )
            }
          >
            Ajout par fichier
          </Tab>
        </Tab.List>
        <Tab.Panels className={"mt-2"}>
          <Tab.Panel className={"p-3"}>
            <Form
              initialValues={{
                nom: "",
                prenom: "",
                sexe: null,
                fonction: "",
                marie: null,
                baptise: null,
                contact: "",
                habitation: "",
                mission: user?.mission?.id === 0 ? null : user?.mission?.id,
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
                  actionEvent={handleQuickAddMission}
                />
              )}

              <FormField name={"nom"} type={"text"} label={"Nom"} />
              <FormField name={"prenom"} type={"text"} label={"Prenom"} />
              {/* Sexe */}
              <FormSelect
                label={"Sexe"}
                name={"sexe"}
                datas={[
                  { id: 1, value: "homme", name: "Homme" },
                  { id: 2, value: "femme", name: "Femme" },
                ]}
              />
              <FormField name={"fonction"} type={"text"} label={"Fonction"} />
              {/* Situation matrimonial */}
              <FormSelect
                label={"Situation matrimoniale"}
                name={"marie"}
                datas={[
                  { id: 1, value: true, name: "Marié(e)" },
                  { id: 2, value: false, name: "Célibataire" },
                ]}
              />
              {/* Baptisé */}
              <FormSelect
                label={"Baptisé"}
                name={"baptise"}
                datas={[
                  { id: 1, value: true, name: "Oui" },
                  { id: 2, value: false, name: "Non" },
                ]}
              />
              <FormField name={"contact"} type={"text"} label={"Contact"} />
              <FormField
                name={"habitation"}
                type={"text"}
                label={"Lieu d'habitation"}
              />

              <SubmitButton loading={isLoading}>Ajouter</SubmitButton>
            </Form>
          </Tab.Panel>
          <Tab.Panel className={"p-3"}>
            <Form
              initialValues={{
                fichier: null,
                mission: user?.mission?.id === 0 ? null : user?.mission?.id,
              }}
              onSubmit={handleMembresUpload}
              validationSchema={validationSchemaUpload}
            >
              {/* <FormSelect
                name={"mission"}
                label={"Mission"}
                datas={formatDataToSelect(missions)}
              /> */}

              {user?.mission?.id === 0 && (
                <FormSelectWithAction
                  name={"mission"}
                  label={"Mission"}
                  datas={formatDataToSelect(missions)}
                  actionEvent={handleQuickAddMission}
                />
              )}

              <FormUpload
                name={"fichier"}
                label={"Fichier"}
                type="Fichier en .csv autorisé"
                accept=".csv,"
              />

              <div className="mb-4">
                <span className="text-sm text-mde-gray">
                  Cliquer{" "}
                  <a
                    className="font-bold text-mde-red"
                    href="#"
                    // href="https://mde-storages.nyc3.cdn.digitaloceanspaces.com/others%2Fmodel-fichier-participant-mde.csv"
                    target="_blank"
                    rel="noreferrer"
                  >
                    ici
                  </a>{" "}
                  pour télécharger le modèle de fichier à importer.
                </span>
              </div>

              <SubmitButton>Enregistrer</SubmitButton>
            </Form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default NewMembre;
