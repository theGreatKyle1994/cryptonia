import "./App.css";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  useEffect(() => {
    axios
      .get("http://localhost:8000/users")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);
  
  return <></>;
};

export default App;
