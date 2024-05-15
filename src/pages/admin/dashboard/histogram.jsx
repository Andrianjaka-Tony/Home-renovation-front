import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Histogramme",
    },
  },
};

function Histogram({ labels, values }) {
  const data = {
    labels,
    datasets: [
      {
        label: "Montant des devis",
        data: values,
        backgroundColor: [
          "#111",
          "#5758BB",
          "#1289A7",
          "#FFC312",
          "#B53471",
          "#4b6584",
          "#3867d6",
          "#0fb9b1",
          "#8854d0",
          "#aaa69d",
          "#2c2c54",
          "#34ace0",
        ],
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default Histogram;
