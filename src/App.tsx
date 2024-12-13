import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, AdminAuthLayout, AuthLayout, Layout, AdminLayout } from "@/pages";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayout><Layout /></AuthLayout>}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/admin" element={<AdminAuthLayout><AdminLayout /></AdminAuthLayout>}>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;