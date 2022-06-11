import {
  collectionToDate,
  useDeadline,
  useEnvironment,
  useLanguageCode,
  useLocation,
  useSendError,
  useSettings,
  useUser,
} from "../hooks";
import moment from "moment";
import get from "lodash/get";
import { setLocale } from "yup";
import { yup } from "../config";
import dynamic from "next/dynamic";
import { register } from "next-offline/runtime";
import { darkTheme, lightTheme } from "../theme";
import { spinLoader } from "../components/common/loader";
import { config, firestore, version } from "../firebase";
import React, { setGlobal, useEffect, useGlobal, useState } from "reactn";
import { useFetch } from "../hooks/useFetch";

const UpdateVersion = dynamic(() => import("../components/versions/UpdateVersion"), {
  loading: () => spinLoader(),
});

const dayFree = "11/06/2022";

const currentDate = moment().utcOffset(-5);

export const WithConfiguration = (props) => {
  const { Fetch } = useFetch();
  const { sendError } = useSendError();

  const [, setDeadline] = useGlobal("deadline");
  const [, setServerDate] = useGlobal("serverDate");
  const [settings, setSettings] = useGlobal("settings");

  const [authUserLS] = useUser();
  const [location] = useLocation();
  const [languageCode] = useLanguageCode();
  const [, setEnvironment] = useEnvironment();
  const [deadlineLS, setDeadlineLS] = useDeadline();
  const [settingsLS, setSettingsLocalStorage] = useSettings();

  const [isLoadingConfig, setIsLoadingConfig] = useState(true);

  let pageLoaded = false;

  useEffect(() => {
    /** Initial setup. **/
    const initializeConfig = async () => {
      setEnvironment(config.firebase.projectId);

      await setGlobal({
        user: authUserLS ? collectionToDate(authUserLS) : null,
        settings: collectionToDate({ ...settingsLS, version }),
        deadline: deadlineLS ? new Date(deadlineLS) : new Date(),
        location,
        audios: [],
        languageCode,
        ping: null,
        register: null,
        isAdmin: false,
        isAutomatic: false,
        isLoadingUser: false,
        openLeftDrawer: false,
        serverDate: new Date(),
        currentCurrency: "s/.",
        openRightDrawer: false,
        isVisibleLoginModal: false,
        isLoadingCreateUser: false,
        isVisibleForgotPassword: false,
        theme: get(authUserLS, "theme") === "lightTheme" ? lightTheme : darkTheme,
        isFreeDay: dayFree.toLowerCase().includes(currentDate.format("DD/MM/YYYY")),
      });

      moment.locale(languageCode);
      setLocale(yup[languageCode]);
    };

    /** Fetch current version. **/
    const fetchVersion = () =>
      firestore.doc("settings/default").onSnapshot(async (snapshot) => {
        if (!snapshot.exists) return;

        const newSettings = snapshot.data();

        await setSettings(newSettings);
        setSettingsLocalStorage(newSettings);

        if (version !== newSettings.version && pageLoaded) {
          localStorage.clear();
          document.location.reload(true);
        }

        pageLoaded = true;
      });

    /** Fetch expiration date of the event. **/
    const fetchExpirationEvent = async () => {
      const landingSettingsQuery = await firestore.doc("settings/landing").get();

      const landingSettings = landingSettingsQuery.data();

      const countdownDate = landingSettings?.countdown?.toDate() ?? new Date();

      setDeadline(countdownDate);
      setDeadlineLS(countdownDate);
    };

    /** Fetch server date to validate coupons. **/
    const fetchCurrentServerDate = async () => {
      try {
        const { response, error } = await Fetch(`${config.serverUrl}/get-server-date`);

        if (error) throw Error(error);

        const serverDate = new Date(response.date);

        setServerDate(serverDate);
      } catch (error) {
        console.error(error);
        sendError(error, "fetchCurrentServerDate");
      }
    };

    initializeConfig();
    fetchExpirationEvent();
    fetchCurrentServerDate();
    const unsubscribeVersion = fetchVersion();

    /** End load. **/
    setIsLoadingConfig(false);

    /** Close subscriptions. **/
    return () => unsubscribeVersion();
  }, []);

  useEffect(() => {
    /** Service worker. **/
    register("/sw.js", { scope: "/" });
  }, []);

  /** Loading. **/
  if (isLoadingConfig) return spinLoader();

  /** Validate version. **/
  if (version !== get(settings, "version", version)) return <UpdateVersion />;

  /** Show child component. **/
  return props.children;
};
