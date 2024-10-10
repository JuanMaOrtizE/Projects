import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

// const initialItems = [
//   { id: 1, description: " Passports", quantity: 2, packed: true },
//   { id: 2, description: " Socks", quantity: 12, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function hanldeDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleOnDeleteAll() {
    const confirmar = window.confirm(
      `Estás seguro de eliminar todos los items?`
    );

    if (confirmar) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        item={items}
        onDeleteItems={hanldeDeleteItem}
        onToggleItem={handleToggleItem}
        onDeleteAll={handleOnDeleteAll}
      />
      <Stats items={items} />
    </div>
  );
}
