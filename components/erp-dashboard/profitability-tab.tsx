"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export function ProfitabilityTab() {
  // Análisis de rentabilidad detallado
  const profitabilityMetrics = {
    grossMargin: 45.2,
    operatingMargin: 35.8,
    netMargin: 32.4,
    roi: 24.5,
    roa: 18.3,
    roe: 28.7,
  }

  // Evolución de márgenes
  const marginTrend = [
    { month: "Ene", gross: 42, operating: 32, net: 28 },
    { month: "Feb", gross: 43, operating: 33, net: 29 },
    { month: "Mar", gross: 44, operating: 34, net: 30 },
    { month: "Abr", gross: 43, operating: 33, net: 29 },
    { month: "May", gross: 45, operating: 35, net: 31 },
    { month: "Jun", gross: 46, operating: 36, net: 32 },
  ]

  // Análisis de rentabilidad por producto
  const productProfitability = [
    { product: "Laptop Pro 15", revenue: 450000, cost: 270000, profit: 180000, margin: 40, units: 150 },
    { product: "Monitor 4K", revenue: 280000, cost: 168000, profit: 112000, margin: 40, units: 280 },
    { product: "Teclado Mecánico", revenue: 185000, cost: 92500, profit: 92500, margin: 50, units: 925 },
    { product: "Mouse Inalámbrico", revenue: 120000, cost: 60000, profit: 60000, margin: 50, units: 1200 },
    { product: "Webcam HD", revenue: 95000, cost: 57000, profit: 38000, margin: 40, units: 475 },
  ]

  // Análisis de rentabilidad por cliente
  const customerProfitability = [
    { customer: "TechCorp S.A.", revenue: 285000, cost: 171000, profit: 114000, margin: 40, transactions: 12 },
    { customer: "Digital Solutions", revenue: 245000, cost: 147000, profit: 98000, margin: 40, transactions: 8 },
    { customer: "Innovation Labs", revenue: 198000, cost: 118800, profit: 79200, margin: 40, transactions: 6 },
    { customer: "Smart Systems", revenue: 175000, cost: 105000, profit: 70000, margin: 40, transactions: 9 },
    { customer: "Cloud Networks", revenue: 152000, cost: 91200, profit: 60800, margin: 40, transactions: 7 },
  ]

  // Break-even analysis
  const breakEvenData = [
    { units: 0, revenue: 0, costs: 150000, profit: -150000 },
    { units: 50, revenue: 150000, costs: 200000, profit: -50000 },
    { units: 100, revenue: 300000, costs: 250000, profit: 50000 },
    { units: 150, revenue: 450000, costs: 300000, profit: 150000 },
    { units: 200, revenue: 600000, costs: 350000, profit: 250000 },
  ]

  return (
    <div className="space-y-6">
      {/* KPIs de Rentabilidad */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Margen Bruto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profitabilityMetrics.grossMargin}%</div>
            <p className="text-xs text-muted-foreground mt-1">Ingresos - Costo de Ventas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Margen Operativo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profitabilityMetrics.operatingMargin}%</div>
            <p className="text-xs text-muted-foreground mt-1">Utilidad Operativa / Ingresos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Margen Neto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profitabilityMetrics.netMargin}%</div>
            <p className="text-xs text-muted-foreground mt-1">Utilidad Neta / Ingresos</p>
          </CardContent>
        </Card>
      </div>

      {/* Evolución de Márgenes */}
      <Card>
        <CardHeader>
          <CardTitle>Evolución de Márgenes de Rentabilidad</CardTitle>
          <CardDescription>Tendencia de los diferentes niveles de rentabilidad</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={marginTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Line type="monotone" dataKey="gross" name="Margen Bruto" stroke="hsl(var(--chart-1))" strokeWidth={2} />
              <Line
                type="monotone"
                dataKey="operating"
                name="Margen Operativo"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
              />
              <Line type="monotone" dataKey="net" name="Margen Neto" stroke="hsl(var(--chart-3))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Rentabilidad por Producto */}
      <Card>
        <CardHeader>
          <CardTitle>Rentabilidad por Producto</CardTitle>
          <CardDescription>Top 5 productos con mayor utilidad</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productProfitability}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip formatter={(value) => `$${(Number(value) / 1000).toFixed(0)}K`} />
              <Legend />
              <Bar dataKey="revenue" name="Ingresos" fill="hsl(var(--chart-1))" />
              <Bar dataKey="profit" name="Utilidad" fill="hsl(var(--chart-3))" />
            </BarChart>
          </ResponsiveContainer>

          <div className="space-y-2">
            {productProfitability.map((product) => (
              <div key={product.product} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{product.product}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.units} unidades | Margen: {product.margin}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-500">${(product.profit / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-muted-foreground">Utilidad</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rentabilidad por Cliente */}
      <Card>
        <CardHeader>
          <CardTitle>Rentabilidad por Cliente</CardTitle>
          <CardDescription>Top 5 clientes más rentables</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={customerProfitability} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="customer" type="category" width={120} />
              <Tooltip formatter={(value) => `$${(Number(value) / 1000).toFixed(0)}K`} />
              <Bar dataKey="profit" name="Utilidad" fill="hsl(var(--chart-3))" />
            </BarChart>
          </ResponsiveContainer>

          <div className="space-y-2">
            {customerProfitability.map((customer) => (
              <div key={customer.customer} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{customer.customer}</p>
                  <p className="text-sm text-muted-foreground">
                    {customer.transactions} transacciones | Margen: {customer.margin}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-500">${(customer.profit / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-muted-foreground">Utilidad</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Análisis Break-Even */}
      <Card>
        <CardHeader>
          <CardTitle>Análisis de Punto de Equilibrio</CardTitle>
          <CardDescription>Break-even point y proyección de rentabilidad</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={breakEvenData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="units" label={{ value: "Unidades", position: "insideBottom", offset: -5 }} />
              <YAxis label={{ value: "Monto ($)", angle: -90, position: "insideLeft" }} />
              <Tooltip formatter={(value) => `$${(Number(value) / 1000).toFixed(0)}K`} />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Ingresos"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="costs"
                name="Costos Totales"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium">Punto de Equilibrio: 75 unidades</p>
            <p className="text-sm text-muted-foreground mt-1">
              A partir de 76 unidades, la empresa genera utilidad positiva
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
