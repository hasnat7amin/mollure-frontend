import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './contexts/AuthContextProvider';
import { ProvinceContextProvider } from './contexts/ProvincesContextProvider';
import { MunicipalityContextProvider } from './contexts/MunicipalityContextProvider';
import { ProfessionalContextProvider } from './contexts/ProfessionalContextProvider';
import { CompanyContextProvider } from './contexts/CompanyContextProvider';
import { IndividualClientContextProvider } from './contexts/IndividualClientContext';
import { ProfileContextProvider } from './contexts/ProfileContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProvinceContextProvider>
        <MunicipalityContextProvider>
          <ProfessionalContextProvider>
            <CompanyContextProvider>
              <IndividualClientContextProvider>
                <ProfileContextProvider>
                  <App />
                </ProfileContextProvider>
              </IndividualClientContextProvider>
            </CompanyContextProvider>
          </ProfessionalContextProvider>
        </MunicipalityContextProvider>
      </ProvinceContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
