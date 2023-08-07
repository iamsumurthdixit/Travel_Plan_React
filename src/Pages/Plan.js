import React, { useContext } from "react";
import { AppContext } from "./AppContextFile";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ViewDetailed } from "./ViewDetailed";
import { useState } from "react";

import "../css/plan.css";

export const Plan = ({ plans }) => {
  const navigate = useNavigate();
  const { role } = useContext(AppContext);

  return (
    <>
      <section className="main-plan-container">
        {plans.map((plan) => {
          return (
            <>
              <div className="plan-container" key={plan.id}>
                <div className="plan">
                  <div className="plan-body">
                    <h1 className="title">{plan.title}</h1>
                    <h2 className="description">{plan.description}</h2>
                    <h5 className="price"><span>Price: </span>{plan.price}</h5>
                    <h4>
                      <span>Starts </span>
                      {plan.start_date}
                    </h4>
                    <h4>
                      <span>Ends </span>
                      {plan.end_date}
                    </h4>
                    <div><img className="image" src={plan.image} /></div>
                    {(role === "admin" || role === "user") && (
                      <>
                        <button
                          className="viewDetailed"
                          onClick={() => navigate(`/${plan.id}`)}
                        >
                          View Detailed Plan
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
};
