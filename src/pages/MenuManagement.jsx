import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/MenuManagement.css";

const MenuManagement = () => {
  const {
    menuItems,
    categories,
    addMenuItem,
    editMenuItem,
    deleteMenuItem,
    addCategory,
    deleteCategory,
  } = useContext(AuthContext);

  const [newItem, setNewItem] = useState({ name: "", price: "", category: "" });
  const [editItem, setEditItem] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  const handleAddMenu = () => {
    if (!newItem.name || !newItem.price || !newItem.category) {
      alert("모든 필드를 입력하세요.");
      return;
    }
    addMenuItem(newItem);
    setNewItem({ name: "", price: "", category: "" });
  };

  const handleEditMenu = () => {
    if (!editItem.name || !editItem.price || !editItem.category) {
      alert("모든 필드를 입력하세요.");
      return;
    }
    editMenuItem(editItem.id, editItem);
    setEditItem(null);
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      alert("카테고리 이름을 입력하세요.");
      return;
    }
    addCategory(newCategory.trim());
    setNewCategory("");
  };

  return (
    <div className="container">
      <h1>메뉴 관리</h1>

      {/* 카테고리 관리 */}
      <div className="section">
        <h2>카테고리 관리</h2>
        <input
          type="text"
          placeholder="새 카테고리 이름"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>추가</button>
        <div>
          {categories.map((category) => (
            <div key={category}>
              {category}
              <button onClick={() => deleteCategory(category)}>삭제</button>
            </div>
          ))}
        </div>
      </div>

      {/* 메뉴 추가 */}
      <div className="section">
        <h2>새 메뉴 추가</h2>
        <input
          type="text"
          placeholder="메뉴 이름"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="가격"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
        <select
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        >
          <option value="">카테고리 선택</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={handleAddMenu}>추가</button>
      </div>

      {/* 메뉴 수정 */}
      {editItem && (
        <div className="section">
          <h2>메뉴 수정</h2>
          <input
            type="text"
            placeholder="메뉴 이름"
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="가격"
            value={editItem.price}
            onChange={(e) =>
              setEditItem({ ...editItem, price: e.target.value })
            }
          />
          <select
            value={editItem.category}
            onChange={(e) =>
              setEditItem({ ...editItem, category: e.target.value })
            }
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button onClick={handleEditMenu}>수정</button>
          <button onClick={() => setEditItem(null)}>취소</button>
        </div>
      )}

      {/* 현재 메뉴 */}
      <div className="section">
        <h2>현재 메뉴</h2>
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item">
            <span>
              {item.name} - {item.price}원 ({item.category})
            </span>
            <div>
              <button onClick={() => deleteMenuItem(item.id)}>삭제</button>
              <button onClick={() => setEditItem(item)}>수정</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManagement;
