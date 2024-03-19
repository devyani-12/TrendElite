import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (!token) {
            navigate('/login'); // Redirect to login page if not logged in
            return; // Exit early if not logged in
        }

        axios.get('http://localhost:5000/api/posts', {
            headers: {
                'Authorization': `Bearer ${token}` // Include token in request headers
            }
        })
        .then(res => {
            // Filter posts based on the author ID
            const filteredPosts = res.data.filter(post => post.author == userId);
            setPosts(filteredPosts);
        })
        .catch(err => console.log(err));
    }, [navigate, token, userId]); // Add userId to the dependency array

    const handleEdit = (postId) => {
        navigate(`/edit-post/${postId}`);
    };

    const handleDelete = (postId) => {
        axios.delete(`http://localhost:5000/api/posts/${postId}` , {
            headers: {
                'Authorization': `Bearer ${token}` // Include token in request headers
            }
        })
            .then(res => {
                setPosts(posts.filter(post => post._id !== postId));
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <div className='navbarcont' >
                    <span className='name'><Link to="/Profile">TrendElite</Link></span>
                    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </div>
            <div className='posts' >
                        {posts.map(post => (
                            <div className='post' key={post._id}>
                                <h2>{post.title}</h2>
                                <p>{post.content}</p>
                                <div>
                                    <button onClick={() => handleEdit(post._id)}>Edit</button>
                                    <button onClick={() => handleDelete(post._id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
        </div>
    );
}

export default Profile;
