//components
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthService";
import firebase from "../config/firebase";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export const Home = () => {
  const [plans, setPlans] = useState([]);
  const [title, setTitle] = useState("");
  const [coment, setComent] = useState("");
  const [location1, setLocation1] = useState("");
  const [location2, setLocation2] = useState("");
  const [img, setImg] = useState("");


  const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 35.6809591,
  lng: 139.7673068,
};

  useEffect(() => {
    firebase
      .firestore()
      .collection("DatePlan")
      .onSnapshot((snapshot) => {
        const plans = snapshot.docs.map((doc) => {
          return doc.data();
        });

        setPlans(plans);
      });
  }, []);

  const user = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.firestore().collection("DatePlan").add({
      user: user.displayName,
      title: title,
      img: img,
      location1: location1,
      location2: location2,
      coment: coment,
    });
    setTitle("");
    setImg("");
    setLocation1("");
    setLocation2("");
    setComent("");
  };
  return (
    <>
      <h1>Home</h1>
      <ul>
        {plans.map((plan) => (
          <li>
            {plan.user}:{plan.title}
          </li>
        ))}
      </ul>
      <form>
        <h1>タイトル</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h1>サムネ写真</h1>
        <input
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        <h1>デートスポット１</h1>
        <input
          type="text"
          value={location1}
          onChange={(e) => setLocation1(e.target.value)}
        />
        <h1>デートスポット２</h1>
        <input
          type="text"
          value={location2}
          onChange={(e) => setLocation2(e.target.value)}
        />
        <h1>コメント</h1>
        <input
          type="text"
          value={coment}
          onChange={(e) => setComent(e.target.value)}
        />
      </form>
      <button type="submit" onClick={handleSubmit}>
        送信
      </button>

      <button onClick={() => firebase.auth().signOut()}>ログアウト</button>

      <LoadScript googleMapsApiKey="AIzaSyCFm7KI6nHVnYoiaMWRs3-xWdCG4VTXK5A">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </>
  );
};
