type Posts = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Album = {
  userId: number;
  id: number;
  title: string;
};

async function getUserPosts(userId: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  return response.json();
}
async function getUserAlbums(userId: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
  );
  return response.json();
}

export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const postsData = getUserPosts(id);
  const albumsData = getUserAlbums(id);

  const [posts, albums] = await Promise.all([postsData, albumsData]);

  console.log(posts);
  console.log(albums);

  return (
    <section className="grid grid-cols-2 gap-2">
      <section>
        <h2>Posts</h2>
        <section className="flex flex-col gap-2">
          {posts.map((post: Posts) => (
            <section
              key={post.title}
              className="border border-black p-2 rounded-md"
            >
              <b>{post.title}</b>
              <p>{post.body}</p>
            </section>
          ))}
        </section>
      </section>
      <section>
        <h2>Albums</h2>
        <section className="flex flex-col gap-2">
          {albums.map((album: Album) => (
            <p key={album.title} className="border border-black p-2 rounded-md">
              {album.title}
            </p>
          ))}
        </section>
      </section>
    </section>
  );
}
