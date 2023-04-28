// Importing Required Packages
import { BrowserRouter,Routes,Route, Link } from 'react-router-dom';
import LoginPage from './pages/login';
import CoursePage from './pages/courses';
import ContributePage from './pages/contribute';
import ContributeQuestionsPage from './pages/contributeQuestions';
import TestInstructionsPage from './pages/testInstructions';
import TestPage from './pages/test';
import NewUserPage from './pages/newUser';
import ForgotPasswordPage from './pages/forgotPassword';

// App Function
function App() {
  return (
    // Routes for the application
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/user-registration" element={<NewUserPage />} />
            <Route exact path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route exact path="/courses" element={<CoursePage />} />
            <Route exact path="/course/test-instructions" element={<TestInstructionsPage />} />
            <Route exact path="/course/test" element={<TestPage />} />
            <Route exact path="/contribute" element={<ContributePage />} />
            <Route exact path="/contribute/questions" element={<ContributeQuestionsPage />} />

        </Routes>
    </BrowserRouter>
  );
}

export default App;
