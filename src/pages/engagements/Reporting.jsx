import React from "react";
import Layout from "../../components/common/Layout";
import PageContent from "../../components/common/PageContent";
import Table, { SelectColumnFilter } from "../../components/Table";

import { useDispatch, useSelector } from "react-redux";
import { getEngagementStats } from "../../features/engagement/engagementSlice";
import { useAppContext } from "../../context/AppState";
import { formatNumberToMoney } from "../../utils/helpers";
import { ProgressBar } from "@tremor/react";
import { EyeIcon } from "@heroicons/react/24/solid";
import ShowEngagementDetails from "../../components/engagement/ShowEngagementDetails";

function EngagementReporting() {
  const dispatch = useDispatch();
  const { isLoading, engagements, stats } = useSelector(
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

  const showDetails = (engagementId, engagementData) => {
    const { membre__nom, membre__prenom } = engagementData;
    setSlideOverContent({
      title: "Détails de l'engagement",
      description: `Ici vous pouvez voir les détails de l'engagement de ${membre__nom} ${membre__prenom}.`,
      body: (
        <div className="bg-white h-screen">
          <div className="p-2">
            <ShowEngagementDetails
              engagementId={engagementId}
              engagementData={engagementData}
            />
          </div>
        </div>
      ),
    });
    switchSlideOver(true);
  };

  React.useEffect(() => {
    dispatch(getEngagementStats());
  }, []);

  console.log("stats", stats);

  const [formatedEngagements, setFormatedEngagements] = React.useState([]);
  React.useEffect(() => {
    if (stats?.engagement_by_membre?.length > 0) {
      let newDatas = stats?.engagement_by_membre?.map((engagement) => {
        return {
          full_name: engagement?.membre__nom + " " + engagement?.membre__prenom,
          f_palier: formatNumberToMoney(engagement?.palier__montant),
          f_mission: engagement?.mission__libelle,
          f_date: engagement.annee__year,
          f_versement: formatNumberToMoney(engagement?.mouvement_sum),
          f_reste: formatNumberToMoney(engagement?.palier__montant - engagement?.mouvement_sum), 
          ...engagement,
        };
      });

      let dataToShow =
        user?.mission?.id === 0
          ? newDatas
          : newDatas.filter(
              (engagement) => engagement?.mission__id === user?.mission?.id
            );

      setFormatedEngagements(dataToShow);
    } else {
      setFormatedEngagements([]);
    }
  }, [stats]);


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
        Header: "Palier (FCFA)",
        accessor: "f_palier",
        Filter: SelectColumnFilter,
      },
      {
        Header: "Versement (FCFA)",
        accessor: "f_versement",
      },
      {
        Header: "Restant (FCFA)",
        accessor: "f_reste",
      },

      {
        Header: "Evolution",
        accessor: "mouvement_percent",
        Cell: ({ value }) => {
          let mouvement_percent = value.toFixed(0);
          return (
            <>
              <div className="flex space-x-2 items-center">
                <span>{mouvement_percent} %</span>
                <div>
                  <ProgressBar
                    value={mouvement_percent}
                    max={100}
                    color={mouvement_percent >= 50 ? "green" : "yellow"}
                    className="w-20"
                  />
                </div>
              </div>
            </>
          );
        },
      },
      {
        Header: "Année",
        accessor: "f_date",
        Filter: SelectColumnFilter,
      },
      {
        Header: "#",
        accessor: "id",
        Cell: ({ value, row }) => {
          let engagementDatas = row.original;
          let engagementId = value;
          return (
            <div className="flex space-x-2 items-center">
              <div
                onClick={() => {
                  showDetails(engagementId, engagementDatas);
                }}
                className="cursor-pointer"
              >
                voir
              </div>
              <div
                onClick={() => {
                  showDetails(engagementId, engagementDatas);
                }}
                className="cursor-pointer"
              >
                <EyeIcon className="text-mde-red h-5 w-5" />
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
      <PageContent title={"Reporting"}>
        <div className="mt-2">
          <Table
            columns={columns}
            data={formatedEngagements}
            withExport={true}
            modeExportation={"engagement"}
          />
        </div>
      </PageContent>
    </Layout>
  );
}

export default EngagementReporting;
