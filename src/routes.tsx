// 1. First, let's fix the routes.tsx file
// File: drive-course-app\src\routes.tsx
import { RouteProps } from 'react-router-dom';

// Import all pages
import Home from './pages/Home';
import Recent from './pages/Recent';
import Favorites from './pages/Favorites';
import SignUp from './pages/SignUp';
import Logout from './pages/Logout';
import Faq from './pages/Faq';
import About from './pages/About';
import DrivesPage from './pages/DrivesPage';
import FileandfolderPage from './pages/FileandFolderPage';

type AppRoute = RouteProps & {
  component: React.ComponentType<any>; // The page component
  // You can add additional route-specific props here
}

export const routes: RouteProps[] = [
  { path: '/', exact: true, component: Home },
  { path: '/drives', component: DrivesPage },
  { path: '/recent', component: Recent },
  { path: '/favorites', component: Favorites },
  { path: '/signup', component: SignUp },
  { path: '/logout', component: Logout },
  { path: '/faq', component: Faq },
  { path: '/about', component: About },
  // Fix this route to match with DriveCard navigation
  { path: '/drive/:driveName', component: FileandfolderPage },
  // Remove this redundant route as we're using query params for folders
  // { path: '/files/:driveName/:folderId?', component: FileandfolderPage, exact: false }
];