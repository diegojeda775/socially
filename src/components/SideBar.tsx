
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
import { userLookUpByExtId } from "@/app/actions/user.action";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useReducer } from "react";
import { Separator } from "./ui/separator";
import { LinkIcon, MapPinIcon } from "lucide-react";


async function SideBar() {
  const authUser = await currentUser();
  if(!authUser) return <UnAuthUser />;
  const user = await userLookUpByExtId(authUser.id);
  if(!user) return null;

  return (
    <div className="sticky top-20">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Link href={`profile/${user.username ?? user.email.split("@")[0]}`}
              className="flex flex-col items-center justify-center"
            >
              <Avatar className="h-20 w-20 border-2">
                <AvatarImage src={user.image || "/avatar.png"}/>
              </Avatar>
              <div className="mt-4 space-y-1">
                <h3 className="semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.username}</p>
              </div>
            </Link>
            {user.bio && <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>}
            <div className="w-full">
              <Separator className="my-4"/>
              <div className="flex justify-evenly">
                <div>
                  <p className="font-medium">{user._count.following}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
                <Separator orientation="vertical"/>
                <div>
                  <p className="font-medium">{user._count.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
              </div>
              <Separator className="my-4"/>
            </div>
            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPinIcon className="w-4 h-4 mr-2"/>
                {user.location || "No Location"}
              </div>
              <div className="flex items-center text-muted-foreground">
                <LinkIcon className="w-4 h-4 mr-2 shrink-0"/>
                {user.website 
                  ? <a href={`${user.website}`} className="hover:underline truncate">{user.website}</a>
                  : "No Website"
                }
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
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