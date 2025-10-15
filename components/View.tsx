"use client";

import React, { useEffect, useState } from "react";
import Ping from "./Ping";
import { getAndIncrementViews } from "@/lib/actions";

const View = ({ id }: { id: string }) => {
    const [totalViews, setTotalViews] = useState<number | null>(null);

    useEffect(() => {
        let ignore = false;

        const run = async () => {
            const result = await getAndIncrementViews(id);

            if (ignore) return;

            if (result.success) {
                setTotalViews(result.views);
            }
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
                    {totalViews === null || totalViews === 0
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
