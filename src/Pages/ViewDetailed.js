import { Plan } from "./Plan";
import { useParams } from "react-router-dom";
import { AppContext } from "./AppContextFile";
import { useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShowDetailedTemplate } from "./ShowDetailedTemplate";
import { GetRegisteredUsers } from "./GetRegisteredUsers";
import { getUser } from "../services/user/get";
import { ModifyDate } from "./ModifyDate";

export const ViewDetailed = (props) => {
  const { planId } = useParams();

  const { role, user } = useContext(AppContext);
  const [plan, setPlan] = useState(null);
  const [users, setUsers] = useState([]);
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  //   console.log({ user });

  const navigate = useNavigate();

  const getPlan = async (planId) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/plan/${planId}`);
      setPlan(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPlan(planId);
  }, []);

  const deletePlan = async (planId) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/plan/delete/${planId}`
      );

      try {
        const javaDeleteResponse = await axios.delete(
          `http://localhost:9191/java/deleteNotificationsByPlanId/${planId}`
        );
        console.log(javaDeleteResponse.data);
      } catch (error) {
        console.error("error deleting notif using planId ", error);
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const changeDate = (planId) => {
    console.log("entered date page");
    navigate(`/modifyDate/${planId}`);
  };

  const viewRegisteredUsers = async (planId) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/plan/users/${planId}`);
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    viewRegisteredUsers(planId);
  }, []);

  const checkRegisteredPlan = async (planId) => {
    try {
      const userId = user?.id;
      console.log({ user });
      const res = await axios.get(
        `http://127.0.0.1:8000/plan/check-registration-status/${planId}/${userId}`
      );
      setIsUserRegistered(res.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    checkRegisteredPlan(planId);
  }, [user?.id]);

  const handleRegistration = async (planId) => {
    if (isUserRegistered) {
      try {
        const userId = user?.id;
        const res = await axios.post(
          `http://127.0.0.1:8000/plan/deregister/${planId}/${userId}`
        );
        setIsUserRegistered(false);

      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const userId = user?.id;
        const res = await axios.post(
          `http://127.0.0.1:8000/plan/register/${planId}/${userId}`
        );
        setIsUserRegistered(true);

        try {
          const requestInfo = {
            planId: planId,
            planTitle: plan.title,
            description: `${user.name} registered for ${plan.title}`,
            userIds: [user.id],
          };
          const javaResponse = await axios.post(
            `http://localhost:9191/java/saveNotifications`,
            requestInfo
          );
          console.log("notification saved", javaResponse.data);
        } catch (error) {
          console.log("error in java ", error);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  // useEffect(()=> {
  //     handleRegistration(planId);
  // }, [showRegistrationButton]);

  return (
    <div className="container mt-4">
      <div className="card shadow">
        {role === "admin" && Cookies.get("jwt") && plan && (
          <>
            <div className="card-body">
              {/* Center top the ShowDetailedTemplate */}
              <div className="d-flex justify-content-center align-items-center mb-4">
                <ShowDetailedTemplate
                  plan={plan}
                  deletePlan={deletePlan}
                  changeDate={changeDate}
                />
              </div>
              <button
                className="btn btn-danger mr-2"
                onClick={() => deletePlan(planId)}
              >
                Delete
              </button>
              <button
                className="btn btn-primary"
                onClick={() => changeDate(planId)}
              >
                Change Date
              </button>
              {users && users.length > 0 ? (
                <div className="registered-users-section mt-4">
                  <h3>Registered Users</h3>
                  <div className="registered-users-list">
                    {users.map((myuser) => {
                      return <h4 key={myuser.id}>{myuser.name}</h4>;
                    })}
                  </div>
                </div>
              ) : (
                <h3 className="mt-4">No users registered</h3>
              )}
            </div>
          </>
        )}
        {role === "user" && Cookies.get("jwt") && plan && (
          <>
            <div className="card-body">
              <div className="d-flex justify-content-center align-items-center mb-4">
                <ShowDetailedTemplate plan={plan} />
              </div>
              <button
                className="btn btn-primary"
                onClick={() => handleRegistration(planId)}
              >
                {isUserRegistered ? "Deregister" : "Register"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
