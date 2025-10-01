'use client'

import { Box } from "@chakra-ui/react";
import { Provider } from "@/components/ui/provider";
import { AppContextProvider, useAppContext } from "./context/appContext";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Chat from "./components/Chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import supabase from "./supabaseClient";
import { useColorModeValue } from "@/components/ui/color-mode";

function App() {
  return (
    <Provider>
      <AppContextProvider>
        <AppContent />
      </AppContextProvider>
    </Provider>
  );
}

function AppContent() {
  const { routeHash } = useAppContext();
  const bgColor = useColorModeValue("gray.100", "gray.900"); // dynamic background

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const hash = window.location.hash;
      if (hash.includes("access_token")) {
        const { data: { session }, error } = await supabase.auth.getSessionFromUrl();
        if (error) console.error("OAuth error:", error.message);
        else if (session) {
          console.log("Logged in:", session.user);
          window.history.replaceState({}, document.title, "/"); // clean URL
        }
      }
    };
    handleOAuthRedirect();
  }, []);

  useEffect(() => {
    if (!routeHash) return;
    if (routeHash.endsWith("&type=recovery")) {
      window.location.replace(`/login/${routeHash}`);
    } else if (routeHash.startsWith("#error_code=404")) {
      alert("This link has expired");
      window.location.replace("/");
    }
  }, [routeHash]);

  return (
    <Box bg={bgColor} minH="100vh">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Chat />
                <Footer />
              </>
            }
          />
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;





