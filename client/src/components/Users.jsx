import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(users);
  useEffect(() => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    axios
      .get(
        "http://localhost:3000/api/v1/user/bulk?filter=" +
          encodeURIComponent(filter),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        setError("");
        setLoading(false);
      });
  }, [filter]);
  return (
    <>
      <div className="mt-6 text-blue-800 text-3xl font-bold">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div>
          {users ? (
            users.map((user, index) => <User key={index} user={user} />)
          ) : (
            <div>No users found</div>
          )}
        </div>
      )}
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between my-2 p-2 border rounded shadow-sm">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mr-2">
          <div className="text-xl font-bold">{user.firstName[0]}</div>
        </div>
        <div className="flex flex-col justify-center text-blue-800">
          <div className="font-semibold">
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <Button
          onClick={() =>
            navigate(`/send?id=${user._id}&name=${user.firstName}`)
          }
          label={"Send Money"}
        />
      </div>
    </div>
  );
}
