import { createStep, StepResponse, createWorkflow, WorkflowResponse} from "@medusajs/framework/workflows-sdk"
import { SUPPLIER_MODULE } from "../modules/supplier"
import SupplierModuleService from "../modules/supplier/service" 

export type DeleteSupplierInput = {
    id: string
}

export const deleteSupplierStep = createStep(
    "delete-supplier-step",
    async (input: DeleteSupplierInput, {container}) => {
        const supplierService: SupplierModuleService = container.resolve(SUPPLIER_MODULE)
        const supplier = await supplierService.deleteSuppliers(input.id)
        return new StepResponse({id: input.id, deleted: true})
    }
)

export const deleteSupplierWorkflow = createWorkflow(
    "delete-supplier",
    (input: DeleteSupplierInput) => {
        const supplier = deleteSupplierStep(input)
        return new WorkflowResponse(supplier)
    }
)