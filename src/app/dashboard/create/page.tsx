// pages/dashboard/create/page.tsx

import CreatePostForm from '../../ui/postForm';

const Dashboard = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Create New Blog Post</h1>
      <CreatePostForm />
    </main>
  );
};

export default Dashboard;
