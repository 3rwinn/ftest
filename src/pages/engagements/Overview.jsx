import React from "react";
import Layout from "../../components/common/Layout";
import PageContent from "../../components/common/PageContent";

import { useDispatch, useSelector } from "react-redux";
import {
  getEngagementStats,
  getEngagementStatsByMission,
} from "../../features/engagement/engagementSlice";
import { formatNumberToMoney } from "../../utils/helpers";
import WaitingDatas from "../../components/WaitingDatas";

import {
  DonutChart,
  BarChart,
  AreaChart,
  Legend,
  List,
  ListItem,
  Select,
  SelectItem,
} from "@tremor/react";
import {
  ArrowDownRightIcon,
  ArrowUpLeftIcon,
  BanknotesIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import StatCard from "../../components/stats/StatCard";
import dayjs from "dayjs";

function EngagementOverview() {
  const dispatch = useDispatch();
  const { stats, isLoading } = useSelector((state) => state.engagement);
  const { user } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (user) {
      user?.mission?.id === 0
        ? dispatch(getEngagementStats())
        : dispatch(getEngagementStatsByMission(user?.mission?.id));
    }
  }, [user]);

  const performance_donut = [
    {
      name: "Montant versé",
      sales: stats?.mouvement_percent,
    },
    {
      name: "Montant restant",
      sales: stats?.restant_percent,
    },
  ];

  let myDatas = [];
  const chartdata = stats?.engagement_by_palier?.map((item) => {
    return myDatas.push({
      name: "Palier: " + formatNumberToMoney(item?.palier__montant),
      Versement: item?.mouvement_sum,
      Palier: item?.palier__montant,
      Percent: (item?.mouvement_sum * 100) / item?.palier__montant,
    });
  });

  // Area chart datas
  const mouvementsByDays = stats?.mouvement_by_day?.map((item) => {
  // const mouvementsByDays = stats?.mouvement_by_month?.map((item) => {
    return {
      name: dayjs(item?.date).format("DD/MM/YYYY"),
      Versement: item?.mouvement_sum,
    };
  });

  const dataFormatter = (number) => {
    return "" + Intl.NumberFormat("us").format(number).toString();
  };

  const [currentMission, setCurrentMission] = React.useState("");
  React.useEffect(() => {
    if (stats.length > 0) {
      setCurrentMission(stats?.engagement_by_mission[0]?.mission__id);
    }
  }, [stats]);

  if (isLoading || stats.length === 0)
    return (
      <Layout>
        <PageContent title="Vue d'ensemble">
          <WaitingDatas />
        </PageContent>
      </Layout>
    );
  return (
    <Layout>
      <PageContent title="Vue d'ensemble">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
          <StatCard
            bgColor="bg-blue-500"
            reverse={true}
            title={"Nombre d'engagements"}
            value={stats?.engagement_count}
            icon={
              <InformationCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
            }
          />
          <StatCard
            reverse={true}
            bgColor="bg-orange-500"
            title={"Total des engagements"}
            value={`${formatNumberToMoney(stats?.engagement_sum)} FCFA`}
            icon={
              <BanknotesIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            }
          />
          <StatCard
            reverse={true}
            bgColor="bg-green-500"
            title={"Total des versements"}
            value={`${formatNumberToMoney(stats?.mouvement_sum)} FCFA`}
            icon={
              <ArrowDownRightIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            }
          />
          <StatCard
            reverse={true}
            bgColor="bg-red-500"
            title={"Total des versements restants"}
            value={`${formatNumberToMoney(stats?.restant)} FCFA`}
            icon={
              <ArrowUpLeftIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            }
          />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-1">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-md font-bold text-gray-500 truncate">
                  Performance par palier
                </dt>
                <dd className="mt-1">
                  <BarChart
                    className="mt-6"
                    data={myDatas}
                    index="name"
                    categories={["Palier", "Versement"]}
                    colors={["orange", "green"]}
                    noDataText="Aucune donnée pour le moment"
                    yAxisWidth={88}
                    valueFormatter={dataFormatter}
                    // layout="vertical"
                    // stack={true}
                  />
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-md font-bold text-gray-500 truncate">
                  Evolution des versements
                </dt>
                <dd className="mt-1">
                  <AreaChart
                    className="h-72 mt-4"
                    data={mouvementsByDays}
                    index="name"
                    categories={["Versement"]}
                    colors={["green"]}
                    valueFormatter={dataFormatter}
                    yAxisWidth={78}
                    noDataText="Aucune donnée pour le moment"
                  />
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-md font-bold text-gray-500 truncate">
                  Montant versé vs restant (en %)
                </dt>
                <dd className="mt-1">
                  <DonutChart
                    className="mt-6"
                    data={performance_donut}
                    category="sales"
                    index="name"
                    showTooltip={true}
                    noDataText="Aucune donnée pour le moment"
                    variant="pie"
                    colors={["green", "red"]}
                    valueFormatter={(value) => `${value.toFixed(1)}%`}
                  />
                  <Legend
                    className="mt-3"
                    categories={["Montants versés", "Montants restants"]}
                    colors={["green", "red"]}
                  />
                </dd>
              </dl>
            </div>
          </div>
          {user?.mission?.id === 0 && (
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-md font-bold text-gray-500 truncate">
                    <span>Performance par mission</span>
                  </dt>
                  <div className="mt-2">
                    <Select
                      value={currentMission}
                      onValueChange={setCurrentMission}
                      placeholder="Choisir une mission"
                    >
                      {stats?.engagement_by_mission?.map((item, index) => (
                        <SelectItem key={index} value={item?.mission__id}>
                          {item?.mission__libelle}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  <dd className="mt-2">
                    <List noDataText="Merci de choisir une mission">
                      {stats?.engagement_by_mission
                        ?.filter((item) => item.mission__id == currentMission)
                        .map((item) => (
                          <>
                            <ListItem className="text-md text-blue-500 font-bold">
                              Nombre d'engagements: {item?.engagement_count}
                            </ListItem>
                            <ListItem className="text-md text-orange-500 font-bold">
                              Total des engagements:{" "}
                              {formatNumberToMoney(item?.engagement_sum)} FCFA
                            </ListItem>
                            <ListItem className="text-md text-green-500 font-bold">
                              Total des versements:{" "}
                              {item?.mouvement_sum
                                ? formatNumberToMoney(item?.mouvement_sum)
                                : "0"}{" "}
                              FCFA
                            </ListItem>
                            <ListItem className="text-md text-red-500 font-bold">
                              Total des versements restants:{" "}
                              {formatNumberToMoney(
                                item?.engagement_sum - item?.mouvement_sum
                              )}{" "}
                              FCFA
                            </ListItem>
                          </>
                        ))}
                    </List>
                  </dd>
                </dl>
              </div>
            </div>
          )}
        </div>
      </PageContent>
    </Layout>
  );
}

export default EngagementOverview;
