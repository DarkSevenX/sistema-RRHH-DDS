"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getProducts, getInventoryMovements, getPurchaseOrders } from "@/lib/mock-data"
import {
  LineChart,
  Line,
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
import { AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function InventoryOverviewTab() {
  const [products, setProducts] = useState<any[]>([])
  const [movements, setMovements] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    setProducts(getProducts())
    setMovements(getInventoryMovements())
    setOrders(getPurchaseOrders())
  }, [])

  const stockByCategory = products.reduce((acc: any, p) => {
    if (!acc[p.category]) {
      acc[p.category] = { name: p.category, value: 0, count: 0 }
    }
    acc[p.category].value += p.stock * p.unitPrice
    acc[p.category].count += p.stock
    return acc
  }, {})

  const categoryData = Object.values(stockByCategory).sort((a: any, b: any) => b.value - a.value)

  const last30Days = movements.filter((m) => {
    const date = new Date(m.date)
    const today = new Date()
    const diff = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    return diff <= 30
  })

  const movementsByDay = last30Days.reduce((acc: any, m) => {
    const date = m.date.slice(5, 10)
    if (!acc[date]) {
      acc[date] = { fecha: date, entradas: 0, salidas: 0 }
    }
    if (m.type === "entrada") acc[date].entradas += m.quantity
    if (m.type === "salida") acc[date].salidas += m.quantity
    return acc
  }, {})

  const movementsChartData = Object.values(movementsByDay).slice(-14)

  const lowStockProducts = products.filter((p) => p.stock <= p.minStock)
  const criticalStockProducts = products.filter((p) => p.stock <= p.minStock * 0.5)

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  return (
    <div className="space-y-6">
      {criticalStockProducts.length > 0 && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <CardTitle className="text-red-900 dark:text-red-100">Alertas Críticas de Inventario</CardTitle>
            </div>
            <CardDescription className="text-red-700 dark:text-red-300">
              {criticalStockProducts.length} productos en nivel crítico de stock
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {criticalStockProducts.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sku}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive">{product.stock} unidades</Badge>
                    <p className="text-xs text-muted-foreground mt-1">Mínimo: {product.minStock}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Valor del Inventario por Categoría</CardTitle>
            <CardDescription>Distribución del valor del stock</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry: any, index: number) => (
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
            <CardTitle>Movimientos de Inventario (14 días)</CardTitle>
            <CardDescription>Entradas y salidas recientes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={movementsChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="entradas" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Entradas" />
                <Line type="monotone" dataKey="salidas" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Salidas" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Productos con Stock Bajo</CardTitle>
          <CardDescription>Productos que requieren reabastecimiento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {lowStockProducts.map((product) => {
              const percentage = (product.stock / product.minStock) * 100
              return (
                <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.category} - {product.sku}
                        </p>
                      </div>
                      <Badge variant={percentage < 50 ? "destructive" : "secondary"}>
                        {product.stock} / {product.minStock}
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${percentage < 50 ? "bg-red-600" : "bg-orange-600"}`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumen por Categoría</CardTitle>
          <CardDescription>Estadísticas de inventario</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {categoryData.map((cat: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <p className="font-medium mb-3">{cat.name}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Valor:</span>
                    <span className="font-medium text-green-600">${cat.value.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Unidades:</span>
                    <span className="font-medium">{cat.count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Productos:</span>
                    <span className="font-medium">{products.filter((p) => p.category === cat.name).length}</span>
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
