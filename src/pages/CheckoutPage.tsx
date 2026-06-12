import { useMemo } from "react";
import { useCart } from "../context/CartContext";
import { DUMMY_IMAGE, RAZORPAY_JS } from "../apis/baseapi";
import { Link } from "react-router-dom";

declare global {
    interface Window {
        Razorpay: any;
    }
}

const CheckoutPage = () => {
    const { cartItems, clearCart } = useCart();

    const subtotal = useMemo(() => {
        return cartItems.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );
    }, [cartItems]);

    const gst = subtotal * 0.18;

    const shipping =
        subtotal > 1000 || subtotal === 0
            ? 0
            : 99;

    const grandTotal =
        subtotal + gst + shipping;

    const loadRazorpayScript = () => {
        return new Promise<boolean>(
            (resolve) => {
                const script =
                    document.createElement(
                        "script"
                    );

                script.src =
                    `${RAZORPAY_JS}`;

                script.onload = () =>
                    resolve(true);

                script.onerror = () =>
                    resolve(false);

                document.body.appendChild(
                    script
                );
            }
        );
    };

    const handlePayment = async () => {
        const loaded =
            await loadRazorpayScript();

        if (!loaded) {
            alert(
                "Failed to load Razorpay"
            );
            return;
        }

        const options = {
            key: import.meta.env
                .VITE_RAZORPAY_KEY_ID,

            amount: Math.round(
                grandTotal * 100
            ),

            currency: "INR",

            name: "Easy Commerce",

            description:
                "Test Payment",

            image:
                `${DUMMY_IMAGE}`,

            handler: function (
                response: any
            ) {
                alert(
                    `Payment Successful\nPayment ID: ${response.razorpay_payment_id}`
                );

                clearCart();
            },

            prefill: {
                name: "Test User",
                email:
                    "test@example.com",
                contact: "9999999999",
            },

            theme: {
                color: "#2563eb",
            },
        };

        const paymentObject =
            new window.Razorpay(
                options
            );

        paymentObject.open();
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">
                Checkout
            </h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-10">
                    <h2 className="text-xl font-semibold mb-4">
                        Your cart is empty
                    </h2>

                    <Link
                        to="/"
                        className="
                            inline-block
                            px-6
                            py-3
                            bg-blue-600
                            text-white
                            rounded-lg
                            font-medium
                            hover:bg-blue-700
                            transition
                        "
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
                        <h2 className="text-xl font-semibold mb-4">
                            Order Summary
                        </h2>

                        {cartItems.map(
                            (item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between border-b py-3"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {
                                                item.title
                                            }
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Qty:
                                            {" "}
                                            {
                                                item.quantity
                                            }
                                        </p>
                                    </div>

                                    <p>
                                        $
                                        {(
                                            item.price *
                                            item.quantity
                                        ).toFixed(
                                            2
                                        )}
                                    </p>
                                </div>
                            )
                        )}

                        <div className="mt-6 space-y-2">
                            <div className="flex justify-between">
                                <span>
                                    Subtotal
                                </span>
                                <span>
                                    $
                                    {subtotal.toFixed(
                                        2
                                    )}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>
                                    GST (18%)
                                </span>
                                <span>
                                    $
                                    {gst.toFixed(
                                        2
                                    )}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>
                                    Shipping
                                </span>
                                <span>
                                    $
                                    {shipping.toFixed(
                                        2
                                    )}
                                </span>
                            </div>

                            <div className="flex justify-between font-bold text-xl border-t pt-4">
                                <span>
                                    Grand Total
                                </span>
                                <span>
                                    $
                                    {grandTotal.toFixed(
                                        2
                                    )}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={
                                handlePayment
                            }
                            className="
                                w-full
                                mt-6
                                py-3
                                rounded-lg
                                bg-green-600
                                text-white
                                hover:bg-green-700
                                transition
                            "
                        >
                            Pay Now
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CheckoutPage;
