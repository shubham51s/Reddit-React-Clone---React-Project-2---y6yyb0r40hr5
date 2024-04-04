import { ThemeProvider } from "./contexts/ThemeContext";
import HomePage from ".";
import { UserProvider } from "./contexts/LoginContext";

export default function Home() {
  return (
    <ThemeProvider>
      <UserProvider>
        <HomePage />
      </UserProvider>
    </ThemeProvider>
  );
}
