import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";
import NotfoundPage from "../pages/NotfoundPage";
import NewsPage from "../pages/NewsPage";
import AdminPanelPage from "../pages/AdminPanelPage";
import Registerpage from "../pages/Registerpage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import GovPage from "../pages/GovPage";
import NewsPageGov from "../pages/NewsPageGov";

export default function AppRouter(props) {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <ProtectedRoute exact path="/login" component={Loginpage} />
          <ProtectedRoute exact path="/register" component={Registerpage} />
          <ProtectedRoute exact path="/news-page" component={NewsPage} />
          <ProtectedRoute exact path="/news-page-gov" component={NewsPageGov} />
          <ProtectedRoute exact path="/gov-page" component={GovPage} />
          <ProtectedRoute
            exact
            path="/admin-panel-page"
            component={AdminPanelPage}
          />
          <ProtectedRoute
            exact
            path="/forgot-password"
            component={ForgotPasswordPage}
          />
          <ProtectedRoute
            exact
            path="/reset-password"
            component={ResetPasswordPage}
          />
          <Route exact path="*" component={NotfoundPage} />
        </Switch>
      </Router>
    </>
  );
}

const ProtectedRoute = (props) => {
  const { currentUser, wUser } = useAuth();
  const location = useLocation();
  const { path } = props;

  // Protecting gov and admin from each other
  // if (path === "/admin-panel-page" || path === "/news-page") {
  //   return currentUser && wUser === "Gov" ? (
  //     <Redirect to={location.state?.from ?? "/"} />
  //   ) : (
  //     <Route {...props} />
  //   );
  // }
  // if (path === "/gov-page" || path === "/news-page-gov") {
  //   return currentUser && wUser === "Admin" ? (
  //     <Redirect to={location.state?.from ?? "/"} />
  //   ) : (
  //     <Route {...props} />
  //   );
  // }

  if (
    path === "/login" ||
    path === "/register" ||
    path === "/forgot-password" ||
    path === "/reset-password"
  ) {
    return currentUser ? (
      <Redirect to={location.state?.from ?? "/"} />
    ) : (
      <Route {...props} />
    );
  }

  return currentUser ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: "/login", state: { from: path } }} />
  );
};
