import {createStep, createWorkflow, StepResponse, WorkflowResponse} from "@medusajs/framework/workflows-sdk"
import { SUPPLIER_MODULE } from "../modules/supplier"
import SupplierModuleService from "../modules/supplier/service"

export type UpdateSupplierInput = {
    id: string,
    name?: string,
    address?: string,
    phone?: string
}

export const updateSupplierStep = createStep(
    "update-supplier-step",
    async (input: UpdateSupplierInput, {container}) => {
        const supplierService: SupplierModuleService = container.resolve(
            SUPPLIER_MODULE
        ) 

        const updated = await supplierService.updateSuppliers({
            selector: { id: input.id },
            data: {
              name: input.name,
              address: input.address,
              phone: input.phone,
            },
        })

    return new StepResponse(updated, updated[0]?.id)
    }
)

export const updateSupplierWorkflow = createWorkflow(
    "update-supplier",
    (input: UpdateSupplierInput) => {
        const supplier = updateSupplierStep(input)
        
        return new WorkflowResponse(supplier)
    }
)