const CTA = () => {
    return (
      <div className="bg-cta-pattern bg-no-repeat  bg-center bg-cover text-center z-2 required: mt-[130px] pt-[150px] pb-[150px] rounded-md text-white">
        <h6 className="font-medium">Если хочешь получить предложение</h6>
        <h2 className="text-[40px] font-semibold ">Напиши нам</h2>
        <div className="bg-white max-w-[570px] mx-auto py-8 md:py-6 text-black mt-7 flex flex-col md:flex-row gap-4 rounded-xl">
          <input
            type="url"
            placeholder="Ваш URL...."
            className="ml-4 border-b-2 border-gray-400 mr-2 outline-none"
          />
          <input
            type="email"
            placeholder="Эл. почта...."
            className="border-b-2 border-gray-400 mr-5 outline-none "
          />
          {/* //simple task you make a input component and reuse in this place */}
          <span className="bg-[#C4A189] text-white  p-2 rounded-xl cursor-pointer ">
            go
          </span>
        </div>
      </div>
    );
  };
  
  // eslint-disable-next-line react-refresh/only-export-components
  export default CTA;