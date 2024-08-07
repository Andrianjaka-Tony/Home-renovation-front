import { useEffect, useState } from "react";
import { api } from "../../../helpers/api-helper";
import Pagination from "../../../components/pagination";

function list({ updates, setModification }) {
  const [items, setItems] = useState([]);

  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const fetchItems = () => {
    fetch(`${api}/api/finishing-types/${page}/8`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("storage-token")}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const { message, status, data } = response;
        if (status == 200) {
          const { count, array } = data;
          setCount(count);
          setItems(array);
        }
      });
  };

  useEffect(() => {
    fetchItems();
  }, [updates, page]);

  return (
    <>
      <div className="table">
        <div className="head">
          {/* <div className="column id">id</div> */}
          <div className="column name">name</div>
          <div className="column augmentation">augmentation</div>
        </div>
        {items.length > 0 &&
          items.map((item, index) => (
            <div onClick={() => setModification(item.id)} className="row" key={index}>
              {/* <div className="column id">{item.id}</div> */}
              <div className="column name">{item.name}</div>
              <div className="column augmentation">{item.augmentation}%</div>
            </div>
          ))}
      </div>
      <Pagination page={page} setPage={setPage} count={count} />
    </>
  );
}

export default list;
