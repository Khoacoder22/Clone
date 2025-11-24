import { 
  defineMiddlewares,
  errorHandler,
  validateAndTransformBody,
} from "@medusajs/framework/http"
import { z } from "zod"
import { PostAdminCreateBrand } from "./admin/brands/validators"
import { PostAdminCreateSupplier } from "./admin/suppliers/validators"
import { PostAdminUpdateSupplier } from "./admin/suppliers/validators"
import { SearchSchema } from "./store/products/search/route"


export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/brands",
      method: "POST",
      middlewares: [
        validateAndTransformBody(PostAdminCreateBrand),
      ],
    },
    {
      matcher: "/admin/products",
      method: ["POST"],
      additionalDataValidator: {
        brand_id: z.string().optional(),
      },
    },
    {
      matcher: "/admin/suppliers",
      method: "POST",
      middlewares: [
        validateAndTransformBody(PostAdminCreateSupplier),
      ]
    },
    {
      matcher: "/admin/suppliers/:id",
      method: "PUT",
      middlewares: [validateAndTransformBody(PostAdminUpdateSupplier)]
    },
    {
      matcher: "/store/products/search",
      method: ["POST"],
      middlewares: [
        validateAndTransformBody(SearchSchema),
      ],
    },
  ]
})


