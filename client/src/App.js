import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
// import Home from "./pages/Home";
import Login from "./pages/Login";
import SearchMenu from "./pages/SearchMenu";
import SignUp from "./pages/SignUp";
import Profile from "./pages/UpdateUser";
import UserProfile from "./pages/UserProfile";
import { client } from "./util/apolloClient";
import { AuthProvider } from "./util/auth";
import FakeProfile from "./pages/fakeProfile";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <SearchMenu />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/user" element={<FakeProfile />} />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
