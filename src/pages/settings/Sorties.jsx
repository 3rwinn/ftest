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
  deleteSortie,
  getSorties,
} from "../../features/settings/settingsSlice";
import { useAppContext } from "../../context/AppState";
import NewSortie from "../../components/settings/NewSortie";
import EditSortie from "../../components/settings/EditSortie";

function Sorties() {
  const dispatch = useDispatch();
  const { isLoading, sorties } = useSelector((state) => state.settings);

  const {
    switchSlideOver,
    setSlideOverContent,
    setNotificationContent,
    switchNotification,
    switchModal,
  } = useAppContext();

  const showNewSortieForm = () => {
    setSlideOverContent({
      title: "Nouveau type de sortie",
      description:
        "Veuillez remplir le formulaire pour créer un nouveau type de sortie.",
      body: <NewSortie />,
    });
    switchSlideOver(true);
  };

  const showEditSortieForm = (sortieId, sortieData) => {
    setSlideOverContent({
      title: "Modifier un type de sortie",
      description:
        "Veuillez remplir le formulaire pour modifier ce type de sortie.",
      body: <EditSortie sortieId={sortieId} currentSortie={sortieData} />,
    });
    switchSlideOver(true);
  };

  const handleDeleteSortie = (sortieId) => {
    switchModal(true, {
      type: "danger",
      title: "Supprimer un type de sortie",
      description:
        "Etes-vous sûr de vouloir supprimer ce type de sortie? Cette action est irréversible.",
      sideEvent: () => {
        dispatch(deleteSortie(sortieId))
          .unwrap()
          .then(() => {
            setNotificationContent({
              type: "success",
              title: "Succès",
              description: "Le type de sortie a bien été supprimé",
            });

            switchNotification(true);
          });
      },
    });
  };

  React.useEffect(() => {
    dispatch(getSorties());
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
          let sortieDatas = row.original;
          let sortieId = value;

          return (
            <div className="flex space-x-2">
              <div
                onClick={() => {
                  showEditSortieForm(sortieId, sortieDatas);
                }}
                className="cursor-pointer"
              >
                <PencilIcon className="text-mde-red h-5 w-5" />
              </div>
              <div
                onClick={() => handleDeleteSortie(sortieId)}
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
        title={"Gestion des types de sorties"}
        actionButton={{
          title: "Nouveau type de sortie",
          event: showNewSortieForm,
        }}
      >
        <div className="mt-2">
          <Table columns={columns} data={sorties} withExport={false} />
        </div>
      </PageContent>
    </Layout>
  );
}

export default Sorties;
