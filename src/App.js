import "./App.css";
import { Chart as ChartJS, scales } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import returns from "./assets/returns.json";
import ddPeriods from "./assets/ddPeriods.json";
import "chartjs-adapter-date-fns";

function App() {
  const gradientFill = (context) => {
    const { ctx, chartArea } = context.chart;
    if (!chartArea) return null;

    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );
    gradient.addColorStop(0, "rgba(255, 0, 0, 0.5)"); // Start color
    gradient.addColorStop(1, "rgba(255, 0, 0, 0)"); // End color
    return gradient;
  };

  const period = ddPeriods.data.map((data) => {
    return {
      label: "Highlighted Period",
      data: [
        { x: data.Start_Date, y: 0 },
        { x: data.End_Date, y: 0 },
      ],
      borderColor: "rgba(255, 0, 0, 1)",
      backgroundColor: gradientFill,
      borderWidth: 0,
      fill: 0,
      radius: 0,
    };
  });

  return (
    <div className="App chart-container">
      <img
        src="https://maticalgos.com/wp-content/uploads/2022/01/logo_black.png"
        alt="Watermark"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "120px",
          transform: "translate(-50%, -50%)",
          opacity: "0.5",
        }}
      />
      <Line
        id="canvas"
        datasetIdKey="id"
        data={{
          labels: returns.data.combined.map((data) => data.date),
          datasets: [
            {
              label: "Cumulative P&L",
              data: returns.data.combined.map((data) => data.cumsum),
              borderColor: "rgba(128, 128, 128, 1)",
              borderWidth: 1,
              fill: false,
            },
            ...period,
          ],
        }}
        options={{
          scales: {
            x: {
              type: "time",
              time: {
                unit: "month",
              },
            },
          },
        }}
      />

      <table>
        <thead>
          <tr>
            <th>Period</th>
            <th>Max DD</th>
            <th>Days</th>
          </tr>
        </thead>
        <tbody>
          {ddPeriods.data.map((value) => (
            <tr key={value.Drawdown_days}>
              <td>
                {value.End_Date} - {value.Start_Date}
              </td>
              <td className="drawdown-value">
                {value.Max_Drawdown.toFixed(2)}
              </td>
              <td>{value.Drawdown_days}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
