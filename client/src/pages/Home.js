import { useAuth } from "../util/auth";

export default function Home() {
  const { isLoggedIn, user } = useAuth();
  return (
    <div>
      {/* TODO: display logged in user's username */}
      <h1>Welcome {isLoggedIn ? user.username : "Guest"}!</h1>
      <hr />
      <p>
        Welcome to Homemade Tastes! Get a taste of Homemade food by your local neighbors,Users are able to search locally for homemade cuisines within the area they are in! This allows people to share some of food they make within their own kitchen, to share their tasty creations and to share a little bit of their culture as well

      </p>
    </div>
  );
}
