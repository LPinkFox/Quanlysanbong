import React from 'react';
import Navbar from '../components/Navbar';
import Products from '../Products';
import Product from './Product';
import "./shop.css";

const Shop = () => {
    return (
        <>
            <Navbar />
            <div className='my-shop'>
                <div className="my-products">
                    {Products.map((product) => {
                        return <Product data={product} key={product.id}  />;
                    })}
                </div>
            </div>
        </>
    );
}

export default Shop;
