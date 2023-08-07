import { AppContext } from "./AppContextFile";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ShowDetailedTemplate } from "./ShowDetailedTemplate";

export const ViewRegisteredPlans = () => {
  const { user } = useContext(AppContext);
  const userId = user.id;
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
  }, []);

  return (
    <div>
      {/* {JSON.stringify(registeredPlans)} */}
      {registeredPlans.length > 0 ? (
        registeredPlans.map((plan) => {
          return (
            <div className="plan" key={plan?.id}>
              <div className="plan-body">
                <h2 className="title">{plan?.title}</h2>
                <h3 className="description">{plan?.description}</h3>
                <h4 className="price">{plan?.price}</h4>
                <h4>{plan?.start_date}</h4>
                <h4>{plan?.end_date}</h4>
                <img className="image" src={plan?.image} alt={plan?.title} />
                {/* <button onClick={() => handleDeregister(plan?.id)}>Deregister</button> */}
                <button
                  onClick={() =>
                    setRegisteredPlans((prev) =>
                      prev.filter((p) => p.id === plan.id)
                    )
                  }
                >
                  Deregister
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <h3>No Plan Registered</h3>
      )}
    </div>
  );
};
