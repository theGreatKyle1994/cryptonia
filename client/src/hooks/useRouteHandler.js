import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useRouteHandler = () => {
  const location = useLocation();
  const [routeData, setRouteData] = useState({
    method: "get",
    route: "/",
    apiRoute: "/api",
    routeTo: "/",
    header: "undefined",
    btnText: "undefined",
    btnMsg: "undefined",
  });

  const checkRoute = () => {
    switch (location.pathname) {
      case "/login":
        return {
          method: "post",
          route: "/login",
          apiRoute: "/api/user/login",
          routeTo: "/register",
          header: "Login",
          btnText: "Sign in",
          btnMsg: "Need an account?",
        };
      case "/register":
        return {
          method: "post",
          route: "/register",
          apiRoute: "/api/user/register",
          routeTo: "/login",
          header: "Register",
          btnText: "Create Account",
          btnMsg: "Already have an account?",
        };
      case "/profile":
        return {
          method: "put",
          route: "/profile",
          apiRoute: "/api/user/update",
          routeTo: "/",
          header: "Update Username",
          btnText: "Change Username",
          btnMsg: "",
        };
    }
  };

  useEffect(
    () => setRouteData(checkRoute(location.pathname)),
    [location.pathname]
  );

  return routeData;
};

export default useRouteHandler;
