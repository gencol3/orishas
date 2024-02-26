'use client';
import CreatePostForm from '../../ui/postForm';
import ProtectedRoute from '../../ProtectedRoute';


const Dashboard = () => {
  return (
    <ProtectedRoute>
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1>Create New Blog Post</h1>
        <CreatePostForm/>
      </main>
    </ProtectedRoute>
  );
};

export default Dashboard;
