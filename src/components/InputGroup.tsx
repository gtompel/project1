import Button from "./Button";

const InputGroup = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row  items-center py-5 gap-[40px]">
        <div className="flex flex-col">
          <input type="text" placeholder="Name" className="input" />
          <input type="email" placeholder="Email" className="input" />
          <input type="text" placeholder="Subject" className="input" />
        </div>
        <div>
          <textarea
            cols={30}
            rows={10}
            placeholder="message"
            className="outline-none transition-all p-4 shadow-md shadow-slate-300 hover:border-4 hover:border-blue-300 rounded-md"
          ></textarea>
        </div>
      </div>
      <Button title="Free Quote" fill={true} />
    </div>
  );
};

export default InputGroup;