import { ImSpinner } from "react-icons/im";
import homeStyle from "./home.module.css";
export const Spinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      maxWidth: "100%",
      height: "80vh",
    }}
  >
    <ImSpinner className={homeStyle.spin} />
  </div>
);
