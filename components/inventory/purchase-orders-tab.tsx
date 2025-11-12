"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getPurchaseOrders, getProducts } from "@/lib/mock-data"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

export function PurchaseOrdersTab() {
  const [orders, setOrders] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  useEffect(() => {
    setOrders(getPurchaseOrders())
    setProducts(getProducts())
  }, [])

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = filterStatus === "all" || o.status === filterStatus
    return matchesStatus
  })

  const totalPending = filteredOrders.filter((o) => o.status === "pending").reduce((sum, o) => sum + o.total, 0)
  const totalReceived = filteredOrders.filter((o) => o.status === "received").reduce((sum, o) => sum + o.total, 0)
  const pendingCount = filteredOrders.filter((o) => o.status === "pending").length

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Órdenes Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">${totalPending.toLocaleString()} en tránsito</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recibido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalReceived.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Órdenes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredOrders.length}</div>
            <p className="text-xs text-muted-foreground">Período actual</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Órdenes de Compra</CardTitle>
          <CardDescription>Historial de compras a proveedores</CardDescription>
          <div className="flex gap-4 mt-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="received">Recibidas</SelectItem>
                <SelectItem value="cancelled">Canceladas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredOrders.map((order) => (
              <Collapsible
                key={order.id}
                open={expandedOrder === order.id}
                onOpenChange={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div className="border rounded-lg">
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-4 hover:bg-accent rounded-lg transition-colors">
                      <div className="flex items-center gap-4">
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${expandedOrder === order.id ? "rotate-180" : ""}`}
                        />
                        <div className="text-left">
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.supplier}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-green-600">${order.total.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Fecha: {order.date}</p>
                        </div>
                        <Badge
                          variant={
                            order.status === "received"
                              ? "default"
                              : order.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {order.status === "received"
                            ? "Recibida"
                            : order.status === "pending"
                              ? "Pendiente"
                              : "Cancelada"}
                        </Badge>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-4 border-t">
                      <div className="pt-4 space-y-2">
                        <p className="text-sm text-muted-foreground">Entrega estimada: {order.expectedDelivery}</p>
                        <div className="mt-4">
                          <p className="font-medium mb-2">Productos:</p>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Producto</TableHead>
                                <TableHead className="text-right">Cantidad</TableHead>
                                <TableHead className="text-right">Precio Unit.</TableHead>
                                <TableHead className="text-right">Subtotal</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {order.items.map((item: any, index: number) => {
                                const product = products.find((p) => p.id === item.productId)
                                return (
                                  <TableRow key={index}>
                                    <TableCell>
                                      <div>
                                        <div className="font-medium">{product?.name}</div>
                                        <div className="text-xs text-muted-foreground">{product?.sku}</div>
                                      </div>
                                    </TableCell>
                                    <TableCell className="text-right">{item.quantity}</TableCell>
                                    <TableCell className="text-right">${item.unitPrice.toLocaleString()}</TableCell>
                                    <TableCell className="text-right font-medium">
                                      ${(item.quantity * item.unitPrice).toLocaleString()}
                                    </TableCell>
                                  </TableRow>
                                )
                              })}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
