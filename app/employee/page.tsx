"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, XCircle, Clock } from "lucide-react"
import { getEmployees, addAttendanceRecord, getAttendance, initializeMockData } from "@/lib/mock-data"

export default function EmployeePage() {
  const [employeeId, setEmployeeId] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [lastAttendance, setLastAttendance] = useState<{ name: string; time: string } | null>(null)

  useEffect(() => {
    initializeMockData()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const id = Number.parseInt(employeeId)
    if (isNaN(id)) {
      setStatus("error")
      setMessage("ID inválido")
      setTimeout(() => setStatus("idle"), 3000)
      return
    }

    const employees = getEmployees()
    const employee = employees.find((emp) => emp.id === id)

    if (!employee) {
      setStatus("error")
      setMessage("Empleado no encontrado")
      setTimeout(() => setStatus("idle"), 3000)
      return
    }

    const now = new Date()
    const today = now.toISOString().split("T")[0]
    const time = now.toTimeString().split(" ")[0].substring(0, 5)

    const attendance = getAttendance()
    const todayRecords = attendance.filter((rec) => rec.employeeId === id && rec.date === today)

    const hasEntry = todayRecords.some((rec) => rec.type === "entrada")
    const hasExit = todayRecords.some((rec) => rec.type === "salida")

    let type: "entrada" | "salida"
    if (!hasEntry) {
      type = "entrada"
    } else if (!hasExit) {
      type = "salida"
    } else {
      setStatus("error")
      setMessage("Ya registraste entrada y salida hoy")
      setTimeout(() => setStatus("idle"), 3000)
      return
    }

    addAttendanceRecord({
      employeeId: id,
      date: today,
      time: time,
      type: type,
    })

    setStatus("success")
    setMessage(`${type === "entrada" ? "Entrada" : "Salida"} registrada`)
    setLastAttendance({ name: employee.name, time })
    setEmployeeId("")
    setTimeout(() => {
      setStatus("idle")
      setLastAttendance(null)
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-2">
        <CardContent className="pt-12 pb-8 px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{"Sistema de Asistencia"}</h1>
            <p className="text-muted-foreground text-balance">{"Ingresa tu ID para registrar tu asistencia"}</p>
          </div>

          {status === "idle" && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="employeeId" className="text-sm font-medium text-foreground">
                  {"ID de Empleado"}
                </label>
                <Input
                  id="employeeId"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="1001"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value.replace(/\D/g, ""))}
                  className="text-center text-2xl h-16 font-mono tracking-wider"
                  autoFocus
                  required
                />
              </div>
              <Button type="submit" className="w-full h-12 text-lg">
                {"Registrar Asistencia"}
              </Button>
            </form>
          )}

          {status === "success" && (
            <div className="text-center space-y-4 animate-in fade-in zoom-in duration-300">
              <CheckCircle2 className="w-20 h-20 text-success mx-auto" />
              <div>
                <h2 className="text-2xl font-bold text-success mb-2">{message}</h2>
                {lastAttendance && (
                  <div className="space-y-1">
                    <p className="text-lg text-foreground font-medium">{lastAttendance.name}</p>
                    <p className="text-muted-foreground">
                      {"Hora: "}
                      {lastAttendance.time}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="text-center space-y-4 animate-in fade-in zoom-in duration-300">
              <XCircle className="w-20 h-20 text-destructive mx-auto" />
              <div>
                <h2 className="text-2xl font-bold text-destructive mb-2">{message}</h2>
                <Button
                  onClick={() => {
                    setStatus("idle")
                    setEmployeeId("")
                  }}
                  variant="outline"
                  className="mt-4"
                >
                  {"Intentar de nuevo"}
                </Button>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            {"¿Problemas con tu ID?"}{" "}
            <a href="/dashboard" className="text-primary hover:underline">
              {"Contacta a RRHH"}
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
