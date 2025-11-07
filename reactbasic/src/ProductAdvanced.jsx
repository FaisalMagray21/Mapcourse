import React, { useEffect, useState } from "react";
import { db } from "./db";

export default function ProductAdvanced() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    categoryId: "",
    price: "",
    quantity: "",
    description: "",
    image: "" 
  });
  const [editId, setEditId] = useState(null);

  // Load data
  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    const allProducts = await db.products.toArray();
    const allCategories = await db.categories.toArray();

    // Join category name
    const joined = allProducts.map((p) => ({
      ...p,
      categoryName:
        allCategories.find((c) => c.id === p.categoryId)?.name || "N/A",
    }));

    setProducts(joined);
    setCategories(allCategories);
  }

  // Convert image file to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, image: reader.result }); // Base64 image string
    };
    reader.readAsDataURL(file);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const { name, categoryId, price, quantity, description, image } = form;
    if (!name || !categoryId || !price || !quantity || !image)
      return alert("Please fill all fields and select an image!");

    const productData = {
      name,
      categoryId: parseInt(categoryId),
      price: parseFloat(price),
      quantity: parseInt(quantity),
      description,
      image
    };

    if (editId === null) {
      await db.products.add(productData);
      alert("Product added successfully!");
    } else {
      await db.products.update(editId, productData);
      alert("Product updated successfully!");
      setEditId(null);
    }

    setForm({
      name: "",
      categoryId: "",
      price: "",
      quantity: "",
      description: "",
      image: ""
    });
    loadAll();
  }

  async function editProduct(id) {
    const product = await db.products.get(id);
    setForm(product);
    setEditId(id);
  }

  async function deleteProduct(id) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await db.products.delete(id);
      loadAll();
    }
  }

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h2>Product Management with Image (React + Dexie)</h2>

      {/* Product Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        /><br /><br />

        <select
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select><br /><br />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        /><br /><br />

        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        /><br /><br />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea><br /><br />

        {/*  Image Upload */}
        <input type="file" accept="image/*" onChange={handleImageChange} required={!editId} />
        {form.image && (
          <div>
            <p>Preview:</p>
            <img
              src={form.image}
              alt="preview"
              width="100"
              height="100"
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
          </div>
        )}
        <br />

        <button type="submit">
          {editId === null ? "Add Product" : "Update Product"}
        </button>
        {editId !== null && (
          <button
            type="button"
            onClick={() => {
              setForm({
                name: "",
                categoryId: "",
                price: "",
                quantity: "",
                description: "",
                image: ""
              });
              setEditId(null);
            }}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Product Table */}
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead style={{ backgroundColor: "#f3f3f3" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price (PKR)</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.categoryName}</td>
                <td>{p.price}</td>
                <td>{p.quantity}</td>
                <td>{p.description}</td>
                <td>
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      width="80"
                      height="80"
                      style={{ objectFit: "cover", borderRadius: 8 }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>
                  <button onClick={() => editProduct(p.id)}>Edit</button>{" "}
                  <button onClick={() => deleteProduct(p.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" align="center">No products found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
