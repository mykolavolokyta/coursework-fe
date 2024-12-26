import React, { useState } from 'react';
import ProductList from "./ProductsList/ProductsList";
import { useGetProductsQuery } from "../../../api/productsApi";
import Search from "antd/es/input/Search";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";

const ProductsPage = () => {
    const [search, setSearch] = useState('');
    const { data: products, error, isLoading, refetch } = useGetProductsQuery(search);

    const handleSearch = (value) => {
        setSearch(value);
        refetch();
    };

    if (isLoading) return <LoadingScreen/>;
    if (error) return <p>Сталася помилка: {error.message}</p>;

    return (
        <div>
            <h1>Огляд товарів</h1>
            <Search
                style={{ marginBottom: '10px' }}
                placeholder="Введіть назву, ID або категорію"
                onSearch={handleSearch} // Обробник пошуку
                allowClear
            />
            <ProductList products={products} refetch={refetch} />
        </div>
    );
};

export default ProductsPage;
