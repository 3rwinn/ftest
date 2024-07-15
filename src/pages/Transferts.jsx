import React from "react";
import Layout from "../components/common/Layout";
import PageContent from "../components/common/PageContent";
import Table from "../components/Table";
// import {
//   // ArrowRightIcon,
//   PencilIcon,
//   TrashIcon,
// } from "@heroicons/react/24/solid";

import { useDispatch, useSelector } from "react-redux";
import { useAppContext } from "../context/AppState";
import dayjs from "dayjs";
import NewTransfert from "../components/transferts/NewTransfert";
import { getTransferts } from "../features/transferts/transfertSlice";

function Transferts() {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);
  const { transferts } = useSelector((state) => state.transferts);

  React.useEffect(() => {
    dispatch(getTransferts());
  }, []);

  // console.log("transferts", transferts);

  const [formatedTransfets, setFormatedTransferts] = React.useState([]);

  const {
    switchSlideOver,
    setSlideOverContent,
    setNotificationContent,
    switchNotification,
    switchModal,
  } = useAppContext();

  const showNewTransfertForm = () => {
    setSlideOverContent({
      title: "Nouveau transfert",
      description:
        "Veuillez remplir le formulaire pour créer un nouveau transfert.",
      body: <NewTransfert />,
    });
    switchSlideOver(true);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "f_date",
      },
      {
        Header: "Montant",
        accessor: "montant",
      },
      {
        Header: "ID Client source",
        accessor: "f_id_source",
      },

      {
        Header: "ID Client destination",
        accessor: "f_id_abonne",
      },
    ],
    []
  );

  React.useEffect(() => {
    if (transferts.length > 0) {
      let newDatas = transferts?.map((transfert) => {
        return {
          f_date: dayjs(transfert.date).format("DD/MM/YYYY"),
          f_id_source: transfert.id_client_source,
          f_id_abonne: transfert.id_client_destination,
          ...transfert,
        };
      });

      setFormatedTransferts(newDatas);
    }
  }, [transferts]);

  return (
    <Layout>
      <PageContent
        title={"Liste des transferts"}
        actionButton={{
          title: "Nouveau transfert",
          event: showNewTransfertForm,
        }}
      >
        <div className="mt-2">
          <Table
            columns={columns}
            data={formatedTransfets}
            withExport={false}
          />
        </div>
      </PageContent>
    </Layout>
  );
}

export default Transferts;
