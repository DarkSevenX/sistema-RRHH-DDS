"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getEmployees, getPerformanceReviews } from "@/lib/mock-data"
import { TrendingUp, Award, AlertCircle, Target } from "lucide-react"
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts"
import { Badge } from "@/components/ui/badge"

export function PerformanceTab() {
  const employees = getEmployees()
  const reviews = getPerformanceReviews()

  const avgPerformance = Math.round(employees.reduce((sum, e) => sum + e.performanceScore, 0) / employees.length)
  const topPerformers = employees.filter((e) => e.performanceScore >= 90).length
  const needsImprovement = employees.filter((e) => e.performanceScore < 75).length

  const departmentPerformance = employees.reduce((acc: any, emp) => {
    const dept = emp.department
    if (!acc[dept]) {
      acc[dept] = {
        department: dept,
        total: 0,
        sum: 0,
        employees: [],
      }
    }
    acc[dept].total++
    acc[dept].sum += emp.performanceScore
    acc[dept].employees.push(emp)
    return acc
  }, {})

  const deptData = Object.values(departmentPerformance).map((dept: any) => ({
    department: dept.department,
    avgScore: Math.round(dept.sum / dept.total),
    employees: dept.total,
  }))

  const performanceDistribution = [
    { range: "90-100", count: employees.filter((e) => e.performanceScore >= 90).length, color: "#10b981" },
    {
      range: "80-89",
      count: employees.filter((e) => e.performanceScore >= 80 && e.performanceScore < 90).length,
      color: "#3b82f6",
    },
    {
      range: "70-79",
      count: employees.filter((e) => e.performanceScore >= 70 && e.performanceScore < 80).length,
      color: "#f59e0b",
    },
    {
      range: "60-69",
      count: employees.filter((e) => e.performanceScore >= 60 && e.performanceScore < 70).length,
      color: "#ef4444",
    },
    { range: "<60", count: employees.filter((e) => e.performanceScore < 60).length, color: "#991b1b" },
  ]

  const scatterData = employees.map((emp) => ({
    name: emp.name,
    performance: emp.performanceScore,
    attendance: emp.attendanceRate,
    salary: emp.salary / 1000,
  }))

  const topEmployees = [...employees].sort((a, b) => b.performanceScore - a.performanceScore).slice(0, 10)

  const lowEmployees = [...employees]
    .filter((e) => e.performanceScore < 80)
    .sort((a, b) => a.performanceScore - b.performanceScore)
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Target className="w-4 h-4" />
              {"Promedio General"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{avgPerformance}%</div>
            <p className="text-xs text-muted-foreground mt-1">{"Desempeño organizacional"}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Award className="w-4 h-4" />
              {"Alto Rendimiento"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{topPerformers}</div>
            <p className="text-xs text-muted-foreground mt-1">{"Empleados con 90% o más"}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {"Necesitan Apoyo"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{needsImprovement}</div>
            <p className="text-xs text-muted-foreground mt-1">{"Empleados bajo 75%"}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {"Tendencia"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">+2.5%</div>
            <p className="text-xs text-muted-foreground mt-1">{"vs. trimestre anterior"}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{"Desempeño vs Asistencia"}</CardTitle>
            <CardDescription>{"Correlación entre rendimiento y presencia"}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="attendance"
                  name="Asistencia"
                  unit="%"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  label={{
                    value: "Asistencia %",
                    position: "insideBottom",
                    offset: -5,
                    fill: "hsl(var(--muted-foreground))",
                  }}
                />
                <YAxis
                  dataKey="performance"
                  name="Desempeño"
                  unit="%"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  label={{
                    value: "Desempeño %",
                    angle: -90,
                    position: "insideLeft",
                    fill: "hsl(var(--muted-foreground))",
                  }}
                />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Scatter name="Empleados" data={scatterData} fill="hsl(var(--primary))">
                  {scatterData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.performance >= 90
                          ? "#10b981"
                          : entry.performance >= 80
                            ? "#3b82f6"
                            : entry.performance >= 70
                              ? "#f59e0b"
                              : "#ef4444"
                      }
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{"Distribución de Desempeño"}</CardTitle>
            <CardDescription>{"Cantidad de empleados por rango de calificación"}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={performanceDistribution}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="range"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  label={{
                    value: "Rango de Desempeño",
                    position: "insideBottom",
                    offset: -5,
                    fill: "hsl(var(--muted-foreground))",
                  }}
                />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Bar dataKey="count" name="Empleados">
                  {performanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{"Desempeño Promedio por Departamento"}</CardTitle>
          <CardDescription>{"Comparación de rendimiento entre áreas"}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={deptData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="department" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Legend />
              <Bar dataKey="avgScore" fill="hsl(var(--primary))" name="Score Promedio %" />
              <Bar dataKey="employees" fill="hsl(var(--accent))" name="Número de Empleados" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-success" />
              {"Top 10 - Mejor Desempeño"}
            </CardTitle>
            <CardDescription>{"Empleados destacados del período"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topEmployees.map((emp, idx) => (
                <div
                  key={emp.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-success text-white flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{emp.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{emp.department}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-success">{emp.performanceScore}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              {"Requieren Atención"}
            </CardTitle>
            <CardDescription>{"Empleados que necesitan plan de mejora"}</CardDescription>
          </CardHeader>
          <CardContent>
            {lowEmployees.length > 0 ? (
              <div className="space-y-3">
                {lowEmployees.map((emp) => (
                  <div key={emp.id} className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{emp.name}</p>
                        <p className="text-sm text-muted-foreground">{emp.position}</p>
                      </div>
                      <Badge variant="destructive">{emp.performanceScore}%</Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{"Departamento:"}</span>
                        <span className="font-medium">{emp.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{"Asistencia:"}</span>
                        <span className="font-medium">{emp.attendanceRate}%</span>
                      </div>
                      <div className="mt-2 pt-2 border-t">
                        <p className="text-xs text-warning">{"⚠️ Recomendar: Plan de desarrollo y capacitación"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                {"¡Excelente! Todos los empleados están por encima del umbral"}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
