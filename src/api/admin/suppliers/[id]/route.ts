import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { deleteSupplierWorkflow } from "../../../../workflows/delete-supplier"
import { updateSupplierWorkflow } from "../../../../workflows/update-supplier"

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
    const {id} = req.params

    const { result } = await deleteSupplierWorkflow(req.scope).run({
        input: {id},
    })

    res.json({
        supplier: result,
        message: "Delete successfully"
    })
}

export const PUT = async (req: MedusaRequest, res: MedusaResponse) => {
  // lấy id từ URL
  const {id} = req.params

  // lấy body hợp lệ
  const body = req.body as {
    name?: string
    address?: string
    phone?: string
  }

  // chạy workflow update supplier
  const { result } = await updateSupplierWorkflow(req.scope).run({
    input: { id, ...body },
  })

  // trả về kết quả
  res.json({ supplier: result })
}
