const Success = ({ msg , customCSS}: { msg: string, customCSS:string }) => {
  return (
    <div className={` absolute p-3 ${customCSS} rounded-md text-white bg-green-500 mb-4 shadow-lg`}>
      {msg}
    </div>
  );
};

export default Success;
