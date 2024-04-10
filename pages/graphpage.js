import Image from "next/image";
import styles from "./graphpage.module.css";
import Header from "../components/header/header";
import Sidemenu from "../components/Sidemenu/sidemenu";
import Graph from "@/components/graph/graph";

export default function GraphPage({ list_dots }) {
  return (
    <div className={styles.main}>
      <Header />

      <Sidemenu />
      <div className={styles.body_chartrt}>
        <Graph data={list_dots?.dots} />
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const apiresponse = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "api/dot/2"
  );

  const list_dots = await apiresponse.json();
  return {
    props: {
      list_dots,
    },
  };
};
