"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getSuppliers, getPurchaseOrders } from "@/lib/mock-data"

export function SuppliersTab() {
  const [suppliers, setSuppliers] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    setSuppliers(getSuppliers())
    setOrders(getPurchaseOrders())
  }, [])

  const suppliersWithStats = suppliers
    .map((supplier) => {
      const supplierOrders = orders.filter((o) => o.supplier === supplier.name)
      const totalPurchases = supplierOrders.reduce((sum, o) => sum + o.total, 0)
      const completedOrders = supplierOrders.filter((o) => o.status === "received").length
      const pendingOrders = supplierOrders.filter((o) => o.status === "pending").length

      return {
        ...supplier,
        totalPurchases,
        orderCount: supplierOrders.length,
        completedOrders,
        pendingOrders,
      }
    })
    .sort((a, b) => b.totalPurchases - a.totalPurchases)

  const activeSuppliers = suppliersWithStats.filter((s) => s.status === "active").length
  const totalSpent = suppliersWithStats.reduce((sum, s) => sum + s.totalPurchases, 0)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proveedores Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSuppliers}</div>
            <p className="text-xs text-muted-foreground">De {suppliers.length} totales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comprado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio por Proveedor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${suppliers.length > 0 ? Math.round(totalSpent / suppliers.length).toLocaleString() : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Directorio de Proveedores</CardTitle>
          <CardDescription>Lista de proveedores y estadísticas de compra</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proveedor</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Términos de Pago</TableHead>
                <TableHead className="text-right">Total Comprado</TableHead>
                <TableHead className="text-right">Órdenes</TableHead>
                <TableHead className="text-right">Pendientes</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliersWithStats.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{supplier.contactPerson}</div>
                      <div className="text-xs text-muted-foreground">{supplier.email}</div>
                      <div className="text-xs text-muted-foreground">{supplier.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{supplier.category}</TableCell>
                  <TableCell>{supplier.paymentTerms}</TableCell>
                  <TableCell className="text-right font-bold text-green-600">
                    ${supplier.totalPurchases.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">{supplier.completedOrders}</TableCell>
                  <TableCell className="text-right text-orange-600">{supplier.pendingOrders}</TableCell>
                  <TableCell>
                    <Badge variant={supplier.status === "active" ? "default" : "outline"}>
                      {supplier.status === "active" ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top 5 Proveedores</CardTitle>
          <CardDescription>Proveedores con mayor volumen de compras</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suppliersWithStats.slice(0, 5).map((supplier, index) => (
              <div key={supplier.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{supplier.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {supplier.category} - {supplier.completedOrders} órdenes completadas
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600">${supplier.totalPurchases.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    {((supplier.totalPurchases / totalSpent) * 100).toFixed(1)}% del total
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
