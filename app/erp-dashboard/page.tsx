"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { ExecutiveOverview } from "@/components/erp-dashboard/executive-overview"
import { ProfitabilityTab } from "@/components/erp-dashboard/profitability-tab"
import { OperationsTab } from "@/components/erp-dashboard/operations-tab"
import { AlertsTab } from "@/components/erp-dashboard/alerts-tab"

export default function ERPDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Dashboard Ejecutivo ERP</h1>
                <p className="text-sm text-muted-foreground">Vista consolidada de todos los módulos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Resumen Ejecutivo</TabsTrigger>
            <TabsTrigger value="profitability">Rentabilidad</TabsTrigger>
            <TabsTrigger value="operations">Operaciones</TabsTrigger>
            <TabsTrigger value="alerts">Alertas & Decisiones</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <ExecutiveOverview />
          </TabsContent>

          <TabsContent value="profitability" className="space-y-6 mt-6">
            <ProfitabilityTab />
          </TabsContent>

          <TabsContent value="operations" className="space-y-6 mt-6">
            <OperationsTab />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6 mt-6">
            <AlertsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
