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
  deletePalier,
  getPaliers,
} from "../../features/settings/settingsSlice";
import { useAppContext } from "../../context/AppState";
import NewPalier from "../../components/settings/NewPalier";
import EditPalier from "../../components/settings/EditPalier";
import { formatNumberToMoney } from "../../utils/helpers";

function Paliers() {
  const dispatch = useDispatch();
  const { isLoading, paliers } = useSelector((state) => state.settings);

  const {
    switchSlideOver,
    setSlideOverContent,
    setNotificationContent,
    switchNotification,
    switchModal,
  } = useAppContext();

  const showNewPalierForm = () => {
    setSlideOverContent({
      title: "Nouveau palier",
      description:
        "Veuillez remplir le formulaire pour créer un nouveau palier.",
      body: <NewPalier />,
    });
    switchSlideOver(true);
  };

  const showEditPalierForm = (palierId, palierData) => {
    setSlideOverContent({
      title: "Modifier un palier",
      description: "Veuillez remplir le formulaire pour modifier ce palier.",
      body: <EditPalier palierId={palierId} currentPalier={palierData} />,
    });
    switchSlideOver(true);
  };

  const handleDeletePalier = (palierId) => {
    switchModal(true, {
      type: "danger",
      title: "Supprimer un palier",
      description:
        "Etes-vous sûr de vouloir supprimer ce palier? Cette action est irréversible.",
      sideEvent: () => {
        dispatch(deletePalier(palierId))
          .unwrap()
          .then(() => {
            setNotificationContent({
              type: "success",
              title: "Succès",
              description: "La palier a bien été supprimé",
            });

            switchNotification(true);
          });
      },
    });
  };

  React.useEffect(() => {
    dispatch(getPaliers());
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Montant",
        accessor: "montant",
        Cell: ({ value, row }) => (
          <div>{`${formatNumberToMoney(value)} FCFA`}</div>
        ),
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ value, row }) => {
          let palierDatas = row.original;
          let palierId = value;

          return (
            <div className="flex space-x-2">
              <div
                onClick={() => {
                  showEditPalierForm(palierId, palierDatas);
                }}
                className="cursor-pointer"
              >
                <PencilIcon className="text-mde-red h-5 w-5" />
              </div>
              <div
                onClick={() => handleDeletePalier(palierId)}
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
        title={"Gestion des paliers"}
        actionButton={{ title: "Nouveau palier", event: showNewPalierForm }}
      >
        <div className="mt-2">
          <Table columns={columns} data={paliers} withExport={false} />
        </div>
      </PageContent>
    </Layout>
  );
}

export default Paliers;
