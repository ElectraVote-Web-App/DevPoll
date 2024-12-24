import { BrowserRouter, Routes, Route } from "react-router-dom"
import SharedLayout from "./layouts/SharedLayout"
import AuthLayout from "./layouts/AuthLayout"
import GuestLayout from "./layouts/GuestLayout"
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

function App() {
  // until we implement authentication with context api or react-query
  const AUTH = false;

  return (
    <BrowserRouter>
      <Routes>

        <Route element={<SharedLayout AUTH={AUTH} />} >
          <Route path="/" element={<Home/>} />
          <Route path="/polls" element={<h1>Polls Page</h1>} />
          <Route path="/polls/:id" element={<h1>Show Poll Page</h1>} />
        </Route>

        <Route element={<AuthLayout AUTH={AUTH} />} >
          <Route path="/polls/create" element={<h1>Create Poll Page</h1>} />
          <Route path="/polls/:id/edit" element={<h1>Edit Poll Page</h1>} />
          <Route path="/me" element={<h1>Profile Page</h1>} />
          <Route path="/me/settings" element={<h1>Profile Settings Page</h1>} />
          <Route path="/activities" element={<h1>Profile Page</h1>} />
        </Route>

        <Route element={<GuestLayout AUTH={AUTH} />} >
          <Route path="/signin" element={<h1>Signin Page</h1>} />
          <Route path="/signup" element={<h1>Signup Page</h1>} />
        </Route>

        <Route path="*" element={<NotFound/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
