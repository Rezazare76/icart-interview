import { Button } from "components";
import error from "assets/images/error.gif";

const ErrorPage = () => {
  const handleExit = () => {
    sessionStorage.removeItem("userToken");
    window.location.href = "https://icarts.ir/";
  };
  return (
    <section className="flex items-center justify-center h-full text-primary-500">
      <div className="flex flex-col items-center ">
        <img src={error} alt="error.png" />
        <div className="flex items-center gap-3 flex-wrap">
          <Button
            className="bg-primary-700 text-white rounded-xs py-2 px-12 w-[216px] text-center pulse"
            text="بازگشت به خانه"
            onClick={handleExit}
          />
          <a
            href="tel:071391301770"
            className="bg-primary-700 text-white rounded-xs py-2 px-12 w-[216px] text-center"
          >
            تماس با پشتیبانی
          </a>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
