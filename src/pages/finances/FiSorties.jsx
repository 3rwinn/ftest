import React from "react";
import Layout from "../../components/common/Layout";
import PageContent from "../../components/common/PageContent";
import Table, { SelectColumnFilter } from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  BanknotesIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useAppContext } from "../../context/AppState";
import {
  deleteCaisseSortie,
  getCaisseSorties,
} from "../../features/finance/financeSlice";
import dayjs from "dayjs";
import {
  getSorties as getTypesSorties,
  getMissions,
} from "../../features/settings/settingsSlice";
import WaitingDatas from "../../components/WaitingDatas";
import NewSortieCaisse from "../../components/finances/NewSortieCaisse";
import EditSortieCaisse from "../../components/finances/EditSortieCaisse";
import { formatLocaleEn, formatNumberToMoney } from "../../utils/helpers";
import CustomDateRangePicker from "../../components/common/CustomDateRangePicker";

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

function FiSorties() {
  const dispatch = useDispatch();
  const {
    isLoading,
    sortiesCaisse,
    totalSortieCaisse,
    totalSortieCaisseByDate,
  } = useSelector((state) => state.finances);
  const typeSorties = useSelector((state) => state.settings.sorties);
  const missions = useSelector((state) => state.settings.missions);
  const { user } = useSelector((state) => state.auth);

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
      getCaisseSorties({
        start_date: formatLocaleEn(dateRange.from),
        end_date: formatLocaleEn(dateRange.to),
      })
    );
    dispatch(getTypesSorties());
    dispatch(getMissions());
  }, [dateRange]);

  const {
    switchSlideOver,
    setSlideOverContent,
    setNotificationContent,
    switchNotification,
    switchModal,
  } = useAppContext();

  const showNewSortieForm = () => {
    setSlideOverContent({
      title: "Nouvelle sortie",
      description:
        "Veuillez remplir le formulaire pour créer une nouvelle sortie.",
      body: <NewSortieCaisse />,
    });
    switchSlideOver(true);
  };

  const showEditSortieForm = (sortieId, sortieData) => {
    setSlideOverContent({
      title: "Modifier une sortie",
      description: "Veuillez remplir le formulaire pour modifier cette sortie.",
      body: <EditSortieCaisse sortieId={sortieId} currentSortie={sortieData} />,
    });
    switchSlideOver(true);
  };

  const handleDeleteSortie = (sortieId) => {
    switchModal(true, {
      type: "danger",
      title: "Supprimer une sortie",
      description:
        "Êtes-vous sûr de vouloir supprimer cette sortie de caisse ?",
      sideEvent: () => {
        dispatch(deleteCaisseSortie(sortieId))
          .unwrap()
          .then(() => {
            setNotificationContent({
              type: "success",
              title: "Succès",
              description: "La sortie de caisse a bien été supprimé",
            });

            switchNotification(true);
          });
      },
    });
  };

  const [formatedSorties, setFormatedSorties] = React.useState([]);
  React.useEffect(() => {
    if (sortiesCaisse?.length > 0) {
      const formattedData = sortiesCaisse?.map((sortie) => {
        return {
          f_date: dayjs(sortie.date).format("DD/MM/YYYY"),
          f_type: typeSorties.find((type) => type.id === sortie.type_sortie)
            ?.libelle,
          f_mission: missions.find((mission) => mission.id === sortie.mission)
            ?.libelle,
          f_montant: formatNumberToMoney(sortie.montant),
          ...sortie,
        };
      });
      let datasToShow =
        user?.mission?.id !== 0
          ? formattedData.filter(
              (sortie) => sortie.mission === user?.mission?.id
            )
          : formattedData;
      setFormatedSorties(datasToShow);
    } else {
      setFormatedSorties([]);
    }
  }, [sortiesCaisse, typeSorties, missions]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "f_date",
      },
      {
        Header: "Montant",
        accessor: "f_montant",
      },
      {
        Header: "Mission",
        accessor: "f_mission",
        Filter: SelectColumnFilter,
      },
      {
        Header: "Type",
        accessor: "f_type",
        Filter: SelectColumnFilter,
      },
      {
        Header: "Commentaire",
        accessor: "commentaire",
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ value, row }) => {
          return (
            <div className="flex items-center space-x-2">
              <button
                className="text-mde-red hover:text-gray-900"
                onClick={() => {
                  showEditSortieForm(value, row.original);
                }}
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                className="text-mde-red hover:text-gray-900"
                onClick={() => {
                  handleDeleteSortie(value);
                }}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  if (isLoading)
    return (
      <Container
        title="Sorties de caisse"
        handleDateRangeChange={handleDateRangeChange}
      >
        <WaitingDatas />
      </Container>
    );

  return (
    <Container
      title="Sorties de caisse"
      actionButton={{
        title: "Nouvelle sortie de caisse",
        event: showNewSortieForm,
      }}
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
                      Total des sorties
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-white">
                        {formatNumberToMoney(totalSortieCaisse)} FCFA
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
                      Total des sorties sur la periode
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-white">
                        {formatNumberToMoney(totalSortieCaisseByDate)} FCFA
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-4">
        <Table
          columns={columns}
          data={formatedSorties}
          withExport={true}
          modeExportation={"fi_sorties"}
        />
      </div>
    </Container>
  );
}

export default FiSorties;
