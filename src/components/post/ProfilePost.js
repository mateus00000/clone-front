import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './PostCard'; // Componente para visualizar cada post individualmente
import './ProfilePosts.css';
function ProfilePosts({ username }) {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + `/user/${username}/posts`)
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch posts:', error);
            });
    }, [username]);

    if (!posts.length) {
        return (
            <div className="no-posts">
            </div>
        );
    }

    return (
        <div className="profile-posts">
            <h3>Posts</h3>
            <div className="post-grid">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}

export default ProfilePosts;
