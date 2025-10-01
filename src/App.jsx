import { Box } from "@chakra-ui/react";
import { Provider } from "@/components/ui/provider";
import { useColorModeValue } from "@/components/ui/color-mode"; // use your custom hook
import "./App.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Chat from "./components/Chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContextProvider, useAppContext } from "./context/appContext";

function AppWrapper() {
  return (
    <Provider>
      <App />
    </Provider>
  );
}

function App() {
  const { username, setUsername, routeHash } = useAppContext();
  const bgColor = useColorModeValue("gray.100", "gray.900"); // from your custom hook

  if (routeHash) {
    if (routeHash.endsWith("&type=recovery")) {
      window.location.replace(`/login/${routeHash}`);
    }
    if (routeHash.startsWith("#error_code=404"))
      return (
        <div>
          <p>This link has expired</p>
          <a href="/" style={{ cursor: "pointer" }} variant="link">
            Back to app
          </a>
        </div>
      );
  }

  return (
    <AppContextProvider>
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
    </AppContextProvider>
  );
}

export default AppWrapper;



