"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, TrendingDown, AlertCircle, ShoppingCart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { getProducts, getInventoryMovements, getPurchaseOrders } from "@/lib/mock-data"
import { InventoryOverviewTab } from "@/components/inventory/overview-tab"
import { ProductsTab } from "@/components/inventory/products-tab"
import { MovementsTab } from "@/components/inventory/movements-tab"
import { PurchaseOrdersTab } from "@/components/inventory/purchase-orders-tab"
import { SuppliersTab } from "@/components/inventory/suppliers-tab"

export default function InventoryPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [products, setProducts] = useState<any[]>([])
  const [movements, setMovements] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    setProducts(getProducts())
    setMovements(getInventoryMovements())
    setOrders(getPurchaseOrders())
  }, [])

  const totalProducts = products.length
  const lowStockProducts = products.filter((p) => p.stock <= p.minStock).length
  const totalStockValue = products.reduce((sum, p) => sum + p.stock * p.unitPrice, 0)
  const pendingOrders = orders.filter((o) => o.status === "pending").length

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto p-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Módulo de Inventario</h1>
              <p className="text-muted-foreground">Gestión de productos, almacén y compras</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
                <Package className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{totalProducts}</div>
                <p className="text-xs text-muted-foreground">En catálogo</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Valor del Inventario</CardTitle>
                <TrendingDown className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">${totalStockValue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Stock actual</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alertas de Stock</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{lowStockProducts}</div>
                <p className="text-xs text-muted-foreground">Productos bajo mínimo</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Órdenes Pendientes</CardTitle>
                <ShoppingCart className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{pendingOrders}</div>
                <p className="text-xs text-muted-foreground">En tránsito</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <main className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="products">Productos</TabsTrigger>
            <TabsTrigger value="movements">Movimientos</TabsTrigger>
            <TabsTrigger value="orders">Órdenes de Compra</TabsTrigger>
            <TabsTrigger value="suppliers">Proveedores</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <InventoryOverviewTab />
          </TabsContent>

          <TabsContent value="products">
            <ProductsTab />
          </TabsContent>

          <TabsContent value="movements">
            <MovementsTab />
          </TabsContent>

          <TabsContent value="orders">
            <PurchaseOrdersTab />
          </TabsContent>

          <TabsContent value="suppliers">
            <SuppliersTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
