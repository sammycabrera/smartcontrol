import Image from "next/image";
import styles from "./sidemenu.module.css";
import { FaUser, FaHome } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaPrint } from "react-icons/fa6";
import { VscGraph } from "react-icons/vsc";
import { TbChartInfographic } from "react-icons/tb";
import { useRouter } from "next/router";

export default function Sidemenu() {
  const router = useRouter();
  return (
    <div className={styles.main}>
      <FaHome
        className={styles.icon}
        onClick={() => router.push({ pathname: "/" })}
      />
      <FaLocationCrosshairs
        className={styles.icon}
        onClick={() => router.push({ pathname: "/locations" })}
      />
      <FaPrint
        className={styles.icon}
        onClick={() => router.push({ pathname: "/devices" })}
      />
      <VscGraph
        className={styles.icon}
        onClick={() => router.push({ pathname: "/graphrtpage" })}
      />
      <TbChartInfographic
        className={styles.icon}
        onClick={() => router.push({ pathname: "/graphpage" })}
      />
    </div>
  );
}
