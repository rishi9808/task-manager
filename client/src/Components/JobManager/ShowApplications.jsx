import { useEffect, useState } from 'react';
import '../../styles/ShowApplications.css'
import axios from 'axios';
function ShowApplications(prop) { // need postedjob id and a functioon to close this popup
  console.log(prop.pjid);
  const [Appls, setAppls] = useState([]);
  async function fetchAppl(pjid) {
    const response = await axios.get(`http://localhost:3002/getappl?pjid=${pjid}`)
    setAppls(response.data);
    console.log("here is the application data")
    console.log(response.data)
  }
  useEffect((function () {
    fetchAppl(prop.pjid);
  }), []);
  const isPopupOpen = true
  async function handleDecision(index, event) {
    const name = event.target.name;
    let status = "Pending"
    const aid = Appls[index]._id
    console.log(aid);
    if (name === "Accept") {
      status = "Accepted";
    }
    else if (name === "Reject") {
      status = "Rejected"
    }
    else if(name==='Pending'){
      status = "Pending"
    }
    const res = axios.post("http://localhost:3002/approve", {
      aid: aid,
      status: status
    })
    alert("The application has been " + status);
    fetchAppl(prop.pjid);
  }
  function getEligibility(eli) {
    if (eli === "sslc")
      return "SSLC"
    else if (eli === "plus_two")
      return "PLUS TWO"
    else if (eli === "p_undergraduate")
      return "Pursuing UG"
    else if (eli === "undergraduate")
      return "UG"
    else if (eli === "p_Postgraduate")
      return "Pursuing PG"
    else if (eli === "postgraduate")
      return "PG"
    else
      return "Not Available"
  }
  function getSkills(skills) {
    const filteredSkills = [...new Set(skills.filter(skill => skill !== "None"))];
    console.log("The skills are" + filteredSkills.join(', '))
    return filteredSkills.join(',');
  }

  return (

    <div className={`popup-container ${isPopupOpen ? 'active' : ''}`}>
      <div className="popup-content">
        <h1>Applications</h1>
        <table>
          <thead>
            <tr>
              <th>Sl. No.</th>
              <th>Student Name</th>
              <th>Eligibility</th>
              <th>Skills</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Appls.map((Appl, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{Appl.sid.fullName}</td>
                <td>{getEligibility(Appl.sid.eli_status)}</td>
                <td>{getSkills(Appl.sid.skills)}</td>
                <td className="button-container">
                  {Appl.status === "Pending" && <>
                    <button className="button btn-sm" name='Accept' onClick={(event) => handleDecision(index, event)}>Accept</button>
                    <button className="button reject btn-sm" name='Reject' onClick={(event) => handleDecision(index, event)}>Reject</button>
                  </>
                  }
                  {Appl.status === "Accepted" && <>
                    <button className="button btn-sm" name='Accept' >Accepted</button>
                    <button className="button bg-warning btn-sm" name='Pending' onClick={(event) => handleDecision(index, event)}><i className="fa-solid fa-arrow-rotate-left fa-xl"></i></button>
                    
                  </>
                  }
                  {Appl.status === "Rejected" && <>
                  <button className="button reject btn-sm" name='Reject' >Rejected</button>
                    <button className="button bg-warning btn-sm" name='Pending' onClick={(event) => handleDecision(index, event)}><i className="fa-solid fa-arrow-rotate-left fa-xl"></i></button>
                  </>
                  }

                </td>
              </tr>
            ))}

          </tbody>

        </table>
        <button className="btn btn-outline-danger mt-3" onClick={() => prop.openpopUp_apl(false, "645cd9471399ba7c481c6709")}>CANCEL</button>
      </div>
    </div>
  )
}

export { ShowApplications };