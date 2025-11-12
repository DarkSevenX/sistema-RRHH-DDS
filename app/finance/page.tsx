"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, TrendingDown, PieChartIcon, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { getFinancialMetrics } from "@/lib/mock-data"
import { FinancialOverviewTab } from "@/components/finance/overview-tab"
import { TransactionsTab } from "@/components/finance/transactions-tab"
import { BudgetTab } from "@/components/finance/budget-tab"
import { ReportsTab } from "@/components/finance/reports-tab"

export default function FinancePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [metrics, setMetrics] = useState<any[]>([])

  useEffect(() => {
    setMetrics(getFinancialMetrics())
  }, [])

  const currentMonthMetrics = metrics[0] || { revenue: 0, expenses: 0, profit: 0, profitMargin: 0 }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto p-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Módulo de Finanzas</h1>
              <p className="text-muted-foreground">Gestión financiera y presupuestaria</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">${currentMonthMetrics.revenue.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gastos del Mes</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">${currentMonthMetrics.expenses.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Utilidad Neta</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${currentMonthMetrics.profit >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  ${currentMonthMetrics.profit.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Margen de Utilidad</CardTitle>
                <PieChartIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${currentMonthMetrics.profitMargin >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {currentMonthMetrics.profitMargin.toFixed(1)}%
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <main className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="transactions">Transacciones</TabsTrigger>
            <TabsTrigger value="budget">Presupuesto</TabsTrigger>
            <TabsTrigger value="reports">Reportes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <FinancialOverviewTab />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionsTab />
          </TabsContent>

          <TabsContent value="budget">
            <BudgetTab />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
