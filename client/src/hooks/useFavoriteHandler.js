import { globalContext } from "../App";
import { useEffect, useContext } from "react";
import useLogout from "../hooks/useLogout";
import axios from "axios";

const useFavoriteHandler = (favoriteList, setTableData) => {
  const { userData } = useContext(globalContext);
  const logout = useLogout();

  const getFavData = async () => {
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

  const favoriteHandler = async (e, crypto) => {
    e.stopPropagation();

    await axios[`${favoriteList.includes(crypto.id) ? "put" : "post"}`](
      `${import.meta.env.VITE_BACKEND_URL}/api/user/fav`,
      { fav: crypto.id },
      { withCredentials: true }
    ).catch(() => logout("/login"));
    
    getFavData();
  };

  useEffect(() => {
    (async () => await getFavData())();
  }, [userData.isAuthenticated]);

  return favoriteHandler;
};

export default useFavoriteHandler;
