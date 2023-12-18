import { Button } from "components";
import notFound from "assets/images/404.jpg";
const NotFound: React.FC = () => {
  const handleExit = (url: string) => {
    sessionStorage.removeItem("userToken");
    window.location.href = url;
  };
  return (
    <section className="flex items-center justify-center bg-tertiary-100 flex-col w-screen h-screen">
      <img src={notFound} width="50%" />
      <div className="flex items-center gap-3">
        <Button
          className="bg-primary-700 text-white rounded-xs py-2 px-12 w-[216px] text-center pulse"
          text="بازگشت به خانه"
          onClick={() => handleExit("https://icarts.ir/")}
        />
        <Button
          className="bg-primary-700 text-white rounded-xs py-2 px-12 w-[216px] text-center "
          text="ورود / ثبت نام"
          onClick={() => handleExit("https://icarts.ir/authentication/login")}
        />
      </div>
    </section>
  );
};

export default NotFound;
