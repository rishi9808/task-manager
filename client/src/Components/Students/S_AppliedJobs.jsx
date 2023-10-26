import { useEffect, useState } from "react";
import "../../styles/S_Notifications.css";
import axios from "axios";
import styles from "../../styles/Job_Card.css";
import GetUserId from "../Common/GetUserId";
function S_AppliedJobs(prop) {
  // need  a function to close this popup
  const [Apjbs, setApjbs] = useState([]);
  async function fetchApjbs() {
    const sid = GetUserId("s_userId");
    const response = await axios.get(
      `http://localhost:3002/getapldjbs?sid=${sid}`
    );
    console.log("Applied Jobs are" + response.data);
    setApjbs(response.data);
  }
  useEffect(function () {
    fetchApjbs();
  }, []);
  const isPopupOpen = true;
  async function handleDecision(index, event) {}

  async function handleJobCancel(index) {
    const pjid = Apjbs[index]._id;

    alert("Registration Cancelled successfully");
    console.log("Registration for " + pjid + "Cancelled succcessfully");
    await axios.post("http://localhost:3002/applyjob", {
      pjid: pjid,
      sid: GetUserId("s_userId"),
      action: "cancel",
    });
    await fetchApjbs();
  }

  return (
    <div className={`popup-container ${isPopupOpen ? "active" : ""}`}>
      <div className="popup-content">
        <h1>Applied Jobs</h1>

        {Apjbs.map((Apjb, index) => (
          <div className={styles.job_card} key={index}>
            <h2>{Apjb.title}</h2>
            <p>this is some job </p>
            <div className={styles.job_footer}>
              <div className={styles.job_eligibility}>Eligibility</div>
              <button
                className={styles.registration_button}
                onClick={function () {
                  handleJobCancel(index);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}

        <button onClick={() => prop.toggle_Apjbs()}>CLOSE</button>
      </div>
    </div>
  );
}

export { S_AppliedJobs };
