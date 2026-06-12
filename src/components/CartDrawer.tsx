import { X, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartDrawer = ({
    isOpen,
    onClose,
}: CartDrawerProps) => {
    const navigate = useNavigate();

    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
    } = useCart();

    const total = cartItems.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    const totalItems = cartItems.reduce(
        (sum, item) =>
            sum + item.quantity,
        0
    );

    const handleCheckout = () => {
        onClose();
        navigate("/checkout");
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="
                        fixed
                        inset-0
                        bg-black/50
                        z-40
                    "
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div
                className={`
                    fixed
                    top-0
                    right-0
                    h-full
                    w-full
                    sm:w-96
                    bg-white
                    dark:bg-gray-900
                    dark:text-white
                    shadow-xl
                    z-50
                    flex
                    flex-col
                    transition-transform
                    duration-300
                    ${
                        isOpen
                            ? "translate-x-0"
                            : "translate-x-full"
                    }
                `}
            >
                {/* Header */}
                <div
                    className="
                        p-4
                        border-b
                        dark:border-gray-700
                        flex
                        justify-between
                        items-center
                    "
                >
                    <div>
                        <h2 className="text-xl font-bold">
                            Shopping Cart
                        </h2>

                        <p className="text-sm text-gray-500">
                            {totalItems} item
                            {totalItems !== 1
                                ? "s"
                                : ""}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="
                            p-2
                            rounded
                            hover:bg-gray-100
                            dark:hover:bg-gray-800
                        "
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    {cartItems.length === 0 ? (
                        <div
                            className="
                                h-full
                                flex
                                flex-col
                                items-center
                                justify-center
                                text-center
                            "
                        >
                            <h3 className="text-lg font-semibold">
                                Your cart is empty
                            </h3>

                            <p className="text-gray-500 mt-2">
                                Add products to get
                                started.
                            </p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="
                                    flex
                                    gap-3
                                    mb-4
                                    pb-4
                                    border-b
                                    dark:border-gray-700
                                "
                            >
                                <img
                                    src={
                                        item.thumbnail
                                    }
                                    alt={
                                        item.title
                                    }
                                    className="
                                        w-20
                                        h-20
                                        rounded-lg
                                        object-cover
                                    "
                                />

                                <div className="flex-1">
                                    <h3
                                        className="
                                            font-medium
                                            line-clamp-2
                                        "
                                    >
                                        {
                                            item.title
                                        }
                                    </h3>

                                    <p
                                        className="
                                            text-green-600
                                            font-semibold
                                            mt-1
                                        "
                                    >
                                        $
                                        {
                                            item.price
                                        }
                                    </p>

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            mt-2
                                        "
                                    >
                                        <button
                                            onClick={() =>
                                                decreaseQuantity(
                                                    item.id
                                                )
                                            }
                                            className="
                                                w-8
                                                h-8
                                                border
                                                rounded
                                            "
                                        >
                                            -
                                        </button>

                                        <span>
                                            {
                                                item.quantity
                                            }
                                        </span>

                                        <button
                                            onClick={() =>
                                                increaseQuantity(
                                                    item.id
                                                )
                                            }
                                            className="
                                                w-8
                                                h-8
                                                border
                                                rounded
                                            "
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={() =>
                                        removeFromCart(
                                            item.id
                                        )
                                    }
                                    className="
                                        text-red-500
                                        hover:text-red-700
                                    "
                                >
                                    <Trash2
                                        size={18}
                                    />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div
                        className="
                            p-4
                            border-t
                            dark:border-gray-700
                        "
                    >
                        <div
                            className="
                                flex
                                justify-between
                                mb-4
                            "
                        >
                            <span className="font-medium">
                                Total
                            </span>

                            <span
                                className="
                                    font-bold
                                    text-lg
                                "
                            >
                                $
                                {total.toFixed(
                                    2
                                )}
                            </span>
                        </div>

                        <button
                            onClick={
                                handleCheckout
                            }
                            className="
                                w-full
                                py-3
                                rounded-lg
                                bg-green-600
                                text-white
                                hover:bg-green-700
                                transition
                                font-medium
                            "
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;