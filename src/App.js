import React from "react";
import AppRouter from "./components/AppRouter";
import AuthContextProvider from "./Contexts/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  );
}

export default App;
