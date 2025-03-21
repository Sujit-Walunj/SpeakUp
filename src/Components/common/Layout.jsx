import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './common/Navbar';

function Layout() {
  return (
    <>
      <Navbar /> {/* Navbar placed above the main content */}
      <main>
        <Outlet /> {/* This renders the child routes */}
      </main>
    </>
  );
}

export default Layout;