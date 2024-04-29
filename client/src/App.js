import React, { useState, useEffect } from "react";
import "./App.css";
import { useKeycloak } from "@react-keycloak/web";
import axiosInstance from "./Auth";

function App() {
  const { keycloak, initialized } = useKeycloak();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      fetchData();
    }
  }, [initialized, keycloak]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = () => {
    if (keycloak) {
      keycloak.logout();
    }
  };

  return (
    <>
      <div className="App">
        <h1>Hello</h1>
        {data ? <p>{data}</p> : <p>Loading...</p>}
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}

export default App;
