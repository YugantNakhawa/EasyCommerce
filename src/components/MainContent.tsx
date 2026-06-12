import { useEffect, useMemo, useState } from "react";
import { Tally3 } from "lucide-react";
import { useFilter } from "../context/FilterContext";
import type { Product } from "../types/Product";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import ProductDetailsModal from "../modals/ProductDetailsModal";
import { BASE_API } from "../apis/baseapi";
import ProductSkeleton from "./ProductSkeleton";
import { filterLabels } from "../sampleData/filterLabels";

interface ProductResponse {
    products: Product[];
}

const MainContent = () => {
    const {
        searchQuery,
        selectedCategory,
        minPrice,
        maxPrice,
        keyword,
    } = useFilter();

    const [products, setProducts] = useState<Product[]>([]);
    const [filter, setFilter] = useState("all");
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `${BASE_API}?limit=100`
                );

                const data: ProductResponse =
                    await response.json();

                setProducts(data.products);
            } catch (error) {
                console.error(
                    "Error fetching products:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [
        searchQuery,
        selectedCategory,
        minPrice,
        maxPrice,
        keyword,
        filter,
    ]);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Search Filter
        if (searchQuery.trim()) {
            result = result.filter((product) =>
                product.title
                    .toLowerCase()
                    .includes(
                        searchQuery.toLowerCase()
                    )
            );
        }

        // Category Filter
        if (selectedCategory) {
            result = result.filter(
                (product) =>
                    product.category ===
                    selectedCategory
            );
        }

        // Keyword Filter
        if (keyword) {
            result = result.filter(
                (product) =>
                    product.title
                        .toLowerCase()
                        .includes(
                            keyword.toLowerCase()
                        ) ||
                    product.description
                        .toLowerCase()
                        .includes(
                            keyword.toLowerCase()
                        )
            );
        }

        // Min Price
        if (minPrice !== undefined) {
            result = result.filter(
                (product) =>
                    product.price >= minPrice
            );
        }

        // Max Price
        if (maxPrice !== undefined) {
            result = result.filter(
                (product) =>
                    product.price <= maxPrice
            );
        }

        // Sorting
        switch (filter) {
            case "low-high":
                result.sort(
                    (a, b) => a.price - b.price
                );
                break;

            case "high-low":
                result.sort(
                    (a, b) => b.price - a.price
                );
                break;

            case "a-z":
                result.sort((a, b) =>
                    a.title.localeCompare(
                        b.title
                    )
                );
                break;

            case "z-a":
                result.sort((a, b) =>
                    b.title.localeCompare(
                        a.title
                    )
                );
                break;

            default:
                break;
        }

        return result;
    }, [
        products,
        searchQuery,
        selectedCategory,
        minPrice,
        maxPrice,
        keyword,
        filter,
    ]);

    const totalPages = Math.ceil(
        filteredProducts.length / itemsPerPage
    );

    const startIndex =
        (currentPage - 1) * itemsPerPage;

    const currentProducts =
        filteredProducts.slice(
            startIndex,
            startIndex + itemsPerPage
        );

    return (
        <section
            className="
                flex-1
                p-5
                min-h-screen
                bg-gray-50
                text-black
                dark:bg-gray-950
                dark:text-white
            "
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                    Products
                </h2>

                {/* Sort Dropdown */}
                <div className="relative">
                    <button
                        onClick={() =>
                            setDropDownOpen(
                                (prev) => !prev
                            )
                        }
                        className="
                            border
                            dark:border-gray-700
                            px-4
                            py-2
                            rounded-full
                            flex
                            items-center
                            gap-2
                        "
                    >
                        <Tally3 size={18} />
                        {filterLabels[filter]}
                    </button>

                    {dropDownOpen && (
                        <div
                            className="
                                absolute
                                right-0
                                mt-2
                                w-48
                                rounded
                                border
                                shadow-md
                                z-20
                                bg-white
                                dark:bg-gray-800
                                dark:text-white
                                dark:border-gray-700
                            "
                        >
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => {
                                    setFilter(
                                        "low-high"
                                    );
                                    setDropDownOpen(
                                        false
                                    );
                                }}
                            >
                                Price: Low → High
                            </button>

                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => {
                                    setFilter(
                                        "high-low"
                                    );
                                    setDropDownOpen(
                                        false
                                    );
                                }}
                            >
                                Price: High → Low
                            </button>

                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => {
                                    setFilter(
                                        "a-z"
                                    );
                                    setDropDownOpen(
                                        false
                                    );
                                }}
                            >
                                Name A → Z
                            </button>

                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => {
                                    setFilter(
                                        "z-a"
                                    );
                                    setDropDownOpen(
                                        false
                                    );
                                }}
                            >
                                Name Z → A
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Product Count */}
            <p className="mb-4 text-gray-600 dark:text-gray-400">
                {filteredProducts.length} products found
            </p>

            {/* Loading */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))}
                </div>
            ) : currentProducts.length === 0 ? (
                <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                    No products found.
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentProducts.map(
                            (product) => (
                                <ProductCard
                                    key={
                                        product.id
                                    }
                                    product={
                                        product
                                    }
                                    onSelect={
                                        setSelectedProduct
                                    }
                                />
                            )
                        )}
                    </div>

                    <Pagination
                        currentPage={
                            currentPage
                        }
                        totalPages={
                            totalPages
                        }
                        onPageChange={
                            setCurrentPage
                        }
                    />
                </>
            )}

            {/* Product Modal */}
            <ProductDetailsModal
                product={selectedProduct}
                products={products}
                onProductSelect={setSelectedProduct}
                onClose={() =>
                    setSelectedProduct(null)
                }
            />
        </section>
    );
};

export default MainContent;