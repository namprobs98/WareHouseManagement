import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchListProduct = () => {
    fetch("http://localhost:4000/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "GET____");
        setProducts(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddProduct = () => {
    const randomId = Date.now();
    const newProduct = {
      description: null,
      exportDate: null,
      id: randomId,
      importDate: null,
      location: null,
      name: null,
      price: null,
      quantity: null,
      status: null,
      supplier: null,
      type: null,
    };
    const newListProduct = [...products, newProduct];
    // Chon 1 trong 2 cach
    // const newIProduct = products.push(newIProduct)
    setProducts(newListProduct);
  };

  const handleSubmitProduct = () => {
    fetch("http://localhost:4000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "POST____");
        setProducts(data.products);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchListProduct();
  }, []);

  useEffect(() => {
    if (products) console.log(products, "_____________");
  }, [products]);

  return (
    <div>
      <div>
        <h2> Product List </h2>
        <button onClick={handleAddProduct}>Add</button>
        <button onClick={handleSubmitProduct}>Submit</button>
      </div>

      <Table striped bordered hover>
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Description</th>
            <th>Type</th>
            <th>Import Date</th>
            <th>Export Date</th>
            <th>Supplier</th>
            <th>Status</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price} VND</td>
              <td>{product.description}</td>
              <td>{product.type}</td>
              <td>{product.importDate}</td>
              <td>{product.exportDate} </td>
              <td>{product.supplier}</td>
              <td>{product.status}</td>
              <td>{product.location}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductList;
