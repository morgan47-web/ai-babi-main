import { Card } from "@/components/ui/card"
import { ChatMessage } from "@/app/lib/generated"

interface Props {
  message: ChatMessage
}

export function UserMessages({ message }: Props) {
  return (
    <div key={message.requestId} className="flex justify-end">
      <div className={`flex max-w-[70%] flex-row-reverse gap-2`}>
        <div className="flex flex-col items-end">
          <Card className={`rounded-br-[2px] bg-primary p-2`}>
            <p className="whitespace-pre-line break-word text-sm font-bold">
              {message.content}
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default UserMessages
