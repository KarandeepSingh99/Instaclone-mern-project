import React, { useEffect, useState } from 'react'
import "./Home.css";
import { BsHeart } from "react-icons/bs";
import { FaPaperPlane } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const AllPosts = () => {
    let navigate = useNavigate();
    const [allpostsData, setAllPostsData] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) {
            navigate("/signup")
        }

        //fetching all posts
        fetch("http://localhost:4000/allposts")
            .then(res => res.json())
            .then(allposts => {
                // console.log(allposts)
                setAllPostsData(allposts)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <>
            <div className="home">
                {allpostsData.map((alldata) => {
                    console.log(alldata)
                    return (
                        <>
                            <div className="card">
                                <div className="card-header">
                                    <div className="neme-location">
                                        <h3>{alldata.author}</h3>
                                        <h5>{alldata.location}</h5>
                                    </div>
                                </div>
                                <div className="card-image">
                                    <img src={alldata.photo} alt="postedimg" />
                                </div>
                                <div className="card-content">
                                    <div className="icons-date-container">
                                        <div className="icons">
                                            <h2 ><BsHeart style={{marginRight:20}} /><FaPaperPlane /></h2>
                                        </div>

                                    </div>
                                    <p id="caption" >{alldata.body}</p>
                                </div>
                            </div>

                        </>
                    )
                })}
            </div>
        </>
    )
}

export default AllPosts