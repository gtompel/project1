import { useState } from "react";
import { navLink } from "../constant";
const ToggleMenu = () => {
  const [active, setActive] = useState(false);
  return (
    <div className="flex lg:hidden shadow-2xl px-10 rounded-lg relative">
      {active && (
        <ul className="flex flex-col">
          {navLink.map((item) => (
            <li
              className="list-none transition-all hover:bg-slate-300"
              key={item.label}
            >
              <a
                href={`${item.route}`}
                className="font-semibold text-[#30336b] hover:text-blue-400 text-[15px] leading-5 h-[40px]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      {active ? (
        <img
          src="/assets/images/close.png"
          alt="close"
          className="w-[30px] h-[30px] absolute right-[-12px] top-[-8px] "
          onClick={() => setActive(false)}
        />
      ) : (
        <img
          src="/assets/images/menu.png"
          alt="menu"
          className="w-[30px] h-[30px] absolute right-[-12px] top-[-8px] "
          onClick={() => setActive(true)}
        />
      )}
    </div>
  );
};

export default ToggleMenu;