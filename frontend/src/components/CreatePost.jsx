// CreatePost.jsx

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';
import Navbar from './Navbar';

const CreatePost = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');

        if (!formData.title || !formData.content) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/posts', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            alert('Post created successfully');
            navigate('/profile');
        } catch (error) {
            console.error('An error occurred while creating the post:', error);
            alert('An error occurred while creating the post');
        }
    };

    return (
        <div className='post-container'>
            <Navbar isLoggedIn={true} setIsLoggedIn={setIsLoggedIn} />
            <div className='form-container'>
                <div className='form-group'>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" placeholder="Title" onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="content">Content:</label>
                    <textarea id="content" name="content" placeholder="Content" onChange={handleChange} />
                </div>
                <button className='btn' onClick={handleSubmit}>Create Post</button>
            </div>
        </div>
    );
}

export default CreatePost;
