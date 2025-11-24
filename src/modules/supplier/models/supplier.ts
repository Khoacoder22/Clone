import { model } from "@medusajs/framework/utils"

export const Supplier = model.define("supplier", {
    id: model.id().primaryKey(),
    name: model.text().nullable(),
    address: model.text().nullable(),
    phone: model.text().nullable(),
})