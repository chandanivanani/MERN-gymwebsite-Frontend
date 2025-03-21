import React from "react";

type Props = {}

const Loading = (props : Props) => {
    return (
        <div className="flex h-screen items-center justify-center bg-surface-100">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary-600 border-t-transparent"></div>
        </div>
    )
}

export default Loading;