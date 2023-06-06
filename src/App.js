// Importing Required Packages
import { BrowserRouter,Routes,Route, Link } from 'react-router-dom';
import { useEffect } from 'react';
import LoginPage from './pages/login';
import CoursePage from './pages/courses';
import ContributePage from './pages/contribute';
import ContributeQuestionsPage from './pages/contributeQuestions';
import TestInstructionsPage from './pages/testInstructions';
import TestPage from './pages/test';
import NewUserPage from './pages/newUser';
import ForgotPasswordPage from './pages/forgotPassword';
import TestReportDetailsPage from './pages/testReportDetails';
import TestReportPage from './pages/testReport';
import ContributeTestReportDetailsPage from './pages/contributeTestReportDetails';
import ContributeTestReportPage from './pages/contributeTestReport';
import ProfilePage from './pages/profile';
import TwoFactorAuthPage from './pages/twoFactorAuth';
import ResetPasswordPage from './pages/resetPassword';
import utils from './utils.json'
import HomePage from './pages/home';
import UserRegisterAuthPage from './pages/userRegisterAuth';

// App Function
function App() {

  useEffect(()=>{
    (async () => {

      // try{
      //   let res = await fetch(utils["url"]+'/connect',
      //   {
      //       crossDomain: true,
      //       headers: { 'Content-Type': 'application/json' },
      //       method: "POST"
      //   });
      //   let resJson = await res.json();
      //   if (!res.status === 200) {
          
      //   }
      // }
      // catch (err) {
      //     console.log(err);
      // }
  
    })();
    
  },[])

  return (
    // Routes for the application
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/two-factor-authentication" element={<TwoFactorAuthPage />} />
            <Route exact path="/user-registration-authentication" element={<UserRegisterAuthPage />} />
            <Route exact path="/profile" element={<ProfilePage />} />
            <Route exact path="/user-registration" element={<NewUserPage />} />
            <Route exact path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route exact path="/reset-password" element={<ResetPasswordPage />} />
            <Route exact path="/courses" element={<CoursePage />} />
            <Route exact path="/course/test-instructions" element={<TestInstructionsPage />} />
            <Route exact path="/course/test" element={<TestPage />} />
            <Route exact path="/contribute" element={<ContributePage />} />
            <Route exact path="/contribute/questions" element={<ContributeQuestionsPage />} />
            <Route exact path="/test/report/details" element={<TestReportDetailsPage />} />
            <Route exact path="/test/report" element={<TestReportPage />} />
            <Route exact path="/contribute/reports" element={<ContributeTestReportDetailsPage />} />
            <Route exact path="/contribute/test/report" element={<ContributeTestReportPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
