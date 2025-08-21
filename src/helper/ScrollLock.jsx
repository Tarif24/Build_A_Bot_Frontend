import { useEffect, useRef } from "react";

const ScrollLock = (isLocked) => {
    const scrollPosition = useRef(0);

    useEffect(() => {
        if (isLocked) {
            // Store current scroll position
            scrollPosition.current = window.pageYOffset;

            // Apply styles
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollPosition.current}px`;
            document.body.style.width = "100%";
        } else {
            // Restore styles
            document.body.style.removeProperty("overflow");
            document.body.style.removeProperty("position");
            document.body.style.removeProperty("top");
            document.body.style.removeProperty("width");

            // Restore scroll position
            window.scrollTo(0, scrollPosition.current);
        }

        return () => {
            document.body.style.removeProperty("overflow");
            document.body.style.removeProperty("position");
            document.body.style.removeProperty("top");
            document.body.style.removeProperty("width");
        };
    }, [isLocked]);
};

export default ScrollLock;
