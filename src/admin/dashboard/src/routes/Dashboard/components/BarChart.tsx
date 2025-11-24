import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ✅ Kiểu dữ liệu cho 4 quý
type QuarterField =
  | "units_sold_q1"
  | "units_sold_q2"
  | "units_sold_q3"
  | "units_sold_q4";

// ✅ Kiểu dữ liệu product (tối thiểu)
interface Product {
  id: string;
  title: string;
  variants?: {
    prices?: { amount: number }[];
  }[];
  units_sold_q1?: number;
  units_sold_q2?: number;
  units_sold_q3?: number;
  units_sold_q4?: number;
}

const BarChart = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [totalRevenueQ1, setTotalRevenueQ1] = useState(0);
  const [totalRevenueQ2, setTotalRevenueQ2] = useState(0);
  const [totalRevenueQ3, setTotalRevenueQ3] = useState(0);
  const [totalRevenueQ4, setTotalRevenueQ4] = useState(0);

  // ✅ Gọi API từ Medusa Admin backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_MEDUSA_ADMIN_BACKEND_URL}/admin/products`,
          {
            withCredentials: true,
          }
        );

        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Hàm tính revenue 1 quý — có type rõ ràng
  const calcRevenue = (soldField: QuarterField): number => {
    return products.reduce((sum, product) => {
      const price =
        product?.variants?.[0]?.prices?.[0]?.amount ??
        0; // fallback nếu chưa có prices

      const sold = product[soldField] ?? 0;

      return sum + price * sold;
    }, 0);
  };

  // ✅ Tính tổng revenue cho 4 quý
  useEffect(() => {
    if (!products.length) return;

    setTotalRevenueQ1(calcRevenue("units_sold_q1"));
    setTotalRevenueQ2(calcRevenue("units_sold_q2"));
    setTotalRevenueQ3(calcRevenue("units_sold_q3"));
    setTotalRevenueQ4(calcRevenue("units_sold_q4"));
  }, [products]);

  // ✅ Data ChartJS
  const data = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Total Revenue",
        data: [totalRevenueQ1, totalRevenueQ2, totalRevenueQ3, totalRevenueQ4],
        backgroundColor: "#32de84",
        borderColor: "rgb(0,128,0)",
      },
    ],
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">
        Loading revenue chart...
      </div>
    );
  }

  return (
    <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
      <div className="w-full h-[70vh]">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default BarChart;
