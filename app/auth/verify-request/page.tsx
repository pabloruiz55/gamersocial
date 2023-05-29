import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, Waves } from "lucide-react"

export default function VerifyEmail() {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Alert className="w-1/3">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                You should have received an email. Follow the instructions to access the app.
            </AlertDescription>
        </Alert>
      </div>
    )
  }