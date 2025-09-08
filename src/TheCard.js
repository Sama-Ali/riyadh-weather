import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "./style.css";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ar";
import { useTranslation } from "react-i18next";

let cancelRequest = null;

export default function TheCard() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("ar");
  // const [direction, setDirection] = useState("rtl");
  const [weather, setWeather] = useState({
    city: null,
    temp: null,
    description: null,
    icon: null,
    min: null,
    max: null,
  });

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
    axios
      .get(
        // Riyadh: 24.71355, 46.67529
        "https://api.openweathermap.org/data/2.5/weather?lat=24.71355&lon=46.67529&appid=4f8f3e042a291c506b6074a175006a36",
        // "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=4f8f3e042a291c506b6074a175006a36",
        {
          cancelToken: new axios.CancelToken((cancel) => {
            cancelRequest = cancel;
          }),
        }
      )
      .then((response) => {
        console.log("response: ", response);
        setWeather({
          city: response.data.name,
          temp: Math.round(response.data.main.temp - 272.15),
          description: response.data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
          min: Math.round(response.data.main.temp_min - 272.15),
          max: Math.round(response.data.main.temp_max - 272.15),
        });
      })
      .catch((error) => {
        console.log("error: ", error);
      });
    return () => {
      console.log("cancelRequest: ", cancelRequest);
      cancelRequest();
    };
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
                <h1 style={{ margin: 10 }}>{t(weather.temp)}°</h1>
                <img
                  src={`${weather.icon}`}
                  alt="weather icon"
                  style={{ width: "4rem", height: "4rem" }}
                />
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
