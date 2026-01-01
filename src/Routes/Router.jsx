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
import ErrorPage from "../Pages/EorrorPage";
import HowItWorks from "../Pages/HowItWorks";
import Profile from "../Pages/MyProfile";
import MyProfile from "../Pages/MyProfile";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import Analytics from "../Pages/Dashboard/Analytics";



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
                path: "/book-details/:id",
                element:  <BookDetails></BookDetails> 
            },
            {
                path: '/*',
                Component: ErrorPage,
            },
            {
                path: '/howItWorks',
                Component: HowItWorks
            },
            {
                path: '/profile',
                Component: MyProfile
            },
             {
                path: "update-book/:id",
                element: <PrvtRoutes><UpdateBook></UpdateBook></PrvtRoutes>

            },
        ]
    },
    {
         path: '/dashboard',
        element: <PrvtRoutes><DashboardLayout></DashboardLayout></PrvtRoutes>,
        children: [
              {
                path: "add-books",
                element: <PrvtRoutes><AddBooks></AddBooks></PrvtRoutes>
            },
            {
                path: "my-books",
                element: <PrvtRoutes><MyBooks></MyBooks></PrvtRoutes>
            },
           
            {
                path: "profile",
                element: <MyProfile></MyProfile>
            },
            {
                path: "analytics",
                element: <PrvtRoutes> <Analytics></Analytics> </PrvtRoutes>
            }
        ]
    }


])

export default router;
