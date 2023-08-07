import { AppContext } from "./AppContextFile";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// import "../css/addPlan.css";
export const AddPlan = () => {
  const { plans, setPlans, user } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  // const [allUsers, setAllUsers] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/users`);
      console.log(res.data);

      // setAllUsers(res.data);
      const data = res.data.map((instance) => instance.id);
      // console.log("data", data);

      setUserIds(data);
      // console.log("asdsa", userIds);
    } catch (error) {
      console.error("error in fetch users ", error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    console.log("userIds updated:", userIds);
  }, [userIds]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formattedStartDate = new Date(start_date).toISOString().split("T")[0];
    const formattedEndDate = new Date(end_date).toISOString().split("T")[0];

    // if (!image) console.error("image not found");
    // else console.error("image found");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("start_date", start_date);
    formData.append("end_date", end_date);
    formData.append("price", price);
    formData.append("image", image, image.name);
    formData.append("author", user.id);

    try {
      const res = await axios.post(`http://127.0.0.1:8000/plan/add`, formData);
      console.log("posted plan ", res.data);

      console.log("user id list ", userIds);

      const requestInfo = {
        planId: res.data.id,
        planTitle: res.data.title,
        description: `New plan posted ${res.data.title}`,
        userIds: userIds,
      };
      console.log("request info is ", requestInfo);

      try {
        const javaResponse = await axios.post(
          `http://localhost:9191/java/saveNotifications`,
          requestInfo
        );

        console.log("java response ", javaResponse);
      } catch (error) {
        console.error("error posting notif ", error);
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  // useEffect(()=> {
  //   handleFormSubmit();
  // }, []);

  return (
    <div className="add-plan-container">
      <div className="container">
        <h2 className="text-center">Add a New Plan</h2>
        <form className="add-plan-form">
          <div className="form-group">
            <label className="add-plan-label">Title:</label>
            <input
              className="form-control"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="add-plan-label">Description:</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="add-plan-label">Start Date:</label>
            <input
              className="form-control"
              type="date"
              value={start_date}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="add-plan-label">End Date:</label>
            <input
              className="form-control"
              type="date"
              value={end_date}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="add-plan-label">Price:</label>
            <input
              className="form-control"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="add-plan-label">Image:</label>
            <input
              className="form-control-file"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <button
            className="btn btn-primary add-plan-button"
            type="button"
            onClick={handleFormSubmit}
          >
            Add Plan
          </button>
        </form>
      </div>
    </div>
  );
};
