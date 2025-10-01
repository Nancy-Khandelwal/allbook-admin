import { useState } from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import SignIn from './pages/SignIn';
import Layout from './components/Layout';
import Home from './pages/Home';
import ListOfClients from './pages/ListOfClients';
import AssignAgent from './pages/AssignAgent';
import AccountList from './pages/AccountList';
import AccountStatement from './pages/AccountStatement';
import CurrentBets from './pages/Currentbets';
import GenernalReport from './pages/GenernalReport';
import GameReport from './pages/GameReport';
import CasinoReport from './pages/CasinoReport';
import ProfitLoass from './pages/ProfitLoass';
import CasinoResultReport from './pages/CasinoResultReport';
import GeneralLock from './pages/GeneralLock';
import MultiLogin from './pages/MultiLogin';
import SecureAuthVerification from './pages/SecureAuthVerification';
import ChangePassword from './pages/ChangePassword';
import GameDetails from './pages/GameDetails';
import Login from './pages/Login';
import ActiveChildList from "./pages/ActiveChildList";
import ActiveInactiveChildList from './pages/ActiveInactiveChildList';
function App() {

  return (
    <>
      <Routes>
        {/* <Route
        path="/"
        element={
          <ProtectedRoute successRedirect="/sign-in">
            <SignIn />
          </ProtectedRoute>
        }
      />
      <Route
        element={
          <ProtectedRoute failRedirect="/">
            <Layout />
          </ProtectedRoute>
        }
      ></Route> */}
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/admin' element={<Login />} />
        <Route element={<Layout />}>
          {/* <Route path='/' element={<Home />} /> */}
          <Route path="/" element={<Navigate to="/sign-in" replace />} />
          <Route path='/users' element={<ListOfClients />} />
          <Route path="/admin/child/:parentId" element={<ActiveChildList />} />
          <Route path='/assign-agent' element={<AssignAgent />} />
          <Route path='/market-analysis' element={<Home />} />
          <Route path='/user2' element={<AccountList />} />
          <Route path="/admin/child1/:parentId" element={<ActiveInactiveChildList />} />
          <Route path='/account-statement' element={<AccountStatement />} />
          <Route path='/current-bets' element={<CurrentBets />} />
          <Route path='/generalreport' element={<GenernalReport />} />
          <Route path='/gamereport' element={<GameReport />} />
          <Route path='/livecasinoreport' element={<CasinoReport />} />
          <Route path='/profitloss' element={<ProfitLoass />} />
          <Route path='/casinoresult' element={<CasinoResultReport />} />
          <Route path='/userlock' element={<GeneralLock />} />
          <Route path='/createaccount' element={<MultiLogin />} />
          <Route path='/secureauth' element={<SecureAuthVerification />} />
          <Route path='/change-password' element={<ChangePassword />} />
          {/* <Route path='/game-details' element={<GameDetails />} /> */}
            <Route
          path="/game-details/:sportId/:matchId/:marketId?"
          element={<GameDetails />}
        />
        </Route>
      </Routes>

    </>
  )
}

export default App