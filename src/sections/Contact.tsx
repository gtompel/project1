import InputGroup from "../components/InputGroup";
import { contactLink } from "../constant";

const Contact = () => {
  return (
    <div className="text-center py-[120px]">
      <h4 className="small-text">Contact Us</h4>
      <h2 className="head-text">
        Get In <span className="gradientText">Touch With </span> Us Now.
      </h2>
      <div
        className="max-w-[700px] h-auto mx-auto rounded-xl
       shadow-xl p-8"
      >
        <div className="flex flex-col md:flex-row gap-4 justify-evenly">
          {contactLink.map((link) => (
            <div
              key={link.name}
              className="flex flex-col items-center justify-center shadow-2xl p-4 rounded-lg gap-4 border-t-2 border-teal-200 "
            >
              <img src={link.imrUrl} alt="link" />
              <p className="text-[#afafaf]">{link.data}</p>
            </div>
          ))}
        </div>
        <InputGroup />
      </div>
    </div>
  );
};

export default Contact;