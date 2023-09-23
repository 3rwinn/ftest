import React from "react";
import Layout from "../../components/common/Layout";
import PageContent from "../../components/common/PageContent";
import Table, { SelectColumnFilter } from "../../components/Table";
import {
  // ArrowRightIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

import { useDispatch, useSelector } from "react-redux";
import { getMembres } from "../../features/quotidien/quotidienSlice";
import {
  deleteEngagement,
  getEngagements,
} from "../../features/engagement/engagementSlice";
import { useAppContext } from "../../context/AppState";
import { getMissions, getPaliers } from "../../features/settings/settingsSlice";
import NewEngagement from "../../components/engagement/NewEngagement";
import EditEngagement from "../../components/engagement/EditEngagement";
import { formatNumberToMoney } from "../../utils/helpers";
import dayjs from "dayjs";

function EngagementAnnuaire() {
  const dispatch = useDispatch();
  const { isLoading, engagements } = useSelector((state) => state.engagement);
  const { membres } = useSelector((state) => state.quotidien);
  const { missions, paliers } = useSelector((state) => state.settings);
  const {user} = useSelector((state) => state.auth)

  const {
    switchSlideOver,
    setSlideOverContent,
    setNotificationContent,
    switchNotification,
    switchModal,
  } = useAppContext();

  const showNewEngagementForm = () => {
    setSlideOverContent({
      title: "Nouvel engagement",
      description:
        "Veuillez remplir le formulaire pour créer un nouveau engagement.",
      body: <NewEngagement />,
    });
    switchSlideOver(true);
  };

  const showEditEngagementForm = (engagementId, engagementData) => {
    setSlideOverContent({
      title: "Modifier un engagement",
      description:
        "Veuillez remplir le formulaire pour modifier cet engagement.",
      body: (
        <EditEngagement
          engagementId={engagementId}
          currentEngagement={engagementData}
        />
      ),
    });
    switchSlideOver(true);
  };

  const handleDeleteEngagement = (engagementId) => {
    switchModal(true, {
      type: "danger",
      title: "Supprimer un engagement",
      description:
        "Etes-vous sûr de vouloir supprimer cet engagement? Cette action est irréversible.",
      sideEvent: () => {
        dispatch(deleteEngagement(engagementId))
          .unwrap()
          .then(() => {
            setNotificationContent({
              type: "success",
              title: "Succès",
              description: "L'engagement a bien été supprimé",
            });

            switchNotification(true);
          });
      },
    });
  };

  React.useEffect(() => {
    dispatch(getMissions());
    dispatch(getMembres());
    dispatch(getPaliers());
    dispatch(getEngagements());
  }, []);

  const [formatedEngagements, setFormatedEngagements] = React.useState([]);
  React.useEffect(() => {
    if (engagements.length > 0) {
      let newDatas = engagements?.map((engagement) => {
        const membre = membres?.find(
          (membre) => membre.id === engagement.membre
        );

        return {
          full_name: membre?.nom + " " + membre?.prenom,
          f_palier: formatNumberToMoney(
            paliers?.find((palier) => palier.id === engagement.palier)?.montant
          ),
          f_mission: missions?.find(
            (mission) => mission.id === engagement.mission
          )?.libelle,
          f_date: dayjs(engagement.annee).format("DD/MM/YYYY"),
          ...engagement,
        };
      });
      let filteredDatas = user?.mission?.id !== 0 ? newDatas?.filter(engagement => engagement.mission === user?.mission?.id) : newDatas
      setFormatedEngagements(filteredDatas);
      // setFormatedEngagements(newDatas);

    } else {
      setFormatedEngagements([]);
    }
  }, [engagements, membres, missions, paliers]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Mission",
        accessor: "f_mission",
        Filter: SelectColumnFilter,
      },
      {
        Header: "Membre",
        accessor: "full_name",
        filter: "includes",
      },
      {
        Header: "Palier",
        accessor: "f_palier",
        Filter: SelectColumnFilter,
      },
      // {
      //   Header: "Date",
      //   accessor: "f_date",
      // },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ value, row }) => {
          let engagementDatas = row.original;
          let engagementId = value;
          return (
            <div className="flex space-x-2">
              <div
                onClick={() => {
                  showEditEngagementForm(engagementId, engagementDatas);
                }}
                className="cursor-pointer"
              >
                <PencilIcon className="text-mde-red h-5 w-5" />
              </div>
              <div
                onClick={() => handleDeleteEngagement(engagementId)}
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
        title={"Liste des engagements"}
        actionButton={{
          title: "Nouvel engagement",
          event: showNewEngagementForm,
        }}
      >
        <div className="mt-2">
          <Table
            columns={columns}
            data={formatedEngagements}
            withExport={false}
          />
        </div>
      </PageContent>
    </Layout>
  );
}

export default EngagementAnnuaire;
