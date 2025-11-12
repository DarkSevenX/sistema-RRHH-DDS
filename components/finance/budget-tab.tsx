"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { getBudgets } from "@/lib/mock-data"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { AlertCircle, CheckCircle, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function BudgetTab() {
  const [budgets, setBudgets] = useState<any[]>([])
  const [selectedMonth, setSelectedMonth] = useState<string>("all")
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")

  useEffect(() => {
    setBudgets(getBudgets())
  }, [])

  const months = Array.from(new Set(budgets.map((b) => b.month)))
    .sort()
    .reverse()
  const departments = Array.from(new Set(budgets.map((b) => b.department)))

  const filteredBudgets = budgets.filter((b) => {
    const matchesMonth = selectedMonth === "all" || b.month === selectedMonth
    const matchesDept = selectedDepartment === "all" || b.department === selectedDepartment
    return matchesMonth && matchesDept
  })

  const totalBudgeted = filteredBudgets.reduce((sum, b) => sum + b.budgeted, 0)
  const totalSpent = filteredBudgets.reduce((sum, b) => sum + b.spent, 0)
  const utilizationRate = totalBudgeted > 0 ? (totalSpent / totalBudgeted) * 100 : 0

  const departmentSummary = departments
    .map((dept) => {
      const deptBudgets = filteredBudgets.filter((b) => b.department === dept)
      const budgeted = deptBudgets.reduce((sum, b) => sum + b.budgeted, 0)
      const spent = deptBudgets.reduce((sum, b) => sum + b.spent, 0)
      return {
        department: dept,
        budgeted,
        spent,
        available: budgeted - spent,
        utilization: budgeted > 0 ? (spent / budgeted) * 100 : 0,
      }
    })
    .sort((a, b) => b.spent - a.spent)

  const overBudgetDepts = departmentSummary.filter((d) => d.utilization > 100)
  const warningDepts = departmentSummary.filter((d) => d.utilization > 90 && d.utilization <= 100)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Presupuesto Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudgeted.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${totalSpent.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disponible</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${(totalBudgeted - totalSpent) >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              ${(totalBudgeted - totalSpent).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilización</CardTitle>
            {utilizationRate > 100 ? (
              <AlertCircle className="h-4 w-4 text-red-600" />
            ) : utilizationRate > 90 ? (
              <AlertCircle className="h-4 w-4 text-orange-600" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-600" />
            )}
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${utilizationRate > 100 ? "text-red-600" : utilizationRate > 90 ? "text-orange-600" : "text-green-600"}`}
            >
              {utilizationRate.toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {(overBudgetDepts.length > 0 || warningDepts.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle>Alertas de Presupuesto</CardTitle>
            <CardDescription>Departamentos que requieren atención</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overBudgetDepts.map((dept) => (
                <div
                  key={dept.department}
                  className="flex items-center gap-4 p-3 border border-red-200 bg-red-50 rounded-lg"
                >
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <div className="flex-1">
                    <p className="font-medium text-red-900">{dept.department}</p>
                    <p className="text-sm text-red-700">Excedido en ${(dept.spent - dept.budgeted).toLocaleString()}</p>
                  </div>
                  <Badge variant="destructive">{dept.utilization.toFixed(0)}%</Badge>
                </div>
              ))}
              {warningDepts.map((dept) => (
                <div
                  key={dept.department}
                  className="flex items-center gap-4 p-3 border border-orange-200 bg-orange-50 rounded-lg"
                >
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <div className="flex-1">
                    <p className="font-medium text-orange-900">{dept.department}</p>
                    <p className="text-sm text-orange-700">Disponible: ${dept.available.toLocaleString()}</p>
                  </div>
                  <Badge className="bg-orange-600">{dept.utilization.toFixed(0)}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Análisis por Departamento</CardTitle>
          <CardDescription>Comparativa de presupuesto vs gasto real</CardDescription>
          <div className="flex gap-4 mt-4">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Mes" />
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
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={departmentSummary}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              <Legend />
              <Bar dataKey="budgeted" fill="hsl(var(--chart-3))" name="Presupuestado" />
              <Bar dataKey="spent" fill="hsl(var(--chart-1))" name="Gastado" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detalle de Utilización</CardTitle>
          <CardDescription>Estado del presupuesto por departamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {departmentSummary.map((dept) => (
              <div key={dept.department} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{dept.department}</p>
                    <p className="text-sm text-muted-foreground">
                      ${dept.spent.toLocaleString()} de ${dept.budgeted.toLocaleString()}
                    </p>
                  </div>
                  <Badge
                    variant={dept.utilization > 100 ? "destructive" : dept.utilization > 90 ? "secondary" : "outline"}
                  >
                    {dept.utilization.toFixed(0)}%
                  </Badge>
                </div>
                <Progress value={Math.min(dept.utilization, 100)} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
