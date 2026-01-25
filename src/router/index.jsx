import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import SkeletonLoader from '../components/ui/SkeletonLoader';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('../pages/HomePage'));
const HeritageList = lazy(() => import('../pages/HeritageList'));
const HeritageDetailPage = lazy(() => import('../pages/HeritageDetailPage'));
const MapPage = lazy(() => import('../pages/MapPage'));
const TimelinePage = lazy(() => import('../pages/TimelinePage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const Chat = lazy(() => import('../pages/Chat'));
const QuizPage = lazy(() => import('../pages/QuizPage'));
const TTSPage = lazy(() => import('../pages/TTSPage'));
const ContributePage = lazy(() => import('../pages/ContributePage'));
const FavoritesPage = lazy(() => import('../pages/FavoritesPage'));
const AdminPage = lazy(() => import('../pages/admin/AdminPage'));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-heritage-cream-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-heritage-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Đang tải...</p>
      </div>
    </div>
  );
}

// Route configuration
const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'heritage',
        element: (
          <Suspense fallback={<PageLoader />}>
            <HeritageList />
          </Suspense>
        ),
      },
      {
        path: 'heritage/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <HeritageDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'map',
        element: (
          <Suspense fallback={<PageLoader />}>
            <MapPage />
          </Suspense>
        ),
      },
      {
        path: 'timeline',
        element: (
          <Suspense fallback={<PageLoader />}>
            <TimelinePage />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'chat',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Chat />
          </Suspense>
        ),
      },
      {
        path: 'quiz',
        element: (
          <Suspense fallback={<PageLoader />}>
            <QuizPage />
          </Suspense>
        ),
      },
      {
        path: 'tts',
        element: (
          <Suspense fallback={<PageLoader />}>
            <TTSPage />
          </Suspense>
        ),
      },
      {
        path: 'contribute',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ContributePage />
          </Suspense>
        ),
      },
      {
        path: 'favorites',
        element: (
          <Suspense fallback={<PageLoader />}>
            <FavoritesPage />
          </Suspense>
        ),
      },
      {
        path: 'admin/*',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminPage />
          </Suspense>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

export { routes };

