// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Suspense, lazy } from "react";

// // Lazy load your page components
// const Landing = lazy(() => import("./pages/Landing"));
// const Login = lazy(() => import("./pages/Login"));
// const Signup = lazy(() => import("./pages/Signup"));
// const Dashboard = lazy(() => import("./pages/Dashboard"));

// function App() {
//   return (
//     <Router>
//       {/* Suspense fallback shows while the lazy-loaded component is being fetched */}
//       <Suspense
//         fallback={
//           <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">
//             Loading...
//           </div>
//         }
//       >
//         <Routes>
//           <Route path="/" element={<Landing />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </Suspense>
//     </Router>
//   );
// }

// export default App;

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
    <div className="size-full">
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
