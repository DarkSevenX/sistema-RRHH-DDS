import { Button } from "@/components/ui/button"
import { Building2, LogOut, User } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{"DSS RRHH"}</h1>
              <p className="text-xs text-muted-foreground">{"Sistema de Decisiones"}</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/employee">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{"Portal Empleado"}</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">{"Salir"}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
