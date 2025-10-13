"use client";

import React, { useEffect, useState } from "react";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { STARTUPS_VIEWS_QUERY } from "@/sanity/lib/queries";

const View = ({ id }: { id: string }) => {
    const [totalViews, setTotalViews] = useState<number | null>(null);

    useEffect(() => {
        let ignore = false;

        const run = async () => {
            const { views } = await client
                .withConfig({ useCdn: false })
                .fetch(STARTUPS_VIEWS_QUERY, { id });

            if (ignore) return;
            setTotalViews(views || 0);

            writeClient
                .patch(id)
                .set({ views: (views || 0) + 1 })
                .commit()
                .catch(console.error);
        };

        run();

        return () => {
            ignore = true;
        };
    }, [id]);

    return (
        <div className="view-container">
            {totalViews && (
                <div className="absolute -top-2 -right-2">
                    <Ping />
                </div>
            )}
            <p className="view-text">
                <span className="font-black">
                    {totalViews === null
                        ? "No views"
                        : totalViews > 1
                          ? `${totalViews} views`
                          : `${totalViews} view`}
                </span>
            </p>
        </div>
    );
};

export default View;

//---------------- PPR Only works on next canary

// const View = async ({ id }: { id: string }) => {
//   const { views: totalViews } = await client
//     .withConfig({ useCdn: false })
//     .fetch(STARTUPS_VIEWS_QUERY, { id });

//    after(async () => await writeClient
//     .patch(id)
//     .set({ views: totalViews + 1})
//     .commit());

//   return (
//     <div className="view_container">
//       <div className="absolute -top-2 -right-2">
//         <Ping />
//       </div>

//       <p className="view-text">
//         <span className="font-black">
//           {totalViews > 1 ? `${totalViews} views` : `${totalViews} view`}
//         </span>
//       </p>
//     </div>
//   );
// };

// export default View;
