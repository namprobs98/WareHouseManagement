import { Form } from "react-bootstrap";
import { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Hàm xử lý khi nhấn phím
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Gọi hàm onSearch khi nhấn Enter
      onSearch(searchTerm);
      setSearchTerm(""); // Reset sau khi nhập
    }
  };

  return (
    <div>
      <div className="bg-info text-white p-2 mt-2 mb-2 rounded">Search</div>
      <div className="d-flex">
        <input
          className="rounded border-info text-primary w-100 search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị
          onKeyDown={handleKeyPress} // Gọi hàm khi nhấn phím
        />
        <button
          className="add-submit-button text-white rounded search"
          onClick={() => {
            onSearch(searchTerm);
            setSearchTerm(""); // Reset sau khi nhập
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

//Component type
const Type = ({ handleType, typeList }) => {
  return (
    <div>
      <div className="bg-info text-white p-2 mt-2 mb-2 rounded">Type</div>
      <div>
        <Form>
          <Form.Check
            type="checkbox"
            name="Cơ tự động"
            label="Cơ tự động"
            checked={typeList.check1}
            onChange={handleType}
          />
          <Form.Check
            type="checkbox"
            name="Năng lượng ánh sáng"
            label="Năng lượng ánh sáng"
            checked={typeList.check2}
            onChange={handleType}
          />
          <Form.Check
            type="checkbox"
            name="Pin"
            label="Pin"
            checked={typeList.check3}
            onChange={handleType}
          />
        </Form>
      </div>
    </div>
  );
};

//Component status
const Status = ({ handleStatus, statusList }) => {
  return (
    <div>
      <div className="bg-info text-white p-2 mt-2 mb-2 rounded">Status</div>
      <Form>
        <Form.Check
          type="checkbox"
          name="Available"
          label="Available"
          checked={statusList.check4}
          onChange={handleStatus}
        />
        <Form.Check
          type="checkbox"
          name="Disable"
          label="Disable"
          checked={statusList.check5}
          onChange={handleStatus}
        />
      </Form>
    </div>
  );
};

const Menu = ({ statusList, typeList, handleStatus, handleType, onSearch }) => {
  return (
    <div>
      <div className="text-center bg-info text-white p-2 mt-2 mb-2">
        <h2>Menu</h2>
      </div>

      <Search onSearch={onSearch} />
      <Type typeList={typeList} handleType={handleType} />
      <Status statusList={statusList} handleStatus={handleStatus} />
    </div>
  );
};

export default Menu;
