import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout.jsx";
import JobsPage from "./pages/JobsPage.jsx";
import JobPage, { jobLoader } from "./pages/JobPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import AddJobPage from "./pages/AddJobPage.jsx";
const App = () => {
  const addJob = async (newJob) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    const data = await res.json();
    return data;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />,
        <Route path="/jobs" element={<JobsPage />} />,
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        ,
        <Route path="/job/:id" element={<JobPage />} loader={jobLoader} />,
        <Route path="*" element={<NotFoundPage />} />,
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default App;
