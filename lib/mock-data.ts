export interface Employee {
  id: number
  name: string
  position: string
  department: string
  hireDate: string
  salary: number
  performanceScore: number
  attendanceRate: number
  status: "active" | "inactive"
  email: string
  phone: string
  idCard: string
  address: string
  city: string
  age: number
  emergencyContact: string
  emergencyPhone: string
  education: string
  bloodType: string
}

export interface AttendanceRecord {
  id: string
  employeeId: number
  date: string
  time: string
  type: "entrada" | "salida"
}

export interface PayrollRecord {
  id: string
  employeeId: number
  month: string
  basicSalary: number
  bonus: number
  deductions: number
  netSalary: number
  paymentDate: string
  status: "paid" | "pending" | "processing"
}

export interface VacationRecord {
  id: string
  employeeId: number
  startDate: string
  endDate: string
  days: number
  type: "vacation" | "sick" | "personal" | "maternity"
  status: "approved" | "pending" | "rejected"
  requestDate: string
  approvedBy?: string
}

export interface PerformanceReview {
  id: string
  employeeId: number
  date: string
  score: number
  reviewer: string
  comments: string
}

export interface FinancialTransaction {
  id: string
  date: string
  type: "income" | "expense"
  category: string
  description: string
  amount: number
  department: string
  relatedEmployeeId?: number
  status: "completed" | "pending"
}

export interface Budget {
  id: string
  department: string
  category: string
  budgeted: number
  spent: number
  month: string
}

export interface FinancialMetrics {
  month: string
  revenue: number
  expenses: number
  profit: number
  profitMargin: number
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company: string
  industry: string
  status: "active" | "inactive" | "prospect"
  assignedTo: number
  createdDate: string
  lastContact: string
  totalPurchases: number
}

export interface Sale {
  id: string
  customerId: string
  employeeId: number
  date: string
  amount: number
  commission: number
  status: "completed" | "pending" | "cancelled"
  product: string
  quantity: number
}

export interface SalesMetrics {
  month: string
  totalSales: number
  totalCommissions: number
  averageTicket: number
  numberOfSales: number
}

// Added inventory and purchasing data structures
export interface Product {
  id: string
  name: string
  sku: string
  category: string
  description: string
  unitPrice: number
  stock: number
  minStock: number
  maxStock: number
  supplier: string
  lastRestockDate: string
}

export interface InventoryMovement {
  id: string
  productId: string
  type: "entrada" | "salida" | "ajuste"
  quantity: number
  date: string
  reason: string
  responsible: number
  cost?: number
}

export interface PurchaseOrder {
  id: string
  supplier: string
  date: string
  expectedDelivery: string
  status: "pending" | "received" | "cancelled"
  total: number
  items: Array<{
    productId: string
    quantity: number
    unitPrice: number
  }>
}

export interface Supplier {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  category: string
  paymentTerms: string
  totalPurchases: number
  status: "active" | "inactive"
}

export const mockEmployees: Employee[] = [
  {
    id: 1001,
    name: "Ana María García",
    position: "Gerente de Ventas",
    department: "Ventas",
    hireDate: "2020-03-15",
    salary: 85000,
    performanceScore: 92,
    attendanceRate: 98,
    status: "active",
    email: "ana.garcia@empresa.com",
    phone: "+1 (555) 123-4567",
    idCard: "001-1234567-8",
    address: "Calle Principal #123, Apt 4B",
    city: "Santo Domingo",
    age: 34,
    emergencyContact: "Carlos García (Esposo)",
    emergencyPhone: "+1 (555) 123-9999",
    education: "Licenciatura en Administración de Empresas",
    bloodType: "O+",
  },
  {
    id: 1002,
    name: "Carlos Rodríguez",
    position: "Desarrollador Senior",
    department: "TI",
    hireDate: "2019-07-22",
    salary: 75000,
    performanceScore: 88,
    attendanceRate: 95,
    status: "active",
    email: "carlos.rodriguez@empresa.com",
    phone: "+1 (555) 234-5678",
    idCard: "001-2345678-9",
    address: "Av. Independencia #456",
    city: "Santiago",
    age: 29,
    emergencyContact: "María Rodríguez (Madre)",
    emergencyPhone: "+1 (555) 234-9999",
    education: "Ingeniería en Sistemas",
    bloodType: "A+",
  },
  {
    id: 1003,
    name: "María López",
    position: "Diseñadora UX",
    department: "Diseño",
    hireDate: "2021-01-10",
    salary: 68000,
    performanceScore: 95,
    attendanceRate: 97,
    status: "active",
    email: "maria.lopez@empresa.com",
    phone: "+1 (555) 345-6789",
    idCard: "001-3456789-0",
    address: "Calle del Sol #789",
    city: "Santo Domingo",
    age: 27,
    emergencyContact: "Pedro López (Padre)",
    emergencyPhone: "+1 (555) 345-9999",
    education: "Licenciatura en Diseño Gráfico",
    bloodType: "B+",
  },
  {
    id: 1004,
    name: "Juan Martínez",
    position: "Analista de Datos",
    department: "Operaciones",
    hireDate: "2020-09-05",
    salary: 62000,
    performanceScore: 85,
    attendanceRate: 92,
    status: "active",
    email: "juan.martinez@empresa.com",
    phone: "+1 (555) 456-7890",
    idCard: "001-4567890-1",
    address: "Calle Duarte #234",
    city: "La Vega",
    age: 31,
    emergencyContact: "Laura Martínez (Esposa)",
    emergencyPhone: "+1 (555) 456-9999",
    education: "Maestría en Ciencia de Datos",
    bloodType: "AB+",
  },
  {
    id: 1005,
    name: "Laura Fernández",
    position: "Gerente de RRHH",
    department: "Recursos Humanos",
    hireDate: "2018-04-12",
    salary: 78000,
    performanceScore: 90,
    attendanceRate: 96,
    status: "active",
    email: "laura.fernandez@empresa.com",
    phone: "+1 (555) 567-8901",
    idCard: "001-5678901-2",
    address: "Av. 27 de Febrero #567",
    city: "Santo Domingo",
    age: 38,
    emergencyContact: "Roberto Fernández (Hermano)",
    emergencyPhone: "+1 (555) 567-9999",
    education: "Licenciatura en Recursos Humanos",
    bloodType: "O-",
  },
  {
    id: 1006,
    name: "Pedro Sánchez",
    position: "Contador",
    department: "Finanzas",
    hireDate: "2019-11-20",
    salary: 65000,
    performanceScore: 87,
    attendanceRate: 94,
    status: "active",
    email: "pedro.sanchez@empresa.com",
    phone: "+1 (555) 678-9012",
    idCard: "001-6789012-3",
    address: "Calle Las Mercedes #890",
    city: "Santo Domingo",
    age: 35,
    emergencyContact: "Carmen Sánchez (Madre)",
    emergencyPhone: "+1 (555) 678-9999",
    education: "Licenciatura en Contabilidad - CPA",
    bloodType: "A-",
  },
  {
    id: 1007,
    name: "Isabel Torres",
    position: "Especialista en Marketing",
    department: "Marketing",
    hireDate: "2021-06-15",
    salary: 58000,
    performanceScore: 82,
    attendanceRate: 90,
    status: "active",
    email: "isabel.torres@empresa.com",
    phone: "+1 (555) 789-0123",
    idCard: "001-7890123-4",
    address: "Calle Espaillat #345",
    city: "Puerto Plata",
    age: 26,
    emergencyContact: "Miguel Torres (Padre)",
    emergencyPhone: "+1 (555) 789-9999",
    education: "Licenciatura en Marketing Digital",
    bloodType: "B-",
  },
  {
    id: 1008,
    name: "Roberto Díaz",
    position: "Soporte Técnico",
    department: "TI",
    hireDate: "2022-02-01",
    salary: 48000,
    performanceScore: 78,
    attendanceRate: 88,
    status: "active",
    email: "roberto.diaz@empresa.com",
    phone: "+1 (555) 890-1234",
    idCard: "001-8901234-5",
    address: "Calle Mella #678",
    city: "San Cristóbal",
    age: 24,
    emergencyContact: "Ana Díaz (Madre)",
    emergencyPhone: "+1 (555) 890-9999",
    education: "Técnico en Redes y Sistemas",
    bloodType: "O+",
  },
  {
    id: 1009,
    name: "Carmen Ruiz",
    position: "Ejecutiva de Ventas",
    department: "Ventas",
    hireDate: "2021-09-10",
    salary: 52000,
    performanceScore: 84,
    attendanceRate: 91,
    status: "active",
    email: "carmen.ruiz@empresa.com",
    phone: "+1 (555) 901-2345",
    idCard: "001-9012345-6",
    address: "Av. Núñez de Cáceres #901",
    city: "Santo Domingo",
    age: 28,
    emergencyContact: "Luis Ruiz (Hermano)",
    emergencyPhone: "+1 (555) 901-9999",
    education: "Licenciatura en Mercadeo",
    bloodType: "A+",
  },
  {
    id: 1010,
    name: "Miguel Ángel Castro",
    position: "Desarrollador Junior",
    department: "TI",
    hireDate: "2022-05-20",
    salary: 45000,
    performanceScore: 75,
    attendanceRate: 85,
    status: "active",
    email: "miguel.castro@empresa.com",
    phone: "+1 (555) 012-3456",
    idCard: "001-0123456-7",
    address: "Calle Sánchez #234",
    city: "Santo Domingo",
    age: 23,
    emergencyContact: "Rosa Castro (Madre)",
    emergencyPhone: "+1 (555) 012-9999",
    education: "Ingeniería en Software",
    bloodType: "B+",
  },
  {
    id: 1011,
    name: "Sofía Morales",
    position: "Gerente de Operaciones",
    department: "Operaciones",
    hireDate: "2019-03-08",
    salary: 82000,
    performanceScore: 93,
    attendanceRate: 97,
    status: "active",
    email: "sofia.morales@empresa.com",
    phone: "+1 (555) 123-4568",
    idCard: "001-1234568-9",
    address: "Calle Hostos #567",
    city: "Santo Domingo",
    age: 36,
    emergencyContact: "Diego Morales (Esposo)",
    emergencyPhone: "+1 (555) 123-8888",
    education: "MBA en Gestión de Operaciones",
    bloodType: "AB-",
  },
  {
    id: 1012,
    name: "Fernando Vega",
    position: "Analista Financiero",
    department: "Finanzas",
    hireDate: "2020-08-15",
    salary: 60000,
    performanceScore: 86,
    attendanceRate: 93,
    status: "active",
    email: "fernando.vega@empresa.com",
    phone: "+1 (555) 234-5679",
    idCard: "001-2345679-0",
    address: "Av. Abraham Lincoln #890",
    city: "Santo Domingo",
    age: 30,
    emergencyContact: "Patricia Vega (Hermana)",
    emergencyPhone: "+1 (555) 234-8888",
    education: "Licenciatura en Finanzas",
    bloodType: "O+",
  },
  {
    id: 1013,
    name: "Patricia Herrera",
    position: "Coordinadora de Proyectos",
    department: "Operaciones",
    hireDate: "2021-04-22",
    salary: 55000,
    performanceScore: 81,
    attendanceRate: 89,
    status: "active",
    email: "patricia.herrera@empresa.com",
    phone: "+1 (555) 345-6780",
    idCard: "001-3456780-1",
    address: "Calle Padre Billini #123",
    city: "Santo Domingo",
    age: 29,
    emergencyContact: "Jorge Herrera (Padre)",
    emergencyPhone: "+1 (555) 345-8888",
    education: "Licenciatura en Gestión de Proyectos",
    bloodType: "A+",
  },
  {
    id: 1014,
    name: "Andrés Jiménez",
    position: "Diseñador Gráfico",
    department: "Diseño",
    hireDate: "2022-01-10",
    salary: 50000,
    performanceScore: 79,
    attendanceRate: 87,
    status: "active",
    email: "andres.jimenez@empresa.com",
    phone: "+1 (555) 456-7891",
    idCard: "001-4567891-2",
    address: "Calle Arzobispo Meriño #456",
    city: "Santo Domingo",
    age: 25,
    emergencyContact: "Luisa Jiménez (Madre)",
    emergencyPhone: "+1 (555) 456-8888",
    education: "Licenciatura en Arte y Diseño",
    bloodType: "B-",
  },
  {
    id: 1015,
    name: "Valentina Romero",
    position: "Gerente de Marketing",
    department: "Marketing",
    hireDate: "2019-06-30",
    salary: 80000,
    performanceScore: 91,
    attendanceRate: 96,
    status: "active",
    email: "valentina.romero@empresa.com",
    phone: "+1 (555) 567-8902",
    idCard: "001-5678902-3",
    address: "Av. Winston Churchill #789",
    city: "Santo Domingo",
    age: 33,
    emergencyContact: "Sebastián Romero (Esposo)",
    emergencyPhone: "+1 (555) 567-8888",
    education: "Maestría en Marketing Estratégico",
    bloodType: "O-",
  },
  {
    id: 1016,
    name: "Diego Navarro",
    position: "Especialista en Ventas",
    department: "Ventas",
    hireDate: "2021-11-05",
    salary: 54000,
    performanceScore: 83,
    attendanceRate: 90,
    status: "active",
    email: "diego.navarro@empresa.com",
    phone: "+1 (555) 678-9013",
    idCard: "001-6789013-4",
    address: "Calle José Reyes #234",
    city: "Santiago",
    age: 27,
    emergencyContact: "Elena Navarro (Madre)",
    emergencyPhone: "+1 (555) 678-8888",
    education: "Licenciatura en Ventas y Negocios",
    bloodType: "A-",
  },
  {
    id: 1017,
    name: "Lucía Mendoza",
    position: "Asistente de RRHH",
    department: "Recursos Humanos",
    hireDate: "2022-03-15",
    salary: 42000,
    performanceScore: 76,
    attendanceRate: 86,
    status: "active",
    email: "lucia.mendoza@empresa.com",
    phone: "+1 (555) 789-0124",
    idCard: "001-7890124-5",
    address: "Calle El Conde #567",
    city: "Santo Domingo",
    age: 24,
    emergencyContact: "Manuel Mendoza (Padre)",
    emergencyPhone: "+1 (555) 789-8888",
    education: "Licenciatura en Psicología Organizacional",
    bloodType: "B+",
  },
  {
    id: 1018,
    name: "Javier Ortiz",
    position: "Arquitecto de Software",
    department: "TI",
    hireDate: "2018-09-01",
    salary: 95000,
    performanceScore: 94,
    attendanceRate: 98,
    status: "active",
    email: "javier.ortiz@empresa.com",
    phone: "+1 (555) 890-1235",
    idCard: "001-8901235-6",
    address: "Av. Sarasota #890",
    city: "Santo Domingo",
    age: 37,
    emergencyContact: "Carolina Ortiz (Esposa)",
    emergencyPhone: "+1 (555) 890-8888",
    education: "Maestría en Arquitectura de Software",
    bloodType: "AB+",
  },
  {
    id: 1019,
    name: "Gabriela Silva",
    position: "Analista de Marketing",
    department: "Marketing",
    hireDate: "2022-07-20",
    salary: 47000,
    performanceScore: 77,
    attendanceRate: 84,
    status: "active",
    email: "gabriela.silva@empresa.com",
    phone: "+1 (555) 901-2346",
    idCard: "001-9012346-7",
    address: "Calle Cayetano Germosén #123",
    city: "Santo Domingo",
    age: 25,
    emergencyContact: "Ricardo Silva (Padre)",
    emergencyPhone: "+1 (555) 901-8888",
    education: "Licenciatura en Comunicación Social",
    bloodType: "O+",
  },
  {
    id: 1020,
    name: "Raúl Vargas",
    position: "Ejecutivo de Cuentas",
    department: "Ventas",
    hireDate: "2020-12-10",
    salary: 56000,
    performanceScore: 80,
    attendanceRate: 88,
    status: "active",
    email: "raul.vargas@empresa.com",
    phone: "+1 (555) 012-3457",
    idCard: "001-0123457-8",
    address: "Av. Lope de Vega #456",
    city: "Santo Domingo",
    age: 32,
    emergencyContact: "Marina Vargas (Esposa)",
    emergencyPhone: "+1 (555) 012-8888",
    education: "Licenciatura en Administración Comercial",
    bloodType: "A+",
  },
]

export function generateMockAttendance(): AttendanceRecord[] {
  const records: AttendanceRecord[] = []
  const today = new Date()

  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    mockEmployees.forEach((emp) => {
      // 90% de probabilidad de asistir
      if (Math.random() > 0.1) {
        const entryHour = 8 + Math.floor(Math.random() * 2)
        const entryMinute = Math.floor(Math.random() * 60)
        records.push({
          id: `${emp.id}-${date.toISOString().split("T")[0]}-entrada`,
          employeeId: emp.id,
          date: date.toISOString().split("T")[0],
          time: `${entryHour.toString().padStart(2, "0")}:${entryMinute.toString().padStart(2, "0")}`,
          type: "entrada",
        })

        const exitHour = 17 + Math.floor(Math.random() * 2)
        const exitMinute = Math.floor(Math.random() * 60)
        records.push({
          id: `${emp.id}-${date.toISOString().split("T")[0]}-salida`,
          employeeId: emp.id,
          date: date.toISOString().split("T")[0],
          time: `${exitHour.toString().padStart(2, "0")}:${exitMinute.toString().padStart(2, "0")}`,
          type: "salida",
        })
      }
    })
  }

  return records
}

export function generateMockPerformanceReviews(): PerformanceReview[] {
  const reviews: PerformanceReview[] = []
  const reviewers = ["Laura Fernández", "Sofía Morales", "Ana María García"]
  const comments = [
    "Excelente desempeño y actitud proactiva",
    "Cumple con los objetivos establecidos",
    "Demuestra liderazgo y compromiso",
    "Necesita mejorar en gestión del tiempo",
    "Supera las expectativas consistentemente",
    "Buen trabajo en equipo",
  ]

  mockEmployees.forEach((emp) => {
    for (let i = 0; i < 3; i++) {
      const date = new Date()
      date.setMonth(date.getMonth() - i * 4)
      reviews.push({
        id: `review-${emp.id}-${i}`,
        employeeId: emp.id,
        date: date.toISOString().split("T")[0],
        score: Math.floor(70 + Math.random() * 30),
        reviewer: reviewers[Math.floor(Math.random() * reviewers.length)],
        comments: comments[Math.floor(Math.random() * comments.length)],
      })
    }
  })

  return reviews
}

export function generateMockPayroll(): PayrollRecord[] {
  const records: PayrollRecord[] = []
  const today = new Date()

  for (let monthOffset = 0; monthOffset < 6; monthOffset++) {
    const date = new Date(today)
    date.setMonth(date.getMonth() - monthOffset)
    const month = date.toISOString().slice(0, 7)

    mockEmployees.forEach((emp) => {
      const bonus = Math.random() > 0.7 ? Math.floor(emp.salary * 0.1) : 0
      const deductions = Math.floor(emp.salary * 0.15)
      const netSalary = emp.salary + bonus - deductions

      records.push({
        id: `payroll-${emp.id}-${month}`,
        employeeId: emp.id,
        month,
        basicSalary: emp.salary,
        bonus,
        deductions,
        netSalary,
        paymentDate: `${month}-28`,
        status: monthOffset === 0 ? "processing" : "paid",
      })
    })
  }

  return records
}

export function generateMockVacations(): VacationRecord[] {
  const records: VacationRecord[] = []
  const types: VacationRecord["type"][] = ["vacation", "sick", "personal", "maternity"]
  const statuses: VacationRecord["status"][] = ["approved", "approved", "approved", "pending"]
  const today = new Date()

  mockEmployees.forEach((emp) => {
    const numVacations = Math.floor(Math.random() * 4) + 1

    for (let i = 0; i < numVacations; i++) {
      const requestDate = new Date(today)
      requestDate.setDate(requestDate.getDate() - Math.floor(Math.random() * 180))

      const startDate = new Date(requestDate)
      startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30))

      const days = Math.floor(Math.random() * 10) + 3
      const endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + days)

      const status = statuses[Math.floor(Math.random() * statuses.length)]

      records.push({
        id: `vacation-${emp.id}-${i}`,
        employeeId: emp.id,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        days,
        type: types[Math.floor(Math.random() * types.length)],
        status,
        requestDate: requestDate.toISOString().split("T")[0],
        approvedBy: status === "approved" ? "Laura Fernández" : undefined,
      })
    }
  })

  return records.sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime())
}

export function generateMockFinancialTransactions(): FinancialTransaction[] {
  const transactions: FinancialTransaction[] = []
  const today = new Date()

  const categories = {
    income: ["Ventas", "Servicios", "Consultoría", "Licencias", "Inversiones"],
    expense: ["Nómina", "Arriendo", "Servicios Públicos", "Marketing", "Tecnología", "Oficina", "Capacitación"],
  }

  const departments = ["Ventas", "TI", "Marketing", "Operaciones", "Finanzas", "Recursos Humanos", "Diseño"]

  // Generate transactions for last 6 months
  for (let monthOffset = 0; monthOffset < 6; monthOffset++) {
    const date = new Date(today)
    date.setMonth(date.getMonth() - monthOffset)

    // Monthly payroll expenses (linked to employee salaries)
    const payrollRecords = generateMockPayroll().filter((p) => p.month === date.toISOString().slice(0, 7))
    payrollRecords.forEach((payroll) => {
      transactions.push({
        id: `txn-payroll-${payroll.id}`,
        date: payroll.paymentDate,
        type: "expense",
        category: "Nómina",
        description: `Pago de nómina - ${payroll.month}`,
        amount: payroll.netSalary,
        department: "Recursos Humanos",
        relatedEmployeeId: payroll.employeeId,
        status: payroll.status === "paid" ? "completed" : "pending",
      })
    })

    // Income transactions
    for (let i = 0; i < 15; i++) {
      const randomDay = Math.floor(Math.random() * 28) + 1
      const txDate = new Date(date.getFullYear(), date.getMonth(), randomDay)

      transactions.push({
        id: `txn-income-${monthOffset}-${i}`,
        date: txDate.toISOString().split("T")[0],
        type: "income",
        category: categories.income[Math.floor(Math.random() * categories.income.length)],
        description: `Ingreso por ${categories.income[Math.floor(Math.random() * categories.income.length)].toLowerCase()}`,
        amount: Math.floor(Math.random() * 50000) + 10000,
        department: departments[Math.floor(Math.random() * departments.length)],
        status: "completed",
      })
    }

    // Other expense transactions
    const expenseCategories = categories.expense.filter((c) => c !== "Nómina")
    for (let i = 0; i < 10; i++) {
      const randomDay = Math.floor(Math.random() * 28) + 1
      const txDate = new Date(date.getFullYear(), date.getMonth(), randomDay)

      transactions.push({
        id: `txn-expense-${monthOffset}-${i}`,
        date: txDate.toISOString().split("T")[0],
        type: "expense",
        category: expenseCategories[Math.floor(Math.random() * expenseCategories.length)],
        description: `Gasto operativo - ${expenseCategories[Math.floor(Math.random() * expenseCategories.length)]}`,
        amount: Math.floor(Math.random() * 15000) + 1000,
        department: departments[Math.floor(Math.random() * departments.length)],
        status: "completed",
      })
    }
  }

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function generateMockBudgets(): Budget[] {
  const budgets: Budget[] = []
  const departments = ["Ventas", "TI", "Marketing", "Operaciones", "Finanzas", "Recursos Humanos", "Diseño"]
  const categories = ["Nómina", "Marketing", "Tecnología", "Oficina", "Capacitación", "Servicios"]
  const today = new Date()

  for (let monthOffset = 0; monthOffset < 6; monthOffset++) {
    const date = new Date(today)
    date.setMonth(date.getMonth() - monthOffset)
    const month = date.toISOString().slice(0, 7)

    departments.forEach((dept) => {
      categories.forEach((category) => {
        const budgeted = Math.floor(Math.random() * 50000) + 20000
        const spent = Math.floor(budgeted * (0.6 + Math.random() * 0.5))

        budgets.push({
          id: `budget-${dept}-${category}-${month}`,
          department: dept,
          category,
          budgeted,
          spent,
          month,
        })
      })
    })
  }

  return budgets
}

export function generateMockFinancialMetrics(): FinancialMetrics[] {
  const transactions = generateMockFinancialTransactions()
  const months = Array.from(new Set(transactions.map((t) => t.date.slice(0, 7)))).sort()

  return months.map((month) => {
    const monthTransactions = transactions.filter((t) => t.date.startsWith(month) && t.status === "completed")
    const revenue = monthTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
    const expenses = monthTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
    const profit = revenue - expenses
    const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0

    return {
      month,
      revenue,
      expenses,
      profit,
      profitMargin,
    }
  })
}

export function generateMockCustomers(): Customer[] {
  const customers: Customer[] = []
  const companies = [
    "Tech Solutions Inc",
    "Global Trading Co",
    "Innovate Systems",
    "Prime Consulting",
    "Digital Services Ltd",
    "Enterprise Solutions",
    "Creative Agency",
    "Smart Business Corp",
    "Vision Technologies",
    "Future Industries",
    "Dynamic Group",
    "Strategic Partners",
    "Advanced Systems",
    "Professional Services",
    "Market Leaders Inc",
    "Growth Ventures",
  ]

  const industries = ["Tecnología", "Retail", "Servicios", "Manufactura", "Salud", "Educación", "Finanzas"]
  const firstNames = ["Carlos", "María", "José", "Ana", "Luis", "Carmen", "Pedro", "Isabel", "Miguel", "Laura"]
  const lastNames = ["González", "Rodríguez", "Martínez", "García", "López", "Hernández", "Pérez", "Sánchez"]

  const salesEmployees = mockEmployees.filter((e) => e.department === "Ventas")

  for (let i = 0; i < 50; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const company = companies[i % companies.length]
    const createdDate = new Date()
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 365))

    customers.push({
      id: `customer-${1000 + i}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s+/g, "")}.com`,
      phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      company,
      industry: industries[Math.floor(Math.random() * industries.length)],
      status: Math.random() > 0.2 ? "active" : Math.random() > 0.5 ? "prospect" : "inactive",
      assignedTo: salesEmployees[Math.floor(Math.random() * salesEmployees.length)].id,
      createdDate: createdDate.toISOString().split("T")[0],
      lastContact: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      totalPurchases: 0,
    })
  }

  return customers
}

export function generateMockSales(): Sale[] {
  const sales: Sale[] = []
  const customers = generateMockCustomers()
  const salesEmployees = mockEmployees.filter((e) => e.department === "Ventas")
  const today = new Date()

  const products = [
    "Licencia Software Empresarial",
    "Consultoría Estratégica",
    "Servicio de Implementación",
    "Soporte Premium Anual",
    "Capacitación Corporativa",
    "Desarrollo Custom",
    "Auditoría de Sistemas",
    "Plan de Marketing Digital",
  ]

  for (let monthOffset = 0; monthOffset < 6; monthOffset++) {
    const date = new Date(today)
    date.setMonth(date.getMonth() - monthOffset)

    const numSales = Math.floor(Math.random() * 30) + 40

    for (let i = 0; i < numSales; i++) {
      const randomDay = Math.floor(Math.random() * 28) + 1
      const saleDate = new Date(date.getFullYear(), date.getMonth(), randomDay)
      const customer = customers[Math.floor(Math.random() * customers.length)]
      const employee = salesEmployees[Math.floor(Math.random() * salesEmployees.length)]
      const amount = Math.floor(Math.random() * 40000) + 5000
      const commission = Math.floor(amount * (0.05 + Math.random() * 0.1))
      const quantity = Math.floor(Math.random() * 5) + 1

      sales.push({
        id: `sale-${monthOffset}-${i}`,
        customerId: customer.id,
        employeeId: employee.id,
        date: saleDate.toISOString().split("T")[0],
        amount,
        commission,
        status: Math.random() > 0.05 ? "completed" : Math.random() > 0.5 ? "pending" : "cancelled",
        product: products[Math.floor(Math.random() * products.length)],
        quantity,
      })
    }
  }

  // Update customer total purchases
  sales
    .filter((s) => s.status === "completed")
    .forEach((sale) => {
      const customer = customers.find((c) => c.id === sale.customerId)
      if (customer) {
        customer.totalPurchases += sale.amount
      }
    })

  return sales.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function generateMockSalesMetrics(): SalesMetrics[] {
  const sales = generateMockSales()
  const months = Array.from(new Set(sales.map((s) => s.date.slice(0, 7)))).sort()

  return months.map((month) => {
    const monthSales = sales.filter((s) => s.date.startsWith(month) && s.status === "completed")
    const totalSales = monthSales.reduce((sum, s) => sum + s.amount, 0)
    const totalCommissions = monthSales.reduce((sum, s) => sum + s.commission, 0)
    const numberOfSales = monthSales.length
    const averageTicket = numberOfSales > 0 ? totalSales / numberOfSales : 0

    return {
      month,
      totalSales,
      totalCommissions,
      averageTicket,
      numberOfSales,
    }
  })
}

// Generate mock products
export function generateMockProducts(): Product[] {
  const products: Product[] = []

  const categories = ["Software", "Hardware", "Servicios", "Licencias", "Equipos"]
  const suppliers = ["Tech Supplier Inc", "Global Tech", "Digital Solutions", "Premium Hardware", "Software House"]

  const productNames = {
    Software: ["ERP Sistema", "CRM Plataforma", "Software Contable", "Sistema de Inventario", "Gestión de Proyectos"],
    Hardware: [
      "Laptop Empresarial",
      "Monitor 27 pulgadas",
      "Impresora Multifuncional",
      "Router Empresarial",
      "Servidor",
    ],
    Servicios: ["Consultoría TI", "Soporte Técnico", "Capacitación", "Implementación", "Auditoría"],
    Licencias: ["Office 365", "Adobe Creative", "Antivirus Corporativo", "Windows Server", "Desarrollo IDE"],
    Equipos: ["Escritorio Ejecutivo", "Silla Ergonómica", "Proyector", "Teléfono IP", "UPS"],
  }

  let productId = 1

  categories.forEach((category) => {
    const names = productNames[category as keyof typeof productNames] || []
    names.forEach((name) => {
      const stock = Math.floor(Math.random() * 200) + 20
      const minStock = Math.floor(Math.random() * 20) + 10
      const maxStock = Math.floor(Math.random() * 300) + 200

      const restockDate = new Date()
      restockDate.setDate(restockDate.getDate() - Math.floor(Math.random() * 60))

      products.push({
        id: `product-${productId}`,
        name,
        sku: `SKU-${category.substring(0, 3).toUpperCase()}-${String(productId).padStart(4, "0")}`,
        category,
        description: `${name} - Alta calidad para uso empresarial`,
        unitPrice: Math.floor(Math.random() * 5000) + 500,
        stock,
        minStock,
        maxStock,
        supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
        lastRestockDate: restockDate.toISOString().split("T")[0],
      })

      productId++
    })
  })

  return products
}

// Generate mock inventory movements
export function generateMockInventoryMovements(): InventoryMovement[] {
  const movements: InventoryMovement[] = []
  const products = generateMockProducts()
  const employees = mockEmployees
  const today = new Date()

  const reasons = {
    entrada: ["Compra a proveedor", "Devolución de cliente", "Ajuste de inventario positivo"],
    salida: ["Venta", "Consumo interno", "Daño o pérdida"],
    ajuste: ["Corrección de inventario", "Inventario físico", "Reconciliación"],
  }

  for (let dayOffset = 0; dayOffset < 90; dayOffset++) {
    const date = new Date(today)
    date.setDate(date.getDate() - dayOffset)

    const numMovements = Math.floor(Math.random() * 5) + 2

    for (let i = 0; i < numMovements; i++) {
      const product = products[Math.floor(Math.random() * products.length)]
      const type = ["entrada", "salida", "ajuste"][Math.floor(Math.random() * 3)] as "entrada" | "salida" | "ajuste"
      const quantity = Math.floor(Math.random() * 20) + 1

      movements.push({
        id: `movement-${dayOffset}-${i}`,
        productId: product.id,
        type,
        quantity,
        date: date.toISOString().split("T")[0],
        reason: reasons[type][Math.floor(Math.random() * reasons[type].length)],
        responsible: employees[Math.floor(Math.random() * employees.length)].id,
        cost: type === "entrada" ? product.unitPrice * quantity : undefined,
      })
    }
  }

  return movements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Generate mock suppliers
export function generateMockSuppliers(): Supplier[] {
  const suppliers: Supplier[] = [
    {
      id: "supplier-1",
      name: "Tech Supplier Inc",
      contactPerson: "John Smith",
      email: "john@techsupplier.com",
      phone: "+1 (555) 100-2000",
      category: "Tecnología",
      paymentTerms: "30 días",
      totalPurchases: 0,
      status: "active",
    },
    {
      id: "supplier-2",
      name: "Global Tech",
      contactPerson: "Maria González",
      email: "maria@globaltech.com",
      phone: "+1 (555) 200-3000",
      category: "Hardware",
      paymentTerms: "45 días",
      totalPurchases: 0,
      status: "active",
    },
    {
      id: "supplier-3",
      name: "Digital Solutions",
      contactPerson: "Robert Johnson",
      email: "robert@digitalsolutions.com",
      phone: "+1 (555) 300-4000",
      category: "Software",
      paymentTerms: "60 días",
      totalPurchases: 0,
      status: "active",
    },
    {
      id: "supplier-4",
      name: "Premium Hardware",
      contactPerson: "Lisa Brown",
      email: "lisa@premiumhardware.com",
      phone: "+1 (555) 400-5000",
      category: "Equipos",
      paymentTerms: "30 días",
      totalPurchases: 0,
      status: "active",
    },
    {
      id: "supplier-5",
      name: "Software House",
      contactPerson: "Michael Davis",
      email: "michael@softwarehouse.com",
      phone: "+1 (555) 500-6000",
      category: "Licencias",
      paymentTerms: "15 días",
      totalPurchases: 0,
      status: "active",
    },
  ]

  return suppliers
}

// Generate mock purchase orders
export function generateMockPurchaseOrders(): PurchaseOrder[] {
  const orders: PurchaseOrder[] = []
  const products = generateMockProducts()
  const suppliers = generateMockSuppliers()
  const today = new Date()

  for (let monthOffset = 0; monthOffset < 6; monthOffset++) {
    const date = new Date(today)
    date.setMonth(date.getMonth() - monthOffset)

    const numOrders = Math.floor(Math.random() * 10) + 5

    for (let i = 0; i < numOrders; i++) {
      const orderDate = new Date(date.getFullYear(), date.getMonth(), Math.floor(Math.random() * 28) + 1)
      const expectedDelivery = new Date(orderDate)
      expectedDelivery.setDate(expectedDelivery.getDate() + Math.floor(Math.random() * 15) + 5)

      const supplier = suppliers[Math.floor(Math.random() * suppliers.length)]
      const supplierProducts = products.filter((p) => p.supplier === supplier.name)

      const numItems = Math.floor(Math.random() * 4) + 1
      const items = []
      let total = 0

      for (let j = 0; j < numItems; j++) {
        const product = supplierProducts[Math.floor(Math.random() * supplierProducts.length)]
        const quantity = Math.floor(Math.random() * 50) + 5
        const unitPrice = product.unitPrice

        items.push({
          productId: product.id,
          quantity,
          unitPrice,
        })

        total += quantity * unitPrice
      }

      orders.push({
        id: `po-${monthOffset}-${i}`,
        supplier: supplier.name,
        date: orderDate.toISOString().split("T")[0],
        expectedDelivery: expectedDelivery.toISOString().split("T")[0],
        status: monthOffset === 0 ? (Math.random() > 0.5 ? "pending" : "received") : "received",
        total,
        items,
      })

      if (monthOffset > 0) {
        supplier.totalPurchases += total
      }
    }
  }

  return orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function initializeMockData() {
  if (typeof window === "undefined") return

  const employeesKey = "dss-employees"
  const attendanceKey = "dss-attendance"
  const performanceKey = "dss-performance"
  const payrollKey = "dss-payroll"
  const vacationKey = "dss-vacations"
  const transactionsKey = "dss-transactions"
  const budgetsKey = "dss-budgets"
  const metricsKey = "dss-metrics"
  const customersKey = "dss-customers"
  const salesKey = "dss-sales"
  const salesMetricsKey = "dss-sales-metrics"
  // Added inventory data keys
  const productsKey = "dss-products"
  const movementsKey = "dss-movements"
  const suppliersKey = "dss-suppliers"
  const purchaseOrdersKey = "dss-purchase-orders"

  if (!localStorage.getItem(employeesKey)) {
    localStorage.setItem(employeesKey, JSON.stringify(mockEmployees))
  }

  if (!localStorage.getItem(attendanceKey)) {
    localStorage.setItem(attendanceKey, JSON.stringify(generateMockAttendance()))
  }

  if (!localStorage.getItem(performanceKey)) {
    localStorage.setItem(performanceKey, JSON.stringify(generateMockPerformanceReviews()))
  }

  if (!localStorage.getItem(payrollKey)) {
    localStorage.setItem(payrollKey, JSON.stringify(generateMockPayroll()))
  }

  if (!localStorage.getItem(vacationKey)) {
    localStorage.setItem(vacationKey, JSON.stringify(generateMockVacations()))
  }

  if (!localStorage.getItem(transactionsKey)) {
    localStorage.setItem(transactionsKey, JSON.stringify(generateMockFinancialTransactions()))
  }

  if (!localStorage.getItem(budgetsKey)) {
    localStorage.setItem(budgetsKey, JSON.stringify(generateMockBudgets()))
  }

  if (!localStorage.getItem(metricsKey)) {
    localStorage.setItem(metricsKey, JSON.stringify(generateMockFinancialMetrics()))
  }

  if (!localStorage.getItem(customersKey)) {
    localStorage.setItem(customersKey, JSON.stringify(generateMockCustomers()))
  }

  if (!localStorage.getItem(salesKey)) {
    localStorage.setItem(salesKey, JSON.stringify(generateMockSales()))
  }

  if (!localStorage.getItem(salesMetricsKey)) {
    localStorage.setItem(salesMetricsKey, JSON.stringify(generateMockSalesMetrics()))
  }

  // Initialize inventory data
  if (!localStorage.getItem(productsKey)) {
    localStorage.setItem(productsKey, JSON.stringify(generateMockProducts()))
  }

  if (!localStorage.getItem(movementsKey)) {
    localStorage.setItem(movementsKey, JSON.stringify(generateMockInventoryMovements()))
  }

  if (!localStorage.getItem(suppliersKey)) {
    localStorage.setItem(suppliersKey, JSON.stringify(generateMockSuppliers()))
  }

  if (!localStorage.getItem(purchaseOrdersKey)) {
    localStorage.setItem(purchaseOrdersKey, JSON.stringify(generateMockPurchaseOrders()))
  }
}

export function getEmployees(): Employee[] {
  if (typeof window === "undefined") return mockEmployees
  const data = localStorage.getItem("dss-employees")
  return data ? JSON.parse(data) : mockEmployees
}

export function getAttendance(): AttendanceRecord[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("dss-attendance")
  return data ? JSON.parse(data) : []
}

export function getPerformanceReviews(): PerformanceReview[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("dss-performance")
  return data ? JSON.parse(data) : []
}

export function getPayroll(): PayrollRecord[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("dss-payroll")
  return data ? JSON.parse(data) : []
}

export function getVacations(): VacationRecord[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("dss-vacations")
  return data ? JSON.parse(data) : []
}

export function getFinancialTransactions(): FinancialTransaction[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("dss-transactions")
  return data ? JSON.parse(data) : []
}

export function getBudgets(): Budget[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("dss-budgets")
  return data ? JSON.parse(data) : []
}

export function getFinancialMetrics(): FinancialMetrics[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("dss-metrics")
  return data ? JSON.parse(data) : []
}

export function getCustomers(): Customer[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("dss-customers")
  return data ? JSON.parse(data) : []
}

export function getSales(): Sale[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("dss-sales")
  return data ? JSON.parse(data) : []
}

export function getSalesMetrics(): SalesMetrics[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("dss-sales-metrics")
  return data ? JSON.parse(data) : []
}

// Added getters for inventory data
export function getProducts(): Product[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("dss-products")
  return data ? JSON.parse(data) : []
}

export function getInventoryMovements(): InventoryMovement[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("dss-movements")
  return data ? JSON.parse(data) : []
}

export function getSuppliers(): Supplier[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("dss-suppliers")
  return data ? JSON.parse(data) : []
}

export function getPurchaseOrders(): PurchaseOrder[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("dss-purchase-orders")
  return data ? JSON.parse(data) : []
}

export function addAttendanceRecord(record: Omit<AttendanceRecord, "id">) {
  if (typeof window === "undefined") return
  const attendance = getAttendance()
  const newRecord = {
    ...record,
    id: `${record.employeeId}-${record.date}-${record.type}-${Date.now()}`,
  }
  attendance.push(newRecord)
  localStorage.setItem("dss-attendance", JSON.stringify(attendance))
}
