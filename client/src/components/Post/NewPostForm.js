import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, timestampParser } from "../../Shared/utils";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../actions/post.actions";

const NewPostForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();


    const handlePicture = (e) => {
        e.preventDefault();
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    };

    const handlePost = async (e) => {
        e.preventDefault();
        if(message || postPicture){
            const data = new FormData();
            data.append('posterId', userData._id);
            data.append('message', message);
            if(file) {
                data.append("file", file);
                console.log("file exsits");
            }

            dispatch(addPost(data));
            dispatch(getPosts());

            cancelPost();

            
        } else {
            alert("Nothing to post")
        }
    };
    
    const cancelPost = () => {
        setMessage('');
        setPostPicture('');
        setFile('');
    }
    useEffect(() => {
        if (!isEmpty(userData)) setIsLoading(false);
    }, [userData])


    return (
        <div className="post-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse"></i>
            ) : (
                <>
                    <div className="data">
                        <p><span>{userData.following ? userData.following.length : 0}</span>
                            {" "}Following(s)</p>

                        <p><span>{userData.followers ? userData.followers.length : 0}</span>
                            {" "}Follower(s)</p>
                    </div>
                    <NavLink exact to="/profil">
                        <div className="user-info">
                            <img src={userData.picture} alt="user-img" />
                        </div>
                    </NavLink>
                    <div className="post-form">
                        <textarea
                            name="message"
                            id="message"
                            placeholder="Want to share some informations?"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        {message || postPicture ? (
                            <li className="card-container">
                                <div className="card-left">
                                    <img src={userData.picture} alt="user-pic" />
                                </div>
                                <div className="card-right">
                                    <div className="card-header">
                                        <div className="pseudo">
                                            <h3>{userData.pseudo}</h3>
                                        </div> 
                                        <span>{timestampParser(Date.now())}</span>                                   
                                    </div>
                                    <div className="content">
                                        <p>{message}</p>
                                        { <img src={postPicture} alt=""/>}
                                     
                                    </div>
                                </div>
                            </li>
                        ): null}
                        <div className="footer-form">
                            <div className="icon">
                                    <>
                                    <input type="file" id="file-upload" name="file" accept=".jpg, .jpeg, .png" 
                                       onChange={(e) => handlePicture(e)} />
                                    <label htmlFor="file-upload" id="file-upload-label">
                                        <img src="./img/icons/picture.svg" alt="Upload" />
                                    </label>
                                    </>                             
                            </div>
                            <div className="btn-send">
                                {message || postPicture ?
                                    (<button className="cancel" onClick={cancelPost}>Cancel</button>)
                                    : null}

                                <button className="send" onClick={handlePost}>Send</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewPostForm;