import React,{useState} from "react";

const useLoading = () => {
    const [loading, setLoading] = useState(true);

    const stopLoading = () => setLoading(false);

    return { loading, stopLoading};
}

export default useLoading;