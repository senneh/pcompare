import { useEffect, useState } from 'react'
import './App.css'
import { Form } from './componenets/Form'
import { Table } from './componenets/Table'
import type { Product } from './Product';

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
    console.log("saving data");
    localStorage.setItem("products", JSON.stringify(data));
  }, [data]);

  const handleDeleteRow = (targetIdx: number) => {
    setData(data.filter((_, idx) => idx !== targetIdx));
  };

  const handleAddRow = (newRow: Product) => {
    setData([...data, newRow])
  }

  return (
    <div className='app'>
      <h1>Compare Foods</h1>
      <div>
        <Form addRow={handleAddRow} />
      </div>
      <Table products={data} deleteRow={handleDeleteRow} />
    </div>
  )
}

export default App
