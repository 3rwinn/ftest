import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Button from "./common/Button";
import { ctamTampo } from "../constants/utils";
import { formatNumberToMoney } from "../utils/helpers";
import dayjs from "dayjs";

function SpecialRapportBtn({
  mode = "engagement",
  realData,
  description = null,
}) {
  const headerStyles = {
    // fillColor: [166, 51, 32],
    fillColor: [1, 28, 55],
  };

  const imageBase64 = ctamTampo;
  const imageWidth = 30; // Set the width of the image
  const imageHeight = 30; // Set the height of the image

  const handleClick = () => {
    if (mode === "engagement") {
      const doc = new jsPDF();

      const mycols = [
        "Mission",
        "Nombre d'engagements",
        "Montant attendu",
        "Montant versé",
        "Montant restant",
      ];
      let mydatas = [];
      let dataWanted = realData?.mission_datas;

      dataWanted.map((dw) => {
        let datas = [
          dw.mission__libelle,
          dw.engagement_count,
          formatNumberToMoney(dw.engagement_sum),
          formatNumberToMoney(dw.mouvement_sum),
          formatNumberToMoney(Number(dw.engagement_sum - dw.mouvement_sum)),
        ];
        return mydatas.push(datas);
      });

      doc.autoTable({
        head: [mycols],
        body: mydatas,
        headerStyles,
        willDrawPage: (data) => {
          doc.addImage(
            imageBase64,
            "PNG",
            data.settings.margin.left, // centerX,
            10, // centerY,
            imageWidth,
            imageHeight
          );
          doc.setFontSize(15);
          doc.setFont(undefined, "bold");
          doc.text("Rapport des engagements", data.settings.margin.left, 46);
          doc.setFont(undefined, "normal");
          doc.setFontSize(10);
          doc.text(
            `Date: ${dayjs().format("DD/MM/YYYY HH:mm")}`,
            data.settings.margin.left,
            51
          );
          doc.setFontSize(13);
          doc.setFont(undefined, "bold");
          doc.text(`Point des engagements`, data.settings.margin.left, 61);
          doc.setFont(undefined, "normal");
          doc.setFontSize(10);
          doc.text(
            `Nombre d'engagements: ${realData?.nb_total}`,
            data.settings.margin.left,
            66
          );
          doc.text(
            `Montant des engagements: ${formatNumberToMoney(
              realData?.mt_engagement
            )} FCFA`,
            data.settings.margin.left,
            71
          );
          doc.text(
            `Montant des versements: ${formatNumberToMoney(
              realData?.mt_versement
            )} FCFA`,
            data.settings.margin.left,
            76
          );
          doc.text(
            `Montant des versements restant: ${formatNumberToMoney(
              realData?.mt_restant
            )} FCFA`,
            data.settings.margin.left,
            81
          );
          doc.text(
            `Taux des versements: ${Math.round(realData?.taux_versement, 0)} %`,
            data.settings.margin.left,
            86
          );
          doc.text(
            `Taux à recouvrer: ${Math.round(realData?.taux_restant, 0)} %`,
            data.settings.margin.left,
            91
          );
          // Point financier
          doc.setFontSize(13);
          doc.setFont(undefined, "bold");
          doc.text(`Point financier`, 190, 61, {
            align: "right",
          });
          doc.setFont(undefined, "normal");
          doc.setFontSize(10);
          doc.text(
            `Total des versements: ${formatNumberToMoney(
              realData?.mt_versement
            )} FCFA`,
            190,
            66,
            {
              align: "right",
            }
          );
          doc.text(
            `Total des dépenses: ${formatNumberToMoney(
              realData?.mt_depense
            )} FCFA`,
            190,
            71,
            {
              align: "right",
            }
          );
          doc.text(
            `Solde actuel: ${formatNumberToMoney(
              Number(realData?.mt_versement - realData?.mt_depense)
            )} FCFA`,
            190,
            76,
            {
              align: "right",
            }
          );
          // Point financier
          doc.setFontSize(13);
          doc.setFont(undefined, "bold");
          doc.text(`Récapitulatif par mission`, data.settings.margin.left, 100);
          doc.setTextColor(100);
        },
        margin: {
          top: 105,
        },
      });

      // Second table
      const monthcols = ["Mois", "Montant versé"];
      let monthDatas = [];
      let dataMonths = realData?.mensuel_datas;

      dataMonths?.map((dw) => {
        let data = [dw.french_month, formatNumberToMoney(dw.mouvement_sum)];
        return monthDatas.push(data);
      });

      doc.autoTable({
        head: [monthcols],
        body: monthDatas,
        headerStyles,
        startY: doc.autoTable.previous.finalY + 15,
        willDrawPage: (data) => {
          doc.setFontSize(13);
          doc.setFont(undefined, "bold");
          doc.text(
            `Point mensuel des versements`,
            data.settings.margin.left,
            doc.autoTable.previous.finalY + 10
          );
        },
      });

      doc.save("RapportEngagement.pdf");
    } else {
      const doc = new jsPDF();
      const mycols = ["Mois", "Entrées", "Dépenses", "Reste"];
      let mydatas = [];
      let dataWanted = realData?.point_mensuel;

      console.log("pefefef", realData?.point_mensuel)

      dataWanted.map((dw) => {
        let datas = [
          dw.date,
          formatNumberToMoney(dw.entrees),
          formatNumberToMoney(dw.depenses),
          formatNumberToMoney(Number(dw.entrees - dw.depenses)),
        ];
        return mydatas.push(datas);
      });
      doc.autoTable({
        head: [mycols],
        body: mydatas,
        headerStyles,
        willDrawPage: (data) => {
          doc.addImage(
            imageBase64,
            "PNG",
            data.settings.margin.left, // centerX,
            10, // centerY,
            imageWidth,
            imageHeight
          );
          doc.setFontSize(15);
          doc.setFont(undefined, "bold");
          doc.text(
            "Point financier, mission: ADS " + realData?.mission,
            data.settings.margin.left,
            46
          );
          doc.setFont(undefined, "normal");
          doc.setFontSize(12);
          doc.text(
            `Periode: ${dayjs(realData?.date_debut).format(
              "DD/MM/YYYY"
            )} - ${dayjs(realData?.date_fin).format("DD/MM/YYYY")}`,
            data.settings.margin.left,
            51
          );
          doc.text(
            `Total offrande: ${formatNumberToMoney(realData?.offrande)} FCFA`,
            data.settings.margin.left,
            66
          );
          doc.text(
            `Total dime: ${formatNumberToMoney(realData?.dime)} FCFA`,
            data.settings.margin.left,
            71
          );
          doc.text(
            `Total autre: ${formatNumberToMoney(realData?.autre_entree)} FCFA`,
            data.settings.margin.left,
            76
          );
          doc.text(
            `Montant total: ${formatNumberToMoney(
              realData?.autre_entree + realData?.dime + realData?.offrande
            )} FCFA`,
            data.settings.margin.left,
            81
          );
          // Right
          doc.text(
            `Total des dépenses: ${formatNumberToMoney(
              realData?.depense
            )} FCFA`,
            190,
            66,
            {
              align: "right",
            }
          );
          doc.text(
            `Solde caisse: ${formatNumberToMoney(realData?.caisse)} FCFA`,
            190,
            71,
            {
              align: "right",
            }
          );
          doc.text(
            `Solde banque: ${formatNumberToMoney(realData?.banque)} FCFA`,
            190,
            76,
            {
              align: "right",
            }
          );
          doc.setFont(undefined, "bold");
          doc.text(`Détails des entrées par mois`, data.settings.margin.left, 100);
          doc.setTextColor(100);
        },
        margin: {
          top: 105,
        },
      });

      doc.save("RapportFinances.pdf");
    }
  };

  return (
    <div>
      {" "}
      <Button event={handleClick}>Générer le rapport</Button>
    </div>
  );
}

export default SpecialRapportBtn;
