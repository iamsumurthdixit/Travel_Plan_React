import "../css/ShowDetailedTemplate.css";
export const ShowDetailedTemplate = ({ plan }) => {
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
          </div>
        </div>
      </div>
    </>
  );
};
