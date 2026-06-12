import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { FilterContextType } from "../types/FilterContextType";

interface FilterProviderProps {
    children: ReactNode;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({
    children,
}: FilterProviderProps) => {

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
    const [keyword, setKeyword] = useState<string>('');

    return <FilterContext.Provider value={{
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyword
    }}>
        {children}
    </FilterContext.Provider>
};

export const useFilter = () => {
    const context = useContext(FilterContext)

    if (context === undefined) {
        throw new Error("useFilter must be used within a FilterProvider")
    }

    return context;
}