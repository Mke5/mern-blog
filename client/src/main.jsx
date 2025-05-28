import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import PostDetails from './pages/PostDetail'
import Register from './pages/Register'
import Login from './pages/Login'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import CategoryPosts from './pages/CategoryPosts'
import UserProfile from './pages/UserProfile'
import Author from './pages/Authors'
import AuthorPosts from './pages/AuthorPosts'
import Dashboard from './pages/Dashboard'
import Logout from './pages/Logout'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {index: true,element: <Home />,},
      {path: 'post/:id',element: <PostDetails />,},
      {path: 'login',element: <Login />,},
      {path: 'register',element: <Register />,},
      {path: 'profile/:id',element: <UserProfile />,},
      {path: 'author',element: <Author />,},
      {path: 'create',element: <CreatePost />,},
      {path: 'post/:id/edit', element: <EditPost />,},
      {path: 'myposts/:id',element: <Dashboard />,},
      {path: 'logout', element: <Logout />,},
      {path: 'posts/categories/:category', element: <CategoryPosts />,},
      {path: 'post/users/:id', element: <AuthorPosts />,},
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
