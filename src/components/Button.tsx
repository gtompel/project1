const Button = ({ title, fill }: { title: string; fill: boolean }) => {
    return (
      <div>
        <button
          type="button"
          className={`border-2  text-[#4da6e7] transition-all  rounded-full px-4 py-2 border-[#4da6e7] hover:bg-[#4da6e7] hover:text-white ${
            fill && "bg-[#4da6e7] text-white"
          }`}
        >
          {title}
        </button>
      </div>
    );
  };
  
  export default Button;
  //it means if fill is true then the classes will apply