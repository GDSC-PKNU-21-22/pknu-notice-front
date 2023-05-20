import MajorLayout from '@components/MajorLayout';
import Announcement from '@pages/Announcement';
import Home from '@pages/Home';
import MajorDecision from '@pages/MajorDecision';
import My from '@pages/My';
import { Routes, Route } from 'react-router-dom';

interface RouterBase {
  id: number;
  path: string;
  element: React.ReactNode;
}

interface RouterMajorRequired extends RouterBase {
  majorRequired: true;
}

type RouterElement = RouterBase | RouterMajorRequired;

const routerData: RouterElement[] = [
  {
    id: 0,
    path: '/',
    element: <Home />,
  },
  {
    id: 1,
    path: '/major-decision',
    element: <MajorDecision />,
  },
  {
    id: 2,
    path: '/announcement',
    element: <Announcement />,
    majorRequired: true,
  },
  {
    id: 3,
    path: '/my',
    element: <My />,
    majorRequired: true,
  },
];

const App = () => {
  return (
    <Routes>
      {routerData.map((router: RouterElement) => {
        if ((router as RouterMajorRequired).majorRequired) {
          return (
            <Route
              key={router.id}
              path={router.path}
              element={<MajorLayout>{router.element}</MajorLayout>}
            />
          );
        }
        return (
          <Route key={router.id} path={router.path} element={router.element} />
        );
      })}
    </Routes>
  );
};

export default App;
