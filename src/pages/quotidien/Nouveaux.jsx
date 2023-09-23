import React from "react";
import Layout from "../../components/common/Layout";
import PageContent from "../../components/common/PageContent";
import Table, { StatusPill, SelectColumnFilter } from "../../components/Table";
import {
  // ArrowRightIcon,
  PencilIcon,
  TrashIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/solid";

import { useDispatch, useSelector } from "react-redux";
import {
  getMembres,
  deleteMembre,
  editMembre,
  createTimeline,
} from "../../features/quotidien/quotidienSlice";
import { useAppContext } from "../../context/AppState";
import NewNouveau from "../../components/quotidien/NewNouveau";
import EditNouveau from "../../components/quotidien/EditNouveau";
import { getMissions } from "../../features/settings/settingsSlice";

function Nouveaux() {
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

  const {user} = useSelector(state => state.auth)

  const showNouveauForm = () => {
    setSlideOverContent({
      title: "Ajouter un nouveau",
      description: "Veuillez remplir le formulaire pour ajouter un nouveau.",
      body: <NewNouveau />,
    });
    switchSlideOver(true);
  };

  const showEditNouveauForm = (membreId, membreData) => {
    setSlideOverContent({
      title: "Modifier un nouveau",
      description: "Veuillez remplir le formulaire pour modifier ce nouveau.",
      body: <EditNouveau membreId={membreId} currentMembre={membreData} />,
    });
    switchSlideOver(true);
  };

  const handleDeleteNouveau = (nouveauId) => {
    switchModal(true, {
      type: "danger",
      title: "Supprimer un nouveau",
      description:
        "Etes-vous sûr de vouloir supprimer ce nouveau? Cette action est irréversible.",
      sideEvent: () => {
        dispatch(deleteMembre(nouveauId))
          .unwrap()
          .then(() => {
            setNotificationContent({
              type: "success",
              title: "Succès",
              description: "Le nouveau a bien été supprimé",
            });

            switchNotification(true);
          });
      },
    });
  };

  const handleMergeNouveau = (nouveauId) => {
    switchModal(true, {
      type: "warning",
      title: "Migrer un nouveau",
      description: "Etes-vous sûr de vouloir changer ce nouveau en membre ?.",
      sideEvent: () => {
        dispatch(
          editMembre({
            id: nouveauId,
            datas: {
              merged: true,
            },
          })
        )
          .unwrap()
          .then(() => {
            let timelineData = {action: "Ce nouveau a été changé en membre", membre: nouveauId}
            dispatch(createTimeline(timelineData))

            setNotificationContent({
              type: "success",
              title: "Succès",
              description: "Le nouveau a bien été changé en membre",
            });

            switchNotification(true);
          });
      },
    });
  };

  React.useEffect(() => {
    dispatch(getMissions());
    dispatch(getMembres());
  }, []);

  const [formatedMembres, setFormatedMembres] = React.useState([]);
  React.useEffect(() => {
    if (membres.length > 0) {
      let nouveaux = membres?.filter(
        (membre) => membre.nouveau === true && membre.merged === false
      );
      let newDatas = nouveaux?.map((membre) => {
        return {
          full_name: membre.nom + " " + membre.prenom,
          f_sexe: membre.sexe,
          f_marie: membre.marie === true ? "Marié(e)" : "Célibataire",
          f_baptise: membre.baptise === true ? "Oui" : "Non",
          f_habitation: membre.habitation,
          f_contact: membre.contact,
          f_mission: missions?.find((mission) => mission.id === membre.mission)
            ?.libelle,
          ...membre,
        };
      });
      let datasToShow = user?.mission?.id !== 0 ? newDatas?.filter(membre => membre.mission === user?.mission?.id) : newDatas
      setFormatedMembres(datasToShow);
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
      {
        Header: "Sexe",
        accessor: "f_sexe",
        // Filter: SelectColumnFilter,
      },
      {
        Header: "Suivi par",
        accessor: "encadreur",
        Filter: SelectColumnFilter
      },
      {
        Header: "Fonction",
        accessor: "fonction",
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
              <div
                onClick={() => {
                  handleMergeNouveau(membreId);
                }}
                className="cursor-pointer"
              >
                <ArrowsUpDownIcon className="text-mde-red h-5 w-5" />
              </div>
              <div
                onClick={() => {
                  showEditNouveauForm(membreId, membreDatas);
                }}
                className="cursor-pointer"
              >
                <PencilIcon className="text-mde-red h-5 w-5" />
              </div>
              <div
                onClick={() => handleDeleteNouveau(membreId)}
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
        title={"Suivi des nouveaux"}
        actionButton={{ title: "Ajouter un nouveau", event: showNouveauForm }}
      >
        <div className="mt-2">
          <Table columns={columns} data={formatedMembres} withExport={true} modeExportation={"nouveaux"} />
        </div>
      </PageContent>
    </Layout>
  );
}

export default Nouveaux;
