'use client'

import { useContext } from "react";
import { PostsContext } from "../context/PostsContext";

const Pagination = () => {
    const { filteredPosts } = useContext(PostsContext);
    return (
        <div className="flex flex-row w-full pt-4">
            <div className="grid flex-grow">
            <p className="text-sm">Showing {filteredPosts.length} to {filteredPosts.length} of {filteredPosts.length} entries</p>
            </div>
            <div className="join">
            <button className="join-item btn btn-sm">Previous</button>
            <button className="join-item btn btn-active btn-sm">1</button>
            <button className="join-item btn btn-sm">Next</button>
            </div>  
        </div>  
    );
};
export default Pagination;