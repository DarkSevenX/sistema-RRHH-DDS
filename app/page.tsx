"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, DollarSign, ShoppingCart, Package, BarChart3 } from "lucide-react"
import { initializeMockData } from "@/lib/mock-data"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    initializeMockData()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Sistema ERP Empresarial</h1>
          <p className="text-xl text-muted-foreground">Sistema de Planificación de Recursos Empresariales</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push("/dashboard")}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle>Recursos Humanos</CardTitle>
                  <CardDescription>RRHH & Nómina</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Gestión de empleados, asistencia, desempeño, nómina y vacaciones
              </p>
              <Button className="w-full mt-4" onClick={() => router.push("/dashboard")}>
                Acceder al Módulo
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push("/finance")}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle>Finanzas</CardTitle>
                  <CardDescription>Contabilidad & Presupuesto</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Transacciones, presupuestos, análisis financiero y reportes
              </p>
              <Button className="w-full mt-4" onClick={() => router.push("/finance")}>
                Acceder al Módulo
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push("/sales")}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <CardTitle>Ventas</CardTitle>
                  <CardDescription>CRM & Comisiones</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Clientes, ventas, comisiones y métricas comerciales</p>
              <Button className="w-full mt-4" onClick={() => router.push("/sales")}>
                Acceder al Módulo
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push("/inventory")}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <Package className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <CardTitle>Inventario</CardTitle>
                  <CardDescription>Almacén & Compras</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Productos, existencias, movimientos y proveedores</p>
              <Button className="w-full mt-4" onClick={() => router.push("/inventory")}>
                Acceder al Módulo
              </Button>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push("/erp-dashboard")}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <CardTitle>Dashboard General</CardTitle>
                  <CardDescription>Vista Ejecutiva</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">KPIs globales, rentabilidad y análisis integrado</p>
              <Button className="w-full mt-4" onClick={() => router.push("/erp-dashboard")}>
                Ver Dashboard
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push("/employee")}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Users className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <CardTitle>Portal Empleado</CardTitle>
                  <CardDescription>Registro de Asistencia</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Registro rápido de entrada y salida para empleados</p>
              <Button className="w-full mt-4 bg-transparent" variant="outline" onClick={() => router.push("/employee")}>
                Registrar Asistencia
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
