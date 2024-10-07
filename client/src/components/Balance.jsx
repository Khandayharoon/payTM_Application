import { useEffect, useState } from "react";
import axios from "axios";

function Balance({ value }) {
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBalance(response.data.balance);
      })
      .catch((error) => {
        console.log();
      });
  }, [balance]);
  return (
    <div className="flex items-center ">
      <div className="text-blue-800  text-3xl font-bold">Your balance</div>
      <div className="text-blue-800 font-semibold ml-4 text-3xl">
        Rs {balance}
      </div>
    </div>
  );
}

export default Balance;
