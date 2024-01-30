'use client'

const Breadcrumbs = () => {
    return (
        <div className="text-sm breadcrumbs border border-slate-300 p-2 bg-base-100 rounded-lg">
            <ul>
            <li>
                {/* no-underline hover:no-underline */}
                <span className="inline-flex gap-2 items-center font-medium">
                <a href="#" className="text-lg">
                    @officialtestingbot
                </a>
                </span>
            </li> 
            <li>
                <span className="inline-flex gap-2 items-center">
                <a href="#" className="text-lg">
                    Capture
                </a>
                </span>
            </li> 
            <li>
                <span className="inline-flex gap-2 items-center font-semibold text-lg">
                Post Engagement
                </span>
            </li>
            </ul>
        </div>
    );
};

export default Breadcrumbs;