import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { Bar } from "react-chartjs-2";

export default function Metrics() {
  const router = useRouter();

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  if (router.query.token) {
    const obj = jwt.decode(router.query.token);
    const labels = Object.keys(obj)
    const values = Object.values(obj)
    const data = {
      labels: labels.slice(5,8),
      datasets: [
        {
          label: "Byte",
          data: values.slice(5,8),
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ]
        },
      ],
    };

    return (
      <>
        <h1 className="text-center text-3xl text-bold uppercase mt-5">
          {" "}
          {obj.db}{" "}
        </h1>
        <Bar className="p-20 pt-5 pb-0" data={data} options={options} />
      </>
    );
  }
  return null;
}
