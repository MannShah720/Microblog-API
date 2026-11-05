import CreatePost from "../components/CreatePost";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../services/api";

type Post = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  created_at: string;
  owner_id: number;
};

type PostWithVotes = {
  Post: Post;
  votes: number;
};

function Feed() {
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [posts, setPosts] = useState<PostWithVotes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function handleLogout() {
    sessionStorage.removeItem("access_token");
    navigate("/login", { replace: true });
    }

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = (await getPosts()) as PostWithVotes[];
        setPosts(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load posts."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto max-w-2xl px-4">

        <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
            Your Feed
        </h1>

        <button
            onClick={handleLogout}
            className="rounded-md bg-red-600 px-5 py-2 text-white hover:bg-red-700"
        >
            Logout
        </button>
        </div>

        <CreatePost
            onPostCreated={() => setRefreshKey((current) => current + 1)}
        />

        {posts.length === 0 ? (
          <p className="text-gray-500">
            No posts yet. Be the first to share something!
          </p>
        ) : (
          <div className="space-y-4">
            {posts.map(({ Post: post, votes }) => (
              <article
                key={post.id}
                className="rounded-lg bg-white p-6 shadow"
              >
                <h2 className="mb-2 text-xl font-bold">
                  {post.title}
                </h2>

                <p className="mb-4 text-gray-700">
                  {post.content}
                </p>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>
                    User ID: {post.owner_id}
                  </span>

                  <span>
                    {votes} votes
                  </span>
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  {post.created_at
                    ? new Date(post.created_at).toLocaleString()
                    : ""}
                </p>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Feed;