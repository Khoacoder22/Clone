import {z} from "zod"
import { PostAdminCreateSupplier } from "./validators"
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { createSupplierWorkflow } from "../../../workflows/create-supplier"

type PostAdminCreateSupplier = z.infer<typeof PostAdminCreateSupplier>

export const POST = async(
    req: MedusaRequest<PostAdminCreateSupplier>,
    res: MedusaResponse
) => {
    const { result } = await createSupplierWorkflow(req.scope)
    .run({
        input: req.validatedBody,
    })

    res.json({supplier : result})
}

export const GET = async(req: MedusaRequest, res: MedusaResponse) => {
    const query = req.scope.resolve("query")

    const {data: suppliers} = await query.graph({
        entity: "supplier",
        fields: ["id", "name", "address", "phone", "create_at", "updated_at"],
    })

    res.json({ suppliers })
}

