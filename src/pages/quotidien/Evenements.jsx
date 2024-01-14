import React, { Fragment } from "react";
import Layout from "../../components/common/Layout";
import PageContent from "../../components/common/PageContent";
import Card from "../../components/common/Card";
import { Menu, Transition } from "@headlessui/react";
import {
  EllipsisHorizontalIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";
import {
  Form,
  FormDatePicker,
  FormField,
  FormSelect,
  FormSelectWithAction,
  SubmitButton,
} from "../../components/forms";
import { useDispatch, useSelector } from "react-redux";
import { getMissions } from "../../features/settings/settingsSlice";
import { formatDataToSelect, formatLocaleEn } from "../../utils/helpers";
import {
  createEvenement,
  deleteEvenement,
  editEvenement,
  getEvenements,
} from "../../features/quotidien/quotidienSlice";
import { useAppContext } from "../../context/AppState";
import dayjs from "dayjs";
import "dayjs/locale/fr";
dayjs.locale("fr");
import calendar from "dayjs/plugin/calendar";
import Table, { SelectColumnFilter } from "../../components/Table";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import NewMission from "../../components/settings/NewMission";
dayjs.extend(calendar);

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function EditEvent({ eventId, eventDatas }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.quotidien);
  const { missions } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.auth);
  const {
    setNotificationContent,
    switchNotification,
    switchSlideOver,
    switchModal,
  } = useAppContext();

  console.log("missions", missions);

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

  const handleSubmit = (values) => {
    const eventDatas = {
      id: eventId,
      datas: {
        libelle: values.libelle,
        description: values.description,
        date: formatLocaleEn(values.date),
        mission: values.mission,
      },
    };

    dispatch(editEvenement(eventDatas))
      .unwrap()
      .then(() => {
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "L'évènement a bien été modifié",
        });

        switchNotification(true);
      })
      .catch((err) => {
        console.log(err);
        setNotificationContent({
          type: "error",
          title: "Erreur",
          description:
            "Une erreur est survenue lors de la modification de l'évènement",
        });

        switchNotification(true);
      });

    switchSlideOver(false);
  };

  return (
    <div className="p-3">
      <Form
        initialValues={{
          libelle: eventDatas.libelle,
          description: eventDatas.description,
          date: dayjs(eventDatas.date).toDate(),
          mission: eventDatas.mission,
        }}
        onSubmit={handleSubmit}
      >
        <div className="space-y-6">
          <FormField
            label="Libellé"
            name="libelle"
            placeholder="Libellé de l'évènement"
          />
          <FormField
            label="Lieu"
            name="description"
            placeholder="Lieu de l'évènement"
          />
          <FormDatePicker
            label="Date"
            name="date"
            placeholder="Date de l'évènement"
          />
          {user?.mission?.id === 0 && (
            <FormSelectWithAction
              label="Mission"
              name="mission"
              datas={formatDataToSelect(missions)}
              placeholder="Mission de l'évènement"
              actionEvent={handleQuickAddMission}
            />
          )}

          <SubmitButton loading={isLoading}>Modifier</SubmitButton>
        </div>
      </Form>
    </div>
  );
}

function AddEvent() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.quotidien);
  const { missions } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.auth);
  const {
    setNotificationContent,
    switchNotification,
    switchModal,
    switchSlideOver,
  } = useAppContext();

  console.log("missions", missions);

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

  const handleSubmit = (values) => {
    const eventDatas = {
      libelle: values.libelle,
      description: values.description,
      date: formatLocaleEn(values.date),
      mission: values.mission,
    };

    dispatch(createEvenement(eventDatas))
      .unwrap()
      .then(() => {
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "L'évènement a bien été créé",
        });

        switchNotification(true);
      })
      .catch((err) => {
        console.log(err);
        setNotificationContent({
          type: "error",
          title: "Erreur",
          description:
            "Une erreur est survenue lors de la création de l'évènement",
        });

        switchNotification(true);
      });

    switchSlideOver(false);
  };

  return (
    <div className="p-3">
      <Form
        initialValues={{
          libelle: "",
          description: "",
          date: "",
          mission: user?.mission?.id === 0 ? "" : user?.mission?.id,
        }}
        onSubmit={handleSubmit}
      >
        <div className="space-y-6">
          <FormField
            label="Libellé"
            name="libelle"
            placeholder="Libellé de l'évènement"
          />
          <FormField
            label="Lieu"
            name="description"
            placeholder="Lieu de l'évènement"
          />
          <FormDatePicker
            label="Date"
            name="date"
            placeholder="Date de l'évènement"
          />
          {user?.mission?.id === 0 && (
            <FormSelectWithAction
              label="Mission"
              name="mission"
              datas={formatDataToSelect(missions)}
              placeholder="Mission de l'évènement"
              actionEvent={handleQuickAddMission}
            />
          )}
          <SubmitButton loading={isLoading}>Ajouter</SubmitButton>
        </div>
      </Form>
    </div>
  );
}

function Evenements() {
  const dispatch = useDispatch();
  const { missions } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.auth);
  const { isLoading, evenements } = useSelector((state) => state.quotidien);

  const {
    setNotificationContent,
    switchNotification,
    switchModal,
    setSlideOverContent,
    switchSlideOver,
  } = useAppContext();

  React.useEffect(() => {
    dispatch(getMissions());
    dispatch(getEvenements());
  }, []);

  const showEditEvenementForm = (eventId, eventDatas) => {
    setSlideOverContent({
      title: "Modifier un évènement",
      description:
        "Veuillez remplir le formulaire pour modifier cet évènement.",
      body: <EditEvent eventId={eventId} eventDatas={eventDatas} />,
    });
    switchSlideOver(true);
  };

  const showNewEvenementForm = () => {
    setSlideOverContent({
      title: "Nouveau evenement",
      description:
        "Veuillez remplir le formulaire pour créer une nouveau evenement.",
      body: <AddEvent />,
    });
    switchSlideOver(true);
  };

  const handleDeleteEvent = (id) => {
    switchModal(true, {
      type: "danger",
      title: "Supprimer un evenement",
      description:
        "Etes-vous sûr de vouloir supprimer ce membre? Cette action est irréversible.",
      sideEvent: () => {
        dispatch(deleteEvenement(id))
          .unwrap()
          .then(() => {
            setNotificationContent({
              type: "success",
              title: "Succès",
              description: "L'évènement a bien été supprimé",
            });

            switchNotification(true);
          })
          .catch((err) => {
            console.log(err);
            setNotificationContent({
              type: "error",
              title: "Erreur",
              description:
                "Une erreur est survenue lors de la suppression de l'évènement",
            });

            switchNotification(true);
          });
      },
    });
  };

  const [formatedEvents, setFormatedEvents] = React.useState([]);
  React.useEffect(() => {
    if (evenements.length > 0) {
      let newDatas = evenements?.map((event) => {
        return {
          f_mission: missions?.find((mission) => mission.id === event.mission)
            ?.libelle,
          f_date: dayjs(event.date).format("DD/MM/YYYY"),
          ...event,
        };
      });
      let eventsToShow =
        user?.mission?.id !== 0
          ? newDatas.filter((event) => event.mission === user?.mission?.id)
          : newDatas;
      setFormatedEvents(eventsToShow);
    } else {
      setFormatedEvents([]);
    }
  }, [evenements]);

  const columns = React.useMemo(() => [
    {
      Header: "Mission",
      accessor: "f_mission",
      Filter: SelectColumnFilter,
    },
    {
      Header: "Libellé",
      accessor: "libelle",
    },
    {
      Header: "Lieu",
      accessor: "description",
    },
    {
      Header: "Date",
      accessor: "f_date",
    },
    {
      Header: "Actions",
      accessor: "id",
      Cell: ({ value, row }) => {
        const eventDatas = row.original;
        const eventId = value;
        return (
          <div className="flex space-x-2">
            <div
              onClick={() => {
                showEditEvenementForm(eventId, eventDatas);
              }}
              className="cursor-pointer"
            >
              <PencilIcon className="text-mde-red h-5 w-5" />
            </div>
            <div
              onClick={() => handleDeleteEvent(value)}
              className="cursor-pointer"
            >
              <TrashIcon className="text-mde-red h-5 w-5" />
            </div>
          </div>
        );
      },
    },
  ]);

  return (
    <Layout>
      <PageContent
        title={"Evènements"}
        actionButton={{
          title: "Ajouter un évènement",
          event: showNewEvenementForm,
        }}
      >
        <div className="mt-2">
          <Table columns={columns} data={formatedEvents} withExport={false} />
        </div>
      </PageContent>
    </Layout>
  );
}

export default Evenements;
