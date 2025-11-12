"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getFinancialMetrics, getFinancialTransactions, getPayroll, getEmployees, getBudgets } from "@/lib/mock-data"
import { TrendingUp, TrendingDown, AlertCircle, DollarSign } from "lucide-react"

export function ReportsTab() {
  const [metrics, setMetrics] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const [payroll, setPayroll] = useState<any[]>([])
  const [employees, setEmployees] = useState<any[]>([])
  const [budgets, setBudgets] = useState<any[]>([])

  useEffect(() => {
    setMetrics(getFinancialMetrics())
    setTransactions(getFinancialTransactions())
    setPayroll(getPayroll())
    setEmployees(getEmployees())
    setBudgets(getBudgets())
  }, [])

  const totalPayroll = payroll.reduce((sum, p) => sum + p.netSalary, 0)
  const totalExpenses = transactions
    .filter((t) => t.type === "expense" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)
  const payrollPercentage = totalExpenses > 0 ? (totalPayroll / totalExpenses) * 100 : 0

  const departmentCosts = employees.reduce((acc: any, emp) => {
    const empPayroll = payroll.filter((p) => p.employeeId === emp.id).reduce((sum, p) => sum + p.netSalary, 0)

    if (!acc[emp.department]) {
      acc[emp.department] = { payroll: 0, otherExpenses: 0, employees: 0 }
    }
    acc[emp.department].payroll += empPayroll
    acc[emp.department].employees += 1

    return acc
  }, {})

  transactions
    .filter((t) => t.type === "expense" && t.category !== "Nómina")
    .forEach((t) => {
      if (departmentCosts[t.department]) {
        departmentCosts[t.department].otherExpenses += t.amount
      }
    })

  const departmentAnalysis = Object.entries(departmentCosts)
    .map(([dept, data]: [string, any]) => ({
      department: dept,
      totalCost: data.payroll + data.otherExpenses,
      payroll: data.payroll,
      otherExpenses: data.otherExpenses,
      employees: data.employees,
      costPerEmployee: data.employees > 0 ? (data.payroll + data.otherExpenses) / data.employees : 0,
    }))
    .sort((a, b) => b.totalCost - a.totalCost)

  const avgProfit = metrics.reduce((sum, m) => sum + m.profit, 0) / metrics.length
  const profitTrend = metrics.length > 1 ? metrics[0].profit - metrics[1].profit : 0

  const currentMonthBudgets = budgets.filter((b) => b.month === metrics[0]?.month)
  const budgetUtilization =
    currentMonthBudgets.length > 0
      ? (currentMonthBudgets.reduce((sum, b) => sum + b.spent, 0) /
          currentMonthBudgets.reduce((sum, b) => sum + b.budgeted, 0)) *
        100
      : 0

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Análisis Financiero Ejecutivo</CardTitle>
          <CardDescription>Indicadores clave y recomendaciones estratégicas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium">Utilidad Promedio Mensual</p>
                  <p className={`text-2xl font-bold ${avgProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                    ${avgProfit.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {profitTrend >= 0 ? "Tendencia positiva" : "Tendencia negativa"} de $
                    {Math.abs(profitTrend).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600 mt-1" />
                <div>
                  <p className="font-medium">Costo de Nómina</p>
                  <p className="text-2xl font-bold">{payrollPercentage.toFixed(1)}%</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {payrollPercentage > 50
                      ? "Alto - Considerar optimización"
                      : payrollPercentage > 40
                        ? "Moderado - Dentro del rango"
                        : "Bajo - Buena gestión"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-1" />
                <div>
                  <p className="font-medium">Utilización de Presupuesto</p>
                  <p
                    className={`text-2xl font-bold ${budgetUtilization > 100 ? "text-red-600" : budgetUtilization > 90 ? "text-orange-600" : "text-green-600"}`}
                  >
                    {budgetUtilization.toFixed(1)}%
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {budgetUtilization > 100
                      ? "Sobrepasado - Acción requerida"
                      : budgetUtilization > 90
                        ? "Alto - Monitorear de cerca"
                        : "Normal - Bajo control"}
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4">Recomendaciones Estratégicas</h3>
              <div className="space-y-3">
                {payrollPercentage > 50 && (
                  <div className="flex gap-2 text-sm">
                    <span className="text-orange-600 font-bold">•</span>
                    <p>
                      La nómina representa más del 50% de los gastos. Evaluar eficiencia operativa y considerar
                      automatización.
                    </p>
                  </div>
                )}
                {profitTrend < 0 && (
                  <div className="flex gap-2 text-sm">
                    <span className="text-red-600 font-bold">•</span>
                    <p>Las utilidades están disminuyendo. Analizar estructura de costos y estrategias de ingresos.</p>
                  </div>
                )}
                {budgetUtilization > 90 && (
                  <div className="flex gap-2 text-sm">
                    <span className="text-orange-600 font-bold">•</span>
                    <p>
                      Alta utilización del presupuesto. Revisar gastos discrecionales y establecer controles más
                      estrictos.
                    </p>
                  </div>
                )}
                {avgProfit > 0 && profitTrend > 0 && (
                  <div className="flex gap-2 text-sm">
                    <span className="text-green-600 font-bold">•</span>
                    <p>Desempeño financiero sólido. Considerar reinversión en áreas estratégicas o expansión.</p>
                  </div>
                )}
                <div className="flex gap-2 text-sm">
                  <span className="text-blue-600 font-bold">•</span>
                  <p>Realizar análisis trimestral de ROI por departamento para optimizar asignación de recursos.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Análisis de Costos por Departamento</CardTitle>
          <CardDescription>Desglose detallado de inversión y gasto operativo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentAnalysis.map((dept) => (
              <div key={dept.department} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{dept.department}</h4>
                    <p className="text-sm text-muted-foreground">{dept.employees} empleados</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">${dept.totalCost.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Costo total</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Nómina</p>
                    <p className="font-medium">${dept.payroll.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Otros Gastos</p>
                    <p className="font-medium">${dept.otherExpenses.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Costo/Empleado</p>
                    <p className="font-medium">${Math.round(dept.costPerEmployee).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Rentabilidad</CardTitle>
          <CardDescription>Evolución de márgenes de utilidad</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {metrics.slice(0, 6).map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {metric.profit >= 0 ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                  <div>
                    <p className="font-medium">{metric.month}</p>
                    <p className="text-sm text-muted-foreground">
                      Ingresos: ${metric.revenue.toLocaleString()} | Gastos: ${metric.expenses.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${metric.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                    ${metric.profit.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Margen: {metric.profitMargin.toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
