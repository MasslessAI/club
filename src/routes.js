import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import PodcastView from './views/PodcastView/index';
import UploadView from './views/UploadView/index';
import DashboardView from './views/DashboardView/index';
import EpisodeEditView from './views/EpisodeEditView';
import PodcastEditView from './views/PodcastEditView';
import NotFoundView from './views/errors/NotFoundView';
import ProtectedRoute from './ProtectedRoute'

const routes = [
  {
    path: 'podcast',
    element: <MainLayout />,
    children: [
      { path: '/:podcastId', element: <PodcastView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'dashboard',
    element: ProtectedRoute(<MainLayout />),
    children: [
      { path: '/episodes', element: <DashboardView /> },
      { path: '/episodes/upload', element: <UploadView /> },
      { path: '/episodes/upload/:episodeId', element: <UploadView /> },
      { path: '/episodes/:episodeId', element: <EpisodeEditView /> },
      { path: '/podcast/edit', element: <PodcastEditView /> }
    ]
  }
];

export default routes;
