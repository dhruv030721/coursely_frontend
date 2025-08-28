import {
  Aboutus,
  AuthLayout,
  AuthPageLayout,
  Cart,
  Contactus,
  Course,
  Courses,
  ForgotPassword,
  HomePage,
  Layout,
  Login,
  MyCourses,
  PageNotFound,
  Signup,
  UserProfile,
  CoursePlayer
} from '@/pages';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<Course />} />
          <Route path="about" element={<Aboutus />} />
          <Route path="contact" element={<Contactus />} />
        </Route>
        <Route
          path="cart"
          element={
            <AuthLayout>
              <Cart />
            </AuthLayout>
          }
        />
        <Route
          path="profile"
          element={
            <AuthLayout>
              <UserProfile />
            </AuthLayout>
          }
        />
        <Route
          path="mycourses"
          element={
            <AuthLayout>
              <MyCourses />
            </AuthLayout>
          }
        />
        <Route
          path="mycourses/:courseId"
          element={
            <AuthLayout>
              <CoursePlayer />
            </AuthLayout>
          }
        />
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
