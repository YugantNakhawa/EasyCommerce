const ProductSkeleton = () => {
    return (
        <div
            className="
                overflow-hidden
                rounded-xl
                border
                bg-white
                dark:bg-gray-800
                dark:border-gray-700
                shadow-md
                animate-pulse
            "
        >
            {/* Image */}
            <div
                className="
                    w-full
                    h-52
                    bg-gray-300
                    dark:bg-gray-700
                "
            />

            {/* Content */}
            <div className="p-4">
                <div
                    className="
                        h-5
                        w-3/4
                        rounded
                        bg-gray-300
                        dark:bg-gray-700
                    "
                />

                <div
                    className="
                        mt-3
                        h-4
                        w-full
                        rounded
                        bg-gray-200
                        dark:bg-gray-600
                    "
                />

                <div
                    className="
                        mt-2
                        h-4
                        w-2/3
                        rounded
                        bg-gray-200
                        dark:bg-gray-600
                    "
                />

                <div className="mt-5 flex justify-between items-center">
                    <div
                        className="
                            h-5
                            w-16
                            rounded
                            bg-gray-300
                            dark:bg-gray-700
                        "
                    />

                    <div
                        className="
                            h-5
                            w-20
                            rounded-full
                            bg-gray-300
                            dark:bg-gray-700
                        "
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;