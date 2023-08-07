import { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "./AppContextFile";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import "../css/login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { setDropdownOpen } = useContext(AppContext);

  const navigate = useNavigate();

  const { setUser, setIsLoggedIn, setRole, receivedToken, setReceivedToken } =
    useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://127.0.0.1:8000/login`, {
        email: email,
        password: password,
      });

      setIsLoggedIn(true);
      setUser(res.data);
      setRole(res.data["role"]);
      setDropdownOpen(false);

      const newToken = res.data["jwt"];
      setReceivedToken(newToken);

      Cookies.set("jwt", newToken, { expires: 1, secure: true });

      console.log(newToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

      navigate("/");
    } catch (error) {
      setShowModal(true);
      console.error(error);
    }
  };

  return (
    <div className="container">
      {/* <div className="card"> */}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>

        {/* Modal for invalid credentials */}
        <div
          className={`modal fade ${showModal ? "show d-block" : ""}`}
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Invalid Credentials</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Your email or password is incorrect. Please try again.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowModal(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* </div> */}
    </div>
  );
};

// import { useState, useContext } from "react";
// import axios from "axios";
// import { AppContext } from "./AppContextFile";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

// export const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   const { setUser, setIsLoggedIn, setRole, receivedToken, setReceivedToken } =
//     useContext(AppContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(`http://127.0.0.1:8000/login`, {
//         email: email,
//         password: password,
//       });

//       setIsLoggedIn(true);
//       setUser(res.data);
//       setRole(res.data["role"]);
//       setReceivedToken(res.data["jwt]"]);

//       Cookies.set("jwt", res.data["jwt"], { expires: 1, secure: true });

//       axios.defaults.headers.common['Authorization'] = `Bearer ${receivedToken}`;

//       navigate("/");
//     } catch (error) {
//       setShowModal(true);
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>

//         {/* Modal for invalid credentials */}
//         <div className={`modal fade ${showModal ? "show d-block" : ""}`} tabIndex="-1" role="dialog" aria-hidden="true">
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Invalid Credentials</h5>
//                 <button type="button" className="close" onClick={() => setShowModal(false)}>
//                   <span aria-hidden="true">&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <p>Your email or password is incorrect. Please try again.</p>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>OK</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };
