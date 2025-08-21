import { useEffect, useRef } from "react";

const ScrollLock = (isLocked) => {
    const scrollPosition = useRef(0);

    useEffect(() => {
        if (isLocked) {
            const scrollbarWidth =
                window.innerWidth - document.documentElement.clientWidth;

            // Store current scroll position
            scrollPosition.current = window.pageYOffset;

            window.scrollTo(0, 0);

            // Apply styles
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            //document.body.style.top = `-${scrollPosition.current}px`;
            document.body.style.width = "100%";
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            // Restore styles
            document.body.style.removeProperty("overflow");
            document.body.style.removeProperty("position");
            document.body.style.removeProperty("top");
            document.body.style.removeProperty("width");
            document.body.style.paddingRight = "0px";
            //document.body.style.removeProperty("paddingRight");

            // Restore scroll position
            //window.scrollTo(0, scrollPosition.current);
            window.scrollTo(0, 0);
        }

        return () => {
            document.body.style.removeProperty("overflow");
            document.body.style.removeProperty("position");
            document.body.style.removeProperty("top");
            document.body.style.removeProperty("width");
            document.body.style.paddingRight = "0px";
            //document.body.style.removeProperty("paddingRight");
        };
    }, [isLocked]);
};

export default ScrollLock;
