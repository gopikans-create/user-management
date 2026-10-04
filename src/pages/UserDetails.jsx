import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserDetails() {

  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    if (localStorage.getItem("loggedIn") !== "true") {
      navigate("/");
      return;
    }

    fetch(
      `https://api.slingacademy.com/v1/sample-data/users/${id}`
    )

      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        return response.json();

      })

      .then((data) => {

        setUser(data.user);
        setLoading(false);

      })

      .catch((error) => {

        setError(error.message);
        setLoading(false);

      });

  }, [id]);


  if (loading) {

    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">

        <div className="text-center">

          <div
            className="spinner-border text-primary"
            role="status"
          ></div>

          <p className="mt-3">
            Loading user details...
          </p>

        </div>

      </div>
    );

  }


  if (error) {

    return (

      <div className="container py-5">

        <div className="alert alert-danger">
          {error}
        </div>

      </div>

    );

  }


  return (

    <div className="dashboard-bg min-vh-100">

      <nav className="navbar navbar-dark bg-dark">

        <div className="container">

          <span className="navbar-brand fw-bold">
            <i className="bi bi-person-circle me-2"></i>
            User Details
          </span>

          <button
            className="btn btn-outline-light"
            onClick={() => navigate("/dashboard")}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </button>

        </div>

      </nav>


      <div className="container py-5">

        <div className="row justify-content-center">

          <div className="col-md-8 col-lg-6">

            <div className="card border-0 shadow-lg rounded-4">

              <div className="card-body p-5 text-center">

                <img
                  src={user.profile_picture}
                  alt={user.first_name}
                  className="details-image mb-4"
                />

                <h2 className="fw-bold">

                  {user.first_name}{" "}
                  {user.last_name}

                </h2>

                <p className="text-muted mb-4">
                  {user.job}
                </p>


                <div className="text-start">

                  <div className="detail-row">
                    <strong>Email</strong>
                    <span>{user.email}</span>
                  </div>

                  <div className="detail-row">
                    <strong>Phone</strong>
                    <span>{user.phone}</span>
                  </div>

                  <div className="detail-row">
                    <strong>Gender</strong>
                    <span>{user.gender}</span>
                  </div>

                  <div className="detail-row">
                    <strong>City</strong>
                    <span>{user.city}</span>
                  </div>

                  <div className="detail-row">
                    <strong>State</strong>
                    <span>{user.state}</span>
                  </div>

                  <div className="detail-row">
                    <strong>Country</strong>
                    <span>{user.country}</span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default UserDetails;