import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { DashboardButton } from "@/components/auth/dashboard-button";

export default function Home() {
  return (
  
      <>
        <div className="flex h-screen w-screen flex-col bg-sky-500 items-center justify-center ">
          <div className="space-y-6">
            <h1 className="text-6xl font-semibold text-white">
              🔐 Auth
            </h1>
            <p className="text-white text-lg">
              Authentication Service
            </p>
            <div className="flex justify-center items-center gap-2">
              <LoginButton>
                <Button
                className="p-2 rounded-full text-gray-800" variant="secondary"
                >Log In</Button>
              </LoginButton>
              <DashboardButton>
              <Button className="p-2 rounded-full text-white bg-purple-300">
                Go to Dashboard
              </Button>
              </DashboardButton>

            </div>
          </div>
        </div>
      </>
    
  );
}
