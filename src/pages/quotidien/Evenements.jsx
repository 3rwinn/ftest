import React, { Fragment } from "react";
import Layout from "../../components/common/Layout";
import PageContent from "../../components/common/PageContent";
import Card from "../../components/common/Card";
import { Menu, Transition } from "@headlessui/react";
import {
  EllipsisHorizontalIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";
import {
  Form,
  FormDatePicker,
  FormField,
  FormSelect,
  SubmitButton,
} from "../../components/forms";
import { useDispatch, useSelector } from "react-redux";
import { getMissions } from "../../features/settings/settingsSlice";
import { formatDataToSelect, formatLocaleEn } from "../../utils/helpers";
import {
  createEvenement,
  deleteEvenement,
  getEvenements,
} from "../../features/quotidien/quotidienSlice";
import { useAppContext } from "../../context/AppState";
import dayjs from "dayjs";
import "dayjs/locale/fr";
dayjs.locale("fr");
import calendar from "dayjs/plugin/calendar";
dayjs.extend(calendar);

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Evenements() {
  const dispatch = useDispatch();
  const { missions } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.auth);
  const { isLoading, evenements } = useSelector((state) => state.quotidien);

  const { setNotificationContent, switchNotification } = useAppContext();

  React.useEffect(() => {
    dispatch(getMissions());
    dispatch(getEvenements());
  }, []);

  const handleSubmit = (values) => {
    const eventDatas = {
      libelle: values.libelle,
      description: values.description,
      date: formatLocaleEn(values.date),
      mission: values.mission,
    };

    dispatch(createEvenement(eventDatas))
      .unwrap()
      .then(() => {
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "L'évènement a bien été créé",
        });

        switchNotification(true);
      })
      .catch((err) => {
        console.log(err);
        setNotificationContent({
          type: "error",
          title: "Erreur",
          description:
            "Une erreur est survenue lors de la création de l'évènement",
        });

        switchNotification(true);
      });
  };

  const deleteEvent = (id) => {
    dispatch(deleteEvenement(id))
      .unwrap()
      .then(() => {
        setNotificationContent({
          type: "success",
          title: "Succès",
          description: "L'évènement a bien été supprimé",
        });

        switchNotification(true);
      })
      .catch((err) => {
        console.log(err);
        setNotificationContent({
          type: "error",
          title: "Erreur",
          description:
            "Une erreur est survenue lors de la suppression de l'évènement",
        });

        switchNotification(true);
      });
  };

  return (
    <Layout>
      <PageContent title={"Evènements"}>
        <Card>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Prochains évènements
            </h2>
            <div className="lg:grid lg:grid-cols-13 lg:gap-x-17">
              <div className="mt-10 lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
                <Form
                  initialValues={{
                    libelle: "",
                    description: "",
                    date: new Date(),
                    mission: user?.mission?.id === 0 ? null : user?.mission?.id,
                  }}
                  onSubmit={handleSubmit}
                >
                  {user?.mission?.id === 0 && (
                    <FormSelect
                      name={"mission"}
                      datas={formatDataToSelect(missions)}
                      label="Mission"
                    />
                  )}

                  <FormField
                    name={"libelle"}
                    label={"Libellé de l'évènement"}
                  />
                  <FormDatePicker name={"date"} label={"Date de l'évènement"} />

                  <SubmitButton>Ajouter</SubmitButton>
                </Form>
              </div>
              <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-6 xl:col-span-7">
                {evenements?.map((evenement) => (
                  <li
                    key={evenement.id}
                    className="relative flex space-x-6 py-6 xl:static"
                  >
                    {/* <img
                      src={meeting.imageUrl}
                      alt=""
                      className="h-14 w-14 flex-none rounded-full"
                    /> */}
                    <div className="flex-auto">
                      <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
                        {evenement.libelle}
                      </h3>
                      <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                        <div className="flex items-start space-x-3">
                          <dt className="mt-0.5">
                            <span className="sr-only">Date</span>
                            <CalendarIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </dt>
                          <dd>
                            <time
                              dateTime={dayjs(evenement.date).format(
                                "DD/MM/YYYY"
                              )}
                            >
                              {dayjs(evenement.date).format("DD/MM/YYYY")}
                              {/* {dayjs(evenement.date).calendar()} */}
                            </time>
                          </dd>
                        </div>
                        {/* <div className="mt-2 flex items-start space-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                          <dt className="mt-0.5">
                            <span className="sr-only">Location</span>
                            <MapPinIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </dt>
                          <dd>
                          {evenement.mission}
                            {
                             missions.filter((mission) => mission.id === evenement.mission)[0]
                                 ?.libelle
                            }
                          </dd>
                        </div> */}
                      </dl>
                    </div>
                    <Menu
                      as="div"
                      className="absolute top-6 right-0 xl:relative xl:top-auto xl:right-auto xl:self-center"
                    >
                      <div>
                        <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                          <span className="sr-only">Open options</span>
                          <EllipsisHorizontalIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="focus:outline-none absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  onClick={() => deleteEvent(evenement.id)}
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm cursor-pointer"
                                  )}
                                >
                                  Supprimer
                                </span>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  Cancel
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </li>
                ))}

                {evenements.length === 0 && (
                  <div className="flex justify-center items-center h-32">
                    <p className="text-gray-500 text-sm">
                      Aucun évènement n'a été créé
                    </p>
                  </div>
                )}
              </ol>
            </div>
          </div>
        </Card>
      </PageContent>
    </Layout>
  );
}

export default Evenements;
