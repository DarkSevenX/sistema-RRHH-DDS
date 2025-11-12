"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { getVacations, getEmployees, type VacationRecord } from "@/lib/mock-data"
import { Calendar, Clock, Users, AlertCircle } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export function VacationsTab() {
  const [vacations, setVacations] = useState<VacationRecord[]>([])
  const [employees, setEmployees] = useState<any[]>([])
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setVacations(getVacations())
    setEmployees(getEmployees())
  }, [])

  const filteredVacations = vacations.filter((v) => {
    const employee = employees.find((e) => e.id === v.employeeId)
    const matchesStatus = filterStatus === "all" || v.status === filterStatus
    const matchesSearch = employee?.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const totalDays = vacations.filter((v) => v.status === "approved").reduce((sum, v) => sum + v.days, 0)
  const pendingRequests = vacations.filter((v) => v.status === "pending").length
  const approvedRequests = vacations.filter((v) => v.status === "approved").length

  const employeeVacationDays = employees
    .map((emp) => {
      const empVacations = vacations.filter((v) => v.employeeId === emp.id && v.status === "approved")
      const totalDays = empVacations.reduce((sum, v) => sum + v.days, 0)
      return {
        name: emp.name.split(" ")[0] + " " + emp.name.split(" ")[emp.name.split(" ").length - 1],
        dias: totalDays,
      }
    })
    .sort((a, b) => b.dias - a.dias)
    .slice(0, 10)

  const vacationsByType = ["vacation", "sick", "personal", "maternity"].map((type) => ({
    type:
      type === "vacation"
        ? "Vacaciones"
        : type === "sick"
          ? "Enfermedad"
          : type === "personal"
            ? "Personal"
            : "Maternidad",
    count: vacations.filter((v) => v.type === type && v.status === "approved").length,
    days: vacations.filter((v) => v.type === type && v.status === "approved").reduce((sum, v) => sum + v.days, 0),
  }))

  const vacationsByDepartment = employees.reduce((acc: any, emp) => {
    const empVacations = vacations.filter((v) => v.employeeId === emp.id && v.status === "approved")
    const totalDays = empVacations.reduce((sum, v) => sum + v.days, 0)

    if (!acc[emp.department]) {
      acc[emp.department] = 0
    }
    acc[emp.department] += totalDays

    return acc
  }, {})

  const departmentData = Object.entries(vacationsByDepartment).map(([dept, days]) => ({
    name: dept,
    value: days as number,
  }))

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "vacation":
        return "bg-blue-500"
      case "sick":
        return "bg-red-500"
      case "personal":
        return "bg-purple-500"
      case "maternity":
        return "bg-pink-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeName = (type: string) => {
    switch (type) {
      case "vacation":
        return "Vacaciones"
      case "sick":
        return "Enfermedad"
      case "personal":
        return "Personal"
      case "maternity":
        return "Maternidad"
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Días Aprobados</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDays}</div>
            <p className="text-xs text-muted-foreground">Este año</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solicitudes Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground">Requieren aprobación</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solicitudes Aprobadas</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedRequests}</div>
            <p className="text-xs text-muted-foreground">Total del período</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio por Empleado</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {employees.length > 0 ? Math.round(totalDays / employees.length) : 0}
            </div>
            <p className="text-xs text-muted-foreground">Días de ausencia</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Empleados - Días de Vacaciones</CardTitle>
            <CardDescription>Empleados con más días aprobados</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={employeeVacationDays} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="dias" fill="hsl(var(--chart-1))" name="Días" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vacaciones por Departamento</CardTitle>
            <CardDescription>Distribución de días de ausencia</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} días`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Análisis por Tipo de Ausencia</CardTitle>
          <CardDescription>Desglose de solicitudes aprobadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {vacationsByType.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                <div
                  className={`w-12 h-12 rounded-full ${getTypeColor(item.type.toLowerCase())} flex items-center justify-center text-white font-bold`}
                >
                  {item.count}
                </div>
                <div>
                  <p className="font-medium">{item.type}</p>
                  <p className="text-sm text-muted-foreground">{item.days} días totales</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Registro de Vacaciones</CardTitle>
          <CardDescription>Historial completo de solicitudes</CardDescription>
          <div className="flex gap-4 mt-4">
            <Input
              placeholder="Buscar empleado..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="approved">Aprobadas</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="rejected">Rechazadas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empleado</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Fecha Inicio</TableHead>
                <TableHead>Fecha Fin</TableHead>
                <TableHead className="text-right">Días</TableHead>
                <TableHead>Solicitado</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVacations.slice(0, 20).map((vacation) => {
                const employee = employees.find((e) => e.id === vacation.employeeId)
                return (
                  <TableRow key={vacation.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{employee?.name}</div>
                        <div className="text-xs text-muted-foreground">{employee?.department}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTypeColor(vacation.type)}>
                        {getTypeName(vacation.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>{vacation.startDate}</TableCell>
                    <TableCell>{vacation.endDate}</TableCell>
                    <TableCell className="text-right font-medium">{vacation.days}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{vacation.requestDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          vacation.status === "approved"
                            ? "default"
                            : vacation.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {vacation.status === "approved"
                          ? "Aprobada"
                          : vacation.status === "pending"
                            ? "Pendiente"
                            : "Rechazada"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
