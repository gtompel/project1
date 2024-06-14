import { Skills } from "../constant";

const About = () => {
  return (
    <div className="flex flex-col gap-10  md:flex-row items-center py-[60px]">
      <div>
        <img
          src="/src/assets/images/wing.png"
          alt="img"
          className="w-full object-contain max-w-[393px]"
        />
      </div>
      <div>
        <h5 className="small-text">О сервисе</h5>
        <h2 className="head-text">
          Что такое <span className="gradientText">WEB</span> X
        </h2>
        <p className="paragraph">
        История, в которой заключена скорбь, представляет собой архитектурный ансамбль, украшающий элиту.
        Тем не менее, это препятствует отражению архитектурных изменений во времени.
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