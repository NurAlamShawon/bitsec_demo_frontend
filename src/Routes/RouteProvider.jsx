import { createBrowserRouter } from "react-router";
import DynamicUser from "../Components/DynamicUser";
import Homelayout from "../Layout/Homelayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Homelayout,
  },
  {
    path: "/description/:id",
    Component: DynamicUser,
    loader: async ({ params }) => {
      return await fetch(
        `https://jsonplaceholder.typicode.com/users/${params.id}`
      );
    },
  },
]);

export default router;
