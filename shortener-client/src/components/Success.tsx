const Success = ({ msg }: { msg: string }) => {
  return (
    <div className=" absolute p-3 top-20 rounded-md text-white bg-green-500 mb-4 shadow-lg">
      {msg}
    </div>
  );
};

export default Success;
