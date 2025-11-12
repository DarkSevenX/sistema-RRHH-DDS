"use client"

import { use, useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  TrendingUp,
  Clock,
  AlertCircle,
  User,
  Briefcase,
  GraduationCap,
  Users,
  DollarSign,
  Activity,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { getEmployees, getAttendance, getPerformanceReviews, type Employee } from "@/lib/mock-data"
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts"

export default function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const employees = getEmployees()
    const emp = employees.find((e) => e.id === Number.parseInt(resolvedParams.id))
    setEmployee(emp || null)
    setLoading(false)
  }, [resolvedParams.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando perfil...</p>
        </div>
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Empleado no encontrado</h2>
            <p className="text-muted-foreground mb-4">No se encontró el empleado con ID {resolvedParams.id}</p>
            <Button onClick={() => router.push("/dashboard")}>Volver al Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const attendance = getAttendance().filter((a) => a.employeeId === employee.id)
  const reviews = getPerformanceReviews().filter((r) => r.employeeId === employee.id)

  const yearsOfService = new Date().getFullYear() - new Date(employee.hireDate).getFullYear()
  const monthsOfService = new Date().getMonth() - new Date(employee.hireDate).getMonth()
  const totalMonths = yearsOfService * 12 + monthsOfService

  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    return date.toISOString().split("T")[0]
  })

  const attendanceData = last30Days.map((date) => {
    const dayAttendance = attendance.filter((a) => a.date === date)
    return {
      date: new Date(date).toLocaleDateString("es", { month: "short", day: "numeric" }),
      presente: dayAttendance.length >= 2 ? 1 : 0,
      ausente: dayAttendance.length >= 2 ? 0 : 1,
    }
  })

  const performanceHistory = reviews
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((r) => ({
      fecha: new Date(r.date).toLocaleDateString("es", { year: "numeric", month: "short" }),
      score: r.score,
      evaluador: r.reviewer,
    }))

  const attendanceDays = attendance.length / 2
  const workingDays = 30
  const attendancePercentage = Math.round((attendanceDays / workingDays) * 100)

  const entryTimes = attendance
    .filter((a) => a.type === "entrada")
    .map((a) => {
      const [hours, minutes] = a.time.split(":").map(Number)
      return hours * 60 + minutes
    })
  const avgEntryTime = entryTimes.length > 0 ? Math.round(entryTimes.reduce((a, b) => a + b, 0) / entryTimes.length) : 0
  const avgEntryHours = Math.floor(avgEntryTime / 60)
  const avgEntryMinutes = avgEntryTime % 60

  const exitTimes = attendance
    .filter((a) => a.type === "salida")
    .map((a) => {
      const [hours, minutes] = a.time.split(":").map(Number)
      return hours * 60 + minutes
    })
  const avgExitTime = exitTimes.length > 0 ? Math.round(exitTimes.reduce((a, b) => a + b, 0) / exitTimes.length) : 0
  const avgExitHours = Math.floor(avgExitTime / 60)
  const avgExitMinutes = avgExitTime % 60

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "text-success"
    if (score >= 80) return "text-primary"
    if (score >= 70) return "text-warning"
    return "text-destructive"
  }

  const getPerformanceBadge = (score: number) => {
    if (score >= 90) return <Badge className="bg-success text-white">Excelente</Badge>
    if (score >= 80) return <Badge className="bg-primary">Bueno</Badge>
    if (score >= 70) return <Badge className="bg-warning text-white">Regular</Badge>
    return <Badge variant="destructive">Bajo</Badge>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
        <div className="container mx-auto p-6">
          <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-4 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver al Dashboard
          </Button>

          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-4xl font-bold shadow-lg">
                {employee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">{employee.name}</h1>
                  <p className="text-xl text-muted-foreground mb-3">{employee.position}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-sm">
                      {employee.department}
                    </Badge>
                    <Badge variant={employee.status === "active" ? "default" : "secondary"}>
                      {employee.status === "active" ? "Activo" : "Inactivo"}
                    </Badge>
                    <Badge className="bg-accent text-white">ID: {employee.id}</Badge>
                  </div>
                </div>

                <Card className="bg-card/50 backdrop-blur">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Score General</p>
                      <p className={`text-3xl font-bold ${getPerformanceColor(employee.performanceScore)}`}>
                        {employee.performanceScore}%
                      </p>
                      {getPerformanceBadge(employee.performanceScore)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 backdrop-blur border">
                  <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Antigüedad</p>
                    <p className="font-semibold text-foreground">
                      {yearsOfService} años {monthsOfService > 0 ? `${monthsOfService}m` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 backdrop-blur border">
                  <Clock className="w-5 h-5 text-success flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Asistencia</p>
                    <p className="font-semibold text-foreground">{employee.attendanceRate}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 backdrop-blur border">
                  <TrendingUp className="w-5 h-5 text-accent flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Desempeño</p>
                    <p className="font-semibold text-foreground">{employee.performanceScore}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 backdrop-blur border">
                  <Award className="w-5 h-5 text-warning flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Evaluaciones</p>
                    <p className="font-semibold text-foreground">{reviews.length} revisiones</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium text-sm truncate">{employee.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Teléfono</p>
                    <p className="font-medium text-sm">{employee.phone}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Cédula</p>
                    <p className="font-medium text-sm">{employee.idCard}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Edad</p>
                    <p className="font-medium text-sm">{employee.age} años</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Activity className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Tipo de Sangre</p>
                    <p className="font-medium text-sm">{employee.bloodType}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Dirección</p>
                    <p className="font-medium text-sm">{employee.address}</p>
                    <p className="text-xs text-muted-foreground mt-1">{employee.city}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Contacto de Emergencia</p>
                    <p className="font-medium text-sm">{employee.emergencyContact}</p>
                    <p className="text-xs text-muted-foreground mt-1">{employee.emergencyPhone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Información Laboral
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Puesto Actual</p>
                  <p className="text-lg font-semibold text-foreground">{employee.position}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Departamento</p>
                  <p className="text-lg font-semibold text-foreground">{employee.department}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Fecha de Contratación</p>
                  <p className="text-lg font-semibold text-foreground">
                    {new Date(employee.hireDate).toLocaleDateString("es", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Tiempo en la Empresa</p>
                  <p className="text-lg font-semibold text-foreground">
                    {yearsOfService} años, {totalMonths % 12} meses
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Salario Anual
                  </p>
                  <p className="text-lg font-semibold text-foreground">${employee.salary.toLocaleString("en-US")}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Educación
                  </p>
                  <p className="text-sm font-medium text-foreground leading-relaxed">{employee.education}</p>
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-foreground">Indicadores de Rendimiento</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Desempeño General</span>
                      <span className="text-sm font-semibold text-foreground">{employee.performanceScore}%</span>
                    </div>
                    <Progress value={employee.performanceScore} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Tasa de Asistencia</span>
                      <span className="text-sm font-semibold text-foreground">{employee.attendanceRate}%</span>
                    </div>
                    <Progress value={employee.attendanceRate} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Asistencia últimos 30 días</span>
                      <span className="text-sm font-semibold text-foreground">{attendancePercentage}%</span>
                    </div>
                    <Progress value={attendancePercentage} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Asistencia (30 días)</CardTitle>
              <CardDescription>Registro de presencias y ausencias recientes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={attendanceData}>
                  <defs>
                    <linearGradient id="colorPresente" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorAusente" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                  <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="presente"
                    stackId="1"
                    stroke="hsl(var(--success))"
                    fillOpacity={1}
                    fill="url(#colorPresente)"
                    name="Presente"
                  />
                  <Area
                    type="monotone"
                    dataKey="ausente"
                    stackId="1"
                    stroke="hsl(var(--destructive))"
                    fillOpacity={1}
                    fill="url(#colorAusente)"
                    name="Ausente"
                  />
                </AreaChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                  <p className="text-sm text-muted-foreground mb-1">Días Asistidos</p>
                  <p className="text-2xl font-bold text-success">{attendanceDays}</p>
                </div>
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-muted-foreground mb-1">Días Ausentes</p>
                  <p className="text-2xl font-bold text-destructive">{workingDays - attendanceDays}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Evolución de Desempeño</CardTitle>
              <CardDescription>Historial de evaluaciones trimestrales</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceHistory}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="fecha" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", r: 5 }}
                    activeDot={{ r: 8 }}
                    name="Score"
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-6 space-y-3">
                {reviews.slice(0, 3).map((review, idx) => (
                  <div key={review.id} className="p-3 rounded-lg bg-secondary/50 border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {new Date(review.date).toLocaleDateString("es", { year: "numeric", month: "long" })}
                      </span>
                      <Badge className={review.score >= 90 ? "bg-success text-white" : "bg-primary"}>
                        {review.score}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">Evaluador: {review.reviewer}</p>
                    <p className="text-sm text-foreground">{review.comments}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Estadísticas de Puntualidad</CardTitle>
            <CardDescription>Análisis de horarios de entrada y salida</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <p className="text-sm font-medium text-muted-foreground">Entrada Promedio</p>
                </div>
                <p className="text-3xl font-bold text-primary">
                  {avgEntryHours.toString().padStart(2, "0")}:{avgEntryMinutes.toString().padStart(2, "0")}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Horario: 08:00 - 09:00</p>
              </div>

              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-accent" />
                  <p className="text-sm font-medium text-muted-foreground">Salida Promedio</p>
                </div>
                <p className="text-3xl font-bold text-accent">
                  {avgExitHours.toString().padStart(2, "0")}:{avgExitMinutes.toString().padStart(2, "0")}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Horario: 17:00 - 18:00</p>
              </div>

              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  <p className="text-sm font-medium text-muted-foreground">Días Puntuales</p>
                </div>
                <p className="text-3xl font-bold text-success">{entryTimes.filter((t) => t <= 9 * 60).length}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((entryTimes.filter((t) => t <= 9 * 60).length / entryTimes.length) * 100)}% del tiempo
                </p>
              </div>

              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-warning" />
                  <p className="text-sm font-medium text-muted-foreground">Llegadas Tarde</p>
                </div>
                <p className="text-3xl font-bold text-warning">{entryTimes.filter((t) => t > 9 * 60).length}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((entryTimes.filter((t) => t > 9 * 60).length / entryTimes.length) * 100)}% del tiempo
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recomendaciones del Sistema</CardTitle>
            <CardDescription>Análisis automatizado basado en datos del empleado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employee.performanceScore >= 90 && employee.attendanceRate >= 95 && yearsOfService >= 2 && (
                <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-success mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-success mb-1">Candidato Ideal para Promoción</p>
                      <p className="text-sm text-foreground">
                        Este empleado cumple todos los criterios para ascenso: excelente desempeño (
                        {employee.performanceScore}
                        %), alta asistencia ({employee.attendanceRate}%) y {yearsOfService} años de experiencia en la
                        empresa.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {employee.performanceScore >= 85 && employee.performanceScore < 90 && (
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-primary mb-1">Alto Potencial</p>
                      <p className="text-sm text-foreground">
                        Empleado con buen desempeño. Considerar programas de desarrollo para alcanzar nivel de
                        excelencia.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {employee.attendanceRate < 90 && (
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-warning mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-warning mb-1">Atención: Asistencia Baja</p>
                      <p className="text-sm text-foreground">
                        La tasa de asistencia ({employee.attendanceRate}%) está por debajo del objetivo. Recomendado
                        realizar seguimiento personalizado.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {employee.performanceScore < 75 && (
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-destructive mb-1">Plan de Mejora Requerido</p>
                      <p className="text-sm text-foreground">
                        El desempeño está por debajo del estándar. Implementar plan de capacitación y seguimiento
                        intensivo.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {yearsOfService >= 5 && employee.performanceScore >= 85 && (
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-accent mb-1">Empleado Valioso</p>
                      <p className="text-sm text-foreground">
                        Con {yearsOfService} años de antigüedad y excelente desempeño, este empleado es un activo clave.
                        Considerar estrategias de retención.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
