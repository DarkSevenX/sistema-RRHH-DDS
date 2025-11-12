"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, ShoppingCart } from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export function ExecutiveOverview() {
  // KPIs globales calculados desde todos los módulos
  const globalKPIs = {
    totalRevenue: 2845000,
    revenueGrowth: 12.5,
    totalExpenses: 1923000,
    expenseGrowth: -3.2,
    netProfit: 922000,
    profitMargin: 32.4,
    employeeCount: 20,
    employeeGrowth: 5.3,
    activeCustomers: 45,
    customerGrowth: 15.8,
    inventoryValue: 385000,
    inventoryTurnover: 4.2,
  }

  // Evolución mensual consolidada
  const monthlyTrend = [
    { month: "Ene", revenue: 220000, expenses: 150000, profit: 70000, employees: 18 },
    { month: "Feb", revenue: 235000, expenses: 155000, profit: 80000, employees: 18 },
    { month: "Mar", revenue: 248000, expenses: 158000, profit: 90000, employees: 19 },
    { month: "Abr", revenue: 225000, expenses: 152000, profit: 73000, employees: 19 },
    { month: "May", revenue: 260000, expenses: 165000, profit: 95000, employees: 19 },
    { month: "Jun", revenue: 275000, expenses: 168000, profit: 107000, employees: 20 },
  ]

  // Distribución de ingresos por fuente
  const revenueBySource = [
    { name: "Ventas de Productos", value: 1850000, percentage: 65 },
    { name: "Servicios", value: 710000, percentage: 25 },
    { name: "Comisiones", value: 285000, percentage: 10 },
  ]

  // Distribución de gastos por categoría
  const expensesByCategory = [
    { name: "Nómina", value: 1050000, percentage: 54.6 },
    { name: "Operaciones", value: 485000, percentage: 25.2 },
    { name: "Compras Inventario", value: 288000, percentage: 15.0 },
    { name: "Otros", value: 100000, percentage: 5.2 },
  ]

  // Performance por departamento
  const departmentPerformance = [
    { department: "Ventas", revenue: 1850000, expenses: 420000, profit: 1430000, efficiency: 4.4 },
    { department: "Operaciones", revenue: 710000, expenses: 685000, profit: 25000, efficiency: 1.04 },
    { department: "Administración", revenue: 285000, expenses: 818000, profit: -533000, efficiency: 0.35 },
  ]

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

  return (
    <div className="space-y-6">
      {/* KPIs Globales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(globalKPIs.totalRevenue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+{globalKPIs.revenueGrowth}%</span> vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilidad Neta</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(globalKPIs.netProfit / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground mt-1">Margen: {globalKPIs.profitMargin}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empleados Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{globalKPIs.employeeCount}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+{globalKPIs.employeeGrowth}%</span> crecimiento anual
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{globalKPIs.activeCustomers}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+{globalKPIs.customerGrowth}%</span> vs trimestre anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Evolución Financiera */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolución Financiera Mensual</CardTitle>
            <CardDescription>Comparación de ingresos, gastos y utilidad</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${(Number(value) / 1000).toFixed(0)}K`} />
                <Legend />
                <Line type="monotone" dataKey="revenue" name="Ingresos" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                <Line type="monotone" dataKey="expenses" name="Gastos" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                <Line type="monotone" dataKey="profit" name="Utilidad" stroke="hsl(var(--chart-3))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Crecimiento de Personal</CardTitle>
            <CardDescription>Evolución de la plantilla de empleados</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="employees"
                  name="Empleados"
                  stroke="hsl(var(--chart-4))"
                  fill="hsl(var(--chart-4))"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Distribución de Ingresos y Gastos */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Ingresos</CardTitle>
            <CardDescription>Fuentes de ingreso por categoría</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueBySource}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.percentage}%`}
                >
                  {revenueBySource.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${(Number(value) / 1000).toFixed(0)}K`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución de Gastos</CardTitle>
            <CardDescription>Categorización de egresos operacionales</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={expensesByCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${(Number(value) / 1000).toFixed(0)}K`} />
                <Bar dataKey="value" name="Monto">
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance por Departamento */}
      <Card>
        <CardHeader>
          <CardTitle>Eficiencia por Departamento</CardTitle>
          <CardDescription>Análisis de ingresos vs gastos por área</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={departmentPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip formatter={(value) => `$${(Number(value) / 1000).toFixed(0)}K`} />
                <Legend />
                <Bar dataKey="revenue" name="Ingresos" fill="hsl(var(--chart-1))" />
                <Bar dataKey="expenses" name="Gastos" fill="hsl(var(--chart-2))" />
              </BarChart>
            </ResponsiveContainer>

            <div className="space-y-2">
              {departmentPerformance.map((dept) => (
                <div key={dept.department} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{dept.department}</p>
                    <p className="text-sm text-muted-foreground">ROI: {dept.efficiency.toFixed(2)}x</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-500">${(dept.profit / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-muted-foreground">Utilidad</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
