import logo from './logo.svg';
import './App.css';
import spinner from "./images/spinner.svg";
import { useEffect, useState } from 'react';
import Professional from './app/professional/page';
import IndividualClient from './app/individual-client/page';
import CompanyClient from './app/company-client/page';
import TermsAndConditions from './app/terms-and-conditions/page';
import Login from './app/(auth)/login/page';
import { useAuthContext } from './contexts/AuthContextProvider';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SelectUserType from './app/(auth)/select-user-type/page';
import ForgotPassword from './app/(auth)/forgot-password/page';
import SignupCompany from './app/(auth)/signup-company/page';
import SignupProfessional from './app/(auth)/signup-professional/page';
import SignupIC from './app/(auth)/signup-individual/page';
import ChangePassword from './app/(auth)/change-password/page';
import VerifyToken from './app/(auth)/verify-token/page';

function App() {
  const { checkUser, isUserLoggedIn, getUserProfile ,isLoggedIn} = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        await checkUser();
      }
      setLoading(false);
    };
    verifyUser();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const userProfile = getUserProfile();

  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            { isLoggedIn && <Route path="/" element={<Navigate to={`/${userProfile.user_type}`} />} />}
            <Route path="/professional" element={<Professional />} />
            <Route path="/individual" element={<IndividualClient />} />
            <Route path="/company" element={<CompanyClient />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/select-user-type" element={<SelectUserType />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/verify-token" element={<VerifyToken />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup-company" element={<SignupCompany />} />
            <Route path="/signup-professional" element={<SignupProfessional />} />
            <Route path="/signup-individual" element={<SignupIC />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;

function Loading() {
  return <div className="flex items-center justify-center w-full h-screen">
    <img src={spinner} alt="Loading" width={28} height={28} className="animate-spin " />
  </div>
}