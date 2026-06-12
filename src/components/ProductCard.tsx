import type { Product } from "../types/Product";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
    product: Product;
    onSelect: (product: Product) => void;
}

const ProductCard = ({
    product,
    onSelect,
}: ProductCardProps) => {
    const { cartItems, addToCart } =
        useCart();

    const isLowStock =
        product.stock !== undefined &&
        product.stock > 0 &&
        product.stock <= 10;

    const isOutOfStock =
        product.stock === 0;

    const existingItem =
        cartItems.find(
            (item) => item.id === product.id
        );

    const handleAddToCart = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.stopPropagation();

        addToCart(product);
    };

    return (
        <div
            onClick={() => onSelect(product)}
            className="
                group
                cursor-pointer
                overflow-hidden
                rounded-xl
                border
                bg-white
                dark:bg-gray-800
                dark:border-gray-700
                shadow-md
                hover:shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
            "
        >
            {/* Product Image */}
            <div className="overflow-hidden">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="
                        w-full
                        h-52
                        object-cover
                        transition-transform
                        duration-300
                        group-hover:scale-105
                    "
                />
            </div>

            {/* Product Content */}
            <div className="p-4">
                {/* Product Name */}
                <h3
                    className="
                        font-bold
                        text-lg
                        truncate
                    "
                >
                    {product.title}
                </h3>

                {/* Description */}
                <p
                    className="
                        text-sm
                        text-gray-600
                        dark:text-gray-300
                        mt-2
                        h-10
                        overflow-hidden
                    "
                >
                    {product.description}
                </p>

                {/* Rating */}
                <div className="mt-3">
                    <span className="text-sm">
                        ⭐{" "}
                        {product.rating ??
                            "N/A"}
                    </span>
                </div>

                {/* Price + Category */}
                <div className="mt-3 flex justify-between items-center">
                    <span className="font-bold text-green-600 text-lg">
                        $
                        {product.price}
                    </span>

                    <span
                        className="
                            text-xs
                            px-2
                            py-1
                            rounded-full
                            bg-gray-100
                            dark:bg-gray-700
                            dark:text-white
                        "
                    >
                        {product.category}
                    </span>
                </div>

                {/* Stock Status */}
                <div className="mt-3">
                    {isOutOfStock ? (
                        <span
                            className="
                                text-xs
                                px-2
                                py-1
                                rounded-full
                                bg-red-100
                                text-red-700
                            "
                        >
                            Out of Stock
                        </span>
                    ) : isLowStock ? (
                        <span
                            className="
                                text-xs
                                px-2
                                py-1
                                rounded-full
                                bg-yellow-100
                                text-yellow-700
                            "
                        >
                            Only{" "}
                            {product.stock} Left
                        </span>
                    ) : (
                        <span
                            className="
                                text-xs
                                px-2
                                py-1
                                rounded-full
                                bg-green-100
                                text-green-700
                            "
                        >
                            In Stock
                        </span>
                    )}
                </div>

                {/* Add To Cart */}
                <div className="mt-4">
                    <button
                        onClick={
                            handleAddToCart
                        }
                        disabled={
                            isOutOfStock
                        }
                        className="
                            w-full
                            py-2
                            rounded-lg
                            font-medium
                            transition
                            bg-blue-600
                            text-white
                            hover:bg-blue-700
                            disabled:bg-gray-400
                            disabled:cursor-not-allowed
                        "
                    >
                        {isOutOfStock
                            ? "Out Of Stock"
                            : existingItem
                            ? `✓ Added (${existingItem.quantity})`
                            : "+ Add To Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;