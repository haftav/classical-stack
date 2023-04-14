import type { LoaderArgs } from "@remix-run/node";

import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getUserSession } from "~/services/session.server";

export async function loader({ request }: LoaderArgs) {
  const user = await getUserSession(request);

  return json({
    user,
  });
}

const LoggedIn = () => {
  return <div className="container m-auto">Logged In</div>;
};

const LoggedOut = () => {
  return (
    <div className="w-full flex flex-col items-center pt-12 container">
      <Link to="/login">Log In</Link>
      Logged Out
    </div>
  );
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return <div>{data.user ? <LoggedIn /> : <LoggedOut />}</div>;
}
