"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getFinancialMetrics, getFinancialTransactions } from "@/lib/mock-data"
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

export function FinancialOverviewTab() {
  const [metrics, setMetrics] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])

  useEffect(() => {
    setMetrics(getFinancialMetrics())
    setTransactions(getFinancialTransactions())
  }, [])

  const chartData = metrics
    .slice()
    .reverse()
    .map((m) => ({
      mes: m.month.slice(5),
      ingresos: m.revenue,
      gastos: m.expenses,
      utilidad: m.profit,
    }))

  const expensesByCategory = transactions
    .filter((t) => t.type === "expense" && t.status === "completed")
    .reduce((acc: any, t) => {
      if (!acc[t.category]) acc[t.category] = 0
      acc[t.category] += t.amount
      return acc
    }, {})

  const expensesCategoryData = Object.entries(expensesByCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a: any, b: any) => b.value - a.value)

  const incomeByCategory = transactions
    .filter((t) => t.type === "income" && t.status === "completed")
    .reduce((acc: any, t) => {
      if (!acc[t.category]) acc[t.category] = 0
      acc[t.category] += t.amount
      return acc
    }, {})

  const incomeCategoryData = Object.entries(incomeByCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a: any, b: any) => b.value - a.value)

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
          <CardTitle>Evolución Financiera (6 meses)</CardTitle>
          <CardDescription>Comparativa de ingresos, gastos y utilidad</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="ingresos" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Ingresos" />
              <Line type="monotone" dataKey="gastos" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Gastos" />
              <Line type="monotone" dataKey="utilidad" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Utilidad" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Gastos por Categoría</CardTitle>
            <CardDescription>Distribución de gastos operativos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expensesCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expensesCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ingresos por Categoría</CardTitle>
            <CardDescription>Fuentes de ingresos principales</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={incomeCategoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Bar dataKey="value" fill="hsl(var(--chart-2))" name="Ingresos" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Análisis de Rentabilidad</CardTitle>
          <CardDescription>Indicadores clave de desempeño financiero</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {metrics.slice(0, 3).map((metric, index) => (
              <div key={index} className="border rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">{metric.month}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Ingresos:</span>
                    <span className="font-medium text-green-600">${metric.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Gastos:</span>
                    <span className="font-medium text-red-600">${metric.expenses.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-medium">Utilidad:</span>
                    <span className={`font-bold ${metric.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                      ${metric.profit.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Margen:</span>
                    <span className={`font-medium ${metric.profitMargin >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {metric.profitMargin.toFixed(1)}%
                    </span>
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
