import React from "react";
import {
  Form,
  FormField,
  // FormFieldMultiple,
  FormMultiComboSelect,
  SubmitButton,
} from "../forms";
import { useDispatch, useSelector } from "react-redux";
import { useAppContext } from "../../context/AppState";
import {
  // createCommunicationList,
  deleteCommunicationList,
  getMembres,
} from "../../features/quotidien/quotidienSlice";
import { Tab } from "@headlessui/react";
import { classNames, formatDataToSelect } from "../../utils/helpers";
import { List, ListItem } from "@tremor/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { getMissions } from "../../features/settings/settingsSlice";

function NewListe() {
  const dispatch = useDispatch();

  const { isLoading, communicationLists, membres } = useSelector(
    (state) => state.quotidien
  );

  const { missions } = useSelector((state) => state.settings);

  React.useEffect(() => {
    dispatch(getMembres());
    dispatch(getMissions());
  }, []);

  const [formatedMembres, setFormatedMembres] = React.useState([]);

  React.useEffect(() => {
    if (membres.length > 0 && missions.length > 0) {
      const newFormatedMembres = membres.map((membre) => {
        let mission = missions.find((m) => m.id === membre.mission);
        return {
          id: membre.contact,
          libelle: mission.libelle + " - " + membre.nom + " " + membre.prenom,
        };
      });
      setFormatedMembres(newFormatedMembres);
    }
  }, [membres, missions]);

  const {
    setNotificationContent,
    switchNotification,
    switchSlideOver,
    switchModal,
  } = useAppContext();

  const handleSubmit = (values, { resetForm }) => {
    const listDatas = {
      libelle: values.libelle,
      membres: JSON.stringify(values.membres.map((membre) => membre.numero)),
    };

    console.log("LISTE", listDatas);

    // dispatch(createCommunicationList(listDatas))
    //   .unwrap()
    //   .then(() => {
    //     setNotificationContent({
    //       type: "success",
    //       title: "Succès",
    //       description: "La liste a bien été créée",
    //     });

    //     switchNotification(true);
    //   })
    //   .catch((err) => {
    //     setNotificationContent({
    //       type: "error",
    //       title: "Erreur",
    //       description: err,
    //     });

    //     switchNotification(true);
    //   });

    // resetForm();
    // switchSlideOver(false);
  };

  const handleDeleteList = (listId) => {
    switchModal(true, {
      type: "danger",
      title: "Supprimer une liste",
      description:
        "Etes-vous sûr de vouloir supprimer cette liste? Cette action est irréversible.",
      sideEvent: () => {
        dispatch(deleteCommunicationList(listId))
          .unwrap()
          .then(() => {
            setNotificationContent({
              type: "success",
              title: "Succès",
              description: "La liste a bien été supprimée",
            });
            switchNotification(true);
          })
          .catch((err) => {
            console.log("ERR", err);
            setNotificationContent({
              type: "error",
              title: "Erreur",
              description:
                "Impossible de supprimer cette liste, merci de ré-essayer plus tard",
            });
            switchNotification(true);
          });
      },
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
            Nouvelle liste
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
            Gérer les listes
          </Tab>
        </Tab.List>
        <Tab.Panels className={"mt-2"}>
          <Tab.Panel className={"p-3"}>
            <Form
              initialValues={{
                libelle: "",
                membres: [],
              }}
              onSubmit={handleSubmit}
            >
              <FormField label={"Libelle"} name={"libelle"} />
              <FormMultiComboSelect
                label={"Membre"}
                tabName={"membres"}
                datas={formatDataToSelect(formatedMembres)}
              />

              <SubmitButton loading={isLoading}>Enregistrer</SubmitButton>
            </Form>
          </Tab.Panel>
          <Tab.Panel className={"p-3"}>
            <List>
              {communicationLists?.map((item) => {
                const memberCount = JSON.parse(item.membres).length;
                return (
                  <ListItem key={item.id}>
                    <span className="font-medium">
                      {item.libelle} ({memberCount} numéros)
                    </span>
                    <span
                      className="cursor-pointer"
                      onClick={() => handleDeleteList(item.id)}
                    >
                      <TrashIcon className="h-6 w-6 text-red-600" />
                    </span>
                  </ListItem>
                );
              })}
            </List>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default NewListe;
