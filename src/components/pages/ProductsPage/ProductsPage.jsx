import React from 'react';
import ProductList from "./ProductsList/ProductsList";
import {useGetProductsQuery} from "../../../api/productsApi";

const ProductsPage = () => {
    const { data: products, error, isLoading, refetch } = useGetProductsQuery();

    if (isLoading) return <p>Завантаження...</p>;
    if (error) return <p>Сталася помилка: {error.message}</p>;

    return (
        <div>
            <h1>Огляд товарів</h1>
            <ProductList products={products} refetch={refetch}/>
        </div>
    );
};

export default ProductsPage;