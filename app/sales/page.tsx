"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Users, DollarSign, TrendingUp, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { getSalesMetrics, getSales, getCustomers } from "@/lib/mock-data"
import { SalesOverviewTab } from "@/components/sales/overview-tab"
import { CustomersTab } from "@/components/sales/customers-tab"
import { SalesTransactionsTab } from "@/components/sales/transactions-tab"
import { CommissionsTab } from "@/components/sales/commissions-tab"
import { SalesReportsTab } from "@/components/sales/reports-tab"

export default function SalesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [metrics, setMetrics] = useState<any[]>([])
  const [sales, setSales] = useState<any[]>([])
  const [customers, setCustomers] = useState<any[]>([])

  useEffect(() => {
    setMetrics(getSalesMetrics())
    setSales(getSales())
    setCustomers(getCustomers())
  }, [])

  const currentMonthMetrics = metrics[0] || { totalSales: 0, totalCommissions: 0, averageTicket: 0, numberOfSales: 0 }
  const activeCustomers = customers.filter((c) => c.status === "active").length

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto p-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Módulo de Ventas</h1>
              <p className="text-muted-foreground">CRM y gestión de comisiones</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ventas del Mes</CardTitle>
                <ShoppingCart className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  ${currentMonthMetrics.totalSales.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">{currentMonthMetrics.numberOfSales} transacciones</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comisiones</CardTitle>
                <DollarSign className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  ${currentMonthMetrics.totalCommissions.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Este mes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  ${Math.round(currentMonthMetrics.averageTicket).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Por venta</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
                <Users className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{activeCustomers}</div>
                <p className="text-xs text-muted-foreground">Base de clientes</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <main className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="customers">Clientes</TabsTrigger>
            <TabsTrigger value="transactions">Ventas</TabsTrigger>
            <TabsTrigger value="commissions">Comisiones</TabsTrigger>
            <TabsTrigger value="reports">Reportes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <SalesOverviewTab />
          </TabsContent>

          <TabsContent value="customers">
            <CustomersTab />
          </TabsContent>

          <TabsContent value="transactions">
            <SalesTransactionsTab />
          </TabsContent>

          <TabsContent value="commissions">
            <CommissionsTab />
          </TabsContent>

          <TabsContent value="reports">
            <SalesReportsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
