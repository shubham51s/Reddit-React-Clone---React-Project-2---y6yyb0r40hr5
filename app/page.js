import LoginNavComp from "./components/NavBar/LoggedOut";
import style from "./homepage.module.css";

export default function Home() {
  return (
    <div className={style.homePageContainer}>
      <LoginNavComp />
    </div>
  );
}
