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

      resetForm();

      fetchProducts();

    } catch (error) {
      console.log("Error:", error);
    }
  };


  // RESET FORM
  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      category: "",
      image: "",
      description: ""
    });

    setEditingId(null);
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

    window.scrollTo({
      top: 0,
      behavior: "smooth"
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

      {/* HEADER */}
      <div className="admin-header">
        <span>ADMIN PANEL</span>

        <h1>Product Management</h1>

        <p>
          Create, update and manage your store products.
        </p>
      </div>


      {/* CREATE / EDIT FORM */}
      <div className="admin-form-card">

        <div className="form-heading">
          <span className="form-label">
            {editingId ? "UPDATE PRODUCT" : "PRODUCT MANAGEMENT"}
          </span>

          <h2>
            {editingId
              ? "Edit Product"
              : "Add New Product"}
          </h2>

          <p>
            {editingId
              ? "Update the product information below."
              : "Enter the details to add a new product."}
          </p>
        </div>


        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Product Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>


          <div className="form-group">
            <label>Price</label>

            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
            />
          </div>


          <div className="form-group">
            <label>Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Category
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


          <div className="form-group">
            <label>Image URL</label>

            <input
              type="text"
              name="image"
              placeholder="Paste product image URL"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>


          <div className="form-group full-width">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>


          <div className="form-buttons">

            <button
              type="submit"
              className="save-btn"
            >
              {editingId
                ? "Update Product"
                : "Create Product"}
            </button>


            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </div>


      {/* PRODUCT LIST */}
      <div className="admin-products">

        <div className="products-heading">

          <div>
            <span>STORE INVENTORY</span>

            <h2>Products</h2>
          </div>

          <p>
            {products.length}{" "}
            {products.length === 1
              ? "product"
              : "products"}
          </p>

        </div>


        <div className="admin-product-grid">

          {products.map((product) => (

            <div
              className="admin-product-card"
              key={product._id}
            >

              <div className="admin-product-image">

                <img
                  src={product.image}
                  alt={product.name}
                />

                <span>
                  {product.category}
                </span>

              </div>


              <div className="admin-product-info">

                <h3>
                  {product.name}
                </h3>

                <p className="admin-price">
                  ₹{product.price}
                </p>

                <p className="admin-description">
                  {product.description}
                </p>


                <div className="admin-actions">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(product)
                    }
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(product._id)
                    }
                  >
                    🗑️ Delete
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