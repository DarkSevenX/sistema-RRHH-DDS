"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getInventoryMovements, getProducts, getEmployees } from "@/lib/mock-data"
import { Search, ArrowUp, ArrowDown, RefreshCw } from "lucide-react"

export function MovementsTab() {
  const [movements, setMovements] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [employees, setEmployees] = useState<any[]>([])
  const [filterType, setFilterType] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setMovements(getInventoryMovements())
    setProducts(getProducts())
    setEmployees(getEmployees())
  }, [])

  const filteredMovements = movements.filter((m) => {
    const product = products.find((p) => p.id === m.productId)
    const matchesType = filterType === "all" || m.type === filterType
    const matchesSearch =
      product?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product?.sku.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const totalEntries = movements.filter((m) => m.type === "entrada").reduce((sum, m) => sum + m.quantity, 0)
  const totalExits = movements.filter((m) => m.type === "salida").reduce((sum, m) => sum + m.quantity, 0)
  const totalAdjustments = movements.filter((m) => m.type === "ajuste").length

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "entrada":
        return <ArrowUp className="h-4 w-4 text-green-600" />
      case "salida":
        return <ArrowDown className="h-4 w-4 text-red-600" />
      case "ajuste":
        return <RefreshCw className="h-4 w-4 text-blue-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entradas</CardTitle>
            <ArrowUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalEntries.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Unidades recibidas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Salidas</CardTitle>
            <ArrowDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalExits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Unidades despachadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ajustes</CardTitle>
            <RefreshCw className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalAdjustments}</div>
            <p className="text-xs text-muted-foreground">Correcciones de inventario</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Movimientos</CardTitle>
          <CardDescription>Registro completo de entradas, salidas y ajustes</CardDescription>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar producto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="entrada">Entradas</SelectItem>
                <SelectItem value="salida">Salidas</SelectItem>
                <SelectItem value="ajuste">Ajustes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
                <TableHead>Razón</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead className="text-right">Costo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMovements.slice(0, 50).map((movement) => {
                const product = products.find((p) => p.id === movement.productId)
                const employee = employees.find((e) => e.id === movement.responsible)
                return (
                  <TableRow key={movement.id}>
                    <TableCell>{movement.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getMovementIcon(movement.type)}
                        <Badge
                          variant={
                            movement.type === "entrada"
                              ? "default"
                              : movement.type === "salida"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {movement.type === "entrada" ? "Entrada" : movement.type === "salida" ? "Salida" : "Ajuste"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product?.name}</div>
                        <div className="text-xs text-muted-foreground">{product?.sku}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      <span
                        className={
                          movement.type === "entrada"
                            ? "text-green-600"
                            : movement.type === "salida"
                              ? "text-red-600"
                              : "text-blue-600"
                        }
                      >
                        {movement.type === "entrada" ? "+" : movement.type === "salida" ? "-" : "±"}
                        {movement.quantity}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{movement.reason}</TableCell>
                    <TableCell className="text-sm">{employee?.name}</TableCell>
                    <TableCell className="text-right">
                      {movement.cost ? `$${movement.cost.toLocaleString()}` : "-"}
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
