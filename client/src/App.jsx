import { BrowserRouter, Routes, Route } from "react-router-dom"
import SharedLayout from "./layouts/SharedLayout"
import AuthLayout from "./layouts/AuthLayout"
import GuestLayout from "./layouts/GuestLayout"
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import PollsPage from "./pages/PollsPage";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import { Toaster } from "@/components/ui/toaster";
import PollPage from "./pages/PollPage";
import { QueryClient, QueryClientProvider } from "react-query";
import CreatePoll from "./pages/CreatePoll";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 0,
    },
  },
});

function App() {

  
  
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
        <Routes>

        <Route element={<SharedLayout />} >
          <Route path="/" element={<Home />} />
          <Route path="/polls" element={<PollsPage />} />
          <Route path="/polls/:id" element={<PollPage/>} />
          <Route path="/about" element={<h1>Write Docs here...</h1>} />
        </Route>

        <Route element={<AuthLayout />} >
          <Route path="/polls/create" element={<CreatePoll/>} />
          <Route path="/polls/:id/edit" element={<h1>Edit Poll Page</h1>} />
          <Route path="/me" element={<h1>Profile Page</h1>} />
          <Route path="/me/settings" element={<h1>Profile Settings Page</h1>} />
          <Route path="/activities" element={<h1>Profile Page</h1>} />
        </Route>

          <Route element={<GuestLayout />} >
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster/>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
