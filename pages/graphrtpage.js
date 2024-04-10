import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "./graphrtpage.module.css";
import Header from "../components/header/header";
import Sidemenu from "../components/Sidemenu/sidemenu";
import RTGraph from "@/components/rtgraph/rtgraph";
import mqtt from "mqtt";
import Card from "../components/Card/Card";

var options = {
  //shiftr 1
  /**protocol: "mqtts",
  clientID: "frontend_1",
  username: "eiaiot1scm",
  password: "so8rVCM9TdkZjY0Q",**/

  //shiftr 2
  protocol: "mqtts",
  clientID: "frontend_2",
  username: "iotdomobeta",
  password: "hZREkxrENS6cTeSw",
};

var cont = 0;

export default function GraphRTPage() {
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    //var client = mqtt.connect("mqtt://eiaiot1scm.cloud.shiftr.io", options);
    var client = mqtt.connect("mqtt://iotdomobeta.cloud.shiftr.io", options);
    client.subscribe("Samir_C/cuartoN1/temperature");
    var dot;
    client.on("message", function (topic, message) {
      dot = {
        id: cont,
        value: parseFloat(message.toString()),
      };

      cont = cont + 1;
      setData((data) => [...data, dot]);
      setTemp(parseFloat(message.toString()));
    });
  }, []);

  useEffect(() => {
    console.log("data received...", data);
  }, [data]);

  return (
    <div className={styles.main}>
      <Header />

      <Sidemenu />
      <div className={styles.body_chartrt}>
        <Card value={temp}></Card>
        <RTGraph data={data}></RTGraph>
      </div>
    </div>
  );
}
