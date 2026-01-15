import React, { useContext, useEffect, useState } from 'react'
import Heading from "../components/Heading"
import Posts from '../components/Posts'
import PostDetailModel from '../components/PostDetailModel';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const [selectedPost, setSelectedPost] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const handleDelete = async (postId) => {
        try {
            if (confirm("Are Sure to delete your post ?")) {
                await deleteDoc(doc(db, "posts", postId));
                setPosts(posts.filter((post) => post.id !== postId))
                setSelectedPost(null);
            }
            else {
                return;
            }
        } catch (error) {
            console.log(error);
        }

    }




    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postRef = collection(db, "posts");
                const postDocs = await getDocs(postRef);
                const allPosts = postDocs.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                setPosts(allPosts)
                // console.log(allPosts)
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [])
    return (
        <div className='space-y-8'>
            <Heading
                headingText="Latest Posts"
                text="Discover interesting stories from our community"
                center={false}
            />

            {loading ? (<div
                className='text-center py-20 text-slate-500'
            >Loading posts...</div>) : (<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {posts.map((post) => (
                    <Posts key={post.id} title={post.title} description={post.description} onClick={() => setSelectedPost(post)} />
                ))}
            </div>)}



            {selectedPost && <PostDetailModel post={selectedPost} onClose={() => setSelectedPost(null)} onDelete={handleDelete} isOwner={user?.id === selectedPost.userId} />}
        </div>
    )
}

export default Home