import React from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featureimage }) {
    // Ensure that featuredImage is a valid file ID
    const isValidFileId = featureimage && typeof featureimage === 'string';

    return (
        <Link to={`/post/${$id}`}>
            <div className=" postcard w-full  rounded-md  p-8  shadow-md transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-100 duration-300">
                <div className="w-full  justify-center flex items-start ">
                    {isValidFileId ? (
                        <img src={appwriteService.getFilePreview(featureimage)} alt={title} className="rounded-xl w-20 h-20 " />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>
                <h2 className="text-xl ">{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;
