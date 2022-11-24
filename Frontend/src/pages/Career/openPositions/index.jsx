import React, {useState, useEffect} from 'react'
import axios from "axios";
import './openPositions.style.scss'
import Search from "../assets/search-icon.svg";

const baseURL = "http://34.195.230.138/api/careers";


function SectionPositions({Button}) {
    // const [filteredData, setFilteredData] =  useState([])
    // const [inputWord, setInputWord] =  useState([])
    const [jobs, setJobs] =  useState([])

    // const handleSearch = (e)=> {
    //     const wordSearched = e.target.value;
    //     setInputWord(inputWord)
    //     const newFilter = jobs.filter((value) => {
    //         return value.role.toLowerCase().includes(wordSearched.toLowerCase())
    //     })
    //     if (wordSearched === ""){
    //         setFilteredData([]);
    //     } else{
    //         setFilteredData(newFilter)
    //     }
    //     setFilteredData(newFilter)
    // };

  useEffect(() => {
    axios.get(`${baseURL}`).then((res) => {
      setJobs(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <div>
      <section id="positions" className="section4">
        <h2>Open Positions</h2>
        <form>
          <div className="search__wrapper">
            <div className="input__div">
              <img src={Search} alt="search-icon" />
              <input
                placeholder="Search for job openings here "
                className="input"
                // value={inputWord}
                // onChange={handleSearch}
              />
            </div>
            <Button name="Search" ></Button>
          </div>
          <div id='clear' className='clear'>Clear Searches</div>
          <div className="options">
            <select>
              <option value="Job Category">Job Category</option>
            </select>
            <select>
              <option value="Full/Part-time">Full/Part-time</option>
            </select>
            <select>
              <option value="Location">Location</option>
            </select>
          </div>
        </form>
        
        <div className="jobs jobResult">
          <div className="job__type">
            <h3>Engineering</h3>
            <span className="number__badge">3</span>
          </div>
          {/* {filteredData.length !== 0 && (
          <div>
          {filteredData.map((position) => {
            return (
              <div key={position.id} className="job__cont">
                <div className="job__desc">
                  <div>
                    <h3>{position.role}</h3>
                    <h4>
                      {position.type} | <b>{position.location}</b>
                    </h4>
                  </div>
                  <Button name="Apply" />
                </div>
                <hr />
              </div>
            );
          })} 
          </div>
          )}  */}

        </div>
       
        <div>
          <h2>{jobs.role}</h2>
        </div>
      </section>
    </div>
  )
}

export default SectionPositions