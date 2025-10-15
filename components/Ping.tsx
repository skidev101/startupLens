import React from "react";

const Ping = () => {
  return (
    <div className="relative">
      <div className="absolute -left-4 top-1">
        <span className="flex size-[10px]">
          <span className="absolute inline-flex h-full w-full rounded-full animate-ping bg-primary opacity-75">
            <span className="absolute inline-flex h-full w-full rounded-full animate-ping bg-primary opacity-75">
              <span className="relative inline-flex size-[10px] rounded-full bg-primary z-10"></span>
            </span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Ping;
