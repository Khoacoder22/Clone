import { Container, Heading, Button, toast } from "@medusajs/ui"
import { useMutation } from "@tanstack/react-query"
import { sdk } from "../../../lib/sdk"

const AlgoliaPage = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      sdk.client.fetch("/admin/algolia/sync", {
        method: "POST",
      }),
    onSuccess: () => {
      toast.success("Successfully triggered data sync to Algolia")
    },
    onError: () => {
      toast.error("Failed to trigger data sync to Algolia")
    },
  })

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Algolia Sync</Heading>
      </div>

      <div className="px-6 py-8">
        <Button onClick={() => mutate()} isLoading={isPending}>
          Sync Data to Algolia
        </Button>
      </div>
    </Container>
  )
}

// 🔥 Medusa Router yêu cầu export default hoặc export Component
export default AlgoliaPage
export const Component = AlgoliaPage
