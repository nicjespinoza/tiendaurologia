import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Stat = { label: string; value: number };
type ChartPoint = { name: string; total: number };

export function AccountingSummary({
  stats,
  chart,
}: {
  stats: Stat[];
  chart: ChartPoint[];
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader>
            <CardTitle className="text-sm text-mutedForeground">{stat.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">${stat.value.toFixed(2)}</p>
          </CardContent>
        </Card>
      ))}
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Ventas últimos 7 días</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chart}>
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{ background: "#0b0b0b", border: "1px solid #1f2937" }}
                    labelStyle={{ color: "#ffffff" }}
                  />
                  <Bar dataKey="total" fill="#00A63E" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
