import React, { useEffect, useState } from "react";
import axios from "axios";

const TestGet = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: "api/test"
        });
        setData(response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
    {console.log(data)}
    {data
        .slice(0)
        .map((entry) => (
          <li key={entry.id}>
            Name : {entry.name} <br />
            Detail: {entry.detail} <br />
            Entry ID: {entry.id}
          </li>
        ))}
    </>
  );
};

export default TestGet;
