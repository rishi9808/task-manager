import { useEffect, useState } from "react";
import "../../styles/S_Notifications.css";
import axios from "axios";
import styles from "../../styles/Job_Card.css";
import GetUserId from "../Common/GetUserId";
import moment from "moment";
function S_Dasboard(prop) {
  const [Apjobs, setApJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [SavedJobsArray,setSavedJobsArray]=useState([])
  
  async function fetchApjbs() {
    const sid = GetUserId("s_userId");
    const response = await axios.get(
      `http://localhost:3002/getapldjbs?sid=${sid}`
    );
    console.log("Applied Jobs are", response.data);
    setApJobs(response.data);
  }
  useEffect(function () {
    fetchJobs()
    fetchApjbs();
    const SJobArray = JSON.parse(sessionStorage.getItem('SavedJobs'));
       setSavedJobsArray(SJobArray)
  }, []);

  async function fetchJobs() {
    const response = await axios.get(
      `http://localhost:3002/studenthome?sid=${GetUserId("s_userId")}`
    );
    console.log(response);
    setJobs(response.data);
    // setAlljobs(response.data);
    
  }
  async function fetchSavedJobs() {
    const sid=GetUserId("s_userId");
    console.log("SID of student in jobcard",sid)
    const response = await axios.get(
      `http://localhost:3002/savejob/get?sid=${sid}`
    );
    sessionStorage.setItem("SavedJobs",JSON.stringify(response.data.savedJobs))
    console.log("data from saved jobs is",JSON.stringify(response.data.savedJobs));
    
    
  }

  // async function handleDecision(index, event) {}

  async function handleJobCancel(index) {
    const pjid = Apjobs[index]._id;

    // alert("Registration Cancelled successfully");
    // console.log("Registration for " + pjid + "Cancelled succcessfully");
    await axios.post("http://localhost:3002/applyjob", {
      pjid: pjid,
      sid: GetUserId("s_userId"),
      action: "cancel",
    });
    await fetchApjbs();
    await fetchJobs()
  }

  async function handleJobRegister(index) {
    const pjid = jobs[index]._id;
    await axios.post("http://localhost:3002/applyjob", {
      pjid: pjid,
      sid: GetUserId("s_userId"),
      action: "register",
    });
    alert("Job registered successfully");
    await fetchApjbs();
    await fetchJobs()
  }

  function dateFormatter(date) {
    const formattedDate = moment.utc(date).utcOffset(0).format("DD MMMM YYYY");
    console.log("the date is this");
    console.log(formattedDate); // Output: "24 May 2023"
    return <>{formattedDate}</>;
  }
  function getImageSource(jobCat) {
    if (jobCat === "Catering") return "/images/img_cat.png";
    else if (jobCat === "Customer Service") return "/images/img_cus.png";
    else if (jobCat === "Data Entry") return "/images/img_de.png";
    else if (jobCat === "Content writing") return "/images/img_cw.png";
    else if (jobCat === "Delivery") return "/images/img_dlv.png";
    else if (jobCat === "Teaching & Education") return "/images/img_tne.png";
    else return "/images/img_oth.png";
  }
  function isSavedJob (pjid){
    console.log("The pjid checked in dashboard isSaved is",pjid)
    if(SavedJobsArray.includes(pjid)){
      return true
    }
    else{
      return false
    }
  }
  async function handleJobSaving(pjid,action){
    
    await axios.post(`http://localhost:3002/savejob/${action}`, {
    sid: GetUserId("s_userId"),
    pjid: pjid,
  }).then(()=>{
    fetchSavedJobs().then(()=>{
      const SJobArray = JSON.parse(sessionStorage.getItem('SavedJobs'));
     setSavedJobsArray(SJobArray)
     fetchJobs();
     })
  });
  
  setJobs([]);
    fetchJobs();
   const SJobArray = JSON.parse(sessionStorage.getItem('SavedJobs'));
   setSavedJobsArray(SJobArray)
} 

  return (

    
    <div className="center_section">

      {Apjobs.length!==0?<div className="container-xxl py-5">
        <div className="container">
          <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
            Applied Jobs
          </h1>
          <div
            className="tab-class text-center wow fadeInUp"
            data-wow-delay="0.3s"
          >
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                {Apjobs.map((job, index) => (
                  <div className="job-item p-4 mb-4" key={index}>
                    <div className="row g-4">
                      <div className="col-sm-12 col-md-8 d-flex align-items-center">
                        <img
                          className="flex-shrink-0 img-fluid border rounded"
                          src={getImageSource(job.jobCat)}
                          alt=""
                          style={{ width: "80px", height: "80px" }}
                        ></img>
                        <div className="text-start ps-4">
                          <h5 className="mb-5">
                            {job.title}
                            <span
                              style={{
                                fontWeight: "lighter",
                                fontFamily: "sans-serif",
                                color: "GrayText",
                              }}
                            >
                              {" "}
                              | {job.jmid.orgName}
                            </span>
                          </h5>

                          <div style={{ display: "flex", maxHeight: "20px" }}>
                            <span className="text-truncate me-3">
                              <i className="fa fa-map-marker-alt text-primary me-2"></i>
                              {job.city + "," + job.district}
                            </span>
                            <span className="text-truncate me-3">
                              <i className="far fa-calendar-alt text-primary me-2"></i>
                              {dateFormatter(job.date)}
                            </span>
                            <span className="text-truncate me-3">
                              <i className="far fa-money-bill-alt text-primary me-2"></i>
                              ₹{job.wage}/hr
                            </span>
                            <span className="text-truncate me-0">
                              <i className="fa-solid fa-person-circle-check text-primary"></i>
                              {job.no_stud_applied}/{job.no_stud}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                        <div className="d-flex mb-3">
                          <button
                            className="btn btn-danger"
                            onClick={function () {
                              handleJobCancel(index);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                        {/* <small className="text-truncate"><i className="far fa-calendar-alt text-primary me-2"></i>Date Line: 01 Jul, 2023</small> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>:<></>}
      


           {SavedJobsArray.length !==0?<div className="container">
          <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
            Saved Jobs
          </h1>
          <div
            className="tab-class text-center wow fadeInUp"
            data-wow-delay="0.3s"
          >
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">


                {jobs.map((job, index) => (

                  isSavedJob(job._id)?
                  <div className="job-item p-4 mb-4" key={index}>
                    <div className="row g-4">
                      <div className="col-sm-12 col-md-8 d-flex align-items-center">
                        <img
                          className="flex-shrink-0 img-fluid border rounded"
                          src={getImageSource(job.jobCat)}
                          alt=""
                          style={{ width: "80px", height: "80px" }}
                        ></img>
                        <div className="text-start ps-4">
                          <h5 className="mb-5">
                            {job.title}
                            <span
                              style={{
                                fontWeight: "lighter",
                                fontFamily: "sans-serif",
                                color: "GrayText",
                              }}
                            >
                              {" "}
                              | {job.jmid.orgName}
                            </span>
                          </h5>

                          <div style={{ display: "flex", maxHeight: "20px" }}>
                            <span className="text-truncate me-3">
                              <i className="fa fa-map-marker-alt text-primary me-2"></i>
                              {job.city + "," + job.district}
                            </span>
                            <span className="text-truncate me-3">
                              <i className="far fa-calendar-alt text-primary me-2"></i>
                              {dateFormatter(job.date)}
                            </span>
                            <span className="text-truncate me-3">
                              <i className="far fa-money-bill-alt text-primary me-2"></i>
                              ₹{job.wage}/hr
                            </span>
                            <span className="text-truncate me-0">
                              <i className="fa-solid fa-person-circle-check text-primary"></i>
                              {job.no_stud_applied}/{job.no_stud}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                        <div className="d-flex mb-3">
                          

                            


                            {isSavedJob(job._id)?<button
                            className="btn btn-light btn-square me-3"
                            onClick={function () {
                              handleJobSaving(job._id,"remove");
                            }}
                            
                          ><i className="far fa-heart fa-solid text-primary"></i>
                            </button>:<button
                            className="btn btn-light btn-square me-3"
                            onClick={function () {
                              handleJobSaving(job._id,"add");
                            }}
                            
                          ><i className="far fa-heart  text-primary"></i>
                            </button>}
                            
                          
                          <button
                            className="btn btn-primary"
                            onClick={function () {
                              handleJobRegister(index);
                            }}
                          >
                            Apply Now
                          </button>
                        </div>
                        {/* <small className="text-truncate"><i className="far fa-calendar-alt text-primary me-2"></i>Date Line: 01 Jul, 2023</small> */}
                      </div>
                    </div>
                  </div>
                  :<></>


                ))}
              </div>
            </div>
          </div>
        </div>:<></>}                 
        







      
    </div>
  );
}

export { S_Dasboard };
