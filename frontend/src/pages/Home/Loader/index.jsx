import { BallTriangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <BallTriangle
      radius={10}
      width={25}
      height={25}
      visible={true}
      color="#ffffff"
      wrapperStyle=""
      wrapperClass={{}}
      ariaLabel="ball-triangle-loading"
    />
  );
};

export default Loader;
