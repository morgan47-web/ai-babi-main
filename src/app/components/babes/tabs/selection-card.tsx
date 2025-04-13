import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export default function SelectionCard({ tag }: { tag: string }) {
  return (
    <Card className="relative h-full w-full rounded-lg">
      <Badge variant={"image"} className="absolute bottom-0">
        {tag}
      </Badge>
    </Card>
  )
}
