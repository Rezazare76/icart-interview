import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary, PopupMessage } from "components";
import MainRoutes from "pages/Routes";

import "App.css";

const App: React.FC = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  useEffect(() => {
    const handleOnline = () => {
      setShowAlert(false);
    };
    const handleOffline = () => {
      setShowAlert(true);
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  });

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
      {showAlert && (
        <>
          <PopupMessage
            message="عدم اتصال به اینترنت"
            type="error"
            endless={true}
          />
          <div className="fixed w-full h-full blur-sm top-0 opacity-20 bg-primary-100 z-[1001]" />
        </>
      )}
    </ErrorBoundary>
  );
};

export default App;
