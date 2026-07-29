import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-10">
            <Container>
                <div className="w-full flex justify-center mb-6 relative rounded-2xl overflow-hidden border border-slate-100 shadow-sm shadow-slate-200/60 bg-slate-50">
                    {post.featuredImage ? (
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full max-h-[480px] object-contain"
                        />
                    ) : (
                        <div className="w-full h-64 bg-slate-50 flex items-center justify-center text-slate-300">
                            No image
                        </div>
                    )}

                    {isAuthor && (
                        <div className="absolute right-4 top-4 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-emerald-600">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className="w-full mb-6">
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                        {post.title}
                    </h1>
                    <p className="mt-1 text-sm text-slate-400">
                        /{post.$id}
                    </p>
                </div>

                <div className="prose prose-slate max-w-none">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}