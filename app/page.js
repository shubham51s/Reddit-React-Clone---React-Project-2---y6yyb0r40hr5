import { ThemeProvider } from "./contexts/ThemeContext";
import HomePage from ".";
import { UserProvider } from "./contexts/LoginContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <ThemeProvider>
      <UserProvider>
        <HomePage />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </UserProvider>
    </ThemeProvider>
  );
}
