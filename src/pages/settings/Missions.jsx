import React from "react";
import Layout from "../../components/common/Layout";
import PageContent from "../../components/common/PageContent";
import Table, { AvatarCell, SelectColumnFilter } from "../../components/Table";
import {
  // ArrowRightIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMission,
  getMissions,
} from "../../features/settings/settingsSlice";
import { useAppContext } from "../../context/AppState";
import NewMission from "../../components/settings/NewMission";
import EditMission from "../../components/settings/EditMission";

function Missions() {
  const dispatch = useDispatch();
  const { isLoading, missions } = useSelector((state) => state.settings);

  const {
    switchSlideOver,
    setSlideOverContent,
    setNotificationContent,
    switchNotification,
    switchModal,
  } = useAppContext();

  const showNewMissionForm = () => {
    setSlideOverContent({
      title: "Nouvelle mission",
      description:
        "Veuillez remplir le formulaire pour créer une nouvelle mission.",
      body: <NewMission />,
    });
    switchSlideOver(true);
  };

  const showEditMissionForm = (missionId, missionData) => {
    setSlideOverContent({
      title: "Modifier une mission",
      description:
        "Veuillez remplir le formulaire pour modifier cette mission.",
      body: <EditMission missionId={missionId} currentMission={missionData} />,
    });
    switchSlideOver(true);
  };

  const handleDeleteMission = (missionId) => {
    switchModal(true, {
      type: "danger",
      title: "Supprimer une mission",
      description:
        "Etes-vous sûr de vouloir supprimer cette mission? Cette action est irréversible.",
      sideEvent: () => {
        dispatch(deleteMission(missionId))
          .unwrap()
          .then(() => {
            setNotificationContent({
              type: "success",
              title: "Succès",
              description: "La mission a bien été supprimé",
            });

            switchNotification(true);
          });
      },
    });
  };

  React.useEffect(() => {
    dispatch(getMissions());
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Libelle",
        accessor: "libelle",
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ value, row }) => {
          let missionDatas = row.original;
          let missionId = value;

          return (
            <div className="flex space-x-2">
              <div
                onClick={() => {
                  showEditMissionForm(missionId, missionDatas);
                }}
                className="cursor-pointer"
              >
                <PencilIcon className="text-mde-red h-5 w-5" />
              </div>
              <div
                onClick={() => handleDeleteMission(missionId)}
                className="cursor-pointer"
              >
                <TrashIcon className="text-mde-red h-5 w-5" />
              </div>
            </div>
          );
        }, // new
      },
    ],
    []
  );
  return (
    <Layout>
      <PageContent
        title={"Gestion des missions"}
        actionButton={{ title: "Nouvelle mission", event: showNewMissionForm }}
      >
        <div className="mt-2">
          <Table columns={columns} data={missions} withExport={false} />
        </div>
      </PageContent>
    </Layout>
  );
}

export default Missions;
