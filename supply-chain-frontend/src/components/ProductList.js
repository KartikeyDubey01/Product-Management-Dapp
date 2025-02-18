import React from "react";

const ProductList = ({ products }) => {
  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - {product.price} - Owner: {product.owner}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
