import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormComboSelect,
  FormDatePicker,
  FormField,
  FormSelect,
  FormSelectWithAction,
  FormUpload,
  SubmitButton,
} from "../forms";
import * as Yup from "yup";
import {
  createTransfert,
  getClient,
} from "../../features/transferts/transfertSlice";
import axios from "axios";
import backend from "../../constants/config";
import { useAppContext } from "../../context/AppState";

function SpecialSearch({ sentBack }) {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const keywords = values.source;
    // const mode = values.mode;
    dispatch(getClient(keywords))
      .unwrap()
      .then((data) => {
        sentBack(data.CUSTOMERS);
        // mode === "source"
        //   ? setClientSource(data.CUSTOMERS)
        //   : setClientDestination(data.CUSTOMERS);
      })
      .catch((err) => console.log("ismo", err));
  };
  return (
    <Form
      initialValues={{
        source: "",
        mode: "source",
      }}
      onSubmit={handleSubmit}
    >
      <div className="flex items-center">
        <div className="mr-4">
          <FormField label={"Rechercher client"} name={"source"} />
        </div>
        <div>
          <SubmitButton>Chercher</SubmitButton>
        </div>
      </div>
    </Form>
  );
}

const formatMembreToSelect = (datas) => {
  let dataSelect = [];

  datas?.map((data) =>
    dataSelect.push({
      id: data?.ACCOUNT_ID,
      name: data?.NAME + " " + data?.PHONE_NUMBER1,
      value: data.ACCOUNT_ID,
    })
  );

  return dataSelect;
};

function NewTransfert() {
  const dispatch = useDispatch();
  // const { clients } = useSelector((state) => state.transferts);

  // console.log("clients", clients);
  const {
    switchSlideOver,
    setNotificationContent,
    switchNotification,
    switchModal,
  } = useAppContext();

  const [clients, setClients] = React.useState([]);

  // const [clientDestination, setClientDestination] = React.useState([]);

  const handleTransfert = (values) => {
    let sourceId = values.source;
    let destinationId = values.destination;
    let montant = values.montant;

    const transfertData = {
      id_client_source: sourceId,
      id_client_destination: destinationId,
      montant: montant,
    };

    dispatch(createTransfert(transfertData))
      .unwrap()
      .then(() => {
        switchSlideOver(false);
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "Le transfert a bien été créé.",
        });
        switchNotification(true);
      })
      .catch((error) => {
        console.log("ERR", error);
        setNotificationContent({
          type: "error",
          title: "Erreur",
          description: "Une erreur est survenue ré-essayer plus tard",
        });
        switchNotification(true);
      });
  };

  const datas = formatMembreToSelect(clients);

  return (
    <div className="p-4">
      <SpecialSearch sentBack={setClients} />

      <Form
        initialValues={{
          montant: "",
          source: "",
          destination: "",
        }}
        onSubmit={handleTransfert}
      >
        <FormSelect label={"Source"} name={"source"} datas={datas} />
        <FormSelect label={"Destination"} name={"destination"} datas={datas} />

        <FormField type={"number"} name={"montant"} label={"Montant"} />

        <SubmitButton>Ajouter</SubmitButton>
      </Form>
    </div>
  );
}

export default NewTransfert;
