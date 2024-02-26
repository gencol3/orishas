'use client';
import DisplayDashboardPost from "../ui/displayDashboardPost";
import Header from "../ui/admin_dashboard";
import ProtectedRoute from '../ProtectedRoute';


export default function Dashboard() {
    return (
      <ProtectedRoute>
        <main>
          <Header/>
          <DisplayDashboardPost />
        </main>
      </ProtectedRoute>
    );
}