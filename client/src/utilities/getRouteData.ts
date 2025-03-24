import type { Route } from "../types/app";

const getRouteData = (path: string): Route.RouteData => {
  switch (path) {
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
    default:
      return {
        method: "get",
        route: "/",
        apiRoute: "/api",
        routeTo: "/",
        header: "",
        btnText: "",
        btnMsg: "",
      };
  }
};

export default getRouteData;
