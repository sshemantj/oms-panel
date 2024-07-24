import { store } from "@/store";
import { openLoginModal } from "@/store/slices/loginSlice";
// import { setCookie } from "cookies-next";

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
  // setCookie("token");
  store.dispatch(openLoginModal());
}

export { handleStatus };
