import Image from "next/image";
import styles from "./header.module.css";
import { FaUser } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

export default function Header() {
  return (
    <div className={styles.main}>
      <div className={styles.title_page}>GHC IoT Platform</div>
      <IoSettings className={styles.icon} />
      <FaUser className={styles.icon} />
    </div>
  );
}
