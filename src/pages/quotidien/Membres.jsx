import React from "react";
import Layout from "../../components/common/Layout";
import PageContent from "../../components/common/PageContent";
import Table, { StatusPill, SelectColumnFilter } from "../../components/Table";
import {
  EyeIcon,
  // ArrowRightIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteMembre,
  getMembres,
  getTimelines,
} from "../../features/quotidien/quotidienSlice";
import { useAppContext } from "../../context/AppState";
import NewMembre from "../../components/quotidien/NewMembre";
import EditMembre from "../../components/quotidien/EditMembre";
import { getMissions } from "../../features/settings/settingsSlice";
import { classNames } from "../../utils/helpers";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import MembreTimeline from "../../components/quotidien/MembreTimeline";

function Membres() {
  const dispatch = useDispatch();
  const { isLoading, membres } = useSelector((state) => state.quotidien);
  const { missions } = useSelector((state) => state.settings);

  const {
    switchSlideOver,
    setSlideOverContent,
    setNotificationContent,
    switchNotification,
    switchModal,
  } = useAppContext();

  const { user } = useSelector((state) => state.auth);

  const showTimeLine = (membreId) => {
    setSlideOverContent({
      title: "Timeline",
      description: "Historique des actions sur ce membre.",
      body: <MembreTimeline membreId={membreId} />,
    });
    switchSlideOver(true);
  };

  const showNewMembreForm = () => {
    setSlideOverContent({
      title: "Nouveau membre",
      description:
        "Veuillez remplir le formulaire pour créer une nouveau membre.",
      body: <NewMembre />,
    });
    switchSlideOver(true);
  };

  const showEditMembreForm = (membreId, membreData) => {
    setSlideOverContent({
      title: "Modifier un membre",
      description: "Veuillez remplir le formulaire pour modifier ce membre.",
      body: <EditMembre membreId={membreId} currentMembre={membreData} />,
    });
    switchSlideOver(true);
  };

  const handleDeleteMembre = (membreId) => {
    switchModal(true, {
      type: "danger",
      title: "Supprimer un membre",
      description:
        "Etes-vous sûr de vouloir supprimer ce membre? Cette action est irréversible.",
      sideEvent: () => {
        dispatch(deleteMembre(membreId))
          .unwrap()
          .then(() => {
            setNotificationContent({
              type: "success",
              title: "Succès",
              description: "Le membre a bien été supprimé",
            });

            switchNotification(true);
          });
      },
    });
  };

  React.useEffect(() => {
    dispatch(getMissions());
    dispatch(getMembres());
    dispatch(getTimelines());
  }, []);

  const [formatedMembres, setFormatedMembres] = React.useState([]);
  React.useEffect(() => {
    if (membres.length > 0) {
      let real_membres = membres.filter(
        (membre) =>
          (membre.nouveau === false && membre.merged === false) ||
          (membre.nouveau === true && membre.merged === true)
      );
      let newDatas = real_membres?.map((membre) => {
        return {
          full_name: membre.nom + " " + membre.prenom,
          f_sexe: membre.sexe,
          f_marie: membre.marie === true ? "Marié(e)" : "Célibataire",
          f_baptise: membre.baptise === true ? "Oui" : "Non",
          f_nouveau: membre.nouveau === true ? "Oui" : "Non",
          f_habitation: membre.habitation,
          f_contact: membre.contact,
          f_mission: missions?.find((mission) => mission.id === membre.mission)
            ?.libelle,
          ...membre,
        };
      });
      let membresToShow =
        user?.mission?.id !== 0
          ? newDatas.filter((membre) => membre.mission === user?.mission?.id)
          : newDatas;
      setFormatedMembres(membresToShow);
    } else {
      setFormatedMembres([]);
    }
  }, [membres]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Mission",
        accessor: "f_mission",
        Filter: SelectColumnFilter,
      },
      {
        Header: "Nom complet",
        accessor: "full_name",
        filter: "includes",
      },
      {
        Header: "S. matrimoniale",
        accessor: "f_marie",
        Filter: SelectColumnFilter,
      },
      {
        Header: "Baptisé",
        accessor: "f_baptise",
        Cell: StatusPill,
        Filter: SelectColumnFilter,
      },
      // {
      //   Header: "Sexe",
      //   accessor: "f_sexe",
      //   Filter: SelectColumnFilter,
      // },
      {
        Header: "Fonction",
        accessor: "fonction",
      },
      {
        Header: "Nouveau",
        accessor: "f_nouveau",
        Cell: StatusPill,
        Filter: SelectColumnFilter,
      },

      //   {
      //     Header: "Habitation",
      //     accessor: "habitation",
      //   },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ value, row }) => {
          let membreDatas = row.original;
          let membreId = value;
          return (
            <div className="flex space-x-2">
              {membreDatas.nouveau === true && (
                <div
                  onClick={() => {
                    showTimeLine(membreId);
                  }}
                  className="cursor-pointer"
                >
                  <EyeIcon className="text-mde-red h-5 w-5" />
                </div>
              )}
              <div
                onClick={() => {
                  showEditMembreForm(membreId, membreDatas);
                }}
                className="cursor-pointer"
              >
                <PencilIcon className="text-mde-red h-5 w-5" />
              </div>
              <div
                onClick={() => handleDeleteMembre(membreId)}
                className="cursor-pointer"
              >
                <TrashIcon className="text-mde-red h-5 w-5" />
              </div>
            </div>
          );
        },
      },
    ],
    []
  );
  return (
    <Layout>
      <PageContent
        title={"Annuaire des membres"}
        actionButton={{ title: "Nouveau membre", event: showNewMembreForm }}
      >
        <div className="mt-2">
          <Table
            columns={columns}
            data={formatedMembres}
            withExport={true}
            modeExportation={"membres"}
          />
        </div>
      </PageContent>
    </Layout>
  );
}

export default Membres;
