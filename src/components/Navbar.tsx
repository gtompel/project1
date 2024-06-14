import { navLink } from "../constant";
import Button from "./Button";
import ToggleMenu from "./ToggleMenu";

const Navbar = () => {
  return (
    <div className="fixed z-10 top-0 left-0 w-full px-4 py-6 bg-white border-b-2 border-gray-100">
      <div className="flex justify-between items-center container mx-auto ">
        <h1 className="text-[25px] font-[600] text-[#30336b]">
          <span className="gradientText">Digital</span> Media
        </h1>
        <ul className="hidden lg:flex gap-7">
          {navLink.map((item) => (
            <li className="list-none px-4" key={item.label}>
              <a
                href={`${item.route}`}
                className="font-semibold text-[#30336b] hover:text-blue-400 text-[15px] leading-5 h-[40px]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:block">
          <Button title="Free Quote" fill={false} />
        </div>
        <ToggleMenu />
      </div>
    </div>
  );
};

export default Navbar;