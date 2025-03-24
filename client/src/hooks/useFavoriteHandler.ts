import type { Table, GlobalContext } from "../types/app";
import { globalContext } from "../App";
import { useEffect, useContext } from "react";
import useLogout from "./useLogout";
import axios from "axios";

const useFavoriteHandler = (
  favoriteList: Table.TableData["favoriteList"],
  setTableData: React.Dispatch<React.SetStateAction<Table.TableData>>
): Table.FavoriteHandler => {
  const { userData } = useContext(globalContext) as GlobalContext;
  const logout = useLogout();

  const getFavData = async (): Promise<void> => {
    if (userData.isAuthenticated) {
      await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/fav`, {
          withCredentials: true,
        })
        .then((res) =>
          setTableData((prevData) => ({ ...prevData, favoriteList: res.data }))
        )
        .catch(() => logout("/login"));
    }
  };

  const favoriteHandler: Table.FavoriteHandler = async (
    e,
    crypto
  ): Promise<void> => {
    e.stopPropagation();
    await axios[`${favoriteList.includes(crypto.id) ? "put" : "post"}`](
      `${import.meta.env.VITE_BACKEND_URL}/api/user/fav`,
      { fav: crypto.id },
      { withCredentials: true }
    ).catch(() => logout("/login"));
    await getFavData();
  };

  useEffect(() => {
    (async () => await getFavData())();
  }, [userData.isAuthenticated]);

  return favoriteHandler;
};

export default useFavoriteHandler;
