"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react"

export function AlertsTab() {
  // Alertas críticas del sistema
  const criticalAlerts = [
    {
      id: 1,
      module: "Inventario",
      type: "critical",
      title: "Stock crítico en 2 productos",
      description: "Laptop Pro 15 y Webcam HD están por debajo del stock mínimo",
      recommendation: "Generar orden de compra inmediata por 50 unidades de cada producto",
      impact: "Riesgo de pérdida de ventas estimado: $45,000",
      action: "Ver Inventario",
    },
    {
      id: 2,
      module: "RRHH",
      type: "warning",
      title: "3 empleados con riesgo de salida",
      description: "Empleados con desempeño alto pero satisfacción baja detectados",
      recommendation: "Realizar entrevistas de retención y revisar compensación",
      impact: "Costo de reemplazo estimado: $75,000",
      action: "Ver Empleados",
    },
    {
      id: 3,
      module: "Finanzas",
      type: "warning",
      title: "Departamento de Administración sobre presupuesto",
      description: "Gastos administrativos superan presupuesto en 12%",
      recommendation: "Revisar gastos discrecionales y renegociar contratos de servicios",
      impact: "Sobrecosto actual: $25,000",
      action: "Ver Presupuesto",
    },
  ]

  // Oportunidades de mejora
  const opportunities = [
    {
      id: 1,
      module: "Ventas",
      type: "opportunity",
      title: "5 clientes listos para upselling",
      description: "Clientes con alta frecuencia de compra y ticket promedio en crecimiento",
      recommendation: "Ofrecer productos premium o paquetes corporativos",
      potentialRevenue: "$85,000",
      probability: "Alta (85%)",
    },
    {
      id: 2,
      module: "RRHH",
      type: "opportunity",
      title: "3 empleados listos para promoción",
      description: "Empleados con desempeño sobresaliente y antigüedad >2 años",
      recommendation: "Considerar ascensos a posiciones de liderazgo",
      potentialRevenue: "Aumento de productividad estimado: 15%",
      probability: "Media (65%)",
    },
    {
      id: 3,
      module: "Inventario",
      type: "opportunity",
      title: "Optimizar rotación de inventario",
      description: "Productos de alta rotación con espacio disponible en almacén",
      recommendation: "Aumentar stock de productos estrella en 30%",
      potentialRevenue: "$120,000 adicionales",
      probability: "Alta (90%)",
    },
  ]

  // Recomendaciones estratégicas
  const strategicRecommendations = [
    {
      category: "Expansión",
      title: "Contratar 2 vendedores adicionales",
      rationale: "El equipo de ventas está operando al 95% de capacidad con alta demanda",
      investment: "$80,000/año",
      expectedReturn: "$320,000/año",
      roi: "4x",
      timeframe: "3 meses",
    },
    {
      category: "Eficiencia",
      title: "Implementar sistema de automatización de inventario",
      rationale: "Reducir tiempo de gestión manual y errores de stock",
      investment: "$15,000",
      expectedReturn: "$45,000/año en ahorro",
      roi: "3x",
      timeframe: "2 meses",
    },
    {
      category: "Retención",
      title: "Programa de bonos por desempeño",
      rationale: "Aumentar motivación y retener talento clave",
      investment: "$50,000/año",
      expectedReturn: "Reducción 70% en rotación = $105,000 ahorro",
      roi: "2.1x",
      timeframe: "1 mes",
    },
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "opportunity":
        return <TrendingUp className="h-5 w-5 text-green-500" />
      default:
        return <CheckCircle2 className="h-5 w-5 text-blue-500" />
    }
  }

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "critical":
        return <Badge variant="destructive">Crítico</Badge>
      case "warning":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">Advertencia</Badge>
      case "opportunity":
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">Oportunidad</Badge>
      default:
        return <Badge>Info</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Resumen de Alertas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Alertas Críticas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalAlerts.filter((a) => a.type === "critical").length}</div>
            <p className="text-xs text-muted-foreground mt-1">Requieren atención inmediata</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 dark:border-yellow-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              Advertencias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalAlerts.filter((a) => a.type === "warning").length}</div>
            <p className="text-xs text-muted-foreground mt-1">Monitorear de cerca</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Oportunidades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{opportunities.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Para mejorar resultados</p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas Críticas */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas que Requieren Atención</CardTitle>
          <CardDescription>Situaciones críticas y advertencias importantes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {criticalAlerts.map((alert) => (
              <div key={alert.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getAlertBadge(alert.type)}
                        <Badge variant="outline">{alert.module}</Badge>
                      </div>
                      <h4 className="font-semibold">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                    </div>
                  </div>
                </div>
                <div className="pl-8 space-y-2">
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm font-medium">Recomendación:</p>
                    <p className="text-sm text-muted-foreground">{alert.recommendation}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">
                      <span className="font-medium">Impacto:</span> {alert.impact}
                    </p>
                    <Button size="sm">{alert.action}</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Oportunidades de Mejora */}
      <Card>
        <CardHeader>
          <CardTitle>Oportunidades de Crecimiento</CardTitle>
          <CardDescription>Iniciativas identificadas para aumentar ingresos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {opportunities.map((opp) => (
              <div key={opp.id} className="p-4 border rounded-lg border-green-200 dark:border-green-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-green-500 hover:bg-green-600 text-white">{opp.module}</Badge>
                      </div>
                      <h4 className="font-semibold">{opp.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{opp.description}</p>
                    </div>
                  </div>
                </div>
                <div className="pl-8 space-y-2">
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-md">
                    <p className="text-sm font-medium text-green-700 dark:text-green-400">Acción recomendada:</p>
                    <p className="text-sm text-muted-foreground">{opp.recommendation}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Ingreso potencial:</span>
                      <p className="text-green-600 dark:text-green-400 font-semibold">{opp.potentialRevenue}</p>
                    </div>
                    <div>
                      <span className="font-medium">Probabilidad:</span>
                      <p className="text-muted-foreground">{opp.probability}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recomendaciones Estratégicas */}
      <Card>
        <CardHeader>
          <CardTitle>Recomendaciones Estratégicas</CardTitle>
          <CardDescription>Decisiones de alto impacto basadas en análisis de datos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {strategicRecommendations.map((rec, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{rec.category}</Badge>
                      <Badge className="bg-blue-500 hover:bg-blue-600 text-white">ROI: {rec.roi}</Badge>
                    </div>
                    <h4 className="font-semibold text-lg">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{rec.rationale}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground">Inversión</p>
                    <p className="font-semibold">{rec.investment}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Retorno Esperado</p>
                    <p className="font-semibold text-green-600 dark:text-green-400">{rec.expectedReturn}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">ROI</p>
                    <p className="font-semibold">{rec.roi}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tiempo de Implementación</p>
                    <p className="font-semibold">{rec.timeframe}</p>
                  </div>
                </div>
                <Button className="w-full">Implementar Recomendación</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
