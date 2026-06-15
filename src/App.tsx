import { useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";

import {
    SlidersHorizontal,
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import BackToTop from "./components/BackToTop";
import CartDrawer from "./components/CartDrawer";
import CheckoutPage from "./pages/CheckoutPage";

export default function App() {
    const [cartOpen, setCartOpen] =
        useState(false);

    const [
        mobileFilterOpen,
        setMobileFilterOpen,
    ] = useState(false);

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

                {/* Mobile Filter Drawer */}
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
                                bg-white
                                dark:bg-gray-900
                                z-50
                                overflow-y-auto
                                lg:hidden
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

                {/* Mobile Filter Button */}
                <button
                    onClick={() =>
                        setMobileFilterOpen(
                            true
                        )
                    }
                    className="
                        fixed
                        bottom-6
                        left-6
                        lg:hidden
                        z-40
                        bg-blue-600
                        text-white
                        p-4
                        rounded-full
                        shadow-lg
                        hover:bg-blue-700
                        transition
                    "
                    aria-label="Open Filters"
                >
                    <SlidersHorizontal
                        size={22}
                    />
                </button>

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