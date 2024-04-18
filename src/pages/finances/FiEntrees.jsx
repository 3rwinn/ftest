import React from "react";
import Layout from "../../components/common/Layout";
import PageContent from "../../components/common/PageContent";
import Table, { SelectColumnFilter } from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  BanknotesIcon,
  PencilIcon,
  TrashIcon,
  DocumentIcon,
} from "@heroicons/react/24/solid";
import { useAppContext } from "../../context/AppState";
import {
  deleteCaisseEntree,
  getCaisseEntrees,
} from "../../features/finance/financeSlice";
import dayjs from "dayjs";
import {
  getEntrees as getTypesEntrees,
  getMissions,
} from "../../features/settings/settingsSlice";
import WaitingDatas from "../../components/WaitingDatas";
import NewEntreeCaisse from "../../components/finances/NewEntreeCaisse";
import EditEntreeCaisse from "../../components/finances/EditEntreeCaisse";
import { formatLocaleEn, formatNumberToMoney } from "../../utils/helpers";
import CustomDateRangePicker from "../../components/common/CustomDateRangePicker";
import backend from "../../constants/config";

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

function FiEntrees() {
  const dispatch = useDispatch();
  const {
    isLoading,
    entreesCaisse,
    totalEntreeCaisse,
    totalEntreeCaisseByDate,
  } = useSelector((state) => state.finances);
  const typeEntrees = useSelector((state) => state.settings.entrees);
  const missions = useSelector((state) => state.settings.missions);
  const { user } = useSelector((state) => state.auth);

  const [dateRange, setDateRange] = React.useState({
    from: `${new Date().getFullYear()}-01-01`,
    to: new Date(),
    // from: null,
    // to: null,
  });

  const handleDateRangeChange = (dateRange) => {
    // handle the selected date range here
    // setDateRange(dateRange);
    dispatch(
      getCaisseEntrees({
        start_date: formatLocaleEn(dateRange.from),
        end_date: formatLocaleEn(dateRange.to),
      })
    );
  };

  React.useEffect(() => {
    dispatch(
      getCaisseEntrees({
        start_date: formatLocaleEn(dateRange.from),
        end_date: formatLocaleEn(dateRange.to),
      })
    );
    dispatch(getTypesEntrees());
    dispatch(getMissions());
  }, []);

  const {
    switchSlideOver,
    setSlideOverContent,
    setNotificationContent,
    switchNotification,
    switchModal,
  } = useAppContext();

  const showNewEntreeForm = () => {
    setSlideOverContent({
      title: "Nouvelle entrée",
      description:
        "Veuillez remplir le formulaire pour créer une nouvelle entrée.",
      body: <NewEntreeCaisse />,
    });
    switchSlideOver(true);
  };

  const showEditEntreeForm = (entreeId, entreeData) => {
    setSlideOverContent({
      title: "Modifier une entrée",
      description: "Veuillez remplir le formulaire pour modifier cette entrée.",
      body: <EditEntreeCaisse entreeId={entreeId} currentEntree={entreeData} />,
    });
    switchSlideOver(true);
  };

  const handleDeleteEntree = (entreeId) => {
    switchModal(true, {
      type: "danger",
      title: "Supprimer une entrée",
      description: "Êtes-vous sûr de vouloir supprimer cette entrée ?",
      sideEvent: () => {
        dispatch(deleteCaisseEntree(entreeId))
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

  function formatDatas(datas) {
    const formattedData = datas.map((entree) => {
      return {
        f_date: dayjs(entree.date).format("DD/MM/YYYY"),
        f_type: typeEntrees.find((type) => type.id === entree.type_entree)
          ?.libelle,
        f_mission: missions.find((mission) => mission.id === entree.mission)
          ?.libelle,
        f_montant: formatNumberToMoney(entree.montant),
        ...entree,
      };
    });
    let datasToShow =
      user?.mission?.id !== 0
        ? formattedData.filter((entree) => entree.mission === user?.mission?.id)
        : formattedData;

    return datasToShow;
  }

  console.log("entr", entreesCaisse);

  const [formatedEntrees, setFormatedEntrees] = React.useState([]);
  React.useEffect(() => {
    if (entreesCaisse?.length > 0) {
      const datasToShow = formatDatas(entreesCaisse);
      setFormatedEntrees(datasToShow);
    } else {
      setFormatedEntrees([]);
    }
  }, [entreesCaisse, typeEntrees]);

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
          let baseUrl = backend.BACKEND;
          return (
            <div className="flex items-center space-x-2">
              {row.original.facture !== null && (
                <a
                  className="text-mde-red hover:text-gray-900"
                  href={`${baseUrl}${row.original.facture}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <DocumentIcon className="h-5 w-5" />
                </a>
              )}
              <button
                className="text-mde-red hover:text-gray-900"
                onClick={() => {
                  showEditEntreeForm(value, row.original);
                }}
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                className="text-mde-red hover:text-gray-900"
                onClick={() => {
                  handleDeleteEntree(value);
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

  // if (isLoading)
  //   return (
  //     <Container
  //       title={"Entrées en caisse"}
  //       handleDateRangeChange={handleDateRangeChange}
  //     >
  //       <WaitingDatas />
  //     </Container>
  //   );

  return (
    <Container
      title={"Entrées en caisse"}
      actionButton={{
        title: "Nouvelle entrée",
        event: showNewEntreeForm,
      }}
      handleDateRangeChange={handleDateRangeChange}
    >
      {user?.mission?.id === 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {/* <div className="bg-white overflow-hidden shadow rounded-lg"> */}
          <div className="bg-green-500 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BanknotesIcon
                    // className="h-6 w-6 text-ctamp"
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    {/* <dt className="text-sm font-medium text-gray-500 truncate"> */}
                    <dt className="text-sm font-medium text-white truncate">
                      Total des entrées
                    </dt>
                    <dd>
                      {/* <div className="text-lg font-medium text-gray-900"> */}
                      <div className="text-lg font-medium text-white">
                        {formatNumberToMoney(totalEntreeCaisse)} FCFA
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="bg-white overflow-hidden shadow rounded-lg"> */}
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
                        {formatNumberToMoney(totalEntreeCaisseByDate)} FCFA
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
          data={formatedEntrees}
          withExport={true}
          modeExportation={"fi_entrees"}
        />
      </div>
    </Container>
  );
}

export default FiEntrees;
