import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";

const Watchlist=()=>{
    const [watchlist, setWatchList] = useState(0);
    return (
        <div className="watchlist">
            <FaRegEye />
            <span>{watchlist}</span>
        </div>
    );
};

export default Watchlist;