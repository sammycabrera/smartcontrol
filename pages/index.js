import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Header from "../components/header/header";
import Sidemenu from "../components/Sidemenu/sidemenu";

export default function Home() {
  return (
    <div className={styles.main_home}>
      <Header />

      <Sidemenu />
    </div>
  );
}
