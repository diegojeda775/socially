
import { currentUser } from "@clerk/nextjs/server"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";


async function SideBar() {
  const authUser = await currentUser();
  if(!authUser) return <UnAuthUser />;
  return (
    <div>SideBar</div>
  )
}

export default SideBar

export const UnAuthUser = () => {
  return <div className="sticky top-20">
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          Welcome Back!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground mb-4">
          Login to access your profile and connect with others.
        </p>
        <SignInButton mode="modal">
         <Button className="w-full" variant="outline">
            Sign in
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
         <Button className="w-full mt-2" variant="default">
            Sign up
          </Button>
        </SignUpButton>
      </CardContent>
    </Card>
  </div>
}