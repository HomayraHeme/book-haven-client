import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import AllBooks from "../Pages/AllBooks";
import Login from "../Pages/Login";
import Registration from "../Pages/Register";
import AddBooks from "../Pages/AddBooks";
import MyBooks from "../Pages/MyBooks";
import UpdateBook from "../Pages/UpdateBook";
import BookDetails from "../Pages/BookDetails";
import PrvtRoutes from "./PrvtRoute";



const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home,

            },
            {
                path: "/all-books",
                Component: AllBooks
            },
            {
                path: "/login",
                Component: Login
            },
            {
                path: "/registration",
                Component: Registration
            },
            {
                path: "/add-book",
                element: <PrvtRoutes><AddBooks></AddBooks></PrvtRoutes>
            },
            {
                path: "/myBooks",
                element: <PrvtRoutes><MyBooks></MyBooks></PrvtRoutes>
            },
            {
                path: "/update-book/:id",
                element: <PrvtRoutes><UpdateBook></UpdateBook></PrvtRoutes>

            },
            {
                path: "/book-details/:id",
                element: <PrvtRoutes><BookDetails></BookDetails></PrvtRoutes>
            }
        ]
    }


])

export default router;
