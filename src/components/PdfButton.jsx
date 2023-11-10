import jsPDF from "jspdf";
import "jspdf-autotable";
import Button from "./common/Button";
import { ctamTampo } from "../constants/utils";
import { formatNumberToMoney } from "../utils/helpers";
import dayjs from "dayjs";

function PDFButton({ mode = "engagement", realData, description = null }) {
  const headerStyles = {
    // fillColor: [166, 51, 32],
    fillColor: [1, 28, 55],
  };

  const imageBase64 = ctamTampo;
  const imageWidth = 30; // Set the width of the image
  const imageHeight = 30; // Set the height of the image

  const handleClick = () => {
    const datasWanted = realData.map((data) => {
      return data.original;
    });

    console.log("ISMOOOOO", datasWanted);

    if (mode === "engagement") {
      const mycols = [
        "Mission",
        "Membre",
        "Palier (FCFA)",
        "Versement (FCFA)",
        "Restant (FCFA)",
        "Evolution (%)",
        "Année",
      ];
      let mydatas = [];
      let total = 0;
      let total_restant = 0;
      let total_palier = 0;

      datasWanted.map((dw) => {
        let datas = [
          dw.f_mission,
          dw.full_name,
          dw.f_palier,
          dw.f_versement,
          dw.f_reste,
          dw.mouvement_percent?.toFixed(0),
          dw.f_date,
        ];
        total += dw.mouvement_sum;
        total_restant += dw.palier__montant - dw.mouvement_sum;
        total_palier += dw.palier__montant;
        return mydatas.push(datas);
      });

      const doc = new jsPDF();

      doc.autoTable({
        head: [mycols],
        body: mydatas,
        headerStyles,
        foot: [
          [
            "",
            "Total",
            formatNumberToMoney(total_palier),
            formatNumberToMoney(total),
            formatNumberToMoney(total_restant),
          ],
        ],
        footStyles: { fillColor: [1, 28, 55] },
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
          doc.text("Rapport des engagements", data.settings.margin.left, 46);
          doc.setFontSize(10);
          doc.text(
            `Date: ${dayjs().format("DD/MM/YYYY HH:mm")}`,
            data.settings.margin.left,
            51
          );
          doc.setTextColor(100);
        },
        margin: {
          top: 55,
        },
      });
      doc.save("RapportEngagement.pdf");
    } else if (mode === "engagement_details") {
      const mycols = ["Montant", "Date"];
      let mydatas = [];

      datasWanted.map((dw) => {
        let datas = [dw.f_montant, dw.f_date];
        return mydatas.push(datas);
      });

      const doc = new jsPDF();
      // let finalY = doc.lastAutoTable.finalY || 10;

      // doc.setFontSize(12);
      // doc.text(description.title, 14, finalY);

      // add footer with page number
      // let pageCount = doc.internal.getNumberOfPages();
      // for (var i = 0; i < pageCount; i++) {
      //   doc.setPage(i);
      //   doc.text(
      //     "Page " + String(i + 1) + " of " + String(pageCount),
      //     14,
      //     doc.internal.pageSize.height - 10
      //   );
      // }

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
          doc.text(description.title, data.settings.margin.left, 48);
          doc.setTextColor(100);
        },
        margin: {
          top: 55,
        },
      });
      doc.save(description.fileName);
    } else if (mode === "engagement_entrees") {
      // engagements entrées
      const mycols = ["Mission", "Membre", "Palier", "Versement", "Date"];
      let mydatas = [];
      let total = 0;

      datasWanted.map((dw) => {
        let datas = [
          dw.f_mission,
          dw.f_membre,
          dw.f_palier,
          dw.f_montant,
          dw.f_date,
        ];
        total += dw.montant;
        return mydatas.push(datas);
      });

      const doc = new jsPDF();

      doc.autoTable({
        head: [mycols],
        body: mydatas,
        headerStyles,
        foot: [["", "", "Total", formatNumberToMoney(total)]],
        footStyles: { fillColor: [1, 28, 55] },
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
          doc.text(
            "Rapport des versements sur engagements",
            data.settings.margin.left,
            46
          );
          doc.setFontSize(10);
          doc.text(
            `Date: ${dayjs().format("DD/MM/YYYY HH:mm")}`,
            data.settings.margin.left,
            51
          );
          doc.setTextColor(100);
        },
        margin: {
          top: 55,
        },
      });
      doc.save("RapportVersementsEngagements.pdf");
    } else if (mode === "engagement_depenses") {
      // engagements depenses
      const mycols = ["Libelle", "Montant", "Date"];
      let mydatas = [];
      let total = 0;

      datasWanted.map((dw) => {
        let datas = [dw.libelle, dw.f_montant, dw.f_date];
        total += dw.montant;
        return mydatas.push(datas);
      });

      const doc = new jsPDF();

      doc.autoTable({
        head: [mycols],
        body: mydatas,
        headerStyles,
        foot: [["Total", formatNumberToMoney(total)]],
        footStyles: { fillColor: [1, 28, 55] },
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
          doc.text(
            "Rapport des dépenses sur engagement",
            data.settings.margin.left,
            46
          );
          doc.setFontSize(10);
          doc.text(
            `Date: ${dayjs().format("DD/MM/YYYY HH:mm")}`,
            data.settings.margin.left,
            51
          );
          doc.setTextColor(100);
        },
        margin: {
          top: 55,
        },
      });
      doc.save("RapportDepensesEngagements.pdf");
    } else if (mode === "membres") {
      const mycols = [
        "Mission",
        "Nom complet",
        "S. matrimoniale",
        "Baptisé",
        "Sexe",
        "Fonction",
        "Nouveau",
      ];
      let mydatas = [];

      datasWanted.map((dw) => {
        let datas = [
          dw.f_mission,
          dw.full_name,
          dw.f_marie,
          dw.f_baptise,
          dw.f_sexe,
          dw.fonction,
          dw.f_nouveau,
        ];
        return mydatas.push(datas);
      });

      const doc = new jsPDF();

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
          doc.text("Rapport des membres", data.settings.margin.left, 48);
          doc.setTextColor(100);
        },
        margin: {
          top: 55,
        },
      });
      doc.save("RapportMembres.pdf");
    } else if (mode === "nouveaux") {
      const mycols = [
        "Mission",
        "Nom complet",
        "S. matrimoniale",
        "Baptisé",
        "Sexe",
        "Fonction",
        "Suivi par",
      ];
      let mydatas = [];

      datasWanted.map((dw) => {
        let datas = [
          dw.f_mission,
          dw.full_name,
          dw.f_marie,
          dw.f_baptise,
          dw.f_sexe,
          dw.fonction,
          dw.encadreur,
        ];
        return mydatas.push(datas);
      });

      const doc = new jsPDF();

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
          doc.text("Rapport des nouveaux", data.settings.margin.left, 48);
          doc.setTextColor(100);
        },
        margin: {
          top: 55,
        },
      });
      doc.save("RapportNouveaux.pdf");
    } else if (mode === "fi_entrees") {
      // engagements entrées
      const mycols = ["Mission", "Type", "Montant", "Date", "Commentaire"];
      let mydatas = [];
      let total = 0;

      datasWanted.map((dw) => {
        let datas = [
          dw.f_mission,
          dw.f_type,
          dw.f_montant,
          dw.f_date,
          dw.commentaire,
        ];
        total += dw.montant;
        return mydatas.push(datas);
      });

      const doc = new jsPDF();

      doc.autoTable({
        head: [mycols],
        body: mydatas,
        headerStyles,
        foot: [["", "Total", formatNumberToMoney(total)]],
        footStyles: { fillColor: [1, 28, 55] },
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
          doc.text(
            "Rapport des entrées en caisse",
            data.settings.margin.left,
            46
          );
          doc.setFontSize(10);
          doc.text(
            `Date: ${dayjs().format("DD/MM/YYYY HH:mm")}`,
            data.settings.margin.left,
            51
          );
          doc.setTextColor(100);
        },

        margin: {
          top: 55,
        },
      });
      doc.save("RapportEntreesCaisse.pdf");
    } else if (mode === "fi_sorties") {
      // engagements entrées
      const mycols = ["Mission", "Type", "Montant", "Date", "Commentaire"];
      let mydatas = [];
      let total = 0;

      datasWanted.map((dw) => {
        let datas = [
          dw.f_mission,
          dw.f_type,
          dw.f_montant,
          dw.f_date,
          dw.commentaire,
        ];
        total += dw.montant;
        return mydatas.push(datas);
      });

      const doc = new jsPDF();

      doc.autoTable({
        head: [mycols],
        body: mydatas,
        headerStyles,
        foot: [["", "Total", formatNumberToMoney(total)]],
        footStyles: { fillColor: [1, 28, 55] },
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
          doc.text(
            "Rapport des sorties de caisse",
            data.settings.margin.left,
            46
          );
          doc.setFontSize(10);
          doc.text(
            `Date: ${dayjs().format("DD/MM/YYYY HH:mm")}`,
            data.settings.margin.left,
            51
          );
          doc.setTextColor(100);
        },
        margin: {
          top: 55,
        },
      });
      doc.save("RapportSortiesCaisse.pdf");
    } else if (mode === "suivi_banque") {
      // engagements entrées
      const mycols = ["Action", "Montant", "Date", "Commentaire"];
      let mydatas = [];
      let total = 0;

      datasWanted.map((dw) => {
        let datas = [dw.f_action, dw.f_montant, dw.f_date, dw.commentaire];
        total += dw.montant;
        return mydatas.push(datas);
      });

      const doc = new jsPDF();

      doc.autoTable({
        head: [mycols],
        body: mydatas,
        headerStyles,
        foot: [["Total", formatNumberToMoney(total)]],
        footStyles: { fillColor: [1, 28, 55] },
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
          doc.text(
            "Rapport des transactions banquaire",
            data.settings.margin.left,
            46
          );
          doc.setFontSize(10);
          doc.text(
            `Date: ${dayjs().format("DD/MM/YYYY HH:mm")}`,
            data.settings.margin.left,
            51
          );
          doc.setTextColor(100);
        },
        margin: {
          top: 55,
        },
      });
      doc.save("RapportSuiviBanque.pdf");
    } else {
      const mycols = [
        "Nom complet",
        "Adresse email",
        "Session",
        "Groupe",
        "Equipe",
        "Evaluation soumise",
      ];
      let mydatas = [];

      datasWanted.map((dw) => {
        let datas = [
          dw.full_name,
          dw.email,
          dw.session_libelle,
          dw.groupe_libelle,
          dw.sous_equipe_libelle,
          dw.statut,
        ];
        return mydatas.push(datas);
      });

      const doc = new jsPDF();
      let finalY = doc.lastAutoTable.finalY || 10;

      doc.setFontSize(18);
      doc.text("MDE - Rapport des évaluations", 14, finalY);
      doc.setFontSize(11);
      doc.setTextColor(100);

      doc.autoTable({
        head: [mycols],
        body: mydatas,
        headerStyles,
      });
      doc.save("RapportEvaluations.pdf");
    }
  };

  return (
    <label className="flex flex-col gap-y-2 items-baseline">
      <span className="text-mde-gray">Exportation: </span>
      <Button event={handleClick}>Télécharger en PDF</Button>
    </label>
  );
}


export default PDFButton;
