import React from "react";
import Layout from "../../components/common/Layout";
import PageContent from "../../components/common/PageContent";
import Table, { SelectColumnFilter } from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { getMembres } from "../../features/quotidien/quotidienSlice";
import {
  deleteMouvement,
  getEngagements,
  getMouvements,
} from "../../features/engagement/engagementSlice";
import { useAppContext } from "../../context/AppState";
import { getMissions, getPaliers } from "../../features/settings/settingsSlice";
import { formatLocaleEn, formatNumberToMoney } from "../../utils/helpers";
import dayjs from "dayjs";
import { BanknotesIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import NewMouvement from "../../components/engagement/NewMouvement";
import EditMouvement from "../../components/engagement/EditMouvement";
import CustomDateRangePicker from "../../components/common/CustomDateRangePicker";
import WaitingDatas from "../../components/WaitingDatas";

function Container({ title, actionButton, handleDateRangeChange, children }) {
  return (
    <Layout>
      <PageContent title={title} actionButton={actionButton}>
        <div className="flex flex-row-reverse mb-5">
          <div className="self-end">
            <CustomDateRangePicker onDateRangeChange={handleDateRangeChange} />
          </div>
        </div>
        {children}
      </PageContent>
    </Layout>
  );
}

function Mouvement() {
  const dispatch = useDispatch();
  const { isLoading, mouvements, totalEntree, totalEntreeByDate, engagements } = useSelector(
    (state) => state.engagement
  );
  const { membres } = useSelector((state) => state.quotidien);
  const { paliers, missions } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.auth);

  const [dateRange, setDateRange] = React.useState({
    from: new Date(new Date().getFullYear(), 1, 1),
    to: new Date(),
  });

  const handleDateRangeChange = (dateRange) => {
    // handle the selected date range here
    setDateRange(dateRange);
  };

  React.useEffect(() => {
    dispatch(getEngagements());
    dispatch(getMembres());
    dispatch(getMissions());
    dispatch(getPaliers());
    dispatch(
      getMouvements({
        start_date: formatLocaleEn(dateRange.from),
        end_date: formatLocaleEn(dateRange.to),
      })
    );
  }, [dateRange]);

  const [formatedMouvements, setFormatedMouvements] = React.useState([]);

  React.useEffect(() => {
    if (mouvements.length > 0 && engagements.length > 0) {
      const formatedMouvements = mouvements.map((mouvement) => {
        const engagementOfMouvement = engagements.find(
          (engagement) => engagement.id === mouvement.engagement
        );
        const membre = membres.find(
          (m) => m.id === engagementOfMouvement?.membre
        );
        const mission = missions.find(
          (m) => m.id === engagementOfMouvement?.mission
        );
        const palier = paliers.find(
          (p) => p.id === engagementOfMouvement?.palier
        );
        return {
          f_membre: membre?.nom + " " + membre?.prenom,
          f_mission: mission?.libelle,
          f_palier: formatNumberToMoney(palier?.montant),
          f_montant: formatNumberToMoney(mouvement.montant),
          f_date: dayjs(mouvement?.date).format("DD/MM/YYYY"),
          mission: mission?.id,
          ...mouvement,
        };
      });
      let mouvementToShow =
        user?.mission?.id !== 0
          ? formatedMouvements.filter((m) => m.mission === user?.mission?.id)
          : formatedMouvements;
      setFormatedMouvements(mouvementToShow);
      // setFormatedMouvements(formatedMouvements);
      // console.log("rea", formatedMouvements);
    } else {
      setFormatedMouvements([]);
    }
  }, [engagements, mouvements, membres, missions, paliers]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Mission",
        accessor: "f_mission",
        Filter: SelectColumnFilter,
      },
      {
        Header: "Membre",
        accessor: "f_membre",
        filter: "includes",
      },
      {
        Header: "Palier (FCFA)",
        accessor: "f_palier",
        Filter: SelectColumnFilter,
      },
      {
        Header: "Versement (FCFA)",
        accessor: "f_montant",
      },
      {
        Header: "Date",
        accessor: "f_date",
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ value, row }) => {
          let mouvementDatas = row.original;
          let mouvementId = value;
          return (
            <div className="flex space-x-2">
              <div
                onClick={() => {
                  showEditMouvementForm(mouvementId, mouvementDatas);
                }}
                className="cursor-pointer"
              >
                <PencilIcon className="text-mde-red h-5 w-5" />
              </div>
              <div
                onClick={() => handleDeleteMouvement(mouvementId)}
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

  const {
    switchSlideOver,
    setSlideOverContent,
    setNotificationContent,
    switchNotification,
    switchModal,
  } = useAppContext();

  const showNewMouvementForm = () => {
    setSlideOverContent({
      title: "Nouvelle entrée",
      description:
        "Veuillez remplir le formulaire pour créer une nouvelle entrée.",
      body: <NewMouvement />,
    });
    switchSlideOver(true);
  };

  const showEditMouvementForm = (mouvementId, mouvementData) => {
    setSlideOverContent({
      title: "Modifier une entrée",
      description: "Veuillez remplir le formulaire pour modifier cette entrée.",
      body: (
        <EditMouvement
          mouvementId={mouvementId}
          currentMouvement={mouvementData}
        />
      ),
    });
    switchSlideOver(true);
  };

  const handleDeleteMouvement = (mouvementId) => {
    switchModal(true, {
      type: "danger",
      title: "Supprimer une entrée",
      description: "Êtes-vous sûr de vouloir supprimer cette entrée ?",
      sideEvent: () => {
        dispatch(deleteMouvement(mouvementId))
          .unwrap()
          .then(() => {
            setNotificationContent({
              type: "success",
              title: "Succès",
              description: "L'entrée a bien été supprimé",
            });

            switchNotification(true);
          });
      },
    });
  };

  if (isLoading)
    return (
      <Container
        title={"Liste des entrées"}
        handleDateRangeChange={handleDateRangeChange}
      >
        <WaitingDatas />
      </Container>
    );

  return (
    <Container
      title={"Liste des entrées"}
      actionButton={{
        title: "Nouvelle entrée",
        event: showNewMouvementForm,
      }}
      handleDateRangeChange={handleDateRangeChange}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
        <div className="bg-green-500 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BanknotesIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-white truncate">
                    Total des entrées
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-white">
                      {formatNumberToMoney(totalEntree)} FCFA
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-orange-500 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BanknotesIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-white truncate">
                    Total des entrées sur la periode
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-white">
                      {formatNumberToMoney(totalEntreeByDate)} FCFA
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Table
          columns={columns}
          data={formatedMouvements}
          withExport={true}
          modeExportation={"engagement_entrees"}
        />
      </div>
    </Container>
  );
}

export default Mouvement;
