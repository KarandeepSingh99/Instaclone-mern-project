import React from 'react'
import "./CreatePost.css"
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [body, setBody] = useState("")
    const [author, setAuthor] = useState("")
    const [location, setLocation] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const navigate = useNavigate()

    // Toast functions
    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)


    useEffect(() => {
        if (url) {
            fetch("https://instaclone-backend-5nw3.onrender.com/createPost", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    body,
                    pic: url,
                    author,
                    location
                })
            }).then(res => res.json())
                .then(data => {
                    if (!body || !author || !location || !image) {
                        notifyA("Please add all the fields")
                    } else {
                        notifyB("Successfully Posted")
                        navigate("/")
                    }
                })
                .catch(err => console.log(err))
        }
    }, [url])

    const postDetails = () => {
        console.log(body, image, author, location);
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "instaclone")
        data.append("cloud_name", "karandeepcloud")
        fetch("https://api.cloudinary.com/v1_1/karandeepcloud/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json())
            .then(data => setUrl(data.url))
            .catch(err => console.log(err))



    }
    const loadfile = (event) => {
        var output = document.getElementById("output");
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src); // free memory
        };
    };
    return (
        <>
            <div className="create-post">
                <div className='header'>
                   
                    <img id='output' src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png' />
                    <input
                        type="file"
                        className='field2'
                        accept="image/*"
                        onChange={(event) => {
                            loadfile(event);
                            setImage(event.target.files[0]);
                        }}
                    />
                </div>
                <div className="author-location">
                    <input type="text" placeholder="Author" onChange={(e) => { setAuthor(e.target.value) }} />
                    <input type="text" placeholder="Location" onChange={(e) => { setLocation(e.target.value) }} />
                </div>
             
                <textarea onChange={(e) => {
                    setBody(e.target.value);
                }} type="text" placeholder="Write a caption...."></textarea>
               
            </div>
            <div id="share"> <button id="post-btn" onClick={(e) => { postDetails() }}>Share Your Post</button></div>
        </>

    )
}

export default CreatePost