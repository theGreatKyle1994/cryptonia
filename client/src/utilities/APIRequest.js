import axios from "axios";

export default async function APIRequest({
  method = "get",
  route = "/",
  data = {},
  withCredentials = false,
  session = { name: "", callback: () => {} },
  state = { setter: () => {}, callback: () => {} },
  navigate = { navigator: () => {}, location: "" },
  error = { setter: () => {}, callback: () => {} },
} = {}) {
  await axios({
    method: method,
    url: `${import.meta.env.VITE_BACKEND_URL}${route}`,
    data: data,
    withCredentials: withCredentials,
  })
    .then((res) => {
      console.log(res);
      if (session)
        sessionStorage.setItem(
          session.name,
          JSON.stringify(session.callback(res.data))
        );
      if (state) state.setter(state.callback(res.data));
      if (navigate) navigate.navigator(navigate.location);
    })
    .catch((err) => {
      console.log(err);
      if (error)
        error.setter((prevData) => ({
          ...prevData,
          errors: {
            ...prevData.errors,
            ...error.callback(err.response.data.error.errors),
          },
        }));
    });
}
