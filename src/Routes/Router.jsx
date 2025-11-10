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
                element: <AddBooks></AddBooks>
            },
            {
                path: "/myBooks",
                element: <MyBooks></MyBooks>
            },
            {
                path: "/update-book/:id",
                element: <UpdateBook></UpdateBook>

            },
            {
                path: "/book-details/:id",
                element: <BookDetails></BookDetails>
            }
        ]
    }


])

export default router;
