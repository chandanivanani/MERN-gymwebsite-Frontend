import React from "react";

export const CardSkeleton = () => {
    return (
      <div className="h-full bg-surface-200 rounded-lg overflow-hidden shadow-inner shadow-slate-400">
        <div className="animate-pulse bg-surface-300 h-44 w-full"></div>
        <div className="p-4">
            <div className="animate-pulse bg-surface-300 rounded-lg 4 w-1/2 mb-4"></div>
            <div className="animate-pulse bg-surface-300 h-4 w-3/4 rounded-lg mb-2"></div>
            <div className="animate-pulse bg-surface-300 h-4 rounded-lg w-1/4"></div>
        </div>
      </div>
    );
};

export const CardDataStateSkeleton = () => {
    return (
        <div className="rounded-lg border h-44 bg-surface-200 py-6 shadow-inner shadow-slate-600 border-gray-800 animate-pulse">
            <div className="flex h-11 w-11 items-center mx-auto justify-center rounded-lg bg-surface-300"></div>
            <div>
                <div className="mt-4 flex flex-col items-center justify-center">
                <div className="animate-pulse h-4 w-8 bg-surface-300 rounded-lg mb-2"></div>
                <div className="animate-pulse h-4 w-32 bg-surface-300 rounded-lg "></div>
                </div>
            </div>
        </div>
    );
};

export const ChartSkeleton = () => {
    return (
         <div className="flex flex-col justify-center mt-4 animate-pulse">
            <div className="animate-pulse h-4 w-52 bg-surface-300 rounded-lg"></div>
            <div className="h-[20rem] w-full rounded-lg bg-surface-300"></div>
         </div>
    );
};

export const TableSkeleton = () => {
    return (
       <tr className="border-b border-t bg-surface-200 border-surface-300 animate-pulse">
        <td colSpan={6} className="text-center py-4" ><div className="animate-pulse h-4 w-72 bg-surface-300 rounded-lg mx-auto"></div></td>
       </tr>
    );
};