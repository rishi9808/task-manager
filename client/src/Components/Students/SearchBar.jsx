import { useState,useEffect } from "react";
import getNearDistricts from "../Common/GetNearDistricts";
import GetUserId from "../../Components/Common/GetUserId";
import axios from "axios";
function SearchBar(props) {

  const [searcher, setSearcher] = useState({
    keyword: "",
    category: "All",
    minwage: 0,
    location: "All",
    selection: 0,
  });

  const [sorter, setSorter] = useState({
    sort_option:"po"
  });
  let studentinfo;

  function handleChangeSort(event) {
    const name = event.target.name;
    const value = event.target.value;
    setSorter((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  useEffect(() => {
    console.log('value in setsort is', sorter.sort_option);
    sortJobs();
  }, [sorter]);
  
  async function sortJobs(){
    if(sorter.sort_option==="po"){
      props.setJobs(props.alljobs);
    }
    else if(sorter.sort_option==="wg"){
      const filteredJobs = [...props.alljobs];
      filteredJobs.sort((a, b) => b.wage - a.wage);
      props.setJobs(filteredJobs);
    }
    else{
      await fetchSt_info();
      
      console.log("location is"+studentinfo)
      const nearDist = getNearDistricts(studentinfo);
        console.log(nearDist)
        const districtIndexMap = new Map();
        nearDist.forEach((district, index) => {
          districtIndexMap.set(district, index);
        });

        const filteredJobs = props.alljobs.slice().sort((jobA, jobB) => {
          const districtAIndex = districtIndexMap.get(jobA.district);
          const districtBIndex = districtIndexMap.get(jobB.district);

          return districtAIndex - districtBIndex;
        });
        props.setJobs(filteredJobs);

    }

  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setSearcher((prevData) => ({
      ...prevData,
      [name]: value,
     
    }));
  }
  function handleSubmit(even) {
    even.preventDefault();
    console.log("The data in searcher is");
    console.log(searcher);
    changeJobs();
  }
  function changeJobs() {
    let finalJobs=props.alljobs;
    if(searcher.keyword !== ""){
      const filteredJobs = finalJobs.filter((job) => {
        const foundInJobCat = job.title.includes(searcher.keyword);
        const foundInOrgName =
          job.jmid && job.jmid.orgName.includes(searcher.keyword);
        return foundInJobCat || foundInOrgName;
      });
      finalJobs=filteredJobs;
    }

    if(searcher.category!=="All"){
      const filteredJobs = finalJobs.filter((job) =>
          job.jobCat.includes(searcher.category)
        );
      finalJobs=filteredJobs;
    }

    if(searcher.minwage>0){
      const searchValue=searcher.minwage;
      const filteredJobs = finalJobs.filter(
        (job) => job.wage >= searchValue
      )
      finalJobs=filteredJobs;
    }
  

    if(searcher.location!=="All"){

      const nearDist = getNearDistricts(searcher.location);
        console.log(nearDist)
        const districtIndexMap = new Map();
        nearDist.forEach((district, index) => {
          districtIndexMap.set(district, index);
        });

        const sortedJobs = finalJobs.slice().sort((jobA, jobB) => {
          const districtAIndex = districtIndexMap.get(jobA.district);
          const districtBIndex = districtIndexMap.get(jobB.district);

          return districtAIndex - districtBIndex;
        });

        finalJobs=sortedJobs
    }

    props.setJobs(finalJobs);
  }
  async function fetchSt_info() {
    try {
      const response = await axios.get(
        `http://localhost:3002/getstudentinfo?sid=${GetUserId("s_userId")}`
      );
      console.log("Details of student are");
      console.log(response.data.district);
      studentinfo=response.data.district
      
      
    } catch (error) {
      console.error("Error fetching student details:", error);
      // Handle error if needed
    }
  }



    // if (searcher.selection === 1) {
    //   const copyJobs = (searchValue) => {
    //     const filteredJobs = props.alljobs.filter((job) => {
    //       const foundInJobCat = job.title.includes(searchValue);
    //       const foundInOrgName =
    //         job.jmid && job.jmid.orgName.includes(searchValue);
    //       return foundInJobCat || foundInOrgName;
    //     });
    //     props.setJobs(filteredJobs);
    //   };
    //   copyJobs(searcher.keyword);
    // } else if (searcher.selection === 2) {
    //   const copyJobs = (searchValue) => {
    //     const filteredJobs = props.alljobs.filter((job) =>
    //       job.jobCat.includes(searchValue)
    //     );
    //     props.setJobs(filteredJobs);
    //     if (searchValue === "All") {
    //       props.setJobs(props.alljobs);
    //     }
    //   };
    //   copyJobs(searcher.category);
    // } else if (searcher.selection === 3) {
    //   const copyJobs = (searchValue) => {
    //     const filteredJobs = props.alljobs.filter(
    //       (job) => job.wage >= searchValue
    //     );
    //     props.setJobs(filteredJobs);
    //   };
    //   copyJobs(parseInt(searcher.minwage));
    // } else if (searcher.selection === 4) {
    //   const copyJobs = (searchValue) => {
        
    //      const nearDist = getNearDistricts(searchValue);
    //     console.log(nearDist)
    //     const districtIndexMap = new Map();
    //     nearDist.forEach((district, index) => {
    //       districtIndexMap.set(district, index);
    //     });

    //     const sortedJobs = props.alljobs.slice().sort((jobA, jobB) => {
    //       const districtAIndex = districtIndexMap.get(jobA.district);
    //       const districtBIndex = districtIndexMap.get(jobB.district);

    //       return districtAIndex - districtBIndex;
    //     });
    //     console.log("The sorted jobs near you is")
    //     console.log(sortedJobs);
    //     props.setJobs(sortedJobs);
    //   };
    //   copyJobs(searcher.location);
    //   console.log();
    // }
  
  
  return (
    <div>
    <div
      className="container-fluid bg-primary mb-5 wow fadeIn"
      data-wow-delay="0.1s"
      style={{ padding: "35px" }}
    >
      <div className="container">
        <div className="col">
          <div className="row ">
            <div className="col-md-2">
              <label className="form-label" htmlFor="keyword">
                Enter keyword
              </label>
              <input
                type="text"
                className="form-control border-0"
                id="keyword"
                style={{ margin: "0px", maxHeight: "36px" }}
                name="keyword"
                value={searcher.keyword}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-2">
              <label className="form-label" htmlFor="category">
                Category
              </label>
              <select
                className="form-select border-0"
                id="category"
                name="category"
                value={searcher.category}
               
                onChange={handleChange}
              >
                <option value="All" >All</option>
                <option value="Catering">Catering</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Data Entry">Data Entry</option>
                <option value="Content writing">Content writing</option>
                <option value="Delivery">Delivery</option>
                <option value="Teaching & Education3">
                  Teaching & Education
                </option>
                <option value="Others">others</option>
              </select>
            </div>

            <div className="col-md-2">
              <label className="form-label" htmlFor="minwage">
                Minimum wage
              </label>
              <select
                className="form-select border-0"
                id="minwage"
                name="minwage"
                value={searcher.minwage}
                onChange={handleChange}
              >
                <option value="100" >
                  100
                </option>
                <option value="200">200</option>
                <option value="300">300</option>
              </select>
            </div>

            <div className="col-md-3 " style={{ marginLeft: "10px" }}>
              <label className="form-label" htmlFor="location">
                Location
              </label>
              <select
                className="form-select border-0"
                id="location"
                name="location"
                value={searcher.location}
                onChange={handleChange}
              >
                <option value="All">All</option>
                <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                <option value="Kollam">Kollam</option>
                <option value="Pathanamthitta">Pathanamthitta</option>
                <option value="Alappuzha">Alappuzha</option>
                <option value="Kottayam">Kottayam</option>
                <option value="Idukki">Idukki </option>
                <option value="Ernakulam">Ernakulam</option>
                <option value="Thrissur">Thrissur</option>
                <option value="Palakkad">Palakkad</option>
                <option value="Malappuram">Malappuram</option>
                <option value="Kozhikkode">Kozhikkode</option>
                <option value="Wayanad">Wayanad</option>
                <option value="Kannur">Kannur</option>
                <option value="Kasargode">Kasargode</option>
              </select>
            </div>

            <div className="col-md-2">
              <label className="form-label" htmlFor="submit">
                .
              </label>
              <button
                className="btn btn-dark border-0 w-100"
                id="submit"
                type="button"
                onClick={handleSubmit}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="sortingDiv">
    <i className="fa-solid fa-arrow-down-wide-short"></i>
        <p>Sort by</p>
        <select className="form-select " id="sortMenu" name="sort_option" aria-label="Default select example"  value={sorter.sort_option}
                onChange={handleChangeSort}>
          <option value="po">Posted order </option>
          <option value="wg">Wage</option>
          <option value="cty">Closer to you</option>
          
        </select>
    </div>
    </div>

  );

}
export default SearchBar;
