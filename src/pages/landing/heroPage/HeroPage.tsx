import { Suspense, lazy } from "react";

const HeroPage = () => {
  const LandingHero = lazy(
    () => import("components/specific/landing/heroPage/hero/LandingHero")
  );
  const LandingServices = lazy(
    () =>
      import("components/specific/landing/heroPage/services/LandingServices")
  );
  const LandingJoin = lazy(
    () => import("components/specific/landing/heroPage/join/LandingJoin")
  );
  const LandingGuide = lazy(
    () => import("components/specific/landing/heroPage/guide/LandingGuide")
  );
  const LandingQuestions = lazy(
    () =>
      import("components/specific/landing/heroPage/questions/LandingQuestions")
  );
  const LandingProperty = lazy(
    () => import("components/specific/landing/landingProperty/LandingProperty")
  );

  const FallbackComponent = (
    <div className="h-[200px] w-full skeleton-box rounded" />
  );
  return (
    <>
      <Suspense fallback={FallbackComponent}>
        <LandingHero />
      </Suspense>
      <Suspense fallback={FallbackComponent}>
        <LandingServices />
      </Suspense>
      <Suspense fallback={FallbackComponent}>
        <LandingJoin />
      </Suspense>
      <Suspense fallback={FallbackComponent}>
        <LandingGuide />
      </Suspense>
      <Suspense fallback={FallbackComponent}>
        <LandingProperty />
      </Suspense>
      <Suspense fallback={FallbackComponent}>
        <LandingQuestions />
      </Suspense>
    </>
  );
};

export default HeroPage;
