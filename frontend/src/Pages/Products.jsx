import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import apiFetch from "../Services/apiFetch";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const fetchProducts = async () => {
    try {
      let url = "/products";

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

      const response = await apiFetch(url);

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

      {/* PAGE HEADER */}

      <div className="products-header">

        <span className="products-label">
          OUR COLLECTION
        </span>

        <h1>Explore Our Products</h1>

        <p>
          Discover quality products across a variety of categories.
        </p>

      </div>


      {/* FILTERS */}

      <div className="filters">

        <div className="search-box">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >

          <option value="">
            All Categories
          </option>

          <option value="Electronics">
            Electronics
          </option>

          <option value="Clothing">
            Clothing
          </option>

          <option value="Shoes">
            Shoes
          </option>

          <option value="Groceries">
            Groceries
          </option>

          <option value="Home Decor">
            Home Decor
          </option>

          <option value="Makeup">
            Makeup
          </option>

          <option value="Furniture">
            Furniture
          </option>

          <option value="Perfumes">
            Perfumes
          </option>

          <option value="Kitchen Appliances">
            Kitchen Appliances
          </option>

          <option value="Watches">
            Watches
          </option>

        </select>

      </div>


      {/* RESULT COUNT */}

      <div className="results-info">

        <span>
          {products.length}{" "}
          {products.length === 1 ? "product" : "products"} found
        </span>

        {(search || category) && (
          <button
            className="clear-filters"
            onClick={() => {
              setSearch("");
              setCategory("");
            }}
          >
            Clear Filters ✕
          </button>
        )}

      </div>


      {/* PRODUCTS */}

      <div className="product-grid">

        {products.length === 0 ? (

          <div className="no-products">

            <div className="no-products-icon">
              🛍️
            </div>

            <h2>No Products Found</h2>

            <p>
              Try changing your search or category filter.
            </p>

          </div>

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


