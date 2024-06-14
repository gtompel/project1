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
            We Boost{" "}
            <span className="gradientText">
              Your <br /> Website{" "}
            </span>{" "}
            Traffic
          </h2>
          <p className="paragraph">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae vel
            voluptate reprehenderit quia animi, tempore eos dolorem obcaecati
            minima laboriosam!
          </p>
          <Button title="Free Quote" fill={true} />
        </div>
        <div>
          <img
            src="/public/assets/images/pay.svg"
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