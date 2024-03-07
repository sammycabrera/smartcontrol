import Image from "next/image";
import styles from "../styles/locations.module.css";
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

export default function Locations({ list_locations }) {
  console.log(list_locations);

  const [name_location, setNameLocation] = useState("");
  const [user_id, setUserId] = useState("");

  const [load, setLoad] = useState(false);

  const [locations, setLocations] = useState(list_locations.locations);

  const create_location = async () => {
    setLoad(true);
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "api/location/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name_location: name_location,
          user_id: user_id,
        }),
      }
    );
    if (response.status === 200) {
      setLoad(false);
      setNameLocation("");
      setUserId("");
      const list_locations = await get_locations();
      setLocations(list_locations.locations);
    }
  };

  const update_location = async (idLoc, name_loc) => {
    setLoad(true);
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `api/location/${idLoc}` + "/",
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          name_location: name_loc,
        }),
      }
    );
    if (response.status === 200) {
      setLoad(false);
      setNameLocation("");
      setUserId("");
      const list_locations = await get_locations();
      setLocations(list_locations.locations);
    }
  };

  const get_locations = async () => {
    const apiresponse = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "api/location/1/"
    );
    const list_locations = await apiresponse.json();
    console.log("Es de tipo " + typeof list_locations);
    return list_locations;
  };

  const delete_location = async (id) => {
    setLoad(true);
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `api/location/${id}` + "/",
      {
        method: "DELETE",
      }
    );
    if (response.status === 200) {
      setLoad(false);
      setNameLocation("");
      setUserId("");
      const list_locations = await get_locations();
      setLocations(list_locations.locations);
    }
  };

  const onChangeHandler = (id, key, value) => {
    setLocations((values) => {
      return values.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      );
    });
  };

  return (
    <div className={styles.main}>
      <Header />
      <Sidemenu />
      <div className={styles.title_page}>GHC IoT Platform</div>
      <div className={styles.body_table}>
        <div className={styles.row_header} key={"idh2"}>
          <div className={styles.cell_header}>Id</div>
          <div className={styles.cell_header}>Name Location</div>
          <div className={styles.cell_header}>User Id</div>
          <div className={styles.cell_header}>Eliminar</div>
        </div>
        {locations.map((location) => {
          return (
            <div className={styles.row_header} key={"idh" + location.id}>
              <div className={styles.cell_header}>{location.id}</div>
              <div className={styles.cell_header}>
                <EditableText
                  value={location.name_location}
                  onChange={(value) =>
                    onChangeHandler(location.id, "name_location", value)
                  }
                />
              </div>
              <div className={styles.cell_header}>{location.user_id}</div>
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
                      update_location(location.id, location.name_location)
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
                  <MdDelete onClick={() => delete_location(location.id)} />
                )}
              </div>
            </div>
          );
        })}
        <div className={styles.row_header} key={"idhdb1"}>
          <div className={styles.cell_header}></div>
          <div className={styles.cell_header}>
            <input
              value={name_location}
              onChange={(event) => setNameLocation(event.target.value)}
            ></input>
          </div>
          <div className={styles.cell_header}>
            <input
              value={user_id}
              onChange={(event) => setUserId(event.target.value)}
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
              <IoMdAddCircle onClick={() => create_location()}></IoMdAddCircle>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const apiresponse = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "api/location/1/"
  );

  const list_locations = await apiresponse.json();
  return {
    props: {
      list_locations,
    },
  };
};
