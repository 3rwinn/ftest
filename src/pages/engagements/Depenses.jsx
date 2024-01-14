import React from "react";
import Layout from "../../components/common/Layout";
import PageContent from "../../components/common/PageContent";
import Table, { AvatarCell, SelectColumnFilter } from "../../components/Table";
import {
  ArrowUpLeftIcon,
  BanknotesIcon,
  // ArrowRightIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDepense,
  getDepenses,
  getEngagementStats,
  getEngagementStatsByMission,
} from "../../features/engagement/engagementSlice.js";
import { useAppContext } from "../../context/AppState";
import NewDepense from "../../components/engagement/NewDepense";
import EditDepense from "../../components/engagement/EditDepense";
import { formatLocaleEn, formatNumberToMoney } from "../../utils/helpers";
import dayjs from "dayjs";
import { getMissions } from "../../features/settings/settingsSlice";
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

function Depenses() {
  const dispatch = useDispatch();
  const { isLoading, depenses, totalDepense, totalDepenseByDate } = useSelector(
    (state) => state.engagement
  );

  const { user } = useSelector((state) => state.auth);

  const {
    switchSlideOver,
    setSlideOverContent,
    setNotificationContent,
    switchNotification,
    switchModal,
  } = useAppContext();

  const [dateRange, setDateRange] = React.useState({
    from: `${new Date().getFullYear()}-01-01`,
    to: new Date(),
  });

  const handleDateRangeChange = (dateRange) => {
    // handle the selected date range here
    setDateRange(dateRange);
  };

  React.useEffect(() => {
    dispatch(
      getDepenses({
        start_date: formatLocaleEn(dateRange.from),
        end_date: formatLocaleEn(dateRange.to),
      })
    );
  }, [dateRange]);

  const showNewDepenseForm = () => {
    setSlideOverContent({
      title: "Nouvelle depense",
      description:
        "Veuillez remplir le formulaire pour créer une nouvelle depense.",
      body: <NewDepense />,
    });
    switchSlideOver(true);
  };

  const showEditDepenseForm = (depenseId, depenseData) => {
    setSlideOverContent({
      title: "Modifier une depense",
      description:
        "Veuillez remplir le formulaire pour modifier cette depense.",
      body: <EditDepense depenseId={depenseId} currentDepense={depenseData} />,
    });
    switchSlideOver(true);
  };

  const handleDeleteDepense = (depenseId) => {
    switchModal(true, {
      type: "danger",
      title: "Supprimer une depense",
      description:
        "Etes-vous sûr de vouloir supprimer cette depense? Cette action est irréversible.",
      sideEvent: () => {
        dispatch(deleteDepense(depenseId))
          .unwrap()
          .then(() => {
            setNotificationContent({
              type: "success",
              title: "Succès",
              description: "La dépense a bien été supprimé",
            });

            switchNotification(true);
          });
      },
    });
  };

  const [formatedDepenses, setFormatedDepenses] = React.useState([]);
  React.useEffect(() => {
    if (depenses.length > 0) {
      const formated = depenses.map((depense) => {
        return {
          f_montant: formatNumberToMoney(depense.montant),
          f_date: dayjs(depense.date).format("DD/MM/YYYY"),

          ...depense,
        };
      });

      setFormatedDepenses(formated);
    } else {
      setFormatedDepenses([]);
    }
  }, [depenses]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Libelle",
        accessor: "libelle",
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
        Header: "Actions",
        accessor: "id",
        Cell: ({ value, row }) => {
          let depenseDatas = row.original;
          let depenseId = value;

          return (
            <div className="flex space-x-2">
              <div
                onClick={() => {
                  showEditDepenseForm(depenseId, depenseDatas);
                }}
                className="cursor-pointer"
              >
                <PencilIcon className="text-mde-red h-5 w-5" />
              </div>
              <div
                onClick={() => handleDeleteDepense(depenseId)}
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
        title={"Gestion des dépenses"}
        handleDateRangeChange={handleDateRangeChange}
      >
        <WaitingDatas />
      </Container>
    );

  return (
    <Container
      title={"Gestion des depenses"}
      actionButton={{ title: "Nouvelle depense", event: showNewDepenseForm }}
      handleDateRangeChange={handleDateRangeChange}
    >
      {user?.mission?.id === 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
          <div className="bg-red-500 overflow-hidden shadow rounded-lg">
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
                      Total des dépenses
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-white">
                        {formatNumberToMoney(totalDepense)} FCFA
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
                  <ArrowUpLeftIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-white truncate">
                      Total des dépenses sur la periode
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-white">
                        {formatNumberToMoney(totalDepenseByDate)} FCFA
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Liste des dépenses
        </h1>
        <Table
          columns={columns}
          data={formatedDepenses}
          withExport={true}
          modeExportation={"engagement_depenses"}
        />
      </div>
    </Container>
  );
}

export default Depenses;
