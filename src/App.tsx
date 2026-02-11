import { useEffect, useState } from 'react'
import './App.css'
import { Form } from './componenets/Form'
import { Table, type SortConfig } from './componenets/Table'
import { proteinPrice, proteinRatio, type Product } from './Product';

const initialData: Product[] = [
  {
    description: "Low fat Yoghurt",
    price: 0.79,
    weight: 1000,
    serving: 100,
    kcal: 34,
    protein: 4
  },
  {
    description: "Skyr",
    price: 1.29,
    weight: 1000,
    serving: 100,
    kcal: 62,
    protein: 11
  },
  {
    description: "Eggs (12)",
    price: 2.49,
    weight: 660,
    serving: 100,
    kcal: 158,
    protein: 12,
  }
];


function App() {
  const [formOpen, setFormOpen] = useState(true);

  const [data, setData] = useState<Product[]>(() => {
    const stored = localStorage.getItem("products");
    return stored ? JSON.parse(stored) : initialData;
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(data));
  }, [data]);

  const handleDeleteRow = (targetIdx: number) => {
    setData(data.filter((_, idx) => idx !== targetIdx));
  };

  const handleAddRow = (newRow: Product) => {
    setData([...data, newRow])
  }

  const handleSortBy = (cfg: SortConfig | null) => {
    if (!cfg) return;
    const sorted = [...data].sort((a, b) => {
      switch (cfg.key) {
        case "description":
          return cfg.direction === "asc" ?
            a.description.localeCompare(b.description) :
            b.description.localeCompare(a.description);
        case "price":
          return cfg.direction === 'asc' ?
            a.price - b.price : b.price - a.price;
        case "kcal":
          return cfg.direction === "asc" ?
            a.kcal - b.kcal : b.kcal - a.kcal;
        case "prot":
          return cfg.direction === 'asc' ?
            a.protein - b.protein : b.protein - a.protein;
        case "protRatio": {
          const aPr = proteinRatio(a);
          const bPr = proteinRatio(b);
          return cfg.direction === 'asc' ?
            aPr - bPr : bPr - aPr;
        }
        case "protPrice": {
          const aPr = proteinPrice(a);
          const bPr = proteinPrice(b);
          return cfg.direction === 'asc' ?
            aPr - bPr : bPr - aPr;
        }
      }
    });

    setData(sorted);
  }

  return (
    <div className='app'>
      <header>

        <h1>Protein Comparer</h1>
        <p>compare protein ratios in foods</p>
      </header>
      <div>
        <Form addRow={handleAddRow} />
      </div>
      <Table products={data} deleteRow={handleDeleteRow} sortBy={handleSortBy} />
    </div>
  )
}

export default App
