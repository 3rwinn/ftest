import React from "react";
import Layout from "../../components/common/Layout";
import PageContent from "../../components/common/PageContent";
import Table from "../../components/Table";
import {
  // ArrowRightIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEntree,
  getEntrees,
} from "../../features/settings/settingsSlice";
import { useAppContext } from "../../context/AppState";
import NewEntree from "../../components/settings/NewEntree";
import EditEntree from "../../components/settings/EditEntree";

function Entrees() {
  const dispatch = useDispatch();
  const { isLoading, entrees } = useSelector((state) => state.settings);

  const {
    switchSlideOver,
    setSlideOverContent,
    setNotificationContent,
    switchNotification,
    switchModal,
  } = useAppContext();

  const showNewEntreeForm = () => {
    setSlideOverContent({
      title: "Nouveau type d'entrée",
      description:
        "Veuillez remplir le formulaire pour créer un nouveau type d'entrée.",
      body: <NewEntree />,
    });
    switchSlideOver(true);
  };

  const showEditEntreeForm = (entreeId, entreeData) => {
    setSlideOverContent({
      title: "Modifier un type d'entrée",
      description:
        "Veuillez remplir le formulaire pour modifier ce type d'entrée.",
      body: <EditEntree entreeId={entreeId} currentEntree={entreeData} />,
    });
    switchSlideOver(true);
  };

  const handleDeleteEntree = (entreeId) => {
    switchModal(true, {
      type: "danger",
      title: "Supprimer un type d'entrée",
      description:
        "Etes-vous sûr de vouloir supprimer ce type d'entrée? Cette action est irréversible.",
      sideEvent: () => {
        dispatch(deleteEntree(entreeId))
          .unwrap()
          .then(() => {
            setNotificationContent({
              type: "success",
              title: "Succès",
              description: "Le type d'entrée a bien été supprimé",
            });

            switchNotification(true);
          });
      },
    });
  };

  React.useEffect(() => {
    dispatch(getEntrees());
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
          let entreeDatas = row.original;
          let entreeId = value;

          return (
            <div className="flex space-x-2">
              <div
                onClick={() => {
                  showEditEntreeForm(entreeId, entreeDatas);
                }}
                className="cursor-pointer"
              >
                <PencilIcon className="text-mde-red h-5 w-5" />
              </div>
              <div
                onClick={() => handleDeleteEntree(entreeId)}
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

  // const entreeDatas = entrees?.length > 0 ? entrees : [];

  console.log("entrees", entrees)

  return (
    <Layout>
      <PageContent
        title={"Gestion des types d'entrées"}
        actionButton={{
          title: "Nouveau type d'entrée",
          event: showNewEntreeForm,
        }}
      >
        <div className="mt-2">
          <Table columns={columns} data={entrees} withExport={false} />
        </div>
      </PageContent>
    </Layout>
  );
}

export default Entrees;
