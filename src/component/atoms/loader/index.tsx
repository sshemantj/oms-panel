import { useAppSelector } from "@/store/hooks";
import ReactLoading from "react-loading";

const Loader = () => {
  const { isLoading } = useAppSelector((state) => state.dashboard);

  return isLoading ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999999999,
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0, 0.5)",
      }}
    >
      <ReactLoading type={"bars"} color="#fff" height={200} width={200} />
    </div>
  ) : null;
};

export default Loader;
