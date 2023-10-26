import React, { useState } from "react";
import "../../styles/S_Notifications.css";
import axios from "axios";
import GetUserId from "../Common/GetUserId";

function NotificationCard({ title, status, invLink }) {
  const [isCopied, setIsCopied] = useState(false);

  function handleCopyText() {
    const textToCopy = invLink;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
    });
  }

  return (
    <div
      className={`notification new ${status === "Rejected" ? "rejected" : ""}`}
    >
      <h2 className="title">About Your Job Application</h2>
      <p className="details">
        Your Job Application for {title} has been {status}
      </p>
      {status === "Accepted" ? (
        <p style={{ color: "green" }} onClick={handleCopyText}>
          {isCopied ? "Copied" : "Invitation link"}{" "}
          <i className="fa-solid fa-copy fa-2xl"></i>
        </p>
      ) : (
        <p></p>
      )}
    </div>
  );
}

function S_Notifications(prop) {
  const [Notis, setNotis] = useState([]);
  const isPopupOpen = true;

  React.useEffect(() => {
    async function fetchNotis() {
      const sid = GetUserId("s_userId");
      const response = await axios.get(
        `http://localhost:3002/getnoti?sid=${sid}`
      );
      if(response.data){
        console.log("The data in response is",response);
      setNotis(response.data);
      }
      
      
    }
    fetchNotis();
  }, []);

  return (
    <div className={`popup-container ${isPopupOpen ? "active" : ""}`}>
      <div className="popup-content">
        <h1>Notifications</h1>

        {Notis.map((Noti, index) => {
          const status = Noti.status;
          const title = Noti.aid.pjid.title;
          const invLink = Noti.aid.pjid.invLink;

          return (
            <NotificationCard
              key={index}
              title={title}
              status={status}
              invLink={invLink}
            />
          );
        })}

        <button
          className="btn btn-outline-danger"
          onClick={() => prop.toggle_noti()}
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}

export { S_Notifications };
