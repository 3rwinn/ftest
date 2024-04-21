import React from "react";
import Layout from "../components/common/Layout";
import PageContent from "../components/common/PageContent";
import { useDispatch, useSelector } from "react-redux";
// import { formatNumberToMoney } from "../utils/helpers";
// import WaitingDatas from "../components/WaitingDatas";
import {
  // DonutChart,
  // BarChart,
  AreaChart,
  // Legend,
  List,
  ListItem,
  // Select,
  // SelectItem,
} from "@tremor/react";
import { ArrowDownRightIcon } from "@heroicons/react/24/solid";
import StatCard from "../components/stats/StatCard";
// import dayjs from "dayjs";
import { getFinanceStats } from "../features/finance/financeSlice";
import {
  Form,
  FormDatePicker,
  FormSelect,
  SubmitButton,
} from "../components/forms";
import { getMissions } from "../features/settings/settingsSlice";
import {
  formatDataToSelect,
  formatLocaleEn,
  formatNumberToMoney,
  getMonthName,
} from "../utils/helpers";

import { useAppContext } from "../context/AppState";
import {
  ArchiveBoxIcon,
  BuildingLibraryIcon,
  GiftIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import SpecialRapportBtn from "../components/SpecialRapportBtn";

function Dashboard() {
  const dispatch = useDispatch();
  const { stats, isLoading } = useSelector((state) => state.finances);
  const { missions } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.auth);

  const defaultMission =
    user?.mission?.id === 0 ? missions?.[0]?.id : user?.mission?.id;

  const { switchNotification, setNotificationContent } = useAppContext();

  const [selectedMission, setSelectedMission] = React.useState(defaultMission);
  const [selectedDateDebut, setSelectedDateDebut] = React.useState(
    new Date(new Date().getFullYear(), 0, 1)
  );

  console.log("selectedMission", selectedMission);

  const [selectedDateFin, setSelectedDateFin] = React.useState(new Date());

  React.useEffect(() => {
    dispatch(getMissions());
  }, []);

  React.useEffect(() => {
    if (missions.length > 0) {
      // setSelectedMission(missions?.[0]?.id);
      dispatch(
        getFinanceStats({
          mission: defaultMission,
          // mission: missions?.[0]?.id,
          date_debut: formatLocaleEn(selectedDateDebut),
          date_fin: formatLocaleEn(selectedDateFin),
        })
      );
    }
  }, [missions]);

  const handleSubmit = (values) => {
    const datas = {
      mission: values?.mission,
      date_debut: formatLocaleEn(values?.date_debut),
      date_fin: formatLocaleEn(values?.date_fin),
    };

    dispatch(getFinanceStats(datas))
      .unwrap()
      .then(() => {
        setSelectedMission(values?.mission);
        setSelectedDateDebut(values?.date_debut);
        setSelectedDateFin(values?.date_fin);
      })
      .catch((err) => {
        console.log(err);
        setNotificationContent({
          type: "error",
          title: "Erreur",
          description: err,
        });
        switchNotification(true);
      });
  };

  // if (isLoading)
  //   return (
  //     <Layout>
  //       <PageContent title="Tableau de bord">
  //         <WaitingDatas />
  //       </PageContent>
  //     </Layout>
  //   );

  console.log("stats", stats);

  const dataFormatter = (number) => {
    return Intl.NumberFormat("us").format(number).toString();
  };

  function formatAreaChartDatas(data1, data2) {
    let datas = [];
    data1?.forEach((item) => {
      data2?.forEach((item2) => {
        if (item?.date__month === item2?.date__month) {
          const data = {
            date: getMonthName(
              selectedDateDebut,
              selectedDateFin,
              item.date__month - 1
            ),
            Entrées: item?.entree_sum,
            Dépenses: item2?.sortie_sum,
          };
          datas.push(data);
        }
        // else {
        //   const data = {
        //     date: item.date__month,
        //     Entree: item?.entree_sum,
        //     Sortie: 0,
        //   };
        //   datas.push(data);
        // }
      });
    });

    return datas;
  }

  function formatEntreeDepenseDatasForRapport(data1, data2) {
    let datas = [];
    data1?.forEach((item) => {
      data2?.forEach((item2) => {
        if (item?.date__month === item2?.date__month) {
          const data = {
            date: getMonthName(
              selectedDateDebut,
              selectedDateFin,
              item.date__month - 1
            ),
            entrees: item?.entree_sum,
            depenses: item2?.sortie_sum,
          };
          datas.push(data);
        }
        // else {
        //   const data = {
        //     date: item.date__month,
        //     Entree: item?.entree_sum,
        //     Sortie: 0,
        //   };
        //   datas.push(data);
        // }
      });
    });

    return datas;
  }

  //  function to calculate the variation between m and m - 1
  const calculateVariation = (m, m1) => {
    if (m === undefined || m1 === undefined) {
      return 0;
    } else {
      let variation = ((m - m1) / m1) * 100;
      return variation.toFixed(0);
    }
  };

  const offrandesLast6months = stats?.entree_offrande_for_last_6_month?.map(
    (item) => {
      return {
        date: getMonthName(
          selectedDateDebut,
          selectedDateFin,
          item.date__month - 1
        ),
        Offrande: item?.entree_sum,
      };
    }
  );

  const dimeLast6months = stats?.entree_dime_for_last_6_month?.map((item) => {
    return {
      date: getMonthName(
        selectedDateDebut,
        selectedDateFin,
        item.date__month - 1
      ),
      Dime: item?.entree_sum,
    };
  });

  const chartdata = formatAreaChartDatas(
    stats?.entree_by_month,
    stats?.sortie_by_month
  );

  console.log("missions", missions);

  return (
    <>
      <Layout>
        <PageContent title="Tableau de bord">
          <div className="flex items-center space-x-2 justify-end mb-4">
            <Form
              initialValues={{
                mission: selectedMission,
                date_debut: selectedDateDebut,
                date_fin: selectedDateFin,
              }}
              onSubmit={handleSubmit}
            >
              {user?.mission?.id === 0 && (
                <div>
                  <FormSelect
                    name="mission"
                    datas={formatDataToSelect(missions)}
                    label={"Mission"}
                  />
                </div>
              )}
              <FormDatePicker minDate={null} label={"Du"} name={"date_debut"} />
              <FormDatePicker label={"Au"} name={"date_fin"} />
              <SubmitButton>Rechercher</SubmitButton>
              <SpecialRapportBtn
                mode="finances"
                realData={{
                  mission: missions?.find(
                    (mission) => mission.id === selectedMission
                  )?.libelle,
                  date_debut: selectedDateDebut,
                  date_fin: selectedDateFin,
                  dime: stats?.total_entree_dime,
                  offrande: stats?.total_entree_offrande,
                  depense: stats?.total_depense,
                  caisse: stats?.solde_caisse,
                  banque: stats?.solde_banque,
                  entree: stats?.entre_by_month,
                  point_mensuel: formatEntreeDepenseDatasForRapport(stats?.entree_by_month, stats?.sortie_by_month),
                  autre_entree: stats?.total_entree_other,
                  entree_dime: stats?.entree_dime_for_last_6_month,
                  entree_offrance: stats?.entree_offrande_for_last_6_month,
                }}
              />
            </Form>
          </div>
          <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-3">
            <StatCard
              reverse={true}
              bgColor={"bg-green-500"}
              title={"Solde caisse"}
              value={`${formatNumberToMoney(stats?.solde_caisse)} FCFA`}
              icon={
                <InboxIcon className="h-6 w-6 text-white" aria-hidden="true" />
              }
            />
            <StatCard
              reverse={true}
              bgColor={"bg-orange-500"}
              title={"Solde banque"}
              value={`${formatNumberToMoney(stats?.solde_banque)} FCFA`}
              icon={
                <BuildingLibraryIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              }
            />
            <StatCard
              reverse={true}
              bgColor={"bg-red-500"}
              title={"Total dépenses"}
              value={`${formatNumberToMoney(stats?.total_depense)} FCFA`}
              icon={
                <ArrowDownRightIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              }
            />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
            <StatCard
              reverse={true}
              bgColor="bg-blue-500"
              title={"Total dîmes"}
              value={`${formatNumberToMoney(stats?.total_entree_dime)} FCFA`}
              icon={
                <ArchiveBoxIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              }
            />
            <StatCard
              reverse={true}
              bgColor="bg-yellow-500"
              title={"Total offrandes"}
              value={`${formatNumberToMoney(
                stats?.total_entree_offrande
              )} FCFA`}
              icon={
                <GiftIcon className="h-6 w-6 text-white" aria-hidden="true" />
              }
            />
          </div>

          <div className="mt-5">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-md font-bold text-gray-500 truncate">
                    Entrées vs dépenses par mois
                  </dt>
                  <dd className="mt-1">
                    <AreaChart
                      className="h-72 mt-4"
                      data={chartdata}
                      index="date"
                      categories={["Entrées", "Dépenses"]}
                      colors={["green", "red"]}
                      valueFormatter={dataFormatter}
                      yAxisWidth={108}
                      noDataText="Aucune donnée pour le moment"
                    />
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-md font-bold text-gray-500 truncate">
                    Evolutions des dîmes par mois
                  </dt>
                  <dd className="mt-1">
                    <AreaChart
                      className="h-72 mt-4"
                      data={dimeLast6months}
                      index="date"
                      categories={["Dime"]}
                      colors={["blue"]}
                      valueFormatter={dataFormatter}
                      yAxisWidth={88}
                      noDataText="Aucune donnée pour le moment"
                    />
                  </dd>
                </dl>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-md font-bold text-gray-500 truncate">
                    Evolutions des offrandes par mois
                  </dt>
                  <dd className="mt-1">
                    <AreaChart
                      className="h-72 mt-4"
                      data={offrandesLast6months}
                      index="date"
                      categories={["Offrande"]}
                      colors={["yellow"]}
                      valueFormatter={dataFormatter}
                      yAxisWidth={88}
                      noDataText="Aucune donnée pour le moment"
                    />
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-3">
            <div className="bg-blue-500 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-md font-bold text-white truncate">
                    <span>Variation dîmes</span>
                  </dt>

                  <dd className="mt-2">
                    <List noDataText="Merci de choisir une mission">
                      <ListItem className="text-white">
                        M:{" "}
                        {formatNumberToMoney(
                          stats?.entree_dime_for_last_2_month[1]?.entree_sum
                        )}{" "}
                        FCFA
                      </ListItem>
                      <ListItem className="text-white">
                        M - 1:{" "}
                        {formatNumberToMoney(
                          stats?.entree_dime_for_last_2_month[0]?.entree_sum
                        )}{" "}
                        FCFA
                      </ListItem>
                      <ListItem className="text-white">
                        Taux de variation:{" "}
                        {calculateVariation(
                          stats?.entree_dime_for_last_2_month[1]?.entree_sum,
                          stats?.entree_dime_for_last_2_month[0]?.entree_sum
                        )}{" "}
                        %
                      </ListItem>
                    </List>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="bg-yellow-500 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-md font-bold text-white truncate">
                    <span>Variation offrandes</span>
                  </dt>

                  <dd className="mt-2">
                    <List noDataText="Merci de choisir une mission">
                      <ListItem className="text-white">
                        M:{" "}
                        {formatNumberToMoney(
                          stats?.entree_offrande_for_last_2_month[1]?.entree_sum
                        )}{" "}
                        FCFA
                      </ListItem>
                      <ListItem className="text-white">
                        M - 1:{" "}
                        {formatNumberToMoney(
                          stats?.entree_offrande_for_last_2_month[0]?.entree_sum
                        )}{" "}
                        FCFA
                      </ListItem>
                      <ListItem className="text-white">
                        Taux de variation:{" "}
                        {calculateVariation(
                          stats?.entree_offrande_for_last_2_month[1]
                            ?.entree_sum,
                          stats?.entree_offrande_for_last_2_month[0]?.entree_sum
                        )}{" "}
                        %
                      </ListItem>
                    </List>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="bg-red-500 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-md font-bold text-white truncate">
                    <span>Variation dépenses</span>
                  </dt>

                  <dd className="mt-2">
                    <List noDataText="Merci de choisir une mission">
                      <ListItem className="text-white">
                        M:{" "}
                        {formatNumberToMoney(
                          stats?.depense_for_last_2_month[1]?.depense_sum
                        )}{" "}
                        FCFA
                      </ListItem>
                      <ListItem className="text-white">
                        M - 1:{" "}
                        {formatNumberToMoney(
                          stats?.depense_for_last_2_month[0]?.depense_sum
                        )}{" "}
                        FCFA
                      </ListItem>

                      <ListItem className="text-white">
                        Taux de variation:{" "}
                        {calculateVariation(
                          stats?.depense_for_last_2_month[1]?.depense_sum,
                          stats?.depense_for_last_2_month[0]?.depense_sum
                        )}{" "}
                        %
                      </ListItem>
                    </List>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </PageContent>
      </Layout>
    </>
  );
}

export default Dashboard;
