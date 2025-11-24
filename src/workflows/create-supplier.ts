import { createStep, StepResponse,  createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { SUPPLIER_MODULE } from "../modules/supplier"
import SupplierModuleService from "../modules/supplier/service"

export type CreateSupplierInput = {
  name: string
  address?: string
  phone?: string
}

export const createSupplierStep = createStep(
  "create-supplier-step",
  async (input: CreateSupplierInput, { container }) => {
    const supplierService: SupplierModuleService = container.resolve(
      SUPPLIER_MODULE
    )

    const supplier = await supplierService.createSuppliers(input)

    return new StepResponse(supplier, supplier.id)
  },
  //ROLLBACK
  async (supplierId: string, { container }) => {
    const supplierService: SupplierModuleService = container.resolve(
      SUPPLIER_MODULE
    )

    await supplierService.deleteSuppliers(supplierId)
  }
)

type createBrandWorkflowInput = {
    name: string
    address?: string
    phone?: string
}

export const createSupplierWorkflow = createWorkflow(
    "create-supplier",
    (input: createBrandWorkflowInput) => {
        const supplier = createSupplierStep(input)

        return new WorkflowResponse(supplier)
    }
)