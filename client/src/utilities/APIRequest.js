import axios from "axios";

export default async function APIRequest(
  config = {
    method: "get",
    route: "/",
    data: {},
    withCredentials: false,
    session: [],
    state: [],
    navigate: [],
    error: [],
  }
) {
  await axios({
    method: config.method,
    url: `${import.meta.env.VITE_BACKEND_URL}${config.route}`,
    data: config.data,
    withCredentials: config.withCredentials,
  })
    .then((res) => {
      console.log(res);
      if (config.session)
        sessionStorage.setItem(
          config.session[0],
          JSON.stringify(config.session[1](res.data))
        );
      if (config.state) config.state[0](config.state[1](res.data));
      if (config.navigate) config.navigate[0](config.navigate[1]);
    })
    .catch((err) => {
      console.log(err);
      if (config.error)
        config.error[0]((prevErrors) => ({
          ...prevErrors,
          ...config.error[1](err.response.data.error.errors),
        }));
    });
}
