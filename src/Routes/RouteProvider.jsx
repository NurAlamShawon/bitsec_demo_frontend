import { createBrowserRouter } from "react-router";
import Homelayout from "../Layout/Homelayout";
import Dynamiclayout from "../Layout/Dynamiclayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Homelayout,
  },
  {
    path: "/description/:id",
    Component: Dynamiclayout,
    loader: async ({ params }) => {
      return await fetch(
        `https://jsonplaceholder.typicode.com/users/${params.id}`
      );
    },
  },
]);

export default router;
