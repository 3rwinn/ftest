import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import Table, { SelectColumnFilter } from "../Table";
import { getMouvements } from "../../features/engagement/engagementSlice";
// import { useAppContext } from "../../context/AppState";
// import { getMissions, getPaliers } from "../../features/settings/settingsSlice";
import { formatNumberToMoney } from "../../utils/helpers";
import dayjs from "dayjs";
// import StatCard from "../stats/StatCard";
// import { ArrowDownRightIcon, ArrowUpLeftIcon } from "@heroicons/react/24/solid";
import { CategoryBar, List, ListItem, Text, Flex } from "@tremor/react";
import Button from "../common/Button";
// import { usePDF, Margin } from "react-to-pdf";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useAppContext } from "../../context/AppState";
import SendAlert from "./SendAlert";

function ShowEngagementDetails({ engagementId, engagementData }) {
  const dispatch = useDispatch();
  const { mouvements } = useSelector((state) => state.engagement);
  React.useEffect(() => {
    dispatch(getMouvements());
  }, []);


  const {
    // membre__nom,
    // membre__prenom,
    // mouvement_percent,
    // restant_percent,
    membre__contact,
    f_versement,
    f_reste,
    // f_palier,
  } = engagementData;

  console.log("engagementData", engagementData);

  const { switchModal } = useAppContext();

  const handleSendAlert = () => {
    switchModal(true, {
      title: "Envoyer une alerte",
      type: "error",
      description: <SendAlert contact={membre__contact} />,
      noConfirm: true,
    });
  };

  // const { toPDF, targetRef } = usePDF({ filename: "page.pdf", page: { margin: Margin.LARGE } });
  const handlePrint = () => {
    const input = document.getElementById("ismo");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
      });
      pdf.text("CTAM - Fiche d'engagement", 20, 15);

      pdf.setFontSize(20);
      pdf.setTextColor(100);
      pdf.addImage(imgData, "PNG", 20, 30);
      pdf.save(
        `fiche_engagement_${engagementData.full_name}_${dayjs(
          Date.now()
        ).format("DD/MM/YYYY")}.pdf`
      );
    });
  };

  const [filteredMissions, setFilteredMissions] = React.useState([]);
  React.useEffect(() => {
    if (mouvements.length > 0) {
      const filteredMissions = mouvements.filter(
        (m) => m.engagement === engagementId
      );
      setFilteredMissions(filteredMissions);
    }
  }, [mouvements]);

  const [formatedMissions, setFormatedMissions] = React.useState([]);
  React.useEffect(() => {
    if (filteredMissions.length > 0) {
      const formatedMissions = filteredMissions.map((mission) => {
        return {
          ...mission,
          f_montant: formatNumberToMoney(mission.montant) + " FCFA",
          f_date: dayjs(mission?.date).format("DD/MM/YYYY"),
          ...mission,
        };
      });
      setFormatedMissions(formatedMissions);
    }
  }, [filteredMissions]);

  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: "Montant",
  //       accessor: "f_montant",
  //     },

  //     {
  //       Header: "Date",
  //       accessor: "f_date",
  //     },
  //   ],
  //   []
  // );

  // const descriptionForExportation = {
  //   title: `${membre__nom} ${membre__prenom} (palier: ${f_palier}, versements: ${f_versement}, restants: ${formatNumberToMoney(
  //     f_reste
  //   )} FCFA)`,
  //   fileName: `details_versements_${membre__nom}_${membre__prenom}`,
  // };

  return (
    <div className="overflow-x-hidden">
      <div>
        <div className="px-4 py-5 sm:px-6">
          <dl
            className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2"
            id="ismo"
          >
            <div className="sm:col-span-1">
              <dt className="text-sm font-bold text-black">Nom complet</dt>
              <dd className="mt-1 text-sm text-black">
                {engagementData?.full_name}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-bold text-black">Mission</dt>
              <dd className="mt-1 text-sm text-black">
                {engagementData?.f_mission}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="text-sm font-bold text-black">Contact</dt>
              <dd className="mt-1 text-sm text-black">
                {engagementData?.membre__contact}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-bold text-black">Engagement</dt>
              <dd className="mt-1 text-sm text-black">
                {engagementData?.f_palier}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-bold text-black">Total versements</dt>
              <dd className="mt-1 text-sm text-black">{f_versement}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-bold text-black">Total restants</dt>
              <dd className="mt-1 text-sm text-black">{`${formatNumberToMoney(
                f_reste
              )} FCFA`}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-bold text-black">
                Evolution des versements (
                {engagementData.mouvement_percent.toFixed(0)}%)
              </dt>
              <dd className="mt-1 text-sm text-black">
                <CategoryBar
                  values={[25, 25, 25, 25]}
                  // colors={["emerald", "yellow", "orange", "red"]}
                  colors={["red", "orange", "yellow", "emerald"]}
                  markerValue={engagementData.mouvement_percent.toFixed(0)}
                  tooltip={`${engagementData.mouvement_percent.toFixed(0)}%`}
                  className="mt-2"
                />
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-bold text-black">Mes versements</dt>
              <Flex className="mt-2" justifyContent="between">
                <Text className="text-black">Date</Text>
                <Text className="text-black">Montant</Text>
              </Flex>
              <List>
                {formatedMissions.map((mission, index) => (
                  <ListItem key={index}>
                    <Text className="text-black">{mission?.f_date}</Text>
                    <Text className="text-black">{mission?.f_montant}</Text>
                  </ListItem>
                ))}
              </List>
            </div>
          </dl>
          <div className="mt-2">
            <Button
              // event={() => toPDF()}
              event={() => handlePrint()}
              full
            >
              Télécharger la fiche
            </Button>
            <div className="mt-4" />

            <Button
              colorCls="border-yellow-400 bg-yellow-400 hover:border-yellow-600 focus:ring-yellow-400"
              event={() => handleSendAlert()}
              full
            >
              Envoyer une alerte
            </Button>
          </div>
        </div>
      </div>
      {/* <div className="mb-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
        <StatCard
          title={"Total des versements"}
          value={f_versement}
          icon={
            <ArrowDownRightIcon
              className="h-6 w-6 text-green-400"
              aria-hidden="true"
            />
          }
        />
        <StatCard
          title={"Total des versements restants"}
          value={`${formatNumberToMoney(f_reste)} FCFA`}
          icon={
            <ArrowUpLeftIcon
              className="h-6 w-6 text-yellow-400"
              aria-hidden="true"
            />
          }
        />
      </div> */}
      {/* <Table
        data={formatedMissions}
        columns={columns}
        withGlobalSearch={false}
        withExport={false}
        // modeExportation={"engagement_details"}
        // descriptionExportation={descriptionForExportation}
      /> */}
    </div>
  );
}

export default ShowEngagementDetails;
