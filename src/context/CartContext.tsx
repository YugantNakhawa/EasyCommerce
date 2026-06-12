import { createContext, useContext, useEffect, useState,} from "react";
import type { ReactNode } from "react";
import type { CartItem } from "../types/CartItem";
import type { Product } from "../types/Product";

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({
    children,
}: CartProviderProps) => {
    const [cartItems, setCartItems] = useState<
        CartItem[]
    >(() => {
        try {
            const storedCart =
                localStorage.getItem("cart");

            return storedCart
                ? JSON.parse(storedCart)
                : [];
        } catch (error) {
            console.error(
                "Failed to load cart from localStorage:",
                error
            );

            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(
                "cart",
                JSON.stringify(cartItems)
            );
        } catch (error) {
            console.error(
                "Failed to save cart:",
                error
            );
        }
    }, [cartItems]);

    const addToCart = (
        product: Product
    ) => {
        setCartItems((prev) => {
            const existingItem =
                prev.find(
                    (item) =>
                        item.id === product.id
                );

            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id
                        ? {
                              ...item,
                              quantity:
                                  item.quantity +
                                  1,
                          }
                        : item
                );
            }

            return [
                ...prev,
                {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail:
                        product.thumbnail,
                    quantity: 1,
                },
            ];
        });
    };

    const removeFromCart = (
        id: number
    ) => {
        setCartItems((prev) =>
            prev.filter(
                (item) => item.id !== id
            )
        );
    };

    const increaseQuantity = (
        id: number
    ) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          quantity:
                              item.quantity + 1,
                      }
                    : item
            )
        );
    };

    const decreaseQuantity = (
        id: number
    ) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? {
                              ...item,
                              quantity:
                                  item.quantity - 1,
                          }
                        : item
                )
                .filter(
                    (item) =>
                        item.quantity > 0
                )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context =
        useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used within a CartProvider"
        );
    }

    return context;
};