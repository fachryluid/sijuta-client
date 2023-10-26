import './assets/css/App.css'
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from './utils/axios'
import Login from './pages/Auth/Login';
import Forgot from './pages/Auth/Forgot';
import Dashboard from './pages/Main/Dashboard'
import Activity from './pages/Main/Activitiy'
import Gallery from './pages/Main/Gallery'
import Profile from './pages/Main/Profile'
import AddActivity from './pages/Second/AddActivity';
import EditActivity from './pages/Second/EditActivity';
import DetailActivity from './pages/Second/DetailActivity';
import AdminDashboard from './pages/Admin/Dashboard';
import Magang from './pages/Admin/Magang';
import MagangDetail from './pages/Admin/MagangDetail';
import MagangCreate from './pages/Admin/MagangCreate';
import PrivateRoutes from './routes/PrivateRoutes';
import AuthRoutes from './routes/AuthRoutes';
import DosenDashboard from './pages/Dosen/Dashboard';
import GroupDetail from './pages/Dosen/GroupDetail';
import Groups from './pages/Dosen/Groups';
import KKN from './pages/Admin/KKN';
import KKNCreate from './pages/Admin/KKNCreate';
import KKNDetail from './pages/Admin/KKNDetail';
import Master from './pages/Admin/Master';

const App = () => {

  const verifyToken = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('userData'))
      await axios.get(`/auth/verify-token/${user?.role}`);
      return true
    } catch (error) {
      return false
    }
  };

  return (
    <Routes>
      <Route element={<AuthRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/lupa-password" element={<Forgot />} />
      </Route>
      <Route element={<PrivateRoutes role="MAHASISWA" />}>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/kegiatan" element={<Activity />} />
        <Route path="/galeri" element={<Gallery />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/kegiatan/tambah" element={<AddActivity />} />
        <Route path="/kegiatan/:uuid" element={<DetailActivity />} />
        <Route path="/kegiatan/:uuid/edit" element={<EditActivity />} />
      </Route>
      <Route element={<PrivateRoutes role="ADMINISTRATOR" />}>
        <Route path="/administrator/dashboard" element={<AdminDashboard />} />
        <Route path="/administrator/master" element={<Master />} />
        <Route path="/administrator/magang" element={<Magang />} />
        <Route path="/administrator/magang/create" element={<MagangCreate />} />
        <Route path="/administrator/magang/:fieldworkId" element={<MagangDetail />} />
        <Route path="/administrator/kkn" element={<KKN />} />
        <Route path="/administrator/kkn/create" element={<KKNCreate />} />
        <Route path="/administrator/kkn/:fieldworkId" element={<KKNDetail />} />
      </Route>
      <Route element={<PrivateRoutes role="DOSEN" />}>
        <Route path="/dosen/dashboard" element={<DosenDashboard />} />
        <Route path="/dosen/groups" element={<Groups />} />
        <Route path="/dosen/groups/:groupId" element={<GroupDetail />} />
      </Route>
      {/* 404 */}
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  )
}

export default App
