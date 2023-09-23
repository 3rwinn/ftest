import React from "react";
import Layout from "../../components/common/Layout";
import PageContent from "../../components/common/PageContent";
import Card from "../../components/common/Card";
import {
  Form,
  FormSelect,
  SubmitButton,
  Textarea,
} from "../../components/forms";
import { useAppContext } from "../../context/AppState";
import NewListe from "../../components/quotidien/NewListe";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommunicationLists,
  getMembres,
  sendAlertSms,
} from "../../features/quotidien/quotidienSlice";
import { formatDataToSelect } from "../../utils/helpers";
import { getMissions } from "../../features/settings/settingsSlice";
import { v4 as uuidv4 } from "uuid";
import WaitingDatas from "../../components/WaitingDatas";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  liste: Yup.mixed().required("Ce champ est requis."),
  message: Yup.string().required("Ce champ est requis."),
});

function Communication() {
  const {
    switchSlideOver,
    setSlideOverContent,
    setNotificationContent,
    switchNotification,
  } = useAppContext();

  const dispatch = useDispatch();

  const { missions } = useSelector((state) => state.settings);
  const { membres } = useSelector((state) => state.quotidien);

  // const { user } = useSelector((state) => state.auth);

  const { isLoading, communicationLists } = useSelector(
    (state) => state.quotidien
  );

  const [defaultList, setDefaultList] = React.useState([]);
  React.useEffect(() => {
    if (membres.length > 0) {
      const allMembres = {
        id: uuidv4(),
        name: "Tous les membres",
        value: JSON.stringify(membres.map((m) => m.contact)),
      };

      const allMembresByMission = [];
      missions.map((mission) => {
        let membresFiltered = membres.filter((m) => m.mission === mission.id);
        if (membresFiltered.length > 0) {
          allMembresByMission.push({
            id: uuidv4(),
            name: "Membres " + mission.libelle,
            value: JSON.stringify(membresFiltered.map((m) => m.contact)),
          });
        }
      });

      const formatedCommunicationLists = communicationLists.map((list) => {
        return {
          id: list.id,
          name: list.libelle,
          value: JSON.stringify(list.membres),
        };
      });

      setDefaultList([
        allMembres,
        ...allMembresByMission,
        ...formatedCommunicationLists,
      ]);
    }
  }, [membres, missions, communicationLists]);

  React.useEffect(() => {
    dispatch(getCommunicationLists());
    dispatch(getMissions());
    dispatch(getMembres());
  }, []);

  const showListeGestion = () => {
    setSlideOverContent({
      title: "Gestion des listes",
      description: "Veuillez remplir les formulaires pour gérer les listes.",
      body: <NewListe />,
    });
    switchSlideOver(true);
  };

  const handleSubmit = (values, { resetForm }) => {
    const messageData = {
      recipients: values.liste,
      message: values.message,
    };

    console.log("messageData", messageData);

    dispatch(sendAlertSms(messageData))
      .unwrap()
      .then(() => {
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "Le message a bien été envoyé.",
        });
        switchNotification(true);
      })
      .catch((err) => {
        console.log("SMS NOT SENT", err);
        setNotificationContent({
          type: "error",
          title: "Erreur",
          description: "Une erreur est survenue lors de l'envoi du message.",
        });
        switchNotification(true);
      });

    resetForm();
  };

  if (isLoading || defaultList.length === 0)
    return (
      <Layout>
        <PageContent title={"Communication"}>
          <WaitingDatas />
        </PageContent>
      </Layout>
    );

  return (
    <Layout>
      <PageContent
        title={"Communication"}
        actionButton={{
          title: "Gerer les listes",
          event: showListeGestion,
        }}
      >
        <Card>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Nouveau message
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Veuillez remplir le formulaire pour envoyer un SMS.
          </p>
          <div className="mt-5" />
          <Form
            initialValues={{
              // mission: user?.mission?.id === 0 ? null : user?.mission?.id,
              liste: null,
              message: "",
            }}
            onSubmit={handleSubmit}
          >
            <FormSelect
              name={"liste"}
              label={"Liste de diffusion"}
              datas={defaultList}
            />
            <Textarea label={"Message"} name={"message"} />
            <div className="mt-4" />
            <SubmitButton loading={isLoading}>Envoyer</SubmitButton>
          </Form>
        </Card>
      </PageContent>
    </Layout>
  );
}

export default Communication;
