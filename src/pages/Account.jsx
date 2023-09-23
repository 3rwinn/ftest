import React from "react";
import Layout from "../components/common/Layout";
import PageContent from "../components/common/PageContent";
import Card from "../components/common/Card";
import { Form, FormField, SubmitButton } from "../components/forms";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { changeUserPassword } from "../features/auth/authSlice";
import { useAppContext } from "../context/AppState";

const validationSchema = Yup.object().shape({
  //   email: Yup.string().email("Email invalide.").required("Ce champ est requis."),
  currentPassword: Yup.string().required("Ce champ est requis."),
  password1: Yup.string()
    .min(6, "Le mot de passe doit contenir au moins 8 caractères.")
    .required("Ce champ est requis."),
  password2: Yup.string()
    .oneOf(
      [Yup.ref("password1"), null],
      "Les mots de passe doivent être identique."
    )
    .required("Ce champ est requis."),
});

function Account() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.user);
  const { switchNotification, setNotificationContent } = useAppContext();

  console.log("user", user);

  const handleSubmit = (values, { resetForm }) => {
    let datasToSend = {
      user_id: user.id,
      old_password: values.currentPassword,
      new_password: values.password1,
    };
    dispatch(changeUserPassword(datasToSend))
      .unwrap()
      .then(() => {
        setNotificationContent({
          title: "Succès",
          description: "Mot de passe modifié avec succès.",
          type: "success",
        });
        switchNotification(true);
        resetForm();
      })
      .catch((err) => {
        console.log("err", err);
        setNotificationContent({
          title: "Erreur",
          description:
            "Une erreur est survenue lors de la modification du mot de passe.",
          type: "error",
        });
        switchNotification(true);
      });
  };
  return (
    <Layout>
      <PageContent title={"Paramètres du compte"}>
        <div className="mt-2">
          <Card>
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Mon compte
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Ici vous pouvez modifier les informations de votre compte
              </p>

              <div className="mb-4" />

              <Form
                initialValues={{
                  currentPassword: "",
                  password1: "",
                  password2: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <FormField
                  type={"password"}
                  name={"currentPassword"}
                  label={"Mot de passe actuel"}
                />

                <FormField
                  type={"password"}
                  name={"password1"}
                  label={"Nouveau mot de passe"}
                />
                <FormField
                  type={"password"}
                  name={"password2"}
                  label={"Confirmer le mot de passe"}
                />

                <div className="mt-6">
                  <SubmitButton>Modifier</SubmitButton>
                </div>
              </Form>
            </div>
          </Card>
        </div>
      </PageContent>
    </Layout>
  );
}

export default Account;
