import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ProductList = ({ products, setProducts }) => {
  const [newProduct, setNewProduct] = useState({
    description: "",
    exportDate: "",
    importDate: "",
    location: "",
    name: "",
    price: "",
    quantity: "",
    status: "",
    supplier: "",
    type: "",
  });

  const [newProducts, setNewProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  //Hàm handle form input khi ấn nút add
  const handleAddProduct = () => {
    // Kiểm tra trường trống thì báo ---> alert
    if (!newProduct.name || !newProduct.quantity || !newProduct.price) {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm.");
      return;
    }

    //Tạo product mới gán id random
    const productWithId = { ...newProduct, id: Date.now().toString() };
    setNewProducts((prevProducts) => [...prevProducts, productWithId]);
    setProducts((prevProducts) => [...prevProducts, productWithId]); // Cập nhật danh sách sản phẩm

    // Reset input
    setNewProduct({
      description: "",
      exportDate: "",
      importDate: "",
      location: "",
      name: "",
      price: "",
      quantity: "",
      status: "",
      supplier: "",
      type: "",
    });
  };
  // hàm handle nút submit
  const handleSubmitProduct = () => {
    // Gửi từng product lên server
    newProducts.forEach((product) => {
      fetch("http://localhost:4000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "POST____");
          // Xóa sản phẩm đã gửi từ newProducts
          setNewProducts((prev) => prev.filter((p) => p.id !== product.id));
        })
        .catch((err) => {
          console.error(err);
        });
    });
    alert("Thêm sản phẩm thành công");

    // Reset input
    setNewProduct({
      description: "",
      exportDate: "",
      importDate: "",
      location: "",
      name: "",
      price: "",
      quantity: "",
      status: "",
      supplier: "",
      type: "",
    });
  };

  //Hàm handle khi ấn edit
  const handleEditProduct = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  //Hàm handle khi ấn delete
  const handleDeleteProduct = (product) => {
    setProductToDelete(product); // Lưu sản phẩm cần xóa
    setShowDeleteModal(true); // Hiện modal xác nhận
  };

  const confirmDeleteProduct = () => {
    if (productToDelete) {
      // Gửi yêu cầu xóa lên server
      fetch(`http://localhost:4000/products/${productToDelete.id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            // Cập nhật lại danh sách sản phẩm
            setProducts((prev) =>
              prev.filter((product) => product.id !== productToDelete.id)
            );
            alert("Xóa sản phẩm thành công");
          }
          setShowDeleteModal(false); // Đóng modal xác nhận
        })
        .catch((err) => {
          console.error(err);
          alert("Có lỗi xảy ra khi xóa sản phẩm.");
        });
    }
  };

  const handleSaveEdit = () => {
    fetch(`http://localhost:4000/products/${editProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        // Cập nhật lại danh sách sản phẩm
        setProducts((prev) =>
          prev.map((product) =>
            product.id === editProduct.id ? editProduct : product
          )
        );
        setShowModal(false);
        setEditProduct(null);
      })
      .catch((err) => {
        console.error(err);
        alert("lỗi" + err);
      });
  };

  return (
    <div className="w-100">
      <div>
        <div className="text-center bg-info text-white p-2 mt-2 mb-2">
          <h2> Product List </h2>
        </div>
        {/* Button add và submit */}
        <div>
          <Button
            className="text-white add-submit-button"
            onClick={handleAddProduct}
          >
            Add
          </Button>
          <Button
            className="text-white m-3 add-submit-button"
            onClick={handleSubmitProduct}
          >
            Submit
          </Button>
        </div>
      </div>

      {/* Form thêm sản phẩm */}
      <div className="input-row">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) =>
            setNewProduct({ ...newProduct, quantity: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price (VND)"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
        <select
          value={newProduct.type}
          onChange={(e) =>
            setNewProduct({ ...newProduct, type: e.target.value })
          }
        >
          <option value="">Select Type</option>
          <option value="Cơ">Cơ</option>
          <option value="Ánh sáng">Ánh sáng</option>
          <option value="Pin">Pin</option>
        </select>
        <input
          type="date"
          placeholder="Import Date"
          value={newProduct.importDate}
          onChange={(e) =>
            setNewProduct({ ...newProduct, importDate: e.target.value })
          }
        />
        <input
          type="date"
          placeholder="Export Date"
          value={newProduct.exportDate}
          onChange={(e) =>
            setNewProduct({ ...newProduct, exportDate: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Supplier"
          value={newProduct.supplier}
          onChange={(e) =>
            setNewProduct({ ...newProduct, supplier: e.target.value })
          }
        />
        <select
          value={newProduct.status}
          onChange={(e) =>
            setNewProduct({ ...newProduct, status: e.target.value })
          }
        >
          <option value="">Select Status</option>
          <option value="Available">Available</option>
          <option value="Disable">Disable</option>
        </select>
        <input
          type="text"
          placeholder="Location"
          value={newProduct.location}
          onChange={(e) =>
            setNewProduct({ ...newProduct, location: e.target.value })
          }
        />
      </div>

      {/* Table hiển thị sản phẩm */}
      <Table striped bordered hover>
        <thead className="table-info">
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price (VND)</th>
            <th>Description</th>
            <th>Type</th>
            <th>Import Date</th>
            <th>Export Date</th>
            <th>Supplier</th>
            <th>Status</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.type}</td>
              <td>{product.importDate}</td>
              <td>{product.exportDate}</td>
              <td>{product.supplier}</td>
              <td>{product.status}</td>
              <td>{product.location}</td>
              <td>
                <div className="d-flex">
                  <Button onClick={() => handleEditProduct(product)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    onClick={() => handleDeleteProduct(product)}
                    variant="danger"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal xóa */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa sản phẩm này?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={confirmDeleteProduct}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label>Product Name </label>
              <input
                type="text"
                className="form-control"
                placeholder="Product Name"
                value={editProduct?.name || ""}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, name: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label>Quantity</label>
              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                value={editProduct?.quantity || ""}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, quantity: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label>Price (VND)</label>
              <input
                type="number"
                className="form-control"
                placeholder="Price (VND)"
                value={editProduct?.price || ""}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={editProduct?.description || ""}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-3">
              <label>Type</label>
              <select
                className="form-control"
                value={editProduct?.type || ""}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, type: e.target.value })
                }
              >
                <option value="">Chọn loại</option>
                <option value="Cơ">Cơ</option>
                <option value="Ánh sáng">Ánh sáng</option>
                <option value="Pin">Pin</option>
              </select>
            </div>

            <div className="mb-3">
              <label>Import Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="Import Date"
                value={editProduct?.importDate || ""}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, importDate: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label>Export Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="Export Date"
                value={editProduct?.exportDate || ""}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, exportDate: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label>Supplier</label>
              <input
                type="text"
                className="form-control"
                placeholder="Supplier"
                value={editProduct?.supplier || ""}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, supplier: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label>Status</label>
              <select
                className="form-control"
                value={editProduct?.status || ""}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, status: e.target.value })
                }
              >
                <option value="">Select status</option>
                <option value="Available">Available</option>
                <option value="Disable">Disable</option>
              </select>
            </div>

            <div className="mb-3">
              <label>Location</label>
              <input
                type="text"
                className="form-control"
                placeholder="Location"
                value={editProduct?.location || ""}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, location: e.target.value })
                }
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductList;
