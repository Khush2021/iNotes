import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const host = "http://localhost:8000";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${host}/api/auth/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success === true) {
      navigate("/login");
    } else {
      json.errors.map((error) => alert(error.msg));
    }
  };

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const token = localStorage.getItem("token");
  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#222831" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card"
                style={{
                  backgroundColor: "#393E46",
                  borderRadius: "1rem",
                  color: "#EEEEEE",
                }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h1 className="fw-bold mb-2 text-uppercase">SignUp</h1>
                    <p className="text-white-50 mb-5">
                      Please enter your credentials!
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="text"
                          id="typeNameX"
                          className="form-control form-control-lg"
                          name="name"
                          value={credentials.name}
                          onChange={onchange}
                        />
                        <label className="form-label" htmlFor="typeEmailX">
                          Name
                        </label>
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input
                          type="email"
                          id="typeEmailX"
                          className="form-control form-control-lg"
                          name="email"
                          value={credentials.email}
                          onChange={onchange}
                        />
                        <label className="form-label" htmlFor="typeEmailX">
                          Email
                        </label>
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input
                          type="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                          name="password"
                          value={credentials.password}
                          onChange={onchange}
                        />
                        <label className="form-label" htmlFor="typePasswordX">
                          Password
                        </label>
                      </div>

                      <button
                        style={{ backgroundColor: "#00ADB5" }}
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                        id="signup-btn"
                      >
                        SignUp
                      </button>
                    </form>
                  </div>

                  <div>
                    <p className="mb-0">
                      Already have an account?{" "}
                      <Link to="/login" className="text-white-50 fw-bold">
                        Login
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
