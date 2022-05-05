import React, { setGlobal, useEffect, useGlobal, useState } from "reactn";
import {
  collectionToDate,
  useDeadline,
  useEnvironment,
  useLanguageCode,
  useLocation,
  useSettings,
  useUser,
} from "../hooks";
import { config, firestore, version } from "../firebase";
import get from "lodash/get";
import { darkTheme, lightTheme } from "../theme";
import moment from "moment";
import { setLocale } from "yup";
import { yup } from "../config";
import { register } from "next-offline/runtime";
import { spinLoader } from "../components/common/loader";
import dynamic from "next/dynamic";

const UpdateVersion = dynamic(() => import("../components/versions/UpdateVersion"), {
  loading: () => spinLoader(),
});

export const WithConfiguration = (props) => {
  const [authUser] = useGlobal("user");
  const [, setDeadline] = useGlobal("deadline");
  const [settings, setSettings] = useGlobal("settings");
  const [, setIsVisibleLoginModal] = useGlobal("isVisibleLoginModal");

  const [authUserLS] = useUser();
  const [location] = useLocation();
  const [languageCode] = useLanguageCode();
  const [, setEnvironment] = useEnvironment();
  const [deadlineLS, setDeadlineLS] = useDeadline();
  const [settingsLS, setSettingsLocalStorage] = useSettings();

  const [isLoadingConfig, setIsLoadingConfig] = useState(true);

  let pageLoaded = false;

  useEffect(() => {
    const initializeConfig = async () => {
      setEnvironment(config.firebase.projectId);

      await setGlobal({
        user: authUserLS ? collectionToDate(authUserLS) : null,
        settings: collectionToDate({ ...settingsLS, version }),
        deadline: deadlineLS ? new Date(deadlineLS) : deadlineLS,
        location,
        audios: [],
        languageCode,
        ping: null,
        isAutomatic: false,
        register: null,
        isLoadingUser: false,
        isLoadingCreateUser: false,
        isVisibleLoginModal: false,
        isVisibleForgotPassword: false,
        openRightDrawer: false,
        openLeftDrawer: false,
        serverTime: new Date(),
        currentCurrency: "s/.",
        isAdmin: false,
        theme: get(authUserLS, "theme") === "lightTheme" ? lightTheme : darkTheme,
      });

      moment.locale(languageCode);
      setLocale(yup[languageCode]);
    };

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

    const fetchCountDowm = async () => {
      const landingSettingsQuery = await firestore.doc("settings/landing").get();

      const landingSettings = landingSettingsQuery.data();

      const countdownDate = landingSettings?.countdown?.toDate() ?? new Date();

      setDeadline(countdownDate);
      setDeadlineLS(countdownDate);
    };

    initializeConfig();
    fetchCountDowm();
    const unsubscribeVersion = fetchVersion();

    setIsLoadingConfig(false);

    return () => unsubscribeVersion();
  }, []);

  useEffect(() => {
    authUser && setIsVisibleLoginModal(false);
  }, [authUser, setIsVisibleLoginModal]);

  useEffect(() => {
    register("/sw.js", { scope: "/" });
  }, []);

  return version === get(settings, "version", version) ? (
    isLoadingConfig ? (
      spinLoader()
    ) : (
      props.children
    )
  ) : (
    <UpdateVersion />
  );
};
