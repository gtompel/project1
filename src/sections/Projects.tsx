import Slider from "../components/Slider";

const Projects = () => {
  return (
    <div className="mt-36 overflow-hidden">
      <h4 className="small-text">Our Portfolio</h4>
      <h2 className="head-text">
        See Our Recent <span className="gradientText">Projects</span>
      </h2>
      <Slider />
    </div>
  );
};

export default Projects;