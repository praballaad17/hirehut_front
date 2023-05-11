import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import * as ROUTES from "./constants/routes";
import useAuthListener from "./hooks/useAuthListener";
import MainLoader from "./components/loader/mainLoader";
import Dashboard from "./pages/Dashboard";
import Authentication from "./pages/Authenticate/Authentication";
import AuthLogin from "./pages/Authenticate/AuthLogin";
import AuthSignup from "./pages/Authenticate/AuthSignup";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./Context/userContext";
import ToastBox from "./components/Toast/ToastBox";
import ForgotPass from "./pages/Authenticate/ForgotPass";
import EmployerDash from "./pages/EmployerDash";
import { DataProvider } from "./Context/DataContext";

// const Login = lazy(() => import('./pages/Login'));
// const SignUp = lazy(() => import('./pages/Signup'));
// const NotFound = lazy(() => import('./pages/not-found'));

export default function App() {
  const { user, jwt } = useAuthListener();
  console.log(user);
  return (
    <>
      <UserProvider user={user}>
        <DataProvider user={user}>
          <Router>
            <Suspense fallback={<MainLoader />}>
              <Routes>
                <Route
                  path={ROUTES.AUTHENTICATION}
                  element={<Authentication user={user} />}
                  children={[AuthSignup, AuthLogin, ForgotPass]}
                />
                {user?.isEmployeer ? (
                  <Route
                    path={`${ROUTES.HOME}*`}
                    element={<EmployerDash user={user} />}
                  />
                ) : (
                  <Route
                    path={`${ROUTES.HOME}*`}
                    element={<Dashboard user={user} />}
                  />
                )}
                {/* <Route path="*" element={<NotFound />} /> */}
              </Routes>
            </Suspense>
          </Router>

          <ToastBox />
          {/* <MainLoader /> */}
        </DataProvider>
      </UserProvider>
    </>
  );
}
