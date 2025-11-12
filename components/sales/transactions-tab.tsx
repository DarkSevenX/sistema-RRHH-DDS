"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSales, getCustomers, getEmployees } from "@/lib/mock-data"
import { Search } from "lucide-react"

export function SalesTransactionsTab() {
  const [sales, setSales] = useState<any[]>([])
  const [customers, setCustomers] = useState<any[]>([])
  const [employees, setEmployees] = useState<any[]>([])
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setSales(getSales())
    setCustomers(getCustomers())
    setEmployees(getEmployees())
  }, [])

  const filteredSales = sales.filter((s) => {
    const customer = customers.find((c) => c.id === s.customerId)
    const employee = employees.find((e) => e.id === s.employeeId)
    const matchesStatus = filterStatus === "all" || s.status === filterStatus
    const matchesSearch =
      customer?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee?.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const totalCompleted = filteredSales.filter((s) => s.status === "completed").reduce((sum, s) => sum + s.amount, 0)
  const totalPending = filteredSales.filter((s) => s.status === "pending").reduce((sum, s) => sum + s.amount, 0)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Completadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalCompleted.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {filteredSales.filter((s) => s.status === "completed").length} transacciones
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {filteredSales.filter((s) => s.status === "pending").length} transacciones
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sales.length > 0
                ? ((sales.filter((s) => s.status === "completed").length / sales.length) * 100).toFixed(1)
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">Cierre efectivo</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registro de Ventas</CardTitle>
          <CardDescription>Historial completo de transacciones</CardDescription>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar venta..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="completed">Completadas</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="cancelled">Canceladas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead className="text-right">Comisión</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.slice(0, 50).map((sale) => {
                const customer = customers.find((c) => c.id === sale.customerId)
                const employee = employees.find((e) => e.id === sale.employeeId)
                return (
                  <TableRow key={sale.id}>
                    <TableCell>{sale.date}</TableCell>
                    <TableCell className="font-medium">
                      <div>{customer?.name}</div>
                      <div className="text-xs text-muted-foreground">{customer?.company}</div>
                    </TableCell>
                    <TableCell className="max-w-[200px]">{sale.product}</TableCell>
                    <TableCell className="text-sm">{employee?.name}</TableCell>
                    <TableCell className="text-right">{sale.quantity}</TableCell>
                    <TableCell className="text-right font-bold text-green-600">
                      ${sale.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-medium text-purple-600">
                      ${sale.commission.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          sale.status === "completed"
                            ? "default"
                            : sale.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {sale.status === "completed"
                          ? "Completada"
                          : sale.status === "pending"
                            ? "Pendiente"
                            : "Cancelada"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
