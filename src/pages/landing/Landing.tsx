// import LandingFooter from "components/specific/landing/footer/LandingFooter";
import LandingHeader from "components/specific/landing/header/LandingHeader";
import { FC, Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

const Landing: FC = () => {
  const LandingFooter = lazy(
    () => import("components/specific/landing/footer/LandingFooter")
  );
  const FallbackComponent = (
    <div className="h-[200px] w-full skeleton-box rounded" />
  );
  return (
    <main className="bg-tertiary-200 px-5 pt-5 lg:px-20 pb-0 lg:pt-10 min-h-screen overflow-x-hidden">
      <LandingHeader />
      <Outlet />
      <Suspense fallback={FallbackComponent}>
        <LandingFooter />
      </Suspense>
    </main>
  );
};
export default Landing;
