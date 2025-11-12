"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { getPayroll, getEmployees, type PayrollRecord } from "@/lib/mock-data"
import { DollarSign, TrendingUp, TrendingDown, Search } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function PayrollTab() {
  const [payroll, setPayroll] = useState<PayrollRecord[]>([])
  const [employees, setEmployees] = useState<any[]>([])
  const [selectedMonth, setSelectedMonth] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setPayroll(getPayroll())
    setEmployees(getEmployees())
  }, [])

  const months = Array.from(new Set(payroll.map((p) => p.month)))
    .sort()
    .reverse()

  const filteredPayroll = payroll.filter((p) => {
    const employee = employees.find((e) => e.id === p.employeeId)
    const matchesMonth = selectedMonth === "all" || p.month === selectedMonth
    const matchesSearch = employee?.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesMonth && matchesSearch
  })

  const totalPayroll = filteredPayroll.reduce((sum, p) => sum + p.netSalary, 0)
  const totalBonus = filteredPayroll.reduce((sum, p) => sum + p.bonus, 0)
  const totalDeductions = filteredPayroll.reduce((sum, p) => sum + p.deductions, 0)
  const avgSalary = filteredPayroll.length > 0 ? totalPayroll / filteredPayroll.length : 0

  const monthlyTotals = months
    .slice(0, 6)
    .reverse()
    .map((month) => {
      const monthPayroll = payroll.filter((p) => p.month === month)
      return {
        month: month.slice(5),
        total: monthPayroll.reduce((sum, p) => sum + p.netSalary, 0),
        bonos: monthPayroll.reduce((sum, p) => sum + p.bonus, 0),
      }
    })

  const departmentPayroll = employees.reduce((acc: any, emp) => {
    const empPayroll = payroll.filter(
      (p) => p.employeeId === emp.id && (selectedMonth === "all" || p.month === selectedMonth),
    )
    const total = empPayroll.reduce((sum, p) => sum + p.netSalary, 0)

    if (!acc[emp.department]) {
      acc[emp.department] = 0
    }
    acc[emp.department] += total

    return acc
  }, {})

  const departmentData = Object.entries(departmentPayroll).map(([dept, total]) => ({
    name: dept,
    value: total as number,
  }))

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nómina Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPayroll.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{filteredPayroll.length} pagos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Salario Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.round(avgSalary).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Por empleado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bonos Totales</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalBonus.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Este período</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deducciones</CardTitle>
            <TrendingDown className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${totalDeductions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Retenciones legales</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolución de Nómina (6 meses)</CardTitle>
            <CardDescription>Tendencia de gastos totales y bonos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTotals}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="hsl(var(--chart-1))"
                  name="Nómina Total"
                  strokeWidth={2}
                />
                <Line type="monotone" dataKey="bonos" stroke="hsl(var(--chart-2))" name="Bonos" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nómina por Departamento</CardTitle>
            <CardDescription>Distribución del gasto salarial</CardDescription>
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
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalle de Nómina</CardTitle>
          <CardDescription>Registro completo de pagos</CardDescription>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar empleado..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Seleccionar mes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los meses</SelectItem>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empleado</TableHead>
                <TableHead>Mes</TableHead>
                <TableHead className="text-right">Salario Base</TableHead>
                <TableHead className="text-right">Bonos</TableHead>
                <TableHead className="text-right">Deducciones</TableHead>
                <TableHead className="text-right">Neto</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayroll.slice(0, 20).map((record) => {
                const employee = employees.find((e) => e.id === record.employeeId)
                return (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{employee?.name}</div>
                        <div className="text-xs text-muted-foreground">{employee?.position}</div>
                      </div>
                    </TableCell>
                    <TableCell>{record.month}</TableCell>
                    <TableCell className="text-right">${record.basicSalary.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-green-600">+${record.bonus.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-orange-600">-${record.deductions.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-bold">${record.netSalary.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          record.status === "paid"
                            ? "default"
                            : record.status === "processing"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {record.status === "paid"
                          ? "Pagado"
                          : record.status === "processing"
                            ? "Procesando"
                            : "Pendiente"}
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
