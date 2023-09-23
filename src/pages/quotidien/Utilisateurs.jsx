import React from "react";
import Layout from "../../components/common/Layout";
import PageContent from "../../components/common/PageContent";
import { useAppContext } from "../../context/AppState";
import { useDispatch, useSelector } from "react-redux";
import { formatDataToSelect } from "../../utils/helpers";
import {
  Form,
  FormSelect,
  FormField,
  SubmitButton,
} from "../../components/forms";
import { getMissions } from "../../features/settings/settingsSlice";
import { deleteUser, getUsers, register } from "../../features/auth/authSlice";
import Table from "../../components/Table";
import * as Yup from "yup";
import { TrashIcon } from "@heroicons/react/24/outline";

const validationSchema = Yup.object().shape({
  nom: Yup.string().required("Ce champ est requis."),
  prenom: Yup.string().required("Ce champ est requis."),
  email: Yup.string().email("Email invalide.").required("Ce champ est requis."),
  role: Yup.mixed().required("Ce champ est requis."),
  mission: Yup.mixed().required("Ce champ est requis."),
});

function NewUsers() {
  const dispatch = useDispatch();

  const { switchNotification, setNotificationContent, switchSlideOver } =
    useAppContext();

  const { missions } = useSelector((state) => state.settings);

  React.useEffect(() => {
    dispatch(getMissions());
  }, []);

  const handleSubmit = (values) => {
    console.log("VALUES", values);
    const newUserDatas = {
      first_name: values.prenom,
      last_name: values.nom,
      email: values.email,
      is_staff: values.role === 2 ? true : false, // 1: superviseur, 2: admin
      mission: values.mission,
    };

    dispatch(register(newUserDatas))
      .unwrap()
      .then(() => {
        dispatch(getUsers());
        switchSlideOver(false);
        setNotificationContent({
          title: "Succès",
          description: "Utilisateur ajouté avec succès.",
          type: "success",
        });
        switchNotification(true);
      })
      .catch((err) => {
        console.log("ERROR", err);
        setNotificationContent({
          title: "Erreur",
          description:
            "Une erreur est survenue lors de l'ajout d'un utilisateur.",
          type: "error",
        });
        switchNotification(true);
      });
  };

  return (
    <div className="p-4">
      <Form
        initialValues={{
          nom: "",
          prenom: "",
          email: "",
          role: null,
          mission: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormSelect
          name={"mission"}
          label={"Mission"}
          datas={formatDataToSelect(missions)}
        />
        <FormField name={"nom"} type={"text"} label={"Nom"} />
        <FormField name={"prenom"} type={"text"} label={"Prénom"} />
        <FormField name={"email"} type={"email"} label={"Email"} />
        <FormSelect
          label={"Role"}
          name={"role"}
          datas={formatDataToSelect([
            { id: 1, libelle: "Superviseur" },
            { id: 2, libelle: "Administrateur" },
          ])}
        />

        <SubmitButton>Ajouter</SubmitButton>
      </Form>
    </div>
  );
}

function Utilisateurs() {
  const {
    switchSlideOver,
    setSlideOverContent,
    setNotificationContent,
    switchNotification,
    switchModal
  } = useAppContext();

  const showNewUser = () => {
    setSlideOverContent({
      title: "Nouvel utilisateur",
      description:
        "Veuillez remplir le formulaire pour ajouter un utilisateur.",
      body: <NewUsers />,
    });
    switchSlideOver(true);
  };

  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.auth);

  console.log("usrs", users);

  React.useEffect(() => {
    dispatch(getUsers());
  }, []);

  const [formatedUsers, setFormatedUsers] = React.useState([]);
  React.useEffect(() => {
    if (users.length > 0) {
      let newDatas = users?.map((user) => {
        return {
          ...user,
          is_staff: user.is_staff === true ? "Administrateur" : "Superviseur",
        };
      });

      setFormatedUsers(newDatas);
    } else {
      setFormatedUsers([]);
    }
  }, [users]);

  const handleDeleteUser = (userId) => {
    switchModal(true, {
      title: "Supprimer un utilisateur",
      type: "danger",
      description: "Êtes-vous sûr de vouloir supprimer cet utilisateur ?",
      sideEvent: () => {
        dispatch(deleteUser(userId))
          .unwrap()
          .then(() => {
            // dispatch(getUsers());
            setNotificationContent({
              title: "Succès",
              description: "Utilisateur supprimé avec succès.",
              type: "success",
            });
            switchNotification(true);
          })
          .catch((err) => {
            console.log("ERROR", err);
            setNotificationContent({
              title: "Erreur",
              description:
                "Une erreur est survenue lors de la suppression d'un utilisateur.",
              type: "error",
            });
            switchNotification(true);
          });
      },
    });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Nom",
        accessor: "first_name",
      },
      {
        Header: "Prénom",
        accessor: "last_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Role",
        accessor: "is_staff",
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ value, row }) => {
          let userDatas = row.original;
          let userId = value;
          return (
            // <div className="flex space-x-2">
            <div>
              <div
                onClick={() => handleDeleteUser(userId)}
                className="cursor-pointer"
              >
                <TrashIcon className="text-mde-red h-5 w-5" />
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
      <PageContent
        title={"Utilisateurs"}
        actionButton={{
          title: "Ajouter un utilisateur",
          event: () => showNewUser(),
        }}
      >
        <Table columns={columns} data={formatedUsers} withExport={false} />
      </PageContent>
    </Layout>
  );
}

export default Utilisateurs;
