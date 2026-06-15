import { useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";

import {
    Menu,
    ShoppingCart,
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import BackToTop from "./components/BackToTop";
import CartDrawer from "./components/CartDrawer";
import CheckoutPage from "./pages/CheckoutPage";
import { useCart } from "./context/CartContext";

export default function App() {
    const [cartOpen, setCartOpen] =
        useState(false);

    const [
        mobileFilterOpen,
        setMobileFilterOpen,
    ] = useState(false);

    const { cartItems } = useCart();

    const totalCartItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <Router>
            <div
                className="
                    flex
                    min-h-screen
                    bg-gray-50
                    dark:bg-gray-950
                "
            >
                {/* Desktop Sidebar */}
                <div className="hidden lg:block">
                    <Sidebar
                        onCartOpen={() =>
                            setCartOpen(true)
                        }
                    />
                </div>

                {/* Mobile Navbar */}
                <div
                    className="
                        fixed
                        top-0
                        left-0
                        right-0
                        z-30
                        lg:hidden
                        bg-white
                        dark:bg-gray-900
                        border-b
                        border-gray-200
                        dark:border-gray-800
                        px-4
                        py-3
                        flex
                        items-center
                        justify-between
                    "
                >
                    <button
                        onClick={() =>
                            setMobileFilterOpen(
                                true
                            )
                        }
                        className="
                            p-2
                            rounded-lg
                            hover:bg-gray-100
                            dark:hover:bg-gray-800
                        "
                    >
                        <Menu size={24} />
                    </button>

                    <h1
                        className="
                            text-lg
                            font-bold
                        "
                    >
                        EasyCommerce
                    </h1>

                    <button
                        onClick={() =>
                            setCartOpen(true)
                        }
                        className="
                            relative
                            p-2
                            rounded-lg
                            hover:bg-gray-100
                            dark:hover:bg-gray-800
                        "
                    >
                        <ShoppingCart
                            size={22}
                        />

                        {totalCartItems >
                            0 && (
                            <span
                                className="
                                    absolute
                                    -top-1
                                    -right-1
                                    min-w-[18px]
                                    h-[18px]
                                    px-1
                                    rounded-full
                                    bg-red-500
                                    text-white
                                    text-[10px]
                                    flex
                                    items-center
                                    justify-center
                                    font-semibold
                                "
                            >
                                {
                                    totalCartItems
                                }
                            </span>
                        )}
                    </button>
                </div>

                {/* Mobile Sidebar Drawer */}
                {mobileFilterOpen && (
                    <>
                        <div
                            className="
                                fixed
                                inset-0
                                bg-black/50
                                z-40
                                lg:hidden
                            "
                            onClick={() =>
                                setMobileFilterOpen(
                                    false
                                )
                            }
                        />

                        <div
                            className="
                                fixed
                                top-0
                                left-0
                                h-full
                                w-72
                                z-50
                                lg:hidden
                                overflow-y-auto
                            "
                        >
                            <Sidebar
                                onCartOpen={() =>
                                    setCartOpen(
                                        true
                                    )
                                }
                            />
                        </div>
                    </>
                )}

                {/* Main Content */}
                <main
                    className="
                        flex-1
                        pt-16
                        lg:pt-0
                        bg-gray-50
                        dark:bg-gray-950
                    "
                >
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <MainContent />
                            }
                        />

                        <Route
                            path="/checkout"
                            element={
                                <CheckoutPage />
                            }
                        />
                    </Routes>
                </main>

                {/* Back To Top */}
                <BackToTop />

                {/* Cart Drawer */}
                <CartDrawer
                    isOpen={cartOpen}
                    onClose={() =>
                        setCartOpen(false)
                    }
                />
            </div>
        </Router>
    );
}