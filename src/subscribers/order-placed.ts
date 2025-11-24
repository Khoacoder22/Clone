import type {
  SubscriberArgs,
  SubscriberConfig,
} from "@medusajs/framework"
import { sendOrderConfirmationWorkflow } from "../workflows/send-order-confirmation"
import { trackOrderPlacedWorkflow } from "../workflows/track-order-placed"


export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  await sendOrderConfirmationWorkflow(container)
    .run({
      input: {
        id: data.id,
      },
    })

    await trackOrderPlacedWorkflow(container)
    .run({
      input: {
        id: data.id,
      },
    })
}

export const config: SubscriberConfig = {
  event: "order.placed",
}