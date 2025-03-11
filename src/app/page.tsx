import CreatePost from "@/components/CreatePost";
import { userLookUpByExtId } from "./actions/user.action";
import WhoToFollow from "@/components/WhoToFollow";
import PostCard from "@/components/PostCard";
import { getPosts } from "./actions/post.action";



export default async function Home() {
  const { user }: any = await userLookUpByExtId() || null;
  const posts = await getPosts();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {user && <CreatePost user={user}/>}
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <WhoToFollow />
      </div>
    </div>
  );
};
