import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import Header from "./components/Header";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Lazy load pages
const Login = lazy(() => import("./pages/Login"));
const HomePage = lazy(() => import("./pages/HomePage"));
const Subjects = lazy(() => import("./pages/Subjects"));
const ClassCurriculum = lazy(() => import("./pages/ClassCurriculum"));
const VideoDetail = lazy(() => import("./pages/VideoDetail"));
const MyCorner = lazy(() => import("./pages/MyCorner"));
const Profile = lazy(() => import("./pages/Profile"));
const Scholarship = lazy(() => import("./pages/Scholarship"));
const ScholarshipExam = lazy(() => import("./pages/ScholarshipExam"));
const Entertainment = lazy(() => import("./pages/Entertainment"));
const EntertainmentCategory = lazy(() =>
  import("./pages/EntertainmentCategory")
);
const HomeCategory = lazy(() => import("./pages/HomeCategory"));
const SubjectPage = lazy(() => import("./pages/SubjectPage"));
const VR = lazy(() => import("./pages/VR"));
const PreLaunch = lazy(() => import("./pages/PreLaunch"));

const LoadingFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-[#FAD502] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingFallback />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-black">
          <Routes>
            <Route
              path="/login"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/pre-launch"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <PreLaunch />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <Header />
                  <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route
                        path="/home/:categoryId"
                        element={<HomeCategory />}
                      />
                      <Route
                        path="/entertainment"
                        element={<Entertainment />}
                      />
                      <Route
                        path="/entertainment/:categoryId"
                        element={<EntertainmentCategory />}
                      />
                      <Route path="/subjects" element={<Subjects />} />
                      <Route
                        path="/subjects/:subject"
                        element={<SubjectPage />}
                      />
                      <Route
                        path="/subjects/:subject/class/:classId"
                        element={<ClassCurriculum />}
                      />
                      <Route path="/vr" element={<VR />} />
                      <Route path="/scholarship" element={<Scholarship />} />
                      <Route
                        path="/scholarship/exam/:id"
                        element={<ScholarshipExam />}
                      />
                      <Route path="/watch/:id" element={<VideoDetail />} />
                      <Route path="/my-corner" element={<MyCorner />} />
                      <Route path="/profile" element={<Profile />} />
                    </Routes>
                  </Suspense>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
