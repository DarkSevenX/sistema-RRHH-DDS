"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutDashboard, Users, TrendingUp, FileText, Clock, DollarSign, Calendar } from "lucide-react"
import { OverviewTab } from "@/components/dashboard/overview-tab"
import { EmployeesTab } from "@/components/dashboard/employees-tab"
import { PerformanceTab } from "@/components/dashboard/performance-tab"
import { ReportsTab } from "@/components/dashboard/reports-tab"
import { AttendanceTab } from "@/components/dashboard/attendance-tab"
import { PayrollTab } from "@/components/dashboard/payroll-tab"
import { VacationsTab } from "@/components/dashboard/vacations-tab"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { initializeMockData } from "@/lib/mock-data"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    initializeMockData()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">{"Dashboard Gerencial"}</h1>
          <p className="text-muted-foreground text-lg">{"Sistema de Soporte a Decisiones - Recursos Humanos"}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">{"Resumen"}</span>
            </TabsTrigger>
            <TabsTrigger value="employees" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">{"Empleados"}</span>
            </TabsTrigger>
            <TabsTrigger value="attendance" className="gap-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">{"Asistencia"}</span>
            </TabsTrigger>
            <TabsTrigger value="payroll" className="gap-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">{"Nómina"}</span>
            </TabsTrigger>
            <TabsTrigger value="vacations" className="gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">{"Vacaciones"}</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">{"Desempeño"}</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">{"Reportes"}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="employees" className="space-y-6">
            <EmployeesTab />
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <AttendanceTab />
          </TabsContent>

          <TabsContent value="payroll" className="space-y-6">
            <PayrollTab />
          </TabsContent>

          <TabsContent value="vacations" className="space-y-6">
            <VacationsTab />
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <PerformanceTab />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <ReportsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
