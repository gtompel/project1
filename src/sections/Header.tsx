import Navbar  from "../components/Navbar";
import Button from "../components/Button";

const Header = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-4 items-center md:flex-row md:justify-center  text-center md:text-start  py-[130px]">
        <div>
          <h4 className="small-text">WebX</h4>
          <h2 className="head-text">
            Мы сделаем{" "}
            <span className="gradientText">
              Лучше <br /> Website{" "}
            </span>{" "}
            Traffic
          </h2>
          <p className="paragraph">
          Я знаю, что такое скорбь, и я знаю, что такое совершеннейшая элита.
          Что такое сладострастное осуждение для души,
          во время которого мы должны выполнять минимальные трудозатраты!
          </p>
          <Button title="Free Quote" fill={true} />
        </div>
        <div>
          <img
            src="/src/assets/images/pay.svg"
            alt="hero"
            className="w-full object-contain max-w-[393px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
//this snippt work becasue of extension