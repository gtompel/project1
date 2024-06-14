const ProjectCard = ({
    img,
    title,
    desc,
  }: {
    img: string;
    title: string;
    desc: string;
  }) => {
    return (
      <div className="w-[230px] h-[320px] shadow-lg rounded-3xl shadow-slate-200 border-l-2 border-l-orange-400 ">
        <img src={img} alt={img} className="object-contain" />
        <div className="transition-all cursor-pointer hover:text-[#0d6efd] text-center py-4 ">
          <h4 className="text-xl font-bold">{title}</h4>
          <p className="text-[#afafaf]">{desc}</p>
        </div>
      </div>
    );
  };
  
  export default ProjectCard;
  //formating due to prettier extension