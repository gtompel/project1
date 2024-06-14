const Card = ({ label, icon }: { label: string; icon: string }) => {
    return (
      <div>
        <div className="p-4 rounded-md shadow-2xl flex flex-col justify-center items-center  gap-2  border-t-4 border-t-blue-400 cursor-pointer ">
          <img src={icon} alt="icon" />
          <h3 className="font-bold hidden md:block">{label}</h3>
        </div>
      </div>
    );
  };
  
  export default Card;