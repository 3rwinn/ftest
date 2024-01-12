import React from "react";
import Layout from "../../components/common/Layout";
import PageContent from "../../components/common/PageContent";
import Table, { SelectColumnFilter } from "../../components/Table";
import {
  ArrowUpLeftIcon,
  BanknotesIcon,
  // ArrowRightIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { useAppContext } from "../../context/AppState";
import {
  deleteSuiviBanque,
  getSuiviBanque,
} from "../../features/finance/financeSlice";
// import NewDepense from "../../components/engagement/NewDepense";
// import EditDepense from "../../components/engagement/EditDepense";
import { formatLocaleEn, formatNumberToMoney } from "../../utils/helpers";
import dayjs from "dayjs";
import NewSuiviBanque from "../../components/finances/NewSuiviBanque";
import EditSuiviBanque from "../../components/finances/EditSuiviBanque";
import {
  ArchiveBoxIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import CustomDateRangePicker from "../../components/common/CustomDateRangePicker";
import WaitingDatas from "../../components/WaitingDatas";
import { getMissions } from "../../features/settings/settingsSlice";

const typeSuivi = [
  { id: 1, value: "versement", name: "Versement" },
  { id: 2, value: "retrait", name: "Retrait" },
];

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

function SuiviBanque() {
  const dispatch = useDispatch();

  const { missions } = useSelector((state) => state.settings);
  const { isLoading, suiviBanque, totalSuiviBanque, missionSuivi } =
    useSelector((state) => state.finances);

  const {
    switchSlideOver,
    setSlideOverContent,
    setNotificationContent,
    switchNotification,
    switchModal,
  } = useAppContext();

  const showNewTransactionForm = () => {
    setSlideOverContent({
      title: "Nouvelle transaction",
      description:
        "Veuillez remplir le formulaire pour créer une nouvelle transaction.",
      body: <NewSuiviBanque />,
    });
    switchSlideOver(true);
  };

  const showEditTransactionForm = (transactionId, transactionData) => {
    setSlideOverContent({
      title: "Modifier une transaction",
      description:
        "Veuillez remplir le formulaire pour modifier cette transaction.",
      body: (
        <EditSuiviBanque
          transactionId={transactionId}
          currentTransaction={transactionData}
        />
      ),
    });
    switchSlideOver(true);
  };

  const handleDeleteTransaction = (transactionId) => {
    switchModal(true, {
      type: "danger",
      title: "Supprimer une transaction",
      description:
        "Etes-vous sûr de vouloir supprimer cette transaction? Cette action est irréversible.",
      sideEvent: () => {
        dispatch(deleteSuiviBanque(transactionId))
          .unwrap()
          .then(() => {
            setNotificationContent({
              type: "success",
              title: "Succès",
              description: "La transaction a bien été supprimée",
            });

            switchNotification(true);
          });
      },
    });
  };

  const [dateRange, setDateRange] = React.useState({
    from: `${new Date().getFullYear()}-01-01`,
    to: new Date(),
  });

  const handleDateRangeChange = (dateRange) => {
    // handle the selected date range here
    setDateRange(dateRange);
  };

  React.useEffect(() => {
    dispatch(getMissions());
    dispatch(
      getSuiviBanque({
        start_date: formatLocaleEn(dateRange.from),
        end_date: formatLocaleEn(dateRange.to),
      })
    );
    
    // dispatch(getEngagementStats());
  }, [dateRange]);

  const [formatedTransactions, setFormatedTransactions] = React.useState([]);
  React.useEffect(() => {
    if (suiviBanque.length > 0) {
      const formated = suiviBanque.map((suivi) => {
        return {
          f_montant: formatNumberToMoney(suivi.montant),
          f_date: dayjs(suivi.date).format("DD/MM/YYYY"),
          f_action: typeSuivi.find((type) => type.value === suivi.action)?.name,
          f_mission: missions.find((mission) => mission.id === suivi.mission)?.libelle,
          ...suivi,
        };
      });
      setFormatedTransactions(formated);
    } else {
      setFormatedTransactions([]);
    }
  }, [suiviBanque]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Mission",
        accessor: "f_mission",
        Filter: SelectColumnFilter
      },
      {
        Header: "Action",
        accessor: "f_action",
      },
      {
        Header: "Montant",
        accessor: "f_montant",
      },
      {
        Header: "Date",
        accessor: "f_date",
      },
      {
        Header: "Commentaire",
        accessor: "commentaire",
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ value, row }) => {
          let transactionDatas = row.original;
          let transactionId = value;

          return (
            <div className="flex space-x-2">
              <div
                onClick={() => {
                  showEditTransactionForm(transactionId, transactionDatas);
                }}
                className="cursor-pointer"
              >
                <PencilIcon className="text-mde-red h-5 w-5" />
              </div>
              <div
                onClick={() => handleDeleteTransaction(transactionId)}
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

  if (isLoading)
    return (
      <Container
        title={"Suivi banque"}
        handleDateRangeChange={handleDateRangeChange}
      >
        <WaitingDatas />
      </Container>
    );

  console.log("missionSuivi", missionSuivi);

  return (
    <Container
      title={"Suivi banque"}
      actionButton={{
        title: "Nouvelle transaction",
        event: showNewTransactionForm,
      }}
      handleDateRangeChange={handleDateRangeChange}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
        <div className="bg-green-500 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BuildingLibraryIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-white truncate">
                    Solde banque
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-white">
                      {formatNumberToMoney(totalSuiviBanque)} FCFA
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        {missionSuivi?.map((mission, index) => (
          <div key={index} className="bg-yellow-500 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ArchiveBoxIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-bold text-white truncate">
                      {mission.mission}
                    </dt>
                    <dd>
                      <div className="text-sm text-medium text-white">
                      Versement:  {formatNumberToMoney(mission.versement_total)} FCFA
                      </div>
                    </dd>
                    <dd>
                      <div className="text-sm font-medium text-white">
                      Retrait:  {formatNumberToMoney(mission.retrait_total)} FCFA
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        {/* <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Liste des transactions
          </h1> */}
        <Table
          columns={columns}
          data={formatedTransactions}
          withExport={true}
          modeExportation={"suivi_banque"}
        />
      </div>
    </Container>
  );
}

export default SuiviBanque;
