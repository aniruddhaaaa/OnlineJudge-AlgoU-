import React from 'react';
import StickyNavbar from './navbar';

const Dashboard = () =>{
    return (
        <div>
          <StickyNavbar />
          <div className="dashboard-content">
          <h1>Welcome to the Dashboard</h1>
          <p>YIPEEE! My code works :)</p>
          </div>
        </div>
      );
};

export default Dashboard;