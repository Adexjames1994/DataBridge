

import { useState } from "react";
import { LandingPage } from "./pages/Landing";
import { AuthForm } from "./components/AuthForm";
import { Dashboard } from "./pages/Dashboard";

export default function App() {
  const [currentView, setCurrentView] = useState("landing");
  const [user, setUser] = useState(null);

  const handleGetStarted = () => {
    setCurrentView("auth");
  };

  const handleAuthenticated = (authenticatedUser) => {
    setUser(authenticatedUser);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("landing");
  };

  const handleBackToLanding = () => {
    setCurrentView("landing");
  };

  return (
    <div className="size-full ">
      {currentView === "landing" && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}

      {currentView === "auth" && (
        <AuthForm
          onAuthenticated={handleAuthenticated}
          onBack={handleBackToLanding}
        />
      )}

      {currentView === "dashboard" && user && (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}
