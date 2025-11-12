"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, ArrowUpDown, TrendingUp, Eye } from "lucide-react"
import { getEmployees } from "@/lib/mock-data"
import { useRouter } from "next/navigation"

export function EmployeesTab() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<"name" | "performanceScore" | "attendanceRate">("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const employees = getEmployees()

  const filteredEmployees = employees
    .filter(
      (emp) =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.id.toString().includes(searchTerm),
    )
    .sort((a, b) => {
      const multiplier = sortDirection === "asc" ? 1 : -1
      if (sortField === "name") {
        return multiplier * a.name.localeCompare(b.name)
      }
      return multiplier * (a[sortField] - b[sortField])
    })

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const getPerformanceBadge = (score: number) => {
    if (score >= 90) return <Badge className="bg-success text-white">{"Excelente"}</Badge>
    if (score >= 80) return <Badge className="bg-primary">{"Bueno"}</Badge>
    if (score >= 70) return <Badge className="bg-warning text-white">{"Regular"}</Badge>
    return <Badge variant="destructive">{"Bajo"}</Badge>
  }

  const topPerformers = [...employees].sort((a, b) => b.performanceScore - a.performanceScore).slice(0, 5)

  const promotionCandidates = employees.filter(
    (emp) =>
      emp.performanceScore >= 90 &&
      emp.attendanceRate >= 95 &&
      new Date().getFullYear() - new Date(emp.hireDate).getFullYear() >= 2,
  )

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              {"Top 5 Empleados del Mes"}
            </CardTitle>
            <CardDescription>{"Basado en desempeño y asistencia"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((emp, idx) => (
                <div key={emp.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{emp.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{emp.position}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{emp.performanceScore}%</p>
                    <p className="text-xs text-muted-foreground">{"Score"}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  {"Candidatos a Promoción"}
                </CardTitle>
                <CardDescription>{"Empleados que cumplen criterios de ascenso"}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {promotionCandidates.length > 0 ? (
              <div className="space-y-4">
                {promotionCandidates.slice(0, 5).map((emp) => (
                  <div key={emp.id} className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{emp.name}</p>
                        <p className="text-sm text-muted-foreground">{emp.position}</p>
                      </div>
                      <Badge className="bg-accent text-white">{"Listo"}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-muted-foreground">{"Desempeño"}</p>
                        <p className="font-medium text-foreground">{emp.performanceScore}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">{"Asistencia"}</p>
                        <p className="font-medium text-foreground">{emp.attendanceRate}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">{"Antigüedad"}</p>
                        <p className="font-medium text-foreground">
                          {new Date().getFullYear() - new Date(emp.hireDate).getFullYear()} años
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                {"No hay candidatos que cumplan todos los criterios"}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>{"Listado de Empleados"}</CardTitle>
              <CardDescription>{"Base de datos completa del personal"}</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar empleado..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{"ID"}</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 hover:bg-transparent p-0 h-auto font-medium"
                      onClick={() => handleSort("name")}
                    >
                      {"Nombre"}
                      <ArrowUpDown className="w-3 h-3" />
                    </Button>
                  </TableHead>
                  <TableHead>{"Puesto"}</TableHead>
                  <TableHead>{"Departamento"}</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 hover:bg-transparent p-0 h-auto font-medium"
                      onClick={() => handleSort("performanceScore")}
                    >
                      {"Desempeño"}
                      <ArrowUpDown className="w-3 h-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 hover:bg-transparent p-0 h-auto font-medium"
                      onClick={() => handleSort("attendanceRate")}
                    >
                      {"Asistencia"}
                      <ArrowUpDown className="w-3 h-3" />
                    </Button>
                  </TableHead>
                  <TableHead>{"Estado"}</TableHead>
                  <TableHead>{"Acciones"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((emp) => (
                  <TableRow
                    key={emp.id}
                    className="cursor-pointer hover:bg-secondary/50 transition-colors"
                    onClick={() => router.push(`/dashboard/employee/${emp.id}`)}
                  >
                    <TableCell className="font-mono text-muted-foreground">{emp.id}</TableCell>
                    <TableCell className="font-medium">{emp.name}</TableCell>
                    <TableCell className="text-muted-foreground">{emp.position}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{emp.department}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{emp.performanceScore}%</span>
                        {getPerformanceBadge(emp.performanceScore)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{emp.attendanceRate}%</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={emp.status === "active" ? "default" : "secondary"}>
                        {emp.status === "active" ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/dashboard/employee/${emp.id}`)
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        Ver
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
