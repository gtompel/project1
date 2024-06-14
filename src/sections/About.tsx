import { Skills } from "../constant";

const About = () => {
  return (
    <div className="flex flex-col gap-10  md:flex-row items-center py-[60px]">
      <div>
        <img
          src="../assets/images/about-dec-v3.png"
          alt="img"
          className="w-full object-contain max-w-[503px]"
        />
      </div>
      <div>
        <h5 className="small-text">About Us</h5>
        <h2 className="head-text">
          Who Is <span className="gradientText">DigitalMedia</span> Agency
        </h2>
        <p className="paragraph">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ea
          impedit repellendus architecto dignissimos tempora nulla.
        </p>
        <div className="flex flex-col md:flex-row items-center gap-8">
          {Skills.map((skill) => (
            <div
              key={skill.percent}
              className="flex flex-col items-center justify-center shadow-2xl border-t-2 border-red-300 h-[140px] w-[140px] p-4 rounded-full"
            >
              <h3 className="text-[35px] text-bold text-[#30336b]">
                {skill.percent}
              </h3>
              <p className="text-[20px] text-gray-500">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;