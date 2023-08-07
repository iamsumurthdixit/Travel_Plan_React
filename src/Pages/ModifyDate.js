import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "./AppContextFile";
import { useNavigate, useParams } from "react-router-dom";

export const ModifyDate = () => {
  const { user } = useContext(AppContext);
  const userId = user?.id;
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { planId } = useParams();
  console.log(planId);

  const presetDates = async (planId) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/plan/${planId}`);
      console.log(res.data);
      setStartDate(res.data.start_date);
      setEndDate(res.data.end_date);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    presetDates(planId);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formattedStartDate = new Date(start_date).toISOString().split("T")[0];
    const formattedEndDate = new Date(end_date).toISOString().split("T")[0];

    const formData = new FormData();
    formData.append("start_date", start_date);
    formData.append("end_date", end_date);

    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/plan/update-date/${planId}`,
        formData
      );

      setShowModal(true);
      setError("");
      navigate(`/${planId}`);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        setError("Invalid dates entered.");
      } else {
        setError("An error occurred. Please try again.");
      }
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setError("");
    if (!showModal) {
      // Reset the form if modal was shown due to error
      presetDates(planId);
    }
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card shadow">
        <h2 className="text-center mt-3">Modify Date of Plan</h2>
        <form onSubmit={handleFormSubmit} className="px-4">
          <div className="form-group">
            <label>Start Date:</label>
            <input
              type="date"
              className="form-control"
              value={start_date}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>End Date:</label>
            <input
              type="date"
              className="form-control"
              value={end_date}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-custom-orange">
            Modify Dates
          </button>
        </form>
      </div>

      {/* Modal for error/success message */}
      <div
        className={`modal ${showModal ? "d-block" : ""}`}
        onClick={handleModalClose}
      >
        <div
          className={`modal-dialog ${
            showModal ? "animate__animated animate__zoomIn" : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{showModal ? "Message" : ""}</h5>
              <button type="button" className="close" onClick={handleModalClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {showModal && !error ? "Dates updated successfully!" : error}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleModalClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
