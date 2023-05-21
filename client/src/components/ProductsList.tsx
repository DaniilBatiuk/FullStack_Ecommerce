import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../types/types";
import "../styles/ProductList.scss";
import axios from "../axios";




const ProductsList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get('/product')
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.warn(err);
            });
    }, []);

    return (
        <section className="products-proud">
            <div className="products-proud__container">
                <div className="products-proud__items">
                    {products.map((elem) =>
                        <ProductCard key={elem._id} product={elem} />
                    )}
                </div>
            </div>
        </section>
    );
}

export default ProductsList;