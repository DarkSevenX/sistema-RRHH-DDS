"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export function OperationsTab() {
  // Métricas operativas consolidadas
  const operationsKPIs = {
    employeeProductivity: 8.5,
    averageAttendance: 94.5,
    inventoryTurnover: 4.2,
    orderFulfillment: 96.8,
    customerSatisfaction: 4.7,
    onTimeDelivery: 92.3,
  }

  // Productividad por departamento
  const departmentProductivity = [
    { department: "Ventas", employees: 8, revenue: 1850000, perEmployee: 231250, efficiency: 95 },
    { department: "Operaciones", employees: 7, revenue: 710000, perEmployee: 101429, efficiency: 88 },
    { department: "Administración", employees: 5, revenue: 285000, perEmployee: 57000, efficiency: 82 },
  ]

  // Eficiencia de inventario
  const inventoryEfficiency = [
    { month: "Ene", turnover: 3.8, daysStock: 95, stockout: 2 },
    { month: "Feb", turnover: 3.9, daysStock: 92, stockout: 1 },
    { month: "Mar", turnover: 4.0, daysStock: 90, stockout: 1 },
    { month: "Abr", turnover: 4.1, daysStock: 88, stockout: 0 },
    { month: "May", turnover: 4.2, daysStock: 86, stockout: 1 },
    { month: "Jun", turnover: 4.3, daysStock: 84, stockout: 0 },
  ]

  // Asistencia y ausentismo
  const attendanceData = [
    { week: "S1", attendance: 93.5, absences: 6.5, lateArrivals: 4.2 },
    { week: "S2", attendance: 94.2, absences: 5.8, lateArrivals: 3.8 },
    { week: "S3", attendance: 95.1, absences: 4.9, lateArrivals: 3.2 },
    { week: "S4", attendance: 94.8, absences: 5.2, lateArrivals: 3.5 },
  ]

  // Cumplimiento de pedidos
  const orderMetrics = [
    { week: "S1", total: 48, onTime: 44, delayed: 4, fulfillment: 91.7 },
    { week: "S2", total: 52, onTime: 49, delayed: 3, fulfillment: 94.2 },
    { week: "S3", total: 55, onTime: 53, delayed: 2, fulfillment: 96.4 },
    { week: "S4", total: 50, onTime: 48, delayed: 2, fulfillment: 96.0 },
  ]

  // Alertas operativas
  const operationalAlerts = [
    { type: "warning", message: "3 empleados con asistencia < 90% este mes", priority: "media" },
    { type: "info", message: "Rotación de inventario en nivel óptimo (4.2x)", priority: "baja" },
    { type: "success", message: "Cumplimiento de pedidos superó meta (96.8%)", priority: "baja" },
    { type: "warning", message: "2 productos con stock bajo el mínimo requerido", priority: "alta" },
  ]

  return (
    <div className="space-y-6">
      {/* KPIs Operativos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Productividad Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{operationsKPIs.employeeProductivity}/10</div>
            <p className="text-xs text-muted-foreground mt-1">Índice de eficiencia laboral</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Asistencia Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{operationsKPIs.averageAttendance}%</div>
            <p className="text-xs text-muted-foreground mt-1">Últimos 30 días</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rotación Inventario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{operationsKPIs.inventoryTurnover}x</div>
            <p className="text-xs text-muted-foreground mt-1">Veces por trimestre</p>
          </CardContent>
        </Card>
      </div>

      {/* Productividad por Departamento */}
      <Card>
        <CardHeader>
          <CardTitle>Productividad por Departamento</CardTitle>
          <CardDescription>Ingresos por empleado y eficiencia operativa</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={departmentProductivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip formatter={(value) => `$${(Number(value) / 1000).toFixed(0)}K`} />
              <Legend />
              <Bar dataKey="perEmployee" name="Ingreso por Empleado" fill="hsl(var(--chart-1))" />
            </BarChart>
          </ResponsiveContainer>

          <div className="space-y-2">
            {departmentProductivity.map((dept) => (
              <div key={dept.department} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{dept.department}</p>
                  <p className="text-sm text-muted-foreground">{dept.employees} empleados</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{dept.efficiency}%</p>
                  <p className="text-xs text-muted-foreground">Eficiencia</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Eficiencia de Inventario */}
      <Card>
        <CardHeader>
          <CardTitle>Eficiencia de Inventario</CardTitle>
          <CardDescription>Rotación y días de inventario</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={inventoryEfficiency}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="turnover"
                name="Rotación (veces)"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="daysStock"
                name="Días en Stock"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Asistencia y Ausentismo */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Asistencia y Puntualidad</CardTitle>
            <CardDescription>Últimas 4 semanas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar dataKey="attendance" name="Asistencia" fill="hsl(var(--chart-3))" />
                <Bar dataKey="absences" name="Ausentismo" fill="hsl(var(--chart-2))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cumplimiento de Pedidos</CardTitle>
            <CardDescription>Pedidos a tiempo vs retrasados</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={orderMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="onTime" name="A Tiempo" fill="hsl(var(--chart-3))" />
                <Bar dataKey="delayed" name="Retrasados" fill="hsl(var(--chart-2))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Alertas Operativas */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas Operativas</CardTitle>
          <CardDescription>Notificaciones y recomendaciones del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {operationalAlerts.map((alert, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-3 rounded-lg border ${
                  alert.priority === "alta"
                    ? "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
                    : alert.priority === "media"
                      ? "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800"
                      : "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
                }`}
              >
                <AlertTriangle
                  className={`h-5 w-5 mt-0.5 ${
                    alert.priority === "alta"
                      ? "text-red-600 dark:text-red-400"
                      : alert.priority === "media"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-blue-600 dark:text-blue-400"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">Prioridad: {alert.priority}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
