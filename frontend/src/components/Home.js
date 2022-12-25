import React from 'react'
import "./Home.css";
import { BsHeart, BsThreeDots } from "react-icons/bs";
import { FaPaperPlane } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';
import AllPosts from './AllPosts';

const Home = () => {
  const data = [
    {
      name: "Siva",
      location: "Bengaluru",
      likes: 64,
      description: "Kick start your career",
      PostImage: "../img/flight.jpg",
      date: () => {
        let temp = new Date();
        return `${temp.getDate()} : ${temp.getMonth()} : ${temp.getFullYear()}`;

      },
    },
    {
      name: "Neeraj",
      location: "Pune",
      likes: 30,
      description: "Sample Description",
      PostImage: "../img/10x.png",
      date: () => {
        let temp = new Date();
        return `${temp.getDate()} : ${temp.getMonth()} : ${temp.getFullYear()}`;

      }
    },
    {
      name: "Rahul",
      location: "Hyderabad",
      likes: 30,
      description: "Sample Description for Post",
      PostImage: "../img/Bridge.webp",
      date: () => {
        let temp = new Date();
        return `${temp.getDate()} : ${temp.getMonth()} : ${temp.getFullYear()}`;

      }
    }
  ]
  console.log(data);

  return (
    <>
      <AllPosts />
      {data.map(user => {
        let keys = new Date().getTime() * Math.random().toString();
        return (
          <div className="card" key={keys}>
            <div className="card-header">
              <div className="name-location">
                <h3>{user.name}</h3>
                <h5>{user.location}</h5>
              </div>
              <div className="three-dots">
                <h2><BsThreeDots /></h2>
              </div>
            </div>
            <div className="card-image">
              <img src={user.PostImage} alt="postedimg" />
            </div>

            <div className="card-content">
              <div className="icons-date-container">
                <div className="icons-likes">
                  <h2><BsHeart id="heart" /><FaPaperPlane /></h2>

                  <p id="likes">{user.likes} Likes</p>
                </div>
                <div className="date">
                  {user.date()}
                </div>
              </div>
              <p id="caption">{user.description}</p>
            </div>
          </div>

        )
      })}
    </>
  )
}

export default Home