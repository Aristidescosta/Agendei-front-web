import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ title, data, dataKey, grid }) => {
  return (
    <div className="card chart">
      <div className="card-body">
        <h3 className="card-title">
          {title}
          <ResponsiveContainer width="100%" aspect={4 / 1}>
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#555" />
              <YAxis stroke="#555" />
              <Line type="monotone" dataKey={dataKey} stroke="#555" />
              <Tooltip />
              {grid && <CartesianGrid stroke="#555" strokeDasharray="5 5" />}
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </h3>
      </div>
    </div>
  );
};

export default Chart;
