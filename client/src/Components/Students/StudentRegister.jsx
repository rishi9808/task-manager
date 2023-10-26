// import Navbar from "../Components/Navbar.jsx";
import { useState } from "react";
import "../../styles/StudentAuth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function StudentRegister(props) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullName: "",
    userName: "",
    passWord: "",
    age: 18,
    eli_status: "SSLC",
    res_state: "",
    district: "",
    skills: ["None", "None", "None"],
  });
  function handleChange(event) {
    const { value, name } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: name === "age" ? parseInt(value) : value,
    }));
  }

  function handleSkillsSet(event) {
    const { value, name } = event.target;
    const updatedskills = [...data.skills];
    const skillIndex = parseInt(name.replace("skill_", ""));
    updatedskills[skillIndex] = value;
    setData((prevData) => ({
      ...prevData,
      skills: updatedskills,
    }));
    // console.log("skill is"+data.skills)
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3002/studentauth/register",
        {
          fullName: data.fullName,
          userName: data.userName,
          passWord: data.passWord,
          age: data.age,
          district:data.district,
          eli_status: data.eli_status,
          skills: data.skills,
        }
      );
      if (response.data.message === "User registered successfully") {
        alert("Registration completed");
        navigate("/shome");
      } else {
        alert("email already regisetred ");
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="authCentreDiv">
        <div className="about-section">
          <h1>We Help To Get The Best Part-Time Job </h1>
          <br />
          <br />
          <p>
            Unlock yout part-time potential and seize the opportunities with our
            online job portal.Connecting job seekers and employers seamlessly,we
            pave the way for flexible employment and mutually benifecial
            partnerships.
          </p>
          <p>
            Embrace the power of conveniance and efficiency as you embark on
            your part-time journey with us.
          </p>
        </div>

        <div className="col-12 col-md-9 col-lg-7 col-xl-6 signup-section">
          <div
            className="card"
            style={{ borderRadius: "15px", border: "none" }}
          >
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">
                Create an account
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example1cg">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="form3Example1cg"
                    className="form-control form-control-lg"
                    name="fullName"
                    value={data.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3cg">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="form3Example3cg"
                    className="form-control form-control-lg"
                    name="userName"
                    value={data.userName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example4cg">
                    Password
                  </label>
                  <input
                    type="password"
                    id="form3Example4cg"
                    className="form-control form-control-lg"
                    name="passWord"
                    value={data.passWord}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example4cdg">
                    Repeat your password
                  </label>
                  <input
                    type="password"
                    id="form3Example4cdg"
                    className="form-control form-control-lg"
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="age">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    className="form-control form-control-lg"
                    inputMode="numeric"
                    min="18"
                    max="45"
                    value={data.age}
                    onChange={(event) => handleChange(event)}
                    required
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="eligibility">
                    Eligibility
                  </label>
                  <select
                    className="form-control form-control-lg"
                    id="eligibility"
                    name="eli_status"
                    value={data.eli_status}
                    onChange={handleChange}
                    required
                  >
                    <option value="sslc">SSLC</option>
                    <option value="plus_two">Plus Two</option>
                    <option value="p_undergraduate">
                      Pursuing Undergraduate
                    </option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="p_Postgraduate">
                      Pursuing Postgraduate
                    </option>
                    <option value="postgraduate">Postgraduate</option>
                  </select>
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="res_state">
                    Resident Location
                  </label>
                  <div style={{ display: "flex" }}>
                    <select
                      className="form-control form-control-lg"
                      id="res_state"
                      name="res_state"
                      value={data.res_state}
                      onChange={handleChange}
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity(
                          "Please select a valid state"
                        )
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                    >
                      <option value="" disabled>
                        STATE
                      </option>
                      <option value="kerala">Kerala</option>
                    </select>

                    {data.res_state === "kerala" ? (
                      <>
                        <select
                          className="form-control form-control-lg"
                          id="district"
                          name="district"
                          value={data.district}
                          onChange={handleChange}
                          required
                          onInvalid={(e) =>
                            e.target.setCustomValidity(
                              "Please select a valid District"
                            )
                          }
                          onInput={(e) => e.target.setCustomValidity("")}
                          style={{ marginLeft: "25px" }}
                        >
                          <option value="" disabled>
                            DISTRICT
                          </option>
                          <option value="Thiruvananthapuram">
                            Thiruvananthapuram
                          </option>
                          <option value="Kollam">Kollam</option>
                          <option value="Pathanamthitta">Pathanamthitta</option>
                          <option value="Alappuzha">Alappuzha</option>
                          <option value="Kottayam">Kottayam</option>
                          <option value="Idukki ">Idukki </option>
                          <option value="Ernakulam">Ernakulam</option>
                          <option value="Thrissur">Thrissur</option>
                          <option value="Palakkad">Palakkad</option>
                          <option value="Malappuram">Malappuram</option>
                          <option value="Kozhikkode">Kozhikkode</option>
                          <option value="Wayanad">Wayanad</option>
                          <option value="Kannur">Kannur</option>
                          <option value="Kasargode">Kasargode</option>
                        </select>
                      </>
                    ) : (
                      <>
                        <select
                          className="form-control form-control-lg"
                          id="district"
                          name="district"
                          value={data.district}
                          onChange={handleChange}
                          required
                          style={{ marginLeft: "25px" }}
                        >
                          <option value="def">DISTRICT</option>
                        </select>
                      </>
                    )}
                  </div>
                </div>

                <label className="form-label" htmlFor="sande">
                  Skills and experience
                </label>
                <div id="sande">
                  <div className="form-group mb-4">
                    <div className="row">
                      <div className="col">
                        <select
                          className="form-control form-control-sm"
                          id="skills1"
                          name="skill_0"
                          value={data.skills[0]}
                          onChange={handleSkillsSet}
                        >
                          <option value="None">None</option>
                          <option value="Sensible driver">
                            Sensible driver
                          </option>
                          <option value="Computer experience">
                            Computer experience
                          </option>
                          <option value="Content writer">Content writer</option>
                        </select>
                      </div>
                      <div className="col">
                        <select
                          className="form-control form-control-sm"
                          id="skills2"
                          name="skill_1"
                          value={data.skills[1]}
                          onChange={handleSkillsSet}
                        >
                          <option value="None">None</option>
                          <option value="Sensible driver">
                            Sensible driver
                          </option>
                          <option value="Computer experience">
                            Computer experience
                          </option>
                          <option value="Content writer">Content writer</option>
                        </select>
                      </div>
                      <div className="col">
                        <select
                          className="form-control form-control-sm"
                          id="skills3"
                          name="skill_2"
                          value={data.skills[2]}
                          onChange={handleSkillsSet}
                        >
                          <option value="None">None</option>
                          <option value="Sensible driver">
                            Sensible driver
                          </option>
                          <option value="Computer experience">
                            Computer experience
                          </option>
                          <option value="Content writer">Content writer</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-check d-flex justify-content-center mb-5">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3cg"
                    required
                  />
                  <label className="form-check-label" htmlFor="form2Example3g">
                    I agree to all statements in{" "}
                    <a className="text-body">
                      <u>Terms of service</u>
                    </a>
                  </label>
                </div>

                <div className="d-flex justify-content-center">
                  <button className="btn btn-outline-success" type="Submit">
                    Register
                  </button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">
                  Already have an account?{" "}
                  <a className="fw-bold text-body" onClick={props.RegOrLog}>
                    <u>Login here</u>
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='authCentreDiv'>
            <div className="about-section">
                <h2>Student authentication</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, sapien nec eleifend aliquam, ex nibh lacinia justo, et volutpat lorem massa ac urna.</p>
                <p>Pellentesque at magna at arcu vehicula euismod sed a nunc. In et sem ut elit pharetra fringilla ut vitae libero.</p>
            </div>
            <div className="signup-section">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <input placeholder='Full Name' type="text" id="fullName" name="fullName" value={data.fullName} onChange={handleChange} required></input>
                    </div>

                    <div className="form-group">
                        <input placeholder='email id' type="email" id="userName" name="userName" value={data.userName} onChange={handleChange} required></input>
                    </div>

                    <div className="form-group">
                        <input placeholder='Password' type="password" id="password" name="passWord" value={data.passWord} onChange={handleChange} required></input>
                    </div>

                    <div className="form-group">
                        <button type="Submit">Submit</button>
                        <button onClick={props.RegOrLog}>Alredy have an account</button>
                    </div>

                </form>
            </div>

        </div> */}
    </>
  );
}

export { StudentRegister };
