import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Plan } from "./Plan";
import { AppContext } from "./AppContextFile";

export const RegisteredPlansOnly = () => {
  const { user } = useContext(AppContext);
  const userId = user?.id;
  const [registeredPlans, setRegisteredPlans] = useState([]);

  const getRegisteredPlans = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/user/registered-plans/${userId}`
      );

      setRegisteredPlans(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getRegisteredPlans();
  }, [user?.id]);

  return (
    <div className="home-page">
      {registeredPlans?.length > 0 ? (
        <Plan plans={registeredPlans} />
      ) : (
        <h2>No plans registered</h2>
      )}
    </div>
  );
};
