import CreatePost from "@/components/CreatePost";
import { auth } from "@clerk/nextjs/server";
import { userLookUpByExtId } from "./actions/user.action";



export default async function Home() {
  const {userId} = await auth() || '';
  const user = await userLookUpByExtId(userId as string)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {user && <CreatePost user={user}/>}
      </div>
      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        Who to Follow
      </div>
    </div>
  );
};
