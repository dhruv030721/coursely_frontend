import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, AdminAuthLayout, AuthLayout, Layout, AdminLayout, Dashboard, CourseBuilder, PageNotFound, ManageCourses, CoupenDiscount, Login, Signup, AuthPageLayout } from "@/pages";

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
          <Route path="manage-courses" element={<ManageCourses />} />
          <Route path="coupen-discount" element={<CoupenDiscount />} />
        </Route>

        <Route path="login" element={<AuthPageLayout><Login /></AuthPageLayout>} />
        <Route path="signup" element={<AuthPageLayout><Signup /></AuthPageLayout>} />

        {/* Fallback Routes */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;