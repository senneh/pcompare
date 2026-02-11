import { useState } from "react";

import "./Table.css";
import { BsTrashFill } from "react-icons/bs";
import { kcalPer, proteinPer, proteinPrice, proteinRatio, type Product, type SortKey } from "../Product";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

interface TableParams {
  products: Product[],
  deleteRow: (targetIdx: number) => any,
  sortBy: (sortConfig: SortConfig | null) => any,
}


export interface SortConfig {
  key: SortKey,
  direction: 'asc' | 'desc',
}


const numFormat = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 0,
  maximumFractionDigits: 4,
});

export const Table = ({ products, deleteRow, sortBy }: TableParams) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  function sortIcon(key: SortKey) {
    if (key !== sortConfig?.key) {
      return <FaSort className="sort-icon" />
    }

    if (sortConfig.direction === "asc") {
      return <FaSortDown className="sort-icon" />;
    } else {
      return <FaSortUp className="sort-icon" />;
    }
  }

  function handleSortBy(key: SortKey) {
    let direction: "asc" | "desc" = "asc";
    if (key === sortConfig?.key) {
      direction = sortConfig?.direction === 'asc' ? 'desc' : 'asc';
    }
    setSortConfig({ key, direction });
    sortBy({ key, direction })
  }

  return <div className="table-wrapper">
    <table className="table">
      <thead >
        <tr>
          <th className="expand sortable-header" onClick={() => handleSortBy("description")}>
            <div className="header-content">
              Description
              {sortIcon("description")}
            </div>
          </th>
          <th className="sortable-header" onClick={() => handleSortBy("price")}>
            <div className="header-content">
              Price
              {sortIcon("price")}
            </div>
          </th>
          <th className="sortable-header" onClick={() => handleSortBy("kcal")}>
            <div className="header-content">
              <span><sup>Kcal</sup>/<sub>100gr</sub></span>
              {sortIcon("kcal")}

            </div>
          </th>
          <th className="sortable-header" onClick={() => handleSortBy("prot")}>
            <div className="header-content">
              <span><sup>Protein</sup>/<sub>100gr</sub></span>
              {sortIcon("prot")}
            </div>
          </th>
          <th className="sortable-header" onClick={() => handleSortBy("protRatio")}>
            <div className="header-content">
              <span><sup>Kcal</sup>/<sub>Protein</sub></span>
              {sortIcon("protRatio")}
            </div>
          </th>
          <th className="sortable-header" onClick={() => handleSortBy("protPrice")}>
            <div className="header-content">
              <span><sup>Price</sup>/<sub>Protein</sub></span>
              {sortIcon("protPrice")}

            </div>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          products.map((product, idx) => {
            return <tr key={idx}>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{numFormat.format(kcalPer(product))}</td>
              <td>{numFormat.format(proteinPer(product))}</td>
              <td>{numFormat.format(proteinRatio(product))}</td>
              <td>{numFormat.format(proteinPrice(product))}</td>
              <td>
                <span>
                  <button
                    className="delete-btn"
                    onClick={() => { deleteRow(idx) }}>
                    <BsTrashFill className="delete-btn-icon" />
                  </button>
                </span>
              </td>

            </tr>
          })
        }

      </tbody>
    </table>
  </div>
}
