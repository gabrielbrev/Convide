import { useEffect } from "react";

const ScrollReset = () => {
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                window.scrollTo(0, 0);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return null;
};

export default ScrollReset;
