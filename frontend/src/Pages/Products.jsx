import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import API_URL from "../Services/api";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const fetchProducts = async () => {
    try {
      let url = `${API_URL}/products`;

      const params = new URLSearchParams();

      if (search) {
        params.append("search", search);
      }

      if (category) {
        params.append("category", category);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);

      const data = await response.json();

      setProducts(data);

    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  return (
  <div className="products-page">
    <h1>All Products</h1>

    <div className="filters">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="shoes">Shoes</option>
      </select>
    </div>

    <div className="product-grid">
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))
      )}
    </div>
  </div>
);
}

export default Products;