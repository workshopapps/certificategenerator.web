import { BallTriangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <BallTriangle
      radius={5}
      width={100}
      height={100}
      visible={true}
      color="#4fa94d"
      wrapperStyle=""
      wrapperClass={{}}
      ariaLabel="ball-triangle-loading"
    />
  );
};

export default Loader;
