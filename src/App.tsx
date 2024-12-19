import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, AdminAuthLayout, AuthLayout, Layout, AdminLayout, Dashboard, CourseBuilder, PageNotFound } from "@/pages";

const App = () => {

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AuthLayout><Layout /></AuthLayout>}>
          <Route path="" element={<HomePage />} />
        </Route>

        {/* Admin Routes  */}
        <Route path="admin" element={<AdminAuthLayout><AdminLayout /></AdminAuthLayout>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="course-builder" element={<CourseBuilder />} />
        </Route>

        {/* Fallback Routes */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;