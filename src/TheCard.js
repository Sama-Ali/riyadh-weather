import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "./style.css";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ar";
import { useTranslation } from "react-i18next";
import CircularProgress from "@mui/material/CircularProgress";

import { fetchWeather } from "./features/logics/weatherSlice";
import { useSelector, useDispatch } from "react-redux";

export default function TheCard() {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => {
    return state.weather.isLoading;
    //       ↑      ↑      ↑
    //       |      |      └── "isLoading" from initialState
    //       |      └── "weather" from store reducer key
    //       └── "state" (entire Redux state)
  });
  const weather = useSelector((state) => {
    return state.weather.weather;
  });

  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("ar");

  moment.locale(language);
  const date = moment().format("DD MMMM YYYY");

  // toggle language between ar and en
  const toggleLanguage = () => {
    const newLanguage = language === "ar" ? "en" : "ar";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  useEffect(() => {
    i18n.changeLanguage("ar");
    console.log("fetching weather");
    dispatch(fetchWeather());
  }, []);
  return (
    <>
      <Card className="card" dir={language === "ar" ? "rtl" : "ltr"}>
        <CardContent>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            spacing={2}
          >
            <h1 style={{ margin: 10, fontSize: "2rem", fontWeight: "900" }}>
              {t("Riyadh")}
            </h1>
            <h4>{date}</h4>
          </Stack>
          <hr />
          <br />
          <Stack direction="row" spacing={2}>
            <Stack direction="column" spacing={2}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                spacing={2}
                style={{ fontSize: "2rem", fontWeight: "900" }}
              >
                {isLoading ? (
                  <CircularProgress style={{ margin: 40, color: "white" }} />
                ) : (
                  <img
                    src={`${weather.icon}`}
                    alt="weather icon"
                    style={{ width: "4rem", height: "4rem" }}
                  />
                )}
              </Stack>
              <h3 style={{ textAlign: language === "ar" ? "right" : "left" }}>
                {t(weather.description)}
              </h3>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                spacing={2}
              >
                <h4>
                  {t("Min")}: {t(weather.min)}°
                </h4>
                <h4 style={{ margin: 10 }}>|</h4>
                <h4>
                  {t("Max")}: {t(weather.max)}°
                </h4>
              </Stack>
            </Stack>
            <img
              src={`${weather.icon}`}
              alt="weather icon"
              style={{
                width: "16rem",
                height: "16rem",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            />
          </Stack>
        </CardContent>
      </Card>
      <CardActions dir={language === "ar" ? "rtl" : "ltr"}>
        <Button size="small">
          <h4 onClick={toggleLanguage}>{t("Change Language")}</h4>
        </Button>
      </CardActions>
    </>
  );
}
