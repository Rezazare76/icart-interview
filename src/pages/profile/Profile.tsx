import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { QuickAccess, ProfileMenu, ConfirmReceive } from "components";
import { checkToken, checkWalletCard } from "utils/utility";
import { UserMeContext } from "pages/Routes";
import { faAdminRoles } from "utils/const";
const Profile = () => {
  const navigate = useNavigate();
  const { data, reset } = useContext(UserMeContext);

  useEffect(() => {
    const userToken = sessionStorage.getItem("userToken");
    const fetchData = async () => {
      try {
        const verifyCard = await checkWalletCard();
        if (verifyCard?.cards?.length == 0) navigate("/verify");
      } catch (error) {
        sessionStorage.clear();
        data && reset();
        navigate("/authentication/login");
      }
    };
    if (userToken) fetchData();
    else {
      if (data) reset();
      else navigate("/authentication/login");
    }
  }, []);
  return (
    <main className="flex flex-col sm:flex-row bg-primary h-[100vh] relative">
      <ProfileMenu />
      <main
        className="bg-tertiary-200 p-3 xs:p-4 sm:p-6 lg:p-9 xl:p-12 w-full rounded-t-xl xs:rounded-t-3xl
      sm:rounded-tl-none sm:rounded-r-3xl overflow-auto min-h-screen"
      >
        <QuickAccess />
        <Outlet />
      </main>
      {data?.wallet?.cards?.length &&
        data?.wallet?.cards?.length > 0 &&
        data?.wallet?.cards?.[0]?.is_receive == false && (
          <div className="absolute w-full h-[115vh] md:h-full left-0 top-0 flex items-center justify-center bg-gray-500 bg-opacity-30 z-[1001]">
            <div className="w-[90%] md:w-1/2 bg-tertiary-100 p-5 rounded border border-tertiary-300">
              <ConfirmReceive />
            </div>
          </div>
        )}
    </main>
  );
};

export default Profile;
