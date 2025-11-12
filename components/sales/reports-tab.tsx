"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getSales, getSalesMetrics, getCustomers, getEmployees } from "@/lib/mock-data"
import { Users, Target, DollarSign } from "lucide-react"

export function SalesReportsTab() {
  const [sales, setSales] = useState<any[]>([])
  const [metrics, setMetrics] = useState<any[]>([])
  const [customers, setCustomers] = useState<any[]>([])
  const [employees, setEmployees] = useState<any[]>([])

  useEffect(() => {
    setSales(getSales())
    setMetrics(getSalesMetrics())
    setCustomers(getCustomers())
    setEmployees(getEmployees())
  }, [])

  const completedSales = sales.filter((s) => s.status === "completed")
  const totalRevenue = completedSales.reduce((sum, s) => sum + s.amount, 0)
  const avgTicket = completedSales.length > 0 ? totalRevenue / completedSales.length : 0

  const conversionRate = sales.length > 0 ? (completedSales.length / sales.length) * 100 : 0

  const salesByEmployee = employees
    .filter((e) => e.department === "Ventas")
    .map((emp) => {
      const empSales = completedSales.filter((s) => s.employeeId === emp.id)
      const totalSales = empSales.reduce((sum, s) => sum + s.amount, 0)
      const avgTicket = empSales.length > 0 ? totalSales / empSales.length : 0
      return {
        name: emp.name,
        sales: totalSales,
        count: empSales.length,
        avgTicket,
        performance: emp.performanceScore,
      }
    })

  const topPerformer = salesByEmployee.sort((a, b) => b.sales - a.sales)[0]
  const salesTeamSize = salesByEmployee.length
  const avgSalesPerPerson = salesTeamSize > 0 ? totalRevenue / salesTeamSize : 0

  const customerRetention = customers.filter((c) => c.totalPurchases > 0).length
  const retentionRate = customers.length > 0 ? (customerRetention / customers.length) * 100 : 0

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Análisis de Ventas Ejecutivo</CardTitle>
          <CardDescription>Indicadores clave de rendimiento comercial</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <p className="font-medium">Ingresos por Ventas</p>
                  <p className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Total de {completedSales.length} transacciones completadas
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <Target className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium">Tasa de Conversión</p>
                  <p className="text-2xl font-bold text-blue-600">{conversionRate.toFixed(1)}%</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {conversionRate > 75
                      ? "Excelente - Por encima del estándar"
                      : conversionRate > 60
                        ? "Bueno - Dentro del objetivo"
                        : "Mejorable - Requiere atención"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <Users className="h-5 w-5 text-purple-600 mt-1" />
                <div>
                  <p className="font-medium">Retención de Clientes</p>
                  <p className="text-2xl font-bold text-purple-600">{retentionRate.toFixed(1)}%</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {customerRetention} de {customers.length} clientes realizaron compras
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4">Insights Estratégicos</h3>
              <div className="space-y-3">
                <div className="flex gap-2 text-sm">
                  <span className="text-green-600 font-bold">•</span>
                  <p>
                    El ticket promedio es de ${Math.round(avgTicket).toLocaleString()}, indicando un buen valor por
                    transacción.
                  </p>
                </div>
                {conversionRate < 60 && (
                  <div className="flex gap-2 text-sm">
                    <span className="text-orange-600 font-bold">•</span>
                    <p>
                      La tasa de conversión está por debajo del 60%. Evaluar proceso de ventas y capacitación del
                      equipo.
                    </p>
                  </div>
                )}
                <div className="flex gap-2 text-sm">
                  <span className="text-blue-600 font-bold">•</span>
                  <p>
                    {topPerformer?.name} lidera con ${topPerformer?.sales.toLocaleString()} en ventas. Considerar
                    replicar sus estrategias.
                  </p>
                </div>
                <div className="flex gap-2 text-sm">
                  <span className="text-purple-600 font-bold">•</span>
                  <p>
                    Ventas promedio por vendedor: ${Math.round(avgSalesPerPerson).toLocaleString()}.{" "}
                    {avgSalesPerPerson > 200000
                      ? "Excelente desempeño del equipo."
                      : "Oportunidad de mejora en productividad."}
                  </p>
                </div>
                {retentionRate < 70 && (
                  <div className="flex gap-2 text-sm">
                    <span className="text-orange-600 font-bold">•</span>
                    <p>
                      Retención de clientes por debajo del 70%. Implementar programa de fidelización y seguimiento
                      post-venta.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Desempeño Individual del Equipo</CardTitle>
          <CardDescription>Análisis detallado de cada vendedor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salesByEmployee
              .sort((a, b) => b.sales - a.sales)
              .map((emp, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{emp.name}</h4>
                      <p className="text-sm text-muted-foreground">Score de desempeño: {emp.performance}/100</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">${emp.sales.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total vendido</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Transacciones</p>
                      <p className="font-medium text-lg">{emp.count}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Ticket Promedio</p>
                      <p className="font-medium text-lg">${Math.round(emp.avgTicket).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Contribución</p>
                      <p className="font-medium text-lg">{((emp.sales / totalRevenue) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Análisis de Productos</CardTitle>
          <CardDescription>Rendimiento por línea de producto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from(new Set(completedSales.map((s) => s.product))).map((product) => {
              const productSales = completedSales.filter((s) => s.product === product)
              const total = productSales.reduce((sum, s) => sum + s.amount, 0)
              const quantity = productSales.reduce((sum, s) => sum + s.quantity, 0)
              return (
                <div key={product} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{product}</p>
                    <p className="text-sm text-muted-foreground">
                      {productSales.length} ventas - {quantity} unidades
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">${total.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">
                      {((total / totalRevenue) * 100).toFixed(1)}% del total
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
