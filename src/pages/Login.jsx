import adsLogo from "../assets/ctam-ads.png";
import { Form, FormField, SubmitButton } from "../components/forms";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../features/auth/authSlice";

import * as Yup from "yup";
import React from "react";
import { useAppContext } from "../context/AppState";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Ce champ est requis"),
  password: Yup.string()
    .min(4, "Minimum 4 charactères")
    .required("Ce champ est requis"),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user } = useSelector((state) => state.auth);

  const { setNotificationContent, switchNotification } = useAppContext();

  React.useEffect(() => {
    if (user !== null) {
      // user?.user?.is_staff
      //   ? navigate("/dashboard")
      //   : navigate("/engagements/overview");
      // navigate("/dashboard");
      navigate("/transferts");
    }
  }, [user, navigate]);

  const handleSubmit = (values) => {
    const userData = {
      username: values.email,
      password: values.password,
    };

    dispatch(logIn(userData))
      .unwrap()
      .then(() => {
        setNotificationContent({
          title: "Succès",
          description: "Connexion réussie.",
          type: "success",
        });
      })
      .catch((error) => {
        console.log("ERROR", error);
        setNotificationContent({
          title: "Erreur",
          description:
            "Connexion impossible merci de verifier vos identifiants.",
          type: "error",
        });
        switchNotification(true);
      });
  };
  return (
    <div className="fixed bottom-0 top-0 w-full">
      <div className="min-h-full flex flex-col bg-ctam-primary justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-16 w-auto" src={adsLogo} alt="ADS Logo" />
          <h2 className="mt-6 text-center text-2xl font-extrabold text-white">
            Se connecter
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Form
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <FormField
                name={"email"}
                type={"email"}
                label={"Adresse email"}
              />
              <FormField
                name={"password"}
                type={"password"}
                label={"Mot de passe"}
              />

              <SubmitButton loading={isLoading} isFull={true}>
                Connexion
              </SubmitButton>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
