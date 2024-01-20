import { Button } from "@/components/ui/button"
import { Aladin } from "next/font/google";
import { LoginButton } from "@/components/auth/LoginButton";
export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gray-100">
      <div>
        <div className="text-center">
          <h1 className="text-2xl tex-center">🔑 Auth</h1>
          <p>Auth services</p>
        </div>
        <LoginButton>
          <Button>Sign In</Button>
        </LoginButton>
      </div>
    </main>
  );
}
