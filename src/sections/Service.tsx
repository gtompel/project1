import Card from "../components/Card";
import { servicesLink } from "../constant";

const Service = () => {
  return (
    <div className="flex flex-col items-center mt-4">
      <h4 className="small-text">Улсуги</h4>
      <h2 className="head-text">
        Те <span className="gradientText">Кто Мы</span> Есть.
      </h2>
      <div className="flex flex-row gap-6">
        {servicesLink.map((data) => (
          <Card key={data.name} label={data.label} icon={data.icon} />
        ))}
      </div>
    </div>
  );
};

export default Service;