import React from "react";

import "./Table.css";
import { BsTrashFill } from "react-icons/bs";
import type { Product } from "../Product";

interface TableParams {
  products: Product[],
  deleteRow: (targetIdx: number) => any
}

const numFormat = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 0,
  maximumFractionDigits: 4,
});

export const Table = ({ products, deleteRow }: TableParams) => {
  return <div className="table-wrapper">
    <table className="table">
      <thead >
        <tr>
          <th className="expand">Description</th>
          <th>Price</th>
          <th>
            <sup>Kcal</sup>/<sub>100gr</sub>
          </th>
          <th>
            <sup>Protein</sup>/<sub>100gr</sub>
          </th>
          <th>
            <sup>Kcal</sup>/<sub>Protein</sub>
          </th>
          <th>
            <sup>Price</sup>/<sub>Protein</sub>
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

function proteinPer(product: Product): number {
  const gramsConversionFactor = 100 / product.serving;
  return product.protein * gramsConversionFactor;
}

function kcalPer(product: Product): number {
  const gramsConversionFactor = 100 / product.serving;
  return product.kcal * gramsConversionFactor;
}

function proteinRatio(product: Product): number {
  return product.kcal / product.protein
}

function proteinPrice(product: Product): number {
  const protein_per_gram = product.protein / product.serving;
  const price_per_gram = product.price / product.weight;
  return price_per_gram / protein_per_gram;
}