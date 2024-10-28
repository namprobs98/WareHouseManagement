import logo from "./logo.svg";
import "./App.css";
import "./components/ProductList";
import ProductList from "./components/ProductList";
import { Container, Row, Col } from "react-bootstrap";
import Menu from "./components/Menu";
import React, { useEffect, useRef, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [arrType, setArrType] = useState([]);
  const [arrStatus, setArrStatus] = useState([]);
  const _allProduct = useRef([]);
  const [searchTerm, setSearchTerm] = useState("");

  //Thuật toán lọc
  const filter = () => {
    //Khi không tích ô nào thì view toàn bộ
    if (arrType.length === 0 && arrStatus.length === 0) {
      setProducts(_allProduct.current);
    }
    //Khi chỉ tích ở Type thì lọc theo Type
    if (arrType.length !== 0 && arrStatus.length === 0) {
      const filterByType = _allProduct.current.filter((e) =>
        arrType.includes(e.type)
      );
      setProducts(filterByType);
    }
    //Khi chỉ tích ở Status thì loc theo Status
    if (arrType.length === 0 && arrStatus.length !== 0) {
      const filterByStatus = _allProduct.current.filter((e) =>
        arrStatus.includes(e.status)
      );
      setProducts(filterByStatus);
    }
    //Khi tích cả 2 thì lọc các phần tử chung theo cả 2
    if (arrType.length !== 0 && arrStatus.length !== 0) {
      const filterByType = _allProduct.current.filter((e) =>
        arrType.includes(e.type)
      );
      const filterByStatus = _allProduct.current.filter((e) =>
        arrStatus.includes(e.status)
      );

      const commonElements = filterByType.filter((itemType) =>
        filterByStatus.some((itemStatus) => itemStatus.id === itemType.id)
      );
      setProducts(commonElements);
    }
  };

  //Effect filter khi thay đổi arrType hoặc arrStatus
  useEffect(() => {
    filter();
  }, [arrType, arrStatus]);

  //Call api get để lấy data từ server
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
        _allProduct.current = data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //Hàm handle Type ở Menu
  const handleType = (e) => {
    const { name } = e.target; // Lấy name trực tiếp từ e.target (cái này để gán vào arrType)
    if (arrType.includes(name)) {
      const _new = arrType.filter((e) => e !== name);
      setArrType(_new);
    } else {
      setArrType([...arrType, name]);
    }
  };

  //Hàm Handle Status ở Menu
  const handleStatus = (e) => {
    const { name } = e.target; // Lấy name trực tiếp từ e.target  (cái này để gán vào arrStatus)
    if (arrStatus.includes(name)) {
      const _new = arrStatus.filter((e) => e !== name);
      setArrStatus(_new);
    } else {
      setArrStatus([...arrStatus, name]);
    }
  };

  //Effect lần đầu
  useEffect(() => {
    fetchListProduct();
  }, []);

  //Hàm handle search ở menu
  const handleSearch = (e) => {
    console.log("Search term:", e);
    setSearchTerm(e);
    search();
  };
  //Hàm search
  const search = () => {
    const searchProducts = _allProduct.current.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description &&
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (product.type &&
          product.type.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.supplier &&
          product.supplier.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.location &&
          product.location.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });

    setProducts(searchProducts);
  };

  useEffect(() => {
    search();
  }, [searchTerm]);

  return (
    <div>
      <div className="text-center bg-info text-white p-2 mt-2 mb-2">
        <h1>Warehouse Management</h1>
      </div>
      <div>
        <Row xs={12}>
          <Col xs={2}>
            <Menu
              handleType={handleType}
              handleStatus={handleStatus}
              typeList={arrType}
              statusList={arrStatus}
              onSearch={handleSearch}
            />
          </Col>
          <Col xs={10}>
            <ProductList products={products} setProducts={setProducts} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
