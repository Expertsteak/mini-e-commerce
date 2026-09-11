import { useEffect, useState } from "react";
import API_URL from "../Services/api";
import "./AdminProducts.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: ""
  });

  const [editingId, setEditingId] = useState(null);

  // GET PRODUCTS
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);

      const data = await response.json();

      setProducts(data);

    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");

      const url = editingId
        ? `${API_URL}/products/${editingId}`
        : `${API_URL}/products`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert(
        editingId
          ? "Product updated successfully"
          : "Product created successfully"
      );

      setFormData({
        name: "",
        price: "",
        category: "",
        image: "",
        description: ""
      });

      setEditingId(null);

      fetchProducts();

    } catch (error) {
      console.log("Error:", error);
    }
  };

  // EDIT
  const handleEdit = (product) => {
    setEditingId(product._id);

    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description
    });
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(
        `${API_URL}/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Product deleted successfully");

      fetchProducts();

    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
  <div className="admin-page">

    <h1>Admin Product Management</h1>

    {/* Create / Edit Form */}
    <div className="admin-form-card">

      <h2>
        {editingId ? "Edit Product" : "Add New Product"}
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="shoes">Shoes</option>
        </select>

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Product description"
          value={formData.description}
          onChange={handleChange}
        />

        <div className="form-buttons">

          <button type="submit" className="save-btn">
            {editingId ? "Update Product" : "Create Product"}
          </button>

          {editingId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  name: "",
                  price: "",
                  category: "",
                  image: "",
                  description: ""
                });
              }}
            >
              Cancel
            </button>
          )}

        </div>

      </form>
    </div>


    {/* Product List */}
    <div className="admin-products">

      <h2>Products</h2>

      <div className="admin-product-grid">

        {products.map((product) => (

          <div className="admin-product-card" key={product._id}>

            <img
              src={product.image}
              alt={product.name}
            />

            <div className="admin-product-info">

              <h3>{product.name}</h3>

              <p className="admin-category">
                {product.category}
              </p>

              <p className="admin-price">
                ₹{product.price}
              </p>

              <p className="admin-description">
                {product.description}
              </p>

              <div className="admin-actions">

                <button
                  className="edit-btn"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  </div>
);
}

export default AdminProducts;