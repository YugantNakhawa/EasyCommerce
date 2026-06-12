import { useState, useEffect } from "react";
import type { Product } from "../types/Product";

interface ProductDetailsModalProps {
    product: Product | null;
    products: Product[];
    onClose: () => void;
    onProductSelect: (product: Product) => void;
}

const ProductDetailsModal = ({
    product,
    products,
    onProductSelect,
    onClose,
}: ProductDetailsModalProps) => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        setCurrentImage(0);
    }, [product]);

    useEffect(() => {
        const handleEscape = (
            e: KeyboardEvent
        ) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, [onClose]);

    if (!product) return null;

    const relatedProducts = products
        .filter(
            (item) =>
                item.category === product.category &&
                item.id !== product.id
        )
        .slice(0, 4);

    const images =
        product.images?.length
            ? product.images
            : [product.thumbnail];

    const stock = product.stock ?? 0;

    return (
        <div
            className="
                fixed
                inset-0
                bg-black/50
                flex
                justify-center
                items-center
                z-50
                p-4
            "
            onClick={onClose}
        >
            <div
                className="
                    relative
                    w-full
                    max-w-md
                    sm:max-w-lg
                    md:max-w-xl
                    lg:max-w-2xl
                    max-h-[90vh]
                    overflow-y-auto
                    rounded-xl
                    bg-white
                    dark:bg-gray-900
                    dark:text-white
                    p-6
                    shadow-2xl
                "
                onClick={(e) =>
                    e.stopPropagation()
                }
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="
                        absolute
                        top-3
                        right-4
                        text-2xl
                        font-bold
                        hover:text-red-500
                        transition
                    "
                >
                    ×
                </button>

                {/* Main Image */}
                <img
                    src={images[currentImage]}
                    alt={product.title}
                    className="
                        w-full
                        h-52
                        sm:h-64
                        object-cover
                        rounded-lg
                    "
                />

                {/* Image Navigation */}
                <div className="flex justify-between mt-4">
                    <button
                        className="
                            px-4
                            py-2
                            border
                            rounded-lg
                            hover:bg-gray-100
                            dark:hover:bg-gray-800
                            transition
                        "
                        onClick={() =>
                            setCurrentImage(
                                (prev) =>
                                    prev === 0
                                        ? images.length -
                                        1
                                        : prev - 1
                            )
                        }
                    >
                        ← Previous
                    </button>

                    <button
                        className="
                            px-4
                            py-2
                            border
                            rounded-lg
                            hover:bg-gray-100
                            dark:hover:bg-gray-800
                            transition
                        "
                        onClick={() =>
                            setCurrentImage(
                                (prev) =>
                                    prev ===
                                        images.length -
                                        1
                                        ? 0
                                        : prev + 1
                            )
                        }
                    >
                        Next →
                    </button>
                </div>

                {/* Counter */}
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                    {currentImage + 1} /{" "}
                    {images.length}
                </p>

                {/* Thumbnails */}
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {images.map(
                        (image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Product ${index + 1
                                    }`}
                                onClick={() =>
                                    setCurrentImage(
                                        index
                                    )
                                }
                                className={`
                                    w-16
                                    h-16
                                    object-cover
                                    rounded
                                    cursor-pointer
                                    border-2
                                    flex-shrink-0
                                    transition
                                    ${currentImage ===
                                        index
                                        ? "border-blue-500"
                                        : "border-transparent"
                                    }
                                `}
                            />
                        )
                    )}
                </div>

                {/* Product Information */}
                <div className="mt-6">
                    <div className="flex justify-between items-start gap-3">
                        <h2 className="text-2xl font-bold">
                            {product.title}
                        </h2>

                        <span
                            className="
                                text-xs
                                px-3
                                py-1
                                rounded-full
                                bg-gray-100
                                dark:bg-gray-700
                            "
                        >
                            {product.category}
                        </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="mt-5 space-y-4">
                        {/* Price */}
                        <div>
                            <strong>
                                Price:
                            </strong>{" "}
                            <span className="text-green-600 text-xl font-bold">
                                $
                                {product.price}
                            </span>
                        </div>

                        {/* Brand */}
                        <div>
                            <strong>
                                Brand:
                            </strong>{" "}
                            {product.brand ??
                                "N/A"}
                        </div>

                        {/* Rating */}
                        <div>
                            <strong>
                                Rating:
                            </strong>{" "}
                            ⭐{" "}
                            {product.rating ??
                                "N/A"}{" "}
                            / 5
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2">
                            <strong>
                                Availability:
                            </strong>

                            {stock === 0 ? (
                                <span
                                    className="
                                        bg-red-100
                                        text-red-700
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                        font-medium
                                    "
                                >
                                    Out of Stock
                                </span>
                            ) : stock <= 10 ? (
                                <span
                                    className="
                                        bg-yellow-100
                                        text-yellow-700
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                        font-medium
                                    "
                                >
                                    Only {stock} Left
                                </span>
                            ) : (
                                <span
                                    className="
                                        bg-green-100
                                        text-green-700
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                        font-medium
                                    "
                                >
                                    In Stock ({stock})
                                </span>
                            )}
                        </div>

                        {/* Related Products */}

                        {relatedProducts.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-xl font-semibold mb-4">
                                    You May Also Like
                                </h3>

                                <div className="grid grid-cols-2 gap-4">
                                    {relatedProducts.map(
                                        (relatedProduct) => (
                                            <div
                                                key={relatedProduct.id}
                                                onClick={() =>
                                                    onProductSelect(relatedProduct)
                                                }
                                                className="
                            border
                            rounded-lg
                            overflow-hidden
                            cursor-pointer
                            hover:shadow-md
                            transition
                            dark:border-gray-700
                        "
                                            >
                                                <img
                                                    src={
                                                        relatedProduct.thumbnail
                                                    }
                                                    alt={
                                                        relatedProduct.title
                                                    }
                                                    className="
                                w-full
                                h-24
                                object-cover
                            "
                                                />

                                                <div className="p-2">
                                                    <p
                                                        className="
                                    text-sm
                                    font-medium
                                    truncate
                                "
                                                    >
                                                        {
                                                            relatedProduct.title
                                                        }
                                                    </p>

                                                    <p
                                                        className="
                                    text-green-600
                                    text-sm
                                    font-semibold
                                "
                                                    >
                                                        $
                                                        {
                                                            relatedProduct.price
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsModal;