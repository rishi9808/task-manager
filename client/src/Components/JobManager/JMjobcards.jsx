import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/Job_Card.css'
import axios from 'axios';
import GetUserId from '../Common/GetUserId';
import moment from 'moment'

function JMjobcards(prop) {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([])
    useEffect(function () {
        async function fetchJobs() {
            const userId = GetUserId("jm_userId");
            const response = await axios.get(`http://localhost:3002/jmhome?userId=${userId}`);
            console.log(response);
            if (response.data.message !== "Server not connceted")
                setJobs(response.data);
        }
        fetchJobs();
    }, []);

    function handleShowApplicaions(index) {
        const pjid = jobs[index]._id;
        prop.openpopUp_apl(true, pjid);
    }

    function EditJob(pj_id) {
        console.log("Job id that passed is " + pj_id);
        navigate(`/jmPostjob/${pj_id}`)
    }
    function dateFormatter(date) {
        const formattedDate = moment.utc(date).utcOffset(0).format('DD MMMM YYYY');
         // Output: "24 May 2023"
        return (

            <>{formattedDate}</>
        )
    }
    function getImageSource(jobCat) {
        if (jobCat === "Catering")
            return "/images/img_cat.png"
        else if (jobCat === "Customer Service")
            return "/images/img_cus.png"
        else if (jobCat === "Data Entry")
            return "/images/img_de.png"
        else if (jobCat === "Content writing")
            return "/images/img_cw.png"
        else if (jobCat === "Delivery")
            return "/images/img_dlv.png"
        else if (jobCat === "Teaching & Education")
            return "/images/img_tne.png"
        else 
            return "/images/img_oth.png"
    }
    return (
        <>


            <div className="center_section">
                <div className="container-xxl py-5">
                    <div className="container">
                        <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">My jobs</h1>
                        <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
                            <div className="tab-content">
                                <div id="tab-1" className="tab-pane fade show p-0 active">



                                    {jobs.map((job, index) => (
                                        <div className="job-item p-4 mb-4" key={index}>
                                            <div className="row g-4">
                                                <div className="col-sm-12 col-md-8 d-flex align-items-center">
                                                    <img className="flex-shrink-0 img-fluid border rounded" src={getImageSource(job.jobCat)} alt="" style={{ width: '80px', height: '80px' }}></img>
                                                    <div className="text-start ps-4">
                                                        <h5 className="mb-5">{job.title}</h5>
                                                        <div style={{ display: 'flex', maxHeight: '20px' }}>
                                                            <span className="text-truncate me-3"><i className="fa fa-map-marker-alt text-primary me-2"></i>{job.city+","+job.district}</span>
                                                            <span className="text-truncate me-3"><i className="far fa-calendar-alt text-primary me-2"></i>{dateFormatter(job.date)}</span>
                                                            <span className="text-truncate me-3"><i className="far fa-money-bill-alt text-primary me-2"></i>₹{job.wage}/hr</span>
                                                            <span className="text-truncate me-0"><i className="fa-solid fa-person-circle-check text-primary"></i>{job.no_stud_applied}/{job.no_stud}</span>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                                    <div className="d-flex mb-3">
                                                        <button className="btn btn-light btn-square me-3"  ><i className="fa-regular fa-pen-to-square" onClick={function () { EditJob(job._id) }}></i></button>
                                                        <button className="btn btn-primary" onClick={function () {
                                                            handleShowApplicaions(index);
                                                        }}>See Applications</button>
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
                </div>
            </div>


            {/* <div className={styles.center_section}>
            <h1>My Jobs</h1>
            {jobs.map((job, index) => (
                <div className={styles.job_card} key={index}>
                    <h2>{job.title}</h2>
                    <p>this is some job </p>
                    <div className={styles.job_footer}>
                        <div className={styles.job_eligibility}>Eligibility</div>
                        <button className={styles.registration_button} onClick={function (){
                            handleShowApplicaions(index);
                        }}>See Applications</button>
                    </div>
                </div>
            ))}
        </div> */}


        </>
    )

}

export default JMjobcards;