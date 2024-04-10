import Image from "next/image";
import styles from "../styles/devices.module.css";
import Header from "../components/header/header";
import Sidemenu from "../components/Sidemenu/sidemenu";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import React, { useState } from "react";
import ReactLoading from "react-loading";
import {
  Button,
  EditableText,
  InputGroup,
  Toaster,
  Position,
} from "@blueprintjs/core";
import { CiEdit } from "react-icons/ci";

<ReactLoading type={"spin"} color={"black"} height={20} width={20} />;

export default function Devices({ list_devices }) {
  console.log(list_devices);

  const [name_device, setNamedevice] = useState("");
  const [location_id, setLocationId] = useState("");
  const [unidad, setUnidad] = useState("");

  const [load, setLoad] = useState(false);

  const [devices, setdevices] = useState(list_devices.devices);

  const create_device = async () => {
    setLoad(true);
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "api/device/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name_device: name_device,
          unidad: unidad,
          location_id: location_id,
        }),
      }
    );
    if (response.status === 200) {
      setLoad(false);
      setNamedevice("");
      setLocationId("");
      setUnidad("");
      const list_devices = await get_devices();
      setdevices(list_devices.devices);
    }
  };

  const update_device = async (idDev, name_dev, loc_id) => {
    setLoad(true);
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `api/device/${idDev}` + "/",
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          name_device: name_dev,
          location_id: loc_id,
        }),
      }
    );
    if (response.status === 200) {
      setLoad(false);
      setNamedevice("");
      setLocationId("");
      setUnidad("");
      const list_devices = await get_devices();
      setdevices(list_devices.devices);
    }
  };

  const get_devices = async () => {
    const apiresponse = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "api/device/all/"
    );
    const list_devices = await apiresponse.json();
    console.log("Es de tipo " + typeof list_devices);
    return list_devices;
  };

  const delete_device = async (id) => {
    setLoad(true);
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `api/device/${id}` + "/",
      {
        method: "DELETE",
      }
    );
    if (response.status === 200) {
      setLoad(false);
      setNamedevice("");
      setLocationId("");
      setUnidad("");
      const list_devices = await get_devices();
      setdevices(list_devices.devices);
    }
  };

  const onChangeHandler = (id, key, value) => {
    setdevices((values) => {
      return values.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      );
    });
  };

  return (
    <div className={styles.main}>
      <Header />
      <Sidemenu />
      <div className={styles.body_table}>
        <div className={styles.row_header} key={"idh2"}>
          <div className={styles.cell_header}>Id</div>
          <div className={styles.cell_header}>Name device</div>
          <div className={styles.cell_header}>Unidad</div>
          <div className={styles.cell_header}>Location</div>
          <div className={styles.cell_header}>Eliminar</div>
        </div>
        {devices.map((device) => {
          return (
            <div className={styles.row_header} key={"idh" + device.id}>
              <div className={styles.cell_header}>{device.id}</div>
              <div className={styles.cell_header}>
                <EditableText
                  value={device.name_device}
                  onChange={(value) =>
                    onChangeHandler(device.id, "name_device", value)
                  }
                />
              </div>
              <div className={styles.cell_header}>{device.unidad}</div>
              <div className={styles.cell_header}>{device.location_id}</div>
              <div className={styles.cell_header}>
                {load ? (
                  <ReactLoading
                    type={"spin"}
                    color={"black"}
                    height={20}
                    width={20}
                  />
                ) : (
                  <CiEdit
                    onClick={() =>
                      update_device(
                        device.id,
                        device.name_device,
                        device.location_id
                      )
                    }
                  />
                )}

                {load ? (
                  <ReactLoading
                    type={"spin"}
                    color={"black"}
                    height={20}
                    width={20}
                  />
                ) : (
                  <MdDelete onClick={() => delete_device(device.id)} />
                )}
              </div>
            </div>
          );
        })}
        <div className={styles.row_header} key={"idhdb1"}>
          <div className={styles.cell_header}></div>
          <div className={styles.cell_header}>
            <input
              value={name_device}
              onChange={(event) => setNamedevice(event.target.value)}
            ></input>
          </div>
          <div className={styles.cell_header}>
            <input
              value={unidad}
              onChange={(event) => setUnidad(event.target.value)}
            ></input>
          </div>
          <div className={styles.cell_header}>
            <input
              value={location_id}
              onChange={(event) => setLocationId(event.target.value)}
            ></input>
          </div>
          <div className={styles.cell_header}>
            {load ? (
              <ReactLoading
                type={"spin"}
                color={"black"}
                height={20}
                width={20}
              />
            ) : (
              <IoMdAddCircle onClick={() => create_device()}></IoMdAddCircle>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const apiresponse = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "api/device/all/"
  );

  const list_devices = await apiresponse.json();
  return {
    props: {
      list_devices,
    },
  };
};
