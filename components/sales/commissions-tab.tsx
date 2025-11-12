"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSales, getSalesMetrics, getEmployees } from "@/lib/mock-data"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export function CommissionsTab() {
  const [sales, setSales] = useState<any[]>([])
  const [metrics, setMetrics] = useState<any[]>([])
  const [employees, setEmployees] = useState<any[]>([])
  const [selectedMonth, setSelectedMonth] = useState<string>("all")

  useEffect(() => {
    setSales(getSales())
    setMetrics(getSalesMetrics())
    setEmployees(getEmployees())
  }, [])

  const months = Array.from(new Set(sales.map((s) => s.date.slice(0, 7))))
    .sort()
    .reverse()

  const filteredSales = sales.filter((s) => {
    const matchesMonth = selectedMonth === "all" || s.date.startsWith(selectedMonth)
    return matchesMonth && s.status === "completed"
  })

  const commissionsByEmployee = employees
    .filter((e) => e.department === "Ventas")
    .map((emp) => {
      const empSales = filteredSales.filter((s) => s.employeeId === emp.id)
      const totalSales = empSales.reduce((sum, s) => sum + s.amount, 0)
      const totalCommissions = empSales.reduce((sum, s) => sum + s.commission, 0)
      const commissionRate = totalSales > 0 ? (totalCommissions / totalSales) * 100 : 0
      return {
        id: emp.id,
        name: emp.name,
        totalSales,
        totalCommissions,
        commissionRate,
        numberOfSales: empSales.length,
      }
    })
    .sort((a, b) => b.totalCommissions - a.totalCommissions)

  const monthlyCommissions = months
    .slice(0, 6)
    .reverse()
    .map((month) => {
      const monthSales = sales.filter((s) => s.date.startsWith(month) && s.status === "completed")
      return {
        month: month.slice(5),
        comisiones: monthSales.reduce((sum, s) => sum + s.commission, 0),
        ventas: monthSales.reduce((sum, s) => sum + s.amount, 0),
      }
    })

  const totalCommissions = commissionsByEmployee.reduce((sum, e) => sum + e.totalCommissions, 0)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comisiones Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">${totalCommissions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Período seleccionado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {commissionsByEmployee.length > 0
                ? (
                    commissionsByEmployee.reduce((sum, e) => sum + e.commissionRate, 0) / commissionsByEmployee.length
                  ).toFixed(2)
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">De comisión</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Vendedor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${commissionsByEmployee[0]?.totalCommissions.toLocaleString() || 0}
            </div>
            <p className="text-xs text-muted-foreground">{commissionsByEmployee[0]?.name.split(" ")[0] || "N/A"}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evolución de Comisiones</CardTitle>
          <CardDescription>Comisiones generadas por mes</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyCommissions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              <Legend />
              <Bar dataKey="comisiones" fill="hsl(var(--chart-3))" name="Comisiones" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detalle de Comisiones por Vendedor</CardTitle>
          <CardDescription>Resumen de comisiones ganadas</CardDescription>
          <div className="flex gap-4 mt-4">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Mes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los meses</SelectItem>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendedor</TableHead>
                <TableHead className="text-right">Ventas Totales</TableHead>
                <TableHead className="text-right">Comisiones</TableHead>
                <TableHead className="text-right">Tasa</TableHead>
                <TableHead className="text-right">Transacciones</TableHead>
                <TableHead className="text-right">Comisión/Venta</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commissionsByEmployee.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell className="font-medium">{emp.name}</TableCell>
                  <TableCell className="text-right text-green-600 font-medium">
                    ${emp.totalSales.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-purple-600 font-bold">
                    ${emp.totalCommissions.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">{emp.commissionRate.toFixed(2)}%</TableCell>
                  <TableCell className="text-right">{emp.numberOfSales}</TableCell>
                  <TableCell className="text-right">
                    ${emp.numberOfSales > 0 ? Math.round(emp.totalCommissions / emp.numberOfSales).toLocaleString() : 0}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
