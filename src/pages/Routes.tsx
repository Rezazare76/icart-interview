/* eslint-disable @typescript-eslint/ban-ts-comment */

import { createContext, FC, lazy, Suspense, useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  profileRoutes,
  authenticationRoutes,
  paymentRoutes,
  landingRoutes,
  adminRoutes,
} from "utils/const/routes";
import loading from "assets/images/loading-pulse.gif";
import Verify from "./verify/Verify";
import { domain } from "utils/const";
import { userMeType } from "./type";
import LocationComplete from "types/location";
import { Button } from "components";
import { ToastContainer, toast } from "react-toastify";
import { regularFetch } from "utils/utility";

export const UserMeContext = createContext<{
  data: userMeType | null;
  mutate: () => void;
  isLoading: boolean;
  locationList: LocationComplete | [];
  reset: () => void;
  verify: boolean | null | undefined;
  locationMutate: () => void;
  notifySuccess: (e: string) => void;
  notifyError: (e: string) => void;
}>({
  data: null,
  isLoading: true,
  mutate: () => {},
  locationList: [],
  reset: () => {},
  verify: null,
  locationMutate: () => {},
  notifySuccess: () => {},
  notifyError: () => {},
});
export const PopUp = createContext<{
  notifySuccess: (e: string) => void;
  notifyError: (e: string) => void;
}>({
  notifySuccess: () => {},
  notifyError: () => {},
});
const MainRoutes: FC = () => {
  const navigate = useNavigate();
  const [userMeResponse, setUserMeResponse] = useState<userMeType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loacations, setLocations] = useState<LocationComplete | []>([]);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user-id");
  const location = useLocation();
  const notifySuccess = (e: string) => toast.success(e);
  const notifyError = (e: string) => toast.error(e);

  if (userId) sessionStorage.setItem("userToken", userId);
  const userToken = userId || sessionStorage.getItem("userToken");
  const NotFound = lazy(() => import("pages/notFound/NotFound"));
  const Profile = lazy(() => import("pages/profile/Profile"));
  const Landing = lazy(() => import("pages/landing/Landing"));
  const Admin = lazy(() => import("pages/admin/Admin"));

  const Authentication = lazy(() => import("./authentication/Authentication"));

  const renderRoute = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    elm: any,
    index: number
  ) => {
    if (elm)
      return (
        <Route
          key={`route-${index}`}
          path={elm.path}
          element={<elm.element />}
        />
      );
  };
  const loadingSection = (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <img src={loading} alt="" className="mb-4" />
      <Button text="بازگشت به خانه" onClick={() => navigate("/")} />
    </div>
  );

  // const locationFetch = async () => {
  //   await fetch(`${domain}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${userToken}`,
  //     },
  //     body: JSON.stringify({}),
  //   })
  //     .then((rep) => rep.json())
  //     .then((data) => setLocations(data))
  //     .catch(() =>
  //       setTimeout(() => {
  //         locationFetch();
  //       }, 2000)
  //     );
  // };
  const locationFetch = () => {
    regularFetch(
      "location/list/complete?skip=0&limit=100",
      {},
      setLocations,
      "POST",
      () => {},
      () => {
        setTimeout(() => {
          locationFetch();
        }, 5500);
      }
    );
  };
  useEffect(() => {
    locationFetch();
    // locationFetch();
  }, []);
  const meFetch = async () => {
    setIsLoading(true);

    await fetch(`${domain}user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((rep) => rep.json())
      .then((data) => {
        setIsLoading(false);
        setUserMeResponse(data);
      })
      .catch(() => {
        setIsLoading(false);
        setUserMeResponse(null);
      });
  };
  useEffect(() => {
    if (userToken) meFetch();
  }, [userToken]);

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <UserMeContext.Provider
          value={{
            data: userToken ? userMeResponse : null,
            mutate: meFetch,
            isLoading,
            locationList: loacations || [],
            reset: () => setUserMeResponse(null),
            verify: userToken ? !!userMeResponse?.wallet?.cards?.[0]?.id : null,
            locationMutate: locationFetch,
            notifySuccess: notifySuccess,
            notifyError: notifyError,
          }}
        >
          <PopUp.Provider value={{ notifySuccess, notifyError }}>
            <Suspense fallback={loadingSection}>
              <Routes location={location}>
                <Route path="/" element={<Landing />}>
                  {landingRoutes?.map((elm, inx) => renderRoute(elm, inx))}
                </Route>
                <Route path="/admin" element={<Admin />}>
                  {adminRoutes[
                    (userMeResponse?.role?.name
                      ? userMeResponse?.role?.name
                      : "وارد شوید") as keyof typeof adminRoutes
                  ]?.map((elm, inx) => renderRoute(elm, inx))}
                </Route>
                <Route
                  path="*"
                  element={isLoading ? loadingSection : <NotFound />}
                />
                <Route path="/payment">
                  {paymentRoutes?.map((elm, inx) => renderRoute(elm, inx))}
                </Route>
                <Route path="/verify" element={<Verify />} />

                <Route path="/profile" element={<Profile />}>
                  {profileRoutes[
                    (userMeResponse?.role?.name
                      ? userMeResponse?.role?.name
                      : "وارد شوید") as keyof typeof profileRoutes
                  ]?.map((elm, inx) => renderRoute(elm, inx))}
                </Route>
                <Route path="/authentication" element={<Authentication />}>
                  {authenticationRoutes?.map((elm, inx) =>
                    renderRoute(elm, inx)
                  )}
                </Route>
              </Routes>
            </Suspense>
          </PopUp.Provider>
          <ToastContainer rtl={true} />
        </UserMeContext.Provider>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default MainRoutes;
