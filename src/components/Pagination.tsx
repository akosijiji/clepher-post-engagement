'use client'

const Pagination = () => {
    return (
        <div className="flex flex-row w-full pt-4">
            <div className="grid flex-grow">
            <p className="text-sm">Showing 1 to 1 of 1 entries</p>
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