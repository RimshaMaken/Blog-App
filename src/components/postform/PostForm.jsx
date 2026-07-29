import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        try {
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            console.error("Post submission failed:", error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-y-6 max-w-6xl mx-auto px-4 py-10">
            <div className="w-full lg:w-2/3 px-3 space-y-5">
                <Input
                    label="Title"
                    placeholder="Give your post a title"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug"
                    placeholder="url-friendly-slug"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <div>
                    <label className="block mb-1.5 pl-0.5 text-sm font-medium text-slate-700">
                        Content
                    </label>
                    <RTE name="content" control={control} defaultValue={getValues("content")} />
                </div>
            </div>

            <div className="w-full lg:w-1/3 px-3">
                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm shadow-slate-200/60 p-5 space-y-5 sticky top-4">
                    <div>
                        <label className="block mb-1.5 pl-0.5 text-sm font-medium text-slate-700">
                            Featured Image
                        </label>
                        <input
                            type="file"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            className="block w-full text-sm text-slate-600
                                file:mr-3 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:bg-blue-50 file:text-blue-600
                                file:font-medium
                                hover:file:bg-blue-100
                                file:transition-colors file:duration-150
                                cursor-pointer"
                            {...register("image", { required: !post })}
                        />
                    </div>

                    {post && (
                        <div className="w-full rounded-xl overflow-hidden border border-slate-100">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="w-full aspect-video object-cover"
                            />
                        </div>
                    )}

                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        {...register("status", { required: true })}
                    />

                    <Button
                        type="submit"
                        bgColor={post ? "bg-emerald-600" : "bg-blue-600"}
                        className="w-full"
                    >
                        {post ? "Update Post" : "Publish Post"}
                    </Button>
                </div>
            </div>
        </form>
    );
}