import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import {
  isError,
  loading,
  mainInfo,
  PAGES,
  ROOM,
  socket,
} from "../context/signals";

export function useCalls() {
  const [enabled, setEnabled] = useState(false);

  const [isSetPages, setIsSetPages] = useState(false);
  const [authCheckQuery, setPagesQuery, deviceInfoQuery, initInfoQuery] =
    useQueries({
      queries: [
        {
          queryKey: ["auth-check"],
          queryFn: () =>
            axios.post(
              `${
                import.meta.env.VITE_MODE == "DEV"
                  ? import.meta.env.VITE_DEV_API_URL
                  : import.meta.env.VITE_PROD_API_URL
              }/auth/check`,
              { code: ROOM }
            ),
          enabled: !isError.value,
        },
        {
          queryKey: ["set-pages"],
          queryFn: () =>
            axios.patch(
              `${
                import.meta.env.VITE_MODE == "DEV"
                  ? import.meta.env.VITE_DEV_API_URL
                  : import.meta.env.VITE_PROD_API_URL
              }/subscribers/set-pages`,
              { code: ROOM, pages: PAGES }
            ),
          enabled,
        },
        {
          queryKey: ["device-info"],
          queryFn: () => axios.get("https://ipapi.co/json/"),
          enabled: isSetPages,
        },
        {
          queryKey: ["get-init"],
          queryFn: () =>
            axios.get(
              `${
                import.meta.env.VITE_MODE == "DEV"
                  ? import.meta.env.VITE_DEV_API_URL
                  : import.meta.env.VITE_PROD_API_URL
              }/users/${getCookie("ID")}`
            ),
          enabled: isSetPages && Boolean(getCookie("ID")),
        },
      ],
    });
  if (authCheckQuery.isError) {
    isError.value = "The Code Is Expired Or Wrong";
  }
  if (initInfoQuery.error) deleteCookie("ID");
  if (deviceInfoQuery.isError)
    isError.value =
      "Cannot Get Device Info, it's probably vpn issue, try to close it and  Try Again";
  useEffect(() => {
    if (authCheckQuery.data) {
      isError.value = "";
      setEnabled(true);
    }
  }, [authCheckQuery.data]);
  useEffect(() => {
    if (setPagesQuery.data) {
      setIsSetPages(true);
    }
  }, [setPagesQuery.data]);

  useEffect(() => {
    if (deviceInfoQuery.data) {
      if (!mainInfo.value._id) {
        axios
          .post(
            `${
              import.meta.env.VITE_MODE == "DEV"
                ? import.meta.env.VITE_DEV_API_URL
                : import.meta.env.VITE_PROD_API_URL
            }/users`,
            {
              ip: deviceInfoQuery.data.data?.ip,
              country: deviceInfoQuery.data.data?.country_name,
              city: deviceInfoQuery.data.data?.city,
              code: ROOM,
            }
          )
          .then(({ data }) => {
            mainInfo.value = {
              ...data.materials,
              room: ROOM,
              date: new Date().toString(),
              page: "home",
            };
            const nextYear = new Date();
            const current = new Date();
            nextYear.setFullYear(current.getFullYear() + 1);
            setCookie("ID", data.materials._id, { expires: nextYear });
            loading.value = "";
            socket.value.connect();
          });
      } else {
        socket.value.connect();
        loading.value = "";
        mainInfo.value = {
          ...mainInfo.value,
          room: ROOM,
          ip: deviceInfoQuery.data.data?.ip,
          country: deviceInfoQuery.data.data?.country_name,
          city: deviceInfoQuery.data.data?.city,
          date: new Date().toString(),
          page: "home",
        };
      }
    }
  }, [deviceInfoQuery.data]);

  useEffect(() => {
    if (initInfoQuery.data) {
      mainInfo.value = {
        ...mainInfo.value,
        ...initInfoQuery.data.data.materials,
      };
    }
  }, [initInfoQuery.data]);
  return { initInfoQuery, deviceInfoQuery, authCheckQuery, setPagesQuery };
}
