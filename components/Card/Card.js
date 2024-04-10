import Image from "next/image";
import styles from "./Card.module.css";
import { FaUser } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { CiTempHigh } from "react-icons/ci";

export default function Card({ value = 0 }) {
  return (
    <div className={styles.main}>
      <CiTempHigh className={styles.icon} />
      <div className={styles.data}>{value}</div>
    </div>
  );
}
