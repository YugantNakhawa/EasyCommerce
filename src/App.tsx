import { useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import BackToTop from "./components/BackToTop";
import CartDrawer from "./components/CartDrawer";
import CheckoutPage from "./pages/CheckoutPage";

export default function App() {
    const [cartOpen, setCartOpen] =
        useState(false);

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
                {/* Sidebar */}
                <Sidebar
                    onCartOpen={() =>
                        setCartOpen(true)
                    }
                />

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
                            element={<CheckoutPage/>}
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