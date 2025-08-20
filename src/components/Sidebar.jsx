import Logo from "./Logo";
import AppNav from "./AppNav";
import styles from "./SideBar.module.css";
import { Outlet } from "react-router-dom";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      {/* *****The Prince**** */}
      <Outlet />
      {/* ******************* */}

      <footer className={styles.footer}>
        &copy; this app belongs to Sohail
      </footer>
    </div>
  );
}

export default SideBar;
