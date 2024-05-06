import { store } from "@/store";
import { openLoginModal } from "@/store/slices/loginSlice";
import { Cookies } from "react-cookie";
const cookie = new Cookies();

const handleStatus = (status: number | undefined, message: string) => {
  switch (status) {
    case 403:
    case 401:
      handleUnauthorize();
      break;
  }
  switch (message) {
    case "Network Error":
      handleUnauthorize();
      break;
  }
};

function handleUnauthorize(message?: string) {
  // cookie.remove("token");
  // store.dispatch(openLoginModal());
}

export { handleStatus };
