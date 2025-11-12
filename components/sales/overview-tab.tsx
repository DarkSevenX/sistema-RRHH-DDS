"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getSalesMetrics, getSales, getCustomers, getEmployees } from "@/lib/mock-data"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

export function SalesOverviewTab() {
  const [metrics, setMetrics] = useState<any[]>([])
  const [sales, setSales] = useState<any[]>([])
  const [customers, setCustomers] = useState<any[]>([])
  const [employees, setEmployees] = useState<any[]>([])

  useEffect(() => {
    setMetrics(getSalesMetrics())
    setSales(getSales())
    setCustomers(getCustomers())
    setEmployees(getEmployees())
  }, [])

  const chartData = metrics
    .slice()
    .reverse()
    .map((m) => ({
      mes: m.month.slice(5),
      ventas: m.totalSales,
      comisiones: m.totalCommissions,
      ticket: m.averageTicket,
    }))

  const salesByEmployee = employees
    .filter((e) => e.department === "Ventas")
    .map((emp) => {
      const empSales = sales.filter((s) => s.employeeId === emp.id && s.status === "completed")
      const totalSales = empSales.reduce((sum, s) => sum + s.amount, 0)
      const totalCommissions = empSales.reduce((sum, s) => sum + s.commission, 0)
      return {
        name: emp.name.split(" ")[0] + " " + emp.name.split(" ")[emp.name.split(" ").length - 1],
        ventas: totalSales,
        comisiones: totalCommissions,
        cantidad: empSales.length,
      }
    })
    .sort((a, b) => b.ventas - a.ventas)

  const salesByProduct = sales
    .filter((s) => s.status === "completed")
    .reduce((acc: any, s) => {
      if (!acc[s.product]) {
        acc[s.product] = { name: s.product, value: 0, count: 0 }
      }
      acc[s.product].value += s.amount
      acc[s.product].count += 1
      return acc
    }, {})

  const productData = Object.values(salesByProduct)
    .sort((a: any, b: any) => b.value - a.value)
    .slice(0, 6)

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Evolución de Ventas (6 meses)</CardTitle>
          <CardDescription>Ventas totales y comisiones generadas</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="ventas" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Ventas" />
              <Line
                type="monotone"
                dataKey="comisiones"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                name="Comisiones"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Vendedores</CardTitle>
            <CardDescription>Ranking por volumen de ventas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesByEmployee.slice(0, 5)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Bar dataKey="ventas" fill="hsl(var(--chart-1))" name="Ventas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ventas por Producto</CardTitle>
            <CardDescription>Distribución de ingresos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) => `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Desempeño del Equipo de Ventas</CardTitle>
          <CardDescription>Métricas detalladas por vendedor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {salesByEmployee.slice(0, 6).map((emp, index) => (
              <div key={index} className="border rounded-lg p-4">
                <p className="font-medium mb-2">{emp.name}</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ventas:</span>
                    <span className="font-medium text-green-600">${emp.ventas.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Comisiones:</span>
                    <span className="font-medium text-purple-600">${emp.comisiones.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transacciones:</span>
                    <span className="font-medium">{emp.cantidad}</span>
                  </div>
                  <div className="flex justify-between border-t pt-1 mt-1">
                    <span className="text-muted-foreground">Ticket Promedio:</span>
                    <span className="font-medium">${Math.round(emp.ventas / emp.cantidad).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
