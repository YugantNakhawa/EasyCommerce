import { useEffect, useState } from "react";
import { Sun, Moon, ShoppingCart, } from "lucide-react";
import { useFilter } from "../context/FilterContext";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { keywordList } from "../sampleData/keywordList";
import type { Product } from "../types/Product";
import { BASE_API } from "../apis/baseapi";
import { Link } from "react-router-dom";

interface FetchResponse {
    products: Product[];
}

interface SidebarProps {
    onCartOpen: () => void;
}

const Sidebar = ({
    onCartOpen,
}: SidebarProps) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [loadingCategories, setLoadingCategories] =
        useState(true);
    const { darkMode, toggleTheme } = useTheme();
    const { cartItems } = useCart();
    const {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyword,
    } = useFilter();

    const totalCartItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const handleMinPriceChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;

        setMinPrice(
            value ? parseFloat(value) : undefined
        );
    };

    const handleMaxPriceChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;

        setMaxPrice(
            value ? parseFloat(value) : undefined
        );
    };

    const handleReset = () => {
        setSearchQuery("");
        setSelectedCategory("");
        setMinPrice(undefined);
        setMaxPrice(undefined);
        setKeyword("");
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoadingCategories(true);

                const response = await fetch(
                    BASE_API
                );

                const data: FetchResponse =
                    await response.json();

                const uniqueCategories =
                    Array.from(
                        new Set(
                            data.products.map(
                                (product) =>
                                    product.category
                            )
                        )
                    );

                setCategories(
                    uniqueCategories.sort()
                );
            } catch (error) {
                console.error(
                    "Error fetching categories:",
                    error
                );
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <aside
            className="
                w-72
                min-h-screen
                overflow-y-auto
                bg-white
                dark:bg-gray-900
                dark:text-white
                border-r
                border-gray-200
                dark:border-gray-800
                p-5
            "
        >
            {/* Logo */}
            <Link to="/" className="block mb-8">
                <h1 className="text-3xl font-bold text-center">
                    EasyCommerce
                </h1>
            </Link>

            {/* Theme + Cart */}
            <div className="flex gap-3 mb-6">
                <button
                    onClick={toggleTheme}
                    className="
                        flex-1
                        p-3
                        border
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        gap-2
                        dark:border-gray-700
                        hover:bg-gray-100
                        dark:hover:bg-gray-800
                        transition
                    "
                >
                    {darkMode ? (
                        <>
                            <Sun size={18} />
                            Light Mode
                        </>
                    ) : (
                        <>
                            <Moon size={18} />
                            Dark Mode
                        </>
                    )}
                </button>

                <button
                    onClick={onCartOpen}
                    className="
                        relative
                        p-3
                        border
                        rounded-lg
                        dark:border-gray-700
                        hover:bg-gray-100
                        dark:hover:bg-gray-800
                        transition
                    "
                >
                    <ShoppingCart size={20} />

                    {totalCartItems > 0 && (
                        <span
                            className="
                                absolute
                                -top-2
                                -right-2
                                min-w-[20px]
                                h-5
                                px-1
                                rounded-full
                                bg-red-500
                                text-white
                                text-xs
                                flex
                                items-center
                                justify-center
                                font-semibold
                            "
                        >
                            {totalCartItems}
                        </span>
                    )}
                </button>
            </div>

            {/* Search */}
            <section className="mb-6">
                <h2 className="font-semibold mb-3">
                    Search
                </h2>

                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) =>
                        setSearchQuery(
                            e.target.value
                        )
                    }
                    className="
                        w-full
                        px-3
                        py-2
                        rounded-lg
                        border
                        bg-white
                        dark:bg-gray-800
                        dark:border-gray-700
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                    "
                />
            </section>

            {/* Price */}
            <section className="mb-6">
                <h2 className="font-semibold mb-3">
                    Price Range
                </h2>

                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={minPrice ?? ""}
                        onChange={
                            handleMinPriceChange
                        }
                        className="
                            w-full
                            px-3
                            py-2
                            rounded-lg
                            border
                            bg-white
                            dark:bg-gray-800
                            dark:border-gray-700
                        "
                    />

                    <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice ?? ""}
                        onChange={
                            handleMaxPriceChange
                        }
                        className="
                            w-full
                            px-3
                            py-2
                            rounded-lg
                            border
                            bg-white
                            dark:bg-gray-800
                            dark:border-gray-700
                        "
                    />
                </div>
            </section>

            {/* Categories */}
            <section className="mb-6">
                <h2 className="font-semibold mb-3">
                    Categories
                </h2>

                {loadingCategories ? (
                    <p className="text-sm text-gray-500">
                        Loading...
                    </p>
                ) : (
                    <div className="space-y-2">
                        {categories.map(
                            (category) => (
                                <label
                                    key={category}
                                    className="flex items-center cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={
                                            selectedCategory ===
                                            category
                                        }
                                        onChange={() =>
                                            setSelectedCategory(
                                                category
                                            )
                                        }
                                        className="mr-2"
                                    />

                                    <span className="capitalize">
                                        {category}
                                    </span>
                                </label>
                            )
                        )}
                    </div>
                )}
            </section>

            {/* Keywords */}
            <section className="mb-6">
                <h2 className="font-semibold mb-3">
                    Keywords
                </h2>

                <div className="flex flex-wrap gap-2">
                    {keywordList.map((item) => (
                        <button
                            key={item}
                            onClick={() =>
                                setKeyword(
                                    keyword === item
                                        ? ""
                                        : item
                                )
                            }
                            className={`
                                    px-3
                                    py-2
                                    rounded-full
                                    border
                                    text-sm
                                    transition
                                    flex
                                    items-center
                                    gap-1
                                    ${keyword === item
                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                }
    `}
                        >
                            <span>{item}</span>

                            {keyword === item && (
                                <span className="font-bold">
                                    ✕
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* Reset */}
            <button
                onClick={handleReset}
                className="
                    w-full
                    py-3
                    rounded-lg
                    bg-red-600
                    text-white
                    hover:bg-red-700
                    transition
                    font-medium
                "
            >
                Reset Filters
            </button>
        </aside>
    );
};

export default Sidebar;