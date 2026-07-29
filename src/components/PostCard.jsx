import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group block h-full">
      <div className="h-full flex flex-col bg-blue-200 rounded-2xl border border-slate-100
        overflow-hidden shadow-sm shadow-slate-200/60
        transition-all duration-200 ease-out
        group-hover:shadow-lg group-hover:shadow-blue-200/50 group-hover:-translate-y-0.5">

        <div className="w-full aspect-[4/3] bg-slate-50 overflow-hidden">
          {featuredImage ? (
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="w-full h-full object-cover
                transition-transform duration-300 ease-out
                group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300 text-sm">
              No image
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex items-center">
          <h2 className="text-lg font-semibold text-slate-800 leading-snug
            group-hover:text-blue-600 transition-colors duration-150
            line-clamp-2">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  )
}

export default PostCard