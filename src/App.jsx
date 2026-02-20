import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUserPage from "./pages/AddUserPage";
import ErrorPage from "./pages/ErrorPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SignInPage from "./pages/SignInPage";
import UsersListPage from "./pages/UsersListPage";
import ViewProfilePage from "./pages/ViewProfilePage";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import BlogPage from "./pages/BlogPage";
import AddBlogPage from "./pages/AddBlogPage";
import EditUserPage from "./pages/EditUserPage";
import EditBlogPage from "./pages/EditBlogPage";

function App() {
  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <Routes>
        <Route exact path='/' element={<UsersListPage />} />

        {/* SL */}
        <Route exact path='/add-user' element={<AddUserPage />} />
        <Route exact path='/edit-user/:userId' element={<EditUserPage />} />
        <Route exact path='/forgot-password' element={<ForgotPasswordPage />} />

        <Route exact path='/blog' element={<BlogPage />} />
        <Route exact path='/add-blog' element={<AddBlogPage />} />
        <Route exact path='/edit-blog/:blogId' element={<EditBlogPage />} />

        <Route exact path='/sign-in' element={<SignInPage />} />
        {/* <Route exact path='/users-list' element={<UsersListPage />} /> */}
        <Route exact path='/view-profile' element={<ViewProfilePage />} />

        <Route exact path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
