import React from "react";
import Layout from "../../components/common/Layout";
import PageContent from "../../components/common/PageContent";
import Card from "../../components/common/Card";
import {
  Form,
  FormDatePicker,
  FormFieldEntreeSortie,
  FormSelect,
  SubmitButton,
} from "../../components/forms";
import { useDispatch, useSelector } from "react-redux";
import {
  getEntrees as getTypeEntrees,
  getMissions,
  getSorties,
} from "../../features/settings/settingsSlice";
import { formatDataToSelect, formatLocaleEn } from "../../utils/helpers";
import * as Yup from "yup";
import {
  addCaisseEntree,
  addCaisseSortie,
} from "../../features/finance/financeSlice";
import { useAppContext } from "../../context/AppState";

const validationSchema = Yup.object().shape({
  mission: Yup.mixed().required("Ce champ est requis."),
  date: Yup.date().required("Ce champ est requis."),
  entrees: Yup.array("Ce champ est requis")
    .of(
      Yup.object().shape({
        type: Yup.mixed().required("Chaque entrée doit avoir un type."),
        montant: Yup.number().required("Chaque entrée doit avoir un montant."),
        commentaire: Yup.string(),
      })
    )
    .min(1, "Merci d'ajouter au moins une entrée.")
    .test(
      "unique-entrees",
      "Les entrées ne doivent pas avoir le meme type.",
      (value) => {
        const hasDuplicates = value.some(
          (item, index) =>
            value.findIndex((item2) => item.type === item2.type) !== index
        );
        return !hasDuplicates;
      }
    ),
  sorties: Yup.array("Ce champ est requis")
    .of(
      Yup.object().shape({
        type: Yup.mixed().required("Chaque sortie doit avoir un type."),
        montant: Yup.number().required("Chaque sortie doit avoir un montant."),
        commentaire: Yup.string(),
      })
    )
    // .min(1, "Merci d'ajouter au moins une sortie.")
    .test(
      "unique-sorties",
      "Les sorties ne doivent pas avoir le meme type.",
      (value) => {
        const hasDuplicates = value.some(
          (item, index) =>
            value.findIndex((item2) => item.type === item2.type) !== index
        );
        return !hasDuplicates;
      }
    ),
});

function FicheDimanche() {
  const dispatch = useDispatch();
  const { missions, entrees, sorties } = useSelector((state) => state.settings);
  const { setNotificationContent, switchNotification } = useAppContext();
  // const user = useSelector((state) => state.auth.user.user);
  const { user } = useSelector((state) => state.auth);

  React.useEffect(() => {
    dispatch(getMissions());
    dispatch(getTypeEntrees());
    dispatch(getSorties());
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    const entrees = values.entrees;

    const entreesToSave = entrees.map((entree) => {
      return {
        mission: values.mission,
        date: formatLocaleEn(values.date),
        type_entree: entree.type,
        montant: entree.montant,
        commentaire: entree.commentaire,
        auteur: user?.user?.id,
      };
    });

    entreesToSave.map((entree) => {
      dispatch(addCaisseEntree(entree))
        .unwrap()
        .catch(() => {
          setNotificationContent({
            type: "error",
            title: "Erreur",
            description: `L'entrée ${entree.type_entree} de ${entree.montant} FCFA n'a pas pu être ajoutée.`,
          });
          switchNotification(true);
        });
    });

    const sorties = values.sorties;

    const sortiesToSave = sorties.map((sortie) => {
      return {
        mission: values.mission,
        date: formatLocaleEn(values.date),
        type_sortie: sortie.type,
        montant: sortie.montant,
        commentaire: sortie.commentaire,
        auteur: user?.user?.id,
      };
    });

    sortiesToSave.map((sortie) => {
      dispatch(addCaisseSortie(sortie))
        .unwrap()

        .catch(() => {
          setNotificationContent({
            type: "danger",
            title: "Erreur",
            description: `La sortie ${sortie.type} de ${sortie.montant} FCFA n'a pas pu être ajoutée.`,
          });
          switchNotification(true);
        });
    });

    setNotificationContent({
      type: "success",
      title: "Succès",
      description: "La fiche du dimanche a bien été ajoutée.",
    });
    switchNotification(true);

    resetForm();
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <Layout>
      <PageContent title={"Fiche du dimanche"}>
        <div className="mt-2">
          <Card>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Nouvelle fiche du dimanche
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Veuillez remplir le formulaire pour créer une nouvelle fiche.
            </p>

            <Form
              initialValues={{
                mission: user?.mission?.id === 0 ? null : user?.mission?.id,
                date: new Date(),
                entrees: [],
                sorties: [],
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <FormDatePicker name={"date"} label={"Date"} minDate={null} />
                </div>
                <div className="sm:col-span-3">
                  {user?.mission?.id === 0 && (
                    <FormSelect
                      datas={formatDataToSelect(missions)}
                      name={"mission"}
                      label={"Mission"}
                    />
                  )}
                </div>

                <div className="sm:col-span-3">
                  <FormFieldEntreeSortie
                    tabName="entrees"
                    label={"Ajouter les entrées"}
                    typeDatas={formatDataToSelect(entrees)}
                  />
                </div>
                <div className="sm:col-span-3">
                  <FormFieldEntreeSortie
                    tabName="sorties"
                    label={"Ajouter les sorties"}
                    typeDatas={formatDataToSelect(sorties)}
                    mode="sorties"
                  />
                </div>
              </div>
              <SubmitButton>Ajouter</SubmitButton>
            </Form>
          </Card>
        </div>
      </PageContent>
    </Layout>
  );
}

export default FicheDimanche;
