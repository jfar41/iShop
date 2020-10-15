import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';

function ProductDetailPage(props) {
    const product = props.location.state.product;
    return (
        <>
            <h1>Product Details</h1>
            <ProductCard
                key={product._id}
                product={product}
            />
        </>
    );
}

export default ProductDetailPage;