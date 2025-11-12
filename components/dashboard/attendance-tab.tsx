"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getEmployees, getAttendance } from "@/lib/mock-data"
import { Calendar, Clock, UserCheck, UserX } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { Badge } from "@/components/ui/badge"

export function AttendanceTab() {
  const employees = getEmployees()
  const attendance = getAttendance()

  const today = new Date().toISOString().split("T")[0]
  const todayAttendance = attendance.filter((a) => a.date === today && a.type === "entrada")
  const presentToday = todayAttendance.length
  const absentToday = employees.length - presentToday

  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    return date.toISOString().split("T")[0]
  })

  const monthlyTrend = last30Days.map((date) => {
    const dayAttendance = attendance.filter((a) => a.date === date && a.type === "entrada")
    return {
      date: new Date(date).toLocaleDateString("es", { day: "numeric", month: "short" }),
      asistencias: dayAttendance.length,
      ausencias: employees.length - dayAttendance.length,
      porcentaje: Math.round((dayAttendance.length / employees.length) * 100),
    }
  })

  const employeeAttendanceStats = employees
    .map((emp) => {
      const empRecords = attendance.filter((a) => a.employeeId === emp.id && a.type === "entrada")
      const lateArrivals = empRecords.filter((a) => {
        const [hour] = a.time.split(":").map(Number)
        return hour >= 9
      }).length

      return {
        ...emp,
        totalDays: empRecords.length,
        lateArrivals,
        punctualityRate:
          empRecords.length > 0 ? Math.round(((empRecords.length - lateArrivals) / empRecords.length) * 100) : 0,
      }
    })
    .sort((a, b) => b.totalDays - a.totalDays)

  const departmentAttendance = employees.reduce((acc: any, emp) => {
    const dept = emp.department
    if (!acc[dept]) {
      acc[dept] = { name: dept, present: 0, absent: 0, total: 0 }
    }
    acc[dept].total++
    const hasAttendance = todayAttendance.some((a) => a.employeeId === emp.id)
    if (hasAttendance) {
      acc[dept].present++
    } else {
      acc[dept].absent++
    }
    return acc
  }, {})

  const departmentData = Object.values(departmentAttendance).map((dept: any) => ({
    ...dept,
    porcentaje: Math.round((dept.present / dept.total) * 100),
  }))

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-success">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              {"Presentes Hoy"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{presentToday}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((presentToday / employees.length) * 100)}% {"del personal"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-destructive">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <UserX className="w-4 h-4" />
              {"Ausentes Hoy"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{absentToday}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((absentToday / employees.length) * 100)}% {"del personal"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {"Llegadas Tardías"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {todayAttendance.filter((a) => Number.parseInt(a.time.split(":")[0]) >= 9).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{"Después de las 9:00 AM"}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {"Promedio Mensual"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {Math.round(monthlyTrend.reduce((sum, day) => sum + day.porcentaje, 0) / monthlyTrend.length)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">{"Últimos 30 días"}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{"Tendencia de Asistencia Mensual"}</CardTitle>
          <CardDescription>{"Seguimiento diario de asistencias y ausencias"}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
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
                dataKey="porcentaje"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                name="Porcentaje de Asistencia %"
              />
              <Line
                type="monotone"
                dataKey="asistencias"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                name="Presentes"
              />
              <Line
                type="monotone"
                dataKey="ausencias"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                name="Ausentes"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{"Asistencia por Departamento (Hoy)"}</CardTitle>
          <CardDescription>{"Comparación de presencia entre departamentos"}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Legend />
              <Bar dataKey="present" fill="hsl(var(--success))" name="Presentes" />
              <Bar dataKey="absent" fill="hsl(var(--destructive))" name="Ausentes" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{"Estadísticas por Empleado"}</CardTitle>
          <CardDescription>{"Historial de asistencia y puntualidad (últimos 30 días)"}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-muted-foreground">{"Empleado"}</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">{"Departamento"}</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">{"Días Trabajados"}</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">{"Llegadas Tarde"}</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">{"Puntualidad"}</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">{"Estado"}</th>
                </tr>
              </thead>
              <tbody>
                {employeeAttendanceStats.slice(0, 15).map((emp) => (
                  <tr key={emp.id} className="border-b hover:bg-secondary/50">
                    <td className="p-3">
                      <div>
                        <p className="font-medium text-foreground">{emp.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {"ID: "}
                          {emp.id}
                        </p>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{emp.department}</Badge>
                    </td>
                    <td className="text-center p-3 font-medium">{emp.totalDays}</td>
                    <td className="text-center p-3 font-medium text-warning">{emp.lateArrivals}</td>
                    <td className="text-center p-3">
                      <span className="font-bold">{emp.punctualityRate}%</span>
                    </td>
                    <td className="text-center p-3">
                      {emp.punctualityRate >= 95 ? (
                        <Badge className="bg-success text-white">{"Excelente"}</Badge>
                      ) : emp.punctualityRate >= 85 ? (
                        <Badge className="bg-primary">{"Bueno"}</Badge>
                      ) : (
                        <Badge variant="destructive">{"Mejorar"}</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
