import { UserMeContext } from "pages/Routes";
import { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SWRConfig } from "swr";
import { faAdminRoles } from "utils/const";
import { checkToken } from "utils/utility";

const Authentication = () => {
  const options = {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
    shouldRetryOnError: false,
  };
  const { data, reset } = useContext(UserMeContext);
  const navigate = useNavigate();
  useEffect(() => {
    // const userToken = sessionStorage.getItem("userToken");
    // const fetchData = async () => {
    //   try {
    //     let role = await checkToken(userToken);
    //     role = faAdminRoles[role?.name as keyof typeof faAdminRoles];
    //     navigate(role ? "/admin/dashboard" : "/profile/dashboard");
    //   } catch (error) {
    //     ("");
    //   }
    // };
    // fetchData();
    if (data) {
      if (data.is_valid)
        navigate(
          faAdminRoles[data?.role as unknown as keyof typeof faAdminRoles]
            ? "/admin/dashboard"
            : "/profile/dashboard"
        );
      else {
        navigate("/verify");
      }
    }
  }, [data]);
  return (
    <main className="bg-tertiary-200 flex flex-col-reverse md:flex-row items-center min-h-screen py-4 pr-4 md:p-0">
      <section className="flex flex-col items-center flex-grow w-full md:w-auto pl-4 sm:p-0 ">
        <SWRConfig value={{ ...options }}>
          <Outlet />
        </SWRConfig>
      </section>

      <div className="relative">
        <img
          src={require("assets/images/authentication-img.svg")}
          className="object-cover w-[780px] md:w-[350px] ml:w-[450px] lg:w-[550px] xl:w-[620px] h-[40vh] xs:h-[55vh] sm:h-[70vh] md:h-[95vh]  rounded-r-3xl"
        />
        <div
          className="hidden sm:block bg-tertiary-200 px-2 py-1 absolute translate-x-[-50%]
        bg-opacity-80 translate-y-[-50%] top-[50%] left-[50%] rounded-xs"
        >
          <img
            src={require("assets/images/logo2x1-transparent.svg")}
            width={200}
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    </main>
  );
};

export default Authentication;
