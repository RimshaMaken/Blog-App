import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config"

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    return (
        <div className='w-full py-10'>
            <Container>
                <h1 className='text-2xl font-bold text-slate-800 mb-6'>
                    All Posts
                </h1>
                {posts.length === 0 ? (
                    <p className='text-slate-400'>No posts yet.</p>
                ) : (
                    <div className='grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6'>
                        {posts.map((post) => (
                            <PostCard
                                key={post.$id}
                                $id={post.$id}
                                title={post.title}
                                featuredImage={post.featuredImage}
                            />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
};

export default AllPosts;