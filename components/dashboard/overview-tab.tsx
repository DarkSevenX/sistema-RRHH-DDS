"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, TrendingUp, Clock, AlertTriangle } from "lucide-react"
import { getEmployees, getAttendance, getPerformanceReviews } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export function OverviewTab() {
  const employees = getEmployees()
  const attendance = getAttendance()
  const reviews = getPerformanceReviews()

  const activeEmployees = employees.filter((e) => e.status === "active").length
  const avgPerformance = Math.round(employees.reduce((sum, e) => sum + e.performanceScore, 0) / employees.length)
  const avgAttendance = Math.round(employees.reduce((sum, e) => sum + e.attendanceRate, 0) / employees.length)
  const lowPerformers = employees.filter((e) => e.performanceScore < 80).length

  const departmentData = employees.reduce((acc: any, emp) => {
    const dept = emp.department
    if (!acc[dept]) {
      acc[dept] = { name: dept, count: 0, avgPerformance: 0, totalPerformance: 0 }
    }
    acc[dept].count++
    acc[dept].totalPerformance += emp.performanceScore
    acc[dept].avgPerformance = Math.round(acc[dept].totalPerformance / acc[dept].count)
    return acc
  }, {})

  const departmentChartData = Object.values(departmentData)

  const performanceDistribution = [
    { name: "Excelente (90-100)", value: employees.filter((e) => e.performanceScore >= 90).length, color: "#10b981" },
    {
      name: "Bueno (80-89)",
      value: employees.filter((e) => e.performanceScore >= 80 && e.performanceScore < 90).length,
      color: "#3b82f6",
    },
    {
      name: "Regular (70-79)",
      value: employees.filter((e) => e.performanceScore >= 70 && e.performanceScore < 80).length,
      color: "#f59e0b",
    },
    { name: "Bajo (<70)", value: employees.filter((e) => e.performanceScore < 70).length, color: "#ef4444" },
  ]

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date.toISOString().split("T")[0]
  })

  const attendanceTrendData = last7Days.map((date) => {
    const dayAttendance = attendance.filter((a) => a.date === date && a.type === "entrada")
    return {
      date: new Date(date).toLocaleDateString("es", { weekday: "short", day: "numeric" }),
      asistencia: dayAttendance.length,
      porcentaje: Math.round((dayAttendance.length / employees.length) * 100),
    }
  })

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4" />
              {"Total Empleados"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{activeEmployees}</div>
            <p className="text-xs text-muted-foreground mt-1">{"Activos en la organización"}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {"Desempeño Promedio"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{avgPerformance}%</div>
            <p className="text-xs text-muted-foreground mt-1">{"Calificación general"}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {"Asistencia Promedio"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{avgAttendance}%</div>
            <p className="text-xs text-muted-foreground mt-1">{"Tasa de asistencia"}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              {"Bajo Desempeño"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{lowPerformers}</div>
            <p className="text-xs text-muted-foreground mt-1">{"Empleados requieren atención"}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{"Empleados por Departamento"}</CardTitle>
            <CardDescription>{"Distribución del personal y desempeño promedio"}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Legend />
                <Bar dataKey="count" fill="hsl(var(--primary))" name="Empleados" />
                <Bar dataKey="avgPerformance" fill="hsl(var(--accent))" name="Desempeño %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{"Distribución de Desempeño"}</CardTitle>
            <CardDescription>{"Clasificación de empleados por nivel de rendimiento"}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={performanceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {performanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{"Tendencia de Asistencia - Últimos 7 Días"}</CardTitle>
          <CardDescription>{"Seguimiento diario de la asistencia del personal"}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceTrendData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="asistencia"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                name="Empleados"
              />
              <Line
                type="monotone"
                dataKey="porcentaje"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                name="Porcentaje %"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
