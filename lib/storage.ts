// Utility functions for localStorage operations with type safety

import type {
  VacationRecord,
  FinancialTransaction,
  Customer,
  Sale,
  Product,
  InventoryMovement,
  Supplier,
  PurchaseOrder,
} from "./mock-data"

// Storage keys
export const STORAGE_KEYS = {
  EMPLOYEES: "dss-employees",
  ATTENDANCE: "dss-attendance",
  PERFORMANCE: "dss-performance",
  PAYROLL: "dss-payroll",
  VACATIONS: "dss-vacations",
  TRANSACTIONS: "dss-transactions",
  BUDGETS: "dss-budgets",
  METRICS: "dss-metrics",
  CUSTOMERS: "dss-customers",
  SALES: "dss-sales",
  SALES_METRICS: "dss-sales-metrics",
  PRODUCTS: "dss-products",
  MOVEMENTS: "dss-movements",
  SUPPLIERS: "dss-suppliers",
  PURCHASE_ORDERS: "dss-purchase-orders",
}

// Generic storage functions
export function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(data))
}

export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : defaultValue
}

// Sales operations
export function createSale(sale: Omit<Sale, "id">): Sale {
  const sales = getFromStorage<Sale[]>(STORAGE_KEYS.SALES, [])
  const newSale: Sale = {
    ...sale,
    id: `sale-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  }
  sales.unshift(newSale)
  saveToStorage(STORAGE_KEYS.SALES, sales)

  // Update customer total purchases
  if (newSale.status === "completed") {
    const customers = getFromStorage<Customer[]>(STORAGE_KEYS.CUSTOMERS, [])
    const customerIndex = customers.findIndex((c) => c.id === newSale.customerId)
    if (customerIndex >= 0) {
      customers[customerIndex].totalPurchases += newSale.amount
      customers[customerIndex].lastContact = newSale.date
      saveToStorage(STORAGE_KEYS.CUSTOMERS, customers)
    }
  }

  // Create financial transaction
  const transactions = getFromStorage<FinancialTransaction[]>(STORAGE_KEYS.TRANSACTIONS, [])
  transactions.unshift({
    id: `txn-sale-${newSale.id}`,
    date: newSale.date,
    type: "income",
    category: "Ventas",
    description: `Venta: ${newSale.product}`,
    amount: newSale.amount,
    department: "Ventas",
    relatedEmployeeId: newSale.employeeId,
    status: newSale.status === "completed" ? "completed" : "pending",
  })
  saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions)

  return newSale
}

export function updateSale(id: string, updates: Partial<Sale>): void {
  const sales = getFromStorage<Sale[]>(STORAGE_KEYS.SALES, [])
  const index = sales.findIndex((s) => s.id === id)
  if (index >= 0) {
    const oldSale = sales[index]
    sales[index] = { ...oldSale, ...updates }
    saveToStorage(STORAGE_KEYS.SALES, sales)

    // Update related financial transaction
    const transactions = getFromStorage<FinancialTransaction[]>(STORAGE_KEYS.TRANSACTIONS, [])
    const txIndex = transactions.findIndex((t) => t.id === `txn-sale-${id}`)
    if (txIndex >= 0) {
      transactions[txIndex].status = updates.status === "completed" ? "completed" : "pending"
      if (updates.amount) transactions[txIndex].amount = updates.amount
      saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions)
    }
  }
}

// Customer operations
export function createCustomer(customer: Omit<Customer, "id">): Customer {
  const customers = getFromStorage<Customer[]>(STORAGE_KEYS.CUSTOMERS, [])
  const newCustomer: Customer = {
    ...customer,
    id: `customer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  }
  customers.unshift(newCustomer)
  saveToStorage(STORAGE_KEYS.CUSTOMERS, customers)
  return newCustomer
}

export function updateCustomer(id: string, updates: Partial<Customer>): void {
  const customers = getFromStorage<Customer[]>(STORAGE_KEYS.CUSTOMERS, [])
  const index = customers.findIndex((c) => c.id === id)
  if (index >= 0) {
    customers[index] = { ...customers[index], ...updates }
    saveToStorage(STORAGE_KEYS.CUSTOMERS, customers)
  }
}

// Product operations
export function createProduct(product: Omit<Product, "id">): Product {
  const products = getFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, [])
  const productCount = products.length + 1
  const newProduct: Product = {
    ...product,
    id: `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    sku:
      product.sku || `SKU-${product.category.substring(0, 3).toUpperCase()}-${String(productCount).padStart(4, "0")}`,
  }
  products.unshift(newProduct)
  saveToStorage(STORAGE_KEYS.PRODUCTS, products)
  return newProduct
}

export function updateProduct(id: string, updates: Partial<Product>): void {
  const products = getFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, [])
  const index = products.findIndex((p) => p.id === id)
  if (index >= 0) {
    products[index] = { ...products[index], ...updates }
    saveToStorage(STORAGE_KEYS.PRODUCTS, products)
  }
}

// Inventory movement operations
export function createInventoryMovement(movement: Omit<InventoryMovement, "id">): InventoryMovement {
  const movements = getFromStorage<InventoryMovement[]>(STORAGE_KEYS.MOVEMENTS, [])
  const newMovement: InventoryMovement = {
    ...movement,
    id: `movement-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  }
  movements.unshift(newMovement)
  saveToStorage(STORAGE_KEYS.MOVEMENTS, movements)

  // Update product stock
  const products = getFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, [])
  const productIndex = products.findIndex((p) => p.id === movement.productId)
  if (productIndex >= 0) {
    const product = products[productIndex]
    if (movement.type === "entrada") {
      product.stock += movement.quantity
      product.lastRestockDate = movement.date
    } else if (movement.type === "salida") {
      product.stock = Math.max(0, product.stock - movement.quantity)
    } else if (movement.type === "ajuste") {
      product.stock = movement.quantity
    }
    saveToStorage(STORAGE_KEYS.PRODUCTS, products)
  }

  // Create financial transaction for purchases
  if (movement.type === "entrada" && movement.cost) {
    const transactions = getFromStorage<FinancialTransaction[]>(STORAGE_KEYS.TRANSACTIONS, [])
    transactions.unshift({
      id: `txn-inventory-${newMovement.id}`,
      date: movement.date,
      type: "expense",
      category: "Inventario",
      description: `Compra de inventario: ${movement.reason}`,
      amount: movement.cost,
      department: "Operaciones",
      status: "completed",
    })
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions)
  }

  return newMovement
}

// Purchase order operations
export function createPurchaseOrder(order: Omit<PurchaseOrder, "id">): PurchaseOrder {
  const orders = getFromStorage<PurchaseOrder[]>(STORAGE_KEYS.PURCHASE_ORDERS, [])
  const newOrder: PurchaseOrder = {
    ...order,
    id: `po-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  }
  orders.unshift(newOrder)
  saveToStorage(STORAGE_KEYS.PURCHASE_ORDERS, orders)

  // Create financial transaction for expense
  const transactions = getFromStorage<FinancialTransaction[]>(STORAGE_KEYS.TRANSACTIONS, [])
  transactions.unshift({
    id: `txn-po-${newOrder.id}`,
    date: order.date,
    type: "expense",
    category: "Compras",
    description: `Orden de compra a ${order.supplier}`,
    amount: order.total,
    department: "Operaciones",
    status: order.status === "received" ? "completed" : "pending",
  })
  saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions)

  return newOrder
}

export function updatePurchaseOrder(id: string, updates: Partial<PurchaseOrder>): void {
  const orders = getFromStorage<PurchaseOrder[]>(STORAGE_KEYS.PURCHASE_ORDERS, [])
  const index = orders.findIndex((o) => o.id === id)
  if (index >= 0) {
    const oldOrder = orders[index]
    orders[index] = { ...oldOrder, ...updates }
    saveToStorage(STORAGE_KEYS.PURCHASE_ORDERS, orders)

    // If status changed to received, create inventory movements
    if (updates.status === "received" && oldOrder.status !== "received") {
      const order = orders[index]
      const products = getFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, [])

      order.items.forEach((item) => {
        createInventoryMovement({
          productId: item.productId,
          type: "entrada",
          quantity: item.quantity,
          date: new Date().toISOString().split("T")[0],
          reason: `Recepción de orden de compra ${id}`,
          responsible: 1001, // System/admin user
          cost: item.quantity * item.unitPrice,
        })
      })

      // Update supplier total purchases
      const suppliers = getFromStorage<Supplier[]>(STORAGE_KEYS.SUPPLIERS, [])
      const supplierIndex = suppliers.findIndex((s) => s.name === order.supplier)
      if (supplierIndex >= 0) {
        suppliers[supplierIndex].totalPurchases += order.total
        saveToStorage(STORAGE_KEYS.SUPPLIERS, suppliers)
      }
    }

    // Update related financial transaction
    const transactions = getFromStorage<FinancialTransaction[]>(STORAGE_KEYS.TRANSACTIONS, [])
    const txIndex = transactions.findIndex((t) => t.id === `txn-po-${id}`)
    if (txIndex >= 0 && updates.status) {
      transactions[txIndex].status = updates.status === "received" ? "completed" : "pending"
      saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions)
    }
  }
}

// Supplier operations
export function createSupplier(supplier: Omit<Supplier, "id">): Supplier {
  const suppliers = getFromStorage<Supplier[]>(STORAGE_KEYS.SUPPLIERS, [])
  const newSupplier: Supplier = {
    ...supplier,
    id: `supplier-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  }
  suppliers.unshift(newSupplier)
  saveToStorage(STORAGE_KEYS.SUPPLIERS, suppliers)
  return newSupplier
}

export function updateSupplier(id: string, updates: Partial<Supplier>): void {
  const suppliers = getFromStorage<Supplier[]>(STORAGE_KEYS.SUPPLIERS, [])
  const index = suppliers.findIndex((s) => s.id === id)
  if (index >= 0) {
    suppliers[index] = { ...suppliers[index], ...updates }
    saveToStorage(STORAGE_KEYS.SUPPLIERS, suppliers)
  }
}

// Vacation operations
export function createVacationRequest(vacation: Omit<VacationRecord, "id">): VacationRecord {
  const vacations = getFromStorage<VacationRecord[]>(STORAGE_KEYS.VACATIONS, [])
  const newVacation: VacationRecord = {
    ...vacation,
    id: `vacation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  }
  vacations.unshift(newVacation)
  saveToStorage(STORAGE_KEYS.VACATIONS, vacations)
  return newVacation
}

export function updateVacationRequest(id: string, updates: Partial<VacationRecord>): void {
  const vacations = getFromStorage<VacationRecord[]>(STORAGE_KEYS.VACATIONS, [])
  const index = vacations.findIndex((v) => v.id === id)
  if (index >= 0) {
    vacations[index] = { ...vacations[index], ...updates }
    saveToStorage(STORAGE_KEYS.VACATIONS, vacations)
  }
}

// Financial transaction operations
export function createTransaction(transaction: Omit<FinancialTransaction, "id">): FinancialTransaction {
  const transactions = getFromStorage<FinancialTransaction[]>(STORAGE_KEYS.TRANSACTIONS, [])
  const newTransaction: FinancialTransaction = {
    ...transaction,
    id: `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  }
  transactions.unshift(newTransaction)
  saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions)
  return newTransaction
}

export function updateTransaction(id: string, updates: Partial<FinancialTransaction>): void {
  const transactions = getFromStorage<FinancialTransaction[]>(STORAGE_KEYS.TRANSACTIONS, [])
  const index = transactions.findIndex((t) => t.id === id)
  if (index >= 0) {
    transactions[index] = { ...transactions[index], ...updates }
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions)
  }
}
