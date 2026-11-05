import { useState, type FormEvent } from "react";
import { createPost } from "../services/api";

type CreatePostProps = {
  onPostCreated: () => void;
};

function CreatePost({ onPostCreated }: CreatePostProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setError(false);
    setLoading(true);

    try {
      await createPost(title, content);

      setTitle("");
      setContent("");
      setMessage("Post published successfully!");

      onPostCreated();
    } catch (err) {
      setError(true);
      setMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow">

      <h2 className="mb-4 text-xl font-bold">
        Create a post
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label htmlFor="title" className="mb-1 block font-medium">
            Title
          </label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-md border p-3"
            placeholder="Give your post a title..."
          />
        </div>

        <div>
          <label htmlFor="content" className="mb-1 block font-medium">
            What's on your mind?
          </label>

          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            className="w-full rounded-md border p-3"
            placeholder="Write something..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish post"}
        </button>

      </form>

      {message && (
        <p
          className={`mt-4 text-sm ${
            error ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}

    </div>
  );
}

export default CreatePost;