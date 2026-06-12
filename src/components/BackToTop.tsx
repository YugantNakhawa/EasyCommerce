import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener(
            "scroll",
            handleScroll
        );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="
                fixed
                bottom-6
                right-6
                z-50
                p-3
                rounded-full
                shadow-lg
                bg-blue-600
                text-white
                hover:bg-blue-700
                transition-all
                duration-300
            "
            aria-label="Back to top"
        >
            <ChevronUp size={24} />
        </button>
    );
};

export default BackToTop;