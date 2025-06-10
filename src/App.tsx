import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, AdminAuthLayout, Layout, AdminLayout, Dashboard, CourseBuilder, PageNotFound, ManageCourses, CoupenDiscount, Login, Signup, Contactus, AuthPageLayout, Aboutus, Courses, Cart, UserProfile, ForgotPassword, AuthLayout, MyCourses } from "@/pages";

const App = () => {

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="courses" element={<Courses />} />
          <Route path="about" element={<Aboutus />} />
          <Route path="contact" element={<Contactus />} />
          <Route path="cart" element={<AuthLayout><Cart /></AuthLayout>} />
          <Route path="profile" element={<AuthLayout><UserProfile /></AuthLayout>} />
          <Route path="mycourses" element={<AuthLayout><MyCourses /></AuthLayout>} />
        </Route>

        {/* Admin Routes  */}
        <Route path="admin" element={<AdminAuthLayout><AdminLayout /></AdminAuthLayout>}>
          <Route path="" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="course-builder" element={<CourseBuilder />} />
          <Route path="manage-courses" element={<ManageCourses />} />
          <Route path="coupen-discount" element={<CoupenDiscount />} />
        </Route>

        <Route path="login" element={<AuthPageLayout children={<Login />} />} />
        <Route path="signup" element={<AuthPageLayout children={<Signup />} />} />
        <Route path="forgotpassword" element={<AuthPageLayout children={<ForgotPassword />} />} />

        {/* Fallback Routes */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;