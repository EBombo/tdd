const CONFIG = process.env.NEXT_PUBLIC_CONFIG ?? "";

const config = JSON.parse(CONFIG);

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        success: "#56EEA5",
        successDark: "#3FA876",
        successLight: "#77f1b7",
        primary: "#ED1E79",
        primaryDark: "#5D449E",
        primaryLight: "#C4ADFF",
        primaryDarken: "#754EDA",
        secondary: "#382079",
        secondaryDark: "#170D33",
        secondaryDarken: "#221545",
        secondaryLight: "#2E2547",
        white: "#ffffff",
        whiteDarken: "#D2D2D2",
        whiteDark: "#F2F2F2",
        whiteLight: "#FAFAFA",
        warning: "#FFC715",
        warningDark: "#A9840E",
        danger: "#DE0F0F",
        dangerDark: "#AC162C",
        default: "#494949",
        black: "#000000",
        blackLighten: "#404040",
        blackDarken: "#242424",
        gray: "#A6A4A7",
        grayDark: "#A3A3A3",
        grayDarken: "#585858",
        grayLight: "#666666",
        grayLighten: "#C4C4C4",
        red: "#D2232A",
        green: "#39B54A",
        orange: "#F47B20",
        lightBlue: "#00AEEF",
      },
      backgroundImage: () => ({
        pattern: `url('${config.storageUrl}/resources/pattern.svg')`,
        landing: `url('${config.storageUrl}/resources/landing-cover.svg')`,
        register: `url('${config.storageUrl}/resources/register-cover.svg')`,
        timeline: `url('${config.storageUrl}/resources/timeline-cover.svg')`,
        exhibitors: `url('${config.storageUrl}/resources/exhibitors-cover.svg')`,
        index: `url('${config.storageUrl}/resources/index-bg-img.jpg')`,
      }),
      boxShadow: {
        navbar: "0px 4px 4px 0px #00000012",
      },
    },
  },
  plugins: [],
};
