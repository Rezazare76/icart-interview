import { FC, useState } from "react";
import { SwitchButton, StaticLogin, DynamicLogin, Button } from "components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { agreeRoles } from "./data";
import Modal from "components/common/modal/Modal";
import logo from "assets/images/logo2x1.svg";



const Login: FC = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [section, setSection] = useState<"Static" | "Dynamic">("Static");

  const sections: { [key: string]: React.ReactNode } = {
    Static: <StaticLogin onClick={setSection} />,
    Dynamic: <DynamicLogin onClick={setSection} />,
  };
  return (
    <section className="w-[100%] md:w-[65%] ml:w-[60%] xl:w-[50%] max-w-[450px] flex flex-col text-xs 2xs:text-sm">
      <div className="sm:hidden bg-tertiary-200 px-2 py-1 m-auto mt-4 rounded-xs">
        <img
          src={require("assets/images/logo2x1-transparent.svg")}
          width={150}
          className="cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      <SwitchButton
        list={[
          { title: "ورود", onClick: () => {} },
          {
            title: "ثبت نام",
            onClick: () => navigate("/authentication/signup"),
          },
        ]}
        active={0}
      />

      {sections[section]}

      <div className="flex justify-between">
        <div className="flex flex-col xs:flex-row md:flex-col xl:flex-row items-center xs:gap-[15px] md:gap-0 xl:gap-[15px] text-tertiary-400 my-4 text-center">
          <span>هنوز ثبت نام نکرده اید؟ </span>
          <Link
            to={"/authentication/signup"}
            className="text-primary-500 underline underline-offset-4 "
          >
            ثبت نام
          </Link>
        </div>
        <div className="flex xs:items-center md:items-start xl:items-center justify-center gap-[15px] text-tertiary-400 my-4 text-center">
          {/* <span>قبلا ثبت نام کرده اید؟ </span> */}
          <Link
            to={"/authentication/forgot-password"}
            className="text-tertiary-400 underline-offset-4 "
          >
            فراموشی رمز عبور
          </Link>
        </div>
      </div>
      <div className="text-tertiary mt-2">
        با ورود و یا ثبت نام شما{" "}
        <span
            className="font-bold text-primary-400 mx-1 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setModal(true);
            }}
          >
          شرایط و قوانین آیکارت
        </span>{" "}
        <span className="font-bolder text-primary-600 "> آیکارت </span>
        را می پذیرید.
      </div>
      {modal && (
        <Modal modalClassName="p-4 md:p-10 w-[90%] md:w-[70%] xl:w-auto" setShowModal={() => setModal(false)}>
          <>
            <img src={logo} className="m-auto mb-4" width={200} />
            <ul className="list-inside h-[300px] overflow-auto text-sm xs:text-base">
              {agreeRoles.map((e, inx) => (
                <li key={`roles-${inx}`} className="mb-3">
                  - {e.title}
                  {e?.sub &&
                    e?.sub.map((sub, sunInx) => (
                      <div key={`sub-${inx}-${sunInx}`} className="px-4 ">
                        &bull; {sub}
                      </div>
                    ))}
                </li>
              ))}
            </ul>
            <div className="flex flex-row-reverse">
              <Button
                className="bg-gradient-to-r from-[#0085CF] to-[#01286D] text-tertiary-100 py-2 px-8 rounded-[10px] mt-2"
                onClick={() => {
                  setModal(false);
                  // setAgree(true);
                }}
                text="تایید"
              />
            </div>
          </>
        </Modal>
      )}
    </section>
  );
};

export default Login;
