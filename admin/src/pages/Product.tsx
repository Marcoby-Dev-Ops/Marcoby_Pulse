import React from "react";
import { products } from "./Products";
import { useParams } from "react-router-dom";

const Product = () => {
	const { productId } = useParams();

	const product = products.find((product) => product.id === productId);
	return <div>{product?.name}</div>;
};

export default Product;
