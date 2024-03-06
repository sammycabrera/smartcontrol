import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/header/header";
import Sidemenu from "../components/Sidemenu/sidemenu";
import { CButton } from "@coreui/react";
/**import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";*/

export default function Home() {
  return (
    <div className={styles.main}>
      <Header />
      <Sidemenu />
      <div className={styles.title_page}>GHC IoT Platform</div>
      <div className="d-grid gap-2">
        <CButton color="primary">Button</CButton>
        <CButton color="primary">Button</CButton>
      </div>
    </div>
  );
}
