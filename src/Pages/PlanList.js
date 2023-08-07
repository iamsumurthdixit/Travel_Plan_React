import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Plan } from "./Plan";
import { AppContext } from "./AppContextFile";

import "../css/planList.css";

export const PlanList = () => {
  const { plans, setPlans, user } = useContext(AppContext);
  const [planHere, setPlanHere] = useState([]);
  console.log("user: ", user);
  const getPlanList = async (e) => {
    if (user === null || user.role === "user") {
      try {
        const res = await axios.get("http://127.0.0.1:8000/plan");
        // setPlans(res.data);
        setPlanHere(res.data);
      } catch (error) {
        console.error(error);
      }
    } else if (user.role === "admin") {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/plan/view/admin/${user.id}`
        );
        // setPlans(res.data);
        setPlanHere(res.data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    getPlanList();
  }, [user]);

  return (
    <div>
      <Plan plans={planHere} />
    </div>
  );
};
