import { useEffect, useState } from "react";
import "./style.scss";

function Pagination({ page, setPage, count }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fillItems = () => {
      const array = [];
      const rest = count % 8;
      const nPages = rest == 0 ? parseInt(count / 8) : parseInt(count / 8) + 1;
      for (let index = 1; index <= nPages; index++) {
        array.push(index);
      }
      setItems(array);
    };

    fillItems();
  }, [count]);

  return (
    <div className="pagination">
      {items.map((item) => (
        <div
          onClick={() => setPage(item)}
          key={item}
          className={page == item ? "pagination-page active" : "pagination-page"}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default Pagination;
