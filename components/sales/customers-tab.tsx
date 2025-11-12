"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCustomers, getEmployees } from "@/lib/mock-data"
import { Search } from "lucide-react"

export function CustomersTab() {
  const [customers, setCustomers] = useState<any[]>([])
  const [employees, setEmployees] = useState<any[]>([])
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterIndustry, setFilterIndustry] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setCustomers(getCustomers())
    setEmployees(getEmployees())
  }, [])

  const industries = Array.from(new Set(customers.map((c) => c.industry)))

  const filteredCustomers = customers.filter((c) => {
    const matchesStatus = filterStatus === "all" || c.status === filterStatus
    const matchesIndustry = filterIndustry === "all" || c.industry === filterIndustry
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesIndustry && matchesSearch
  })

  const topCustomers = customers.sort((a, b) => b.totalPurchases - a.totalPurchases).slice(0, 10)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {customers.filter((c) => c.status === "active").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prospectos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {customers.filter((c) => c.status === "prospect").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactivos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {customers.filter((c) => c.status === "inactive").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top 10 Clientes</CardTitle>
          <CardDescription>Clientes con mayor volumen de compras</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topCustomers.map((customer, index) => (
              <div key={customer.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">{customer.company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">${customer.totalPurchases.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{customer.industry}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Base de Clientes</CardTitle>
          <CardDescription>Directorio completo de clientes</CardDescription>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cliente o empresa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="prospect">Prospectos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterIndustry} onValueChange={setFilterIndustry}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Industria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {industries.map((ind) => (
                  <SelectItem key={ind} value={ind}>
                    {ind}
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
                <TableHead>Cliente</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Industria</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Asignado a</TableHead>
                <TableHead className="text-right">Compras Totales</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.slice(0, 30).map((customer) => {
                const assignedEmployee = employees.find((e) => e.id === customer.assignedTo)
                return (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.company}</TableCell>
                    <TableCell>{customer.industry}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <div>{customer.email}</div>
                      <div>{customer.phone}</div>
                    </TableCell>
                    <TableCell className="text-sm">{assignedEmployee?.name}</TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      ${customer.totalPurchases.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          customer.status === "active"
                            ? "default"
                            : customer.status === "prospect"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {customer.status === "active"
                          ? "Activo"
                          : customer.status === "prospect"
                            ? "Prospecto"
                            : "Inactivo"}
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
