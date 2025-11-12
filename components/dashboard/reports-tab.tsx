"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getEmployees, getAttendance, getPerformanceReviews } from "@/lib/mock-data"
import { FileText, Download, TrendingUp, Users, DollarSign, Calendar } from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Badge } from "@/components/ui/badge"

export function ReportsTab() {
  const employees = getEmployees()
  const attendance = getAttendance()
  const reviews = getPerformanceReviews()

  // Análisis de rotación potencial (basado en desempeño y asistencia)
  const retentionRisk = employees
    .map((emp) => {
      const score = emp.performanceScore * 0.6 + emp.attendanceRate * 0.4
      let risk = "Bajo"
      if (score < 70) risk = "Alto"
      else if (score < 85) risk = "Medio"

      return {
        ...emp,
        riskScore: score,
        risk,
      }
    })
    .sort((a, b) => a.riskScore - b.riskScore)

  const highRisk = retentionRisk.filter((e) => e.risk === "Alto").length
  const mediumRisk = retentionRisk.filter((e) => e.risk === "Medio").length
  const lowRisk = retentionRisk.filter((e) => e.risk === "Bajo").length

  const riskData = [
    { name: "Bajo Riesgo", value: lowRisk, color: "#10b981" },
    { name: "Riesgo Medio", value: mediumRisk, color: "#f59e0b" },
    { name: "Alto Riesgo", value: highRisk, color: "#ef4444" },
  ]

  // Análisis de compensación vs desempeño
  const compensationAnalysis = employees.map((emp) => ({
    name: emp.name.split(" ")[0],
    salary: emp.salary / 1000,
    performance: emp.performanceScore,
    department: emp.department,
  }))

  // Proyección de costos de rotación
  const avgSalary = employees.reduce((sum, e) => sum + e.salary, 0) / employees.length
  const turnoverCost = avgSalary * 1.5 // Costo estimado de reemplazo
  const projectedTurnover = Math.round(employees.length * 0.15) // 15% de rotación estimada
  const totalTurnoverCost = turnoverCost * projectedTurnover

  // Análisis de antigüedad
  const tenureAnalysis = employees.map((emp) => {
    const years = new Date().getFullYear() - new Date(emp.hireDate).getFullYear()
    return { ...emp, tenure: years }
  })

  const tenureDistribution = [
    { range: "0-1 años", count: tenureAnalysis.filter((e) => e.tenure <= 1).length },
    { range: "1-2 años", count: tenureAnalysis.filter((e) => e.tenure > 1 && e.tenure <= 2).length },
    { range: "2-3 años", count: tenureAnalysis.filter((e) => e.tenure > 2 && e.tenure <= 3).length },
    { range: "3-4 años", count: tenureAnalysis.filter((e) => e.tenure > 3 && e.tenure <= 4).length },
    { range: "4+ años", count: tenureAnalysis.filter((e) => e.tenure > 4).length },
  ]

  // Productividad por inversión
  const departmentROI = employees.reduce((acc: any, emp) => {
    const dept = emp.department
    if (!acc[dept]) {
      acc[dept] = { department: dept, totalSalary: 0, avgPerformance: 0, count: 0, totalPerf: 0 }
    }
    acc[dept].totalSalary += emp.salary
    acc[dept].totalPerf += emp.performanceScore
    acc[dept].count++
    acc[dept].avgPerformance = Math.round(acc[dept].totalPerf / acc[dept].count)
    return acc
  }, {})

  const roiData = Object.values(departmentROI).map((dept: any) => ({
    department: dept.department,
    salaryK: Math.round(dept.totalSalary / 1000),
    performance: dept.avgPerformance,
    roi: Math.round((dept.avgPerformance / (dept.totalSalary / 1000)) * 100) / 100,
  }))

  const downloadReport = (reportType: string) => {
    // Función placeholder para descarga
    console.log(`Descargando reporte: ${reportType}`)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-destructive">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {"Alto Riesgo de Salida"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{highRisk}</div>
            <p className="text-xs text-muted-foreground mt-1">{"Empleados con baja retención"}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4" />
              {"Rotación Proyectada"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{projectedTurnover}</div>
            <p className="text-xs text-muted-foreground mt-1">{"Empleados estimados (15%/año)"}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              {"Costo de Rotación"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">${Math.round(totalTurnoverCost / 1000)}K</div>
            <p className="text-xs text-muted-foreground mt-1">{"Proyección anual"}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {"Antigüedad Promedio"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {(tenureAnalysis.reduce((sum, e) => sum + e.tenure, 0) / tenureAnalysis.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{"Años en la empresa"}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{"Análisis de Compensación vs Desempeño"}</CardTitle>
                <CardDescription>{"Relación entre salario y rendimiento por empleado"}</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => downloadReport("compensacion")}>
                <Download className="w-4 h-4 mr-2" />
                {"Exportar"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={compensationAnalysis.slice(0, 15)}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <YAxis
                  yAxisId="left"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  label={{
                    value: "Salario (K)",
                    angle: -90,
                    position: "insideLeft",
                    fill: "hsl(var(--muted-foreground))",
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  label={{
                    value: "Desempeño %",
                    angle: 90,
                    position: "insideRight",
                    fill: "hsl(var(--muted-foreground))",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="salary"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                  name="Salario (K$)"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="performance"
                  stroke="hsl(var(--success))"
                  fill="hsl(var(--success))"
                  fillOpacity={0.3}
                  name="Desempeño %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{"Análisis de Riesgo de Rotación"}</CardTitle>
            <CardDescription>{"Clasificación por probabilidad de salida"}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
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
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{"ROI por Departamento"}</CardTitle>
              <CardDescription>{"Retorno sobre inversión: desempeño vs costo salarial"}</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => downloadReport("roi")}>
              <Download className="w-4 h-4 mr-2" />
              {"Exportar"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roiData}>
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
              <Bar dataKey="performance" fill="hsl(var(--success))" name="Desempeño %" />
              <Bar dataKey="salaryK" fill="hsl(var(--primary))" name="Salario Total (K$)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{"Distribución de Antigüedad"}</CardTitle>
          <CardDescription>{"Tiempo de permanencia en la organización"}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tenureDistribution}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="range" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--accent))" name="Empleados" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{"Empleados en Riesgo de Rotación - Acción Requerida"}</CardTitle>
          <CardDescription>{"Personal que requiere intervención inmediata"}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {retentionRisk
              .filter((e) => e.risk === "Alto")
              .slice(0, 8)
              .map((emp) => (
                <div key={emp.id} className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-lg">{emp.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {emp.position} - {emp.department}
                      </p>
                    </div>
                    <Badge variant="destructive" className="text-xs">
                      {"Riesgo Alto"}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="p-2 rounded bg-background">
                      <p className="text-muted-foreground text-xs">{"Desempeño"}</p>
                      <p className="font-bold text-foreground">{emp.performanceScore}%</p>
                    </div>
                    <div className="p-2 rounded bg-background">
                      <p className="text-muted-foreground text-xs">{"Asistencia"}</p>
                      <p className="font-bold text-foreground">{emp.attendanceRate}%</p>
                    </div>
                    <div className="p-2 rounded bg-background">
                      <p className="text-muted-foreground text-xs">{"Score Retención"}</p>
                      <p className="font-bold text-destructive">{Math.round(emp.riskScore)}</p>
                    </div>
                    <div className="p-2 rounded bg-background">
                      <p className="text-muted-foreground text-xs">{"ID"}</p>
                      <p className="font-mono font-bold text-foreground">{emp.id}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t text-sm">
                    <p className="font-medium text-warning mb-1">{"🎯 Recomendaciones:"}</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 text-xs">
                      <li>{"Programar reunión 1-on-1 con gerente inmediato"}</li>
                      <li>{"Evaluar ajuste salarial o beneficios adicionales"}</li>
                      <li>{"Considerar plan de desarrollo profesional"}</li>
                      <li>{"Revisar carga de trabajo y satisfacción laboral"}</li>
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => downloadReport("asistencia-mensual")}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="w-5 h-5 text-primary" />
              {"Reporte de Asistencia Mensual"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {"Análisis detallado de patrones de asistencia, puntualidad y ausencias por departamento"}
            </p>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              {"Descargar PDF"}
            </Button>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => downloadReport("evaluaciones-desempeno")}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="w-5 h-5 text-success" />
              {"Evaluaciones de Desempeño"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {"Consolidado de evaluaciones trimestrales con métricas de rendimiento individual y grupal"}
            </p>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              {"Descargar Excel"}
            </Button>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => downloadReport("proyeccion-costos")}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="w-5 h-5 text-accent" />
              {"Proyección de Costos"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {"Análisis financiero de costos de personal, rotación y proyecciones para el próximo trimestre"}
            </p>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              {"Descargar PDF"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
