import React from 'react';
import { BrowserRouter as Router, Switch, Route   } from 'react-router-dom';
import Navbar from './components/Navbar';
import { routes } from './routes';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Location } from 'history';
import "./App.css"
const App: React.FC = () => {


  return (
    <Router key={window.location.pathname}>
      <div className="flex">
        <Navbar />
        <div className="flex-1 p-4">
          <Switch>
            {routes.map((route, index) => {
              const Component = route.component; // Capitalized because it's used as JSX
              if (!Component) return null;
              return (
                <Route
                  key={index}
                  exact={route.exact}
                  path={route.path}
                  render={(props: any) => (
                    <ErrorBoundary fallback={<div>Error loading page</div>}>
                      <Component {...props} />
                    </ErrorBoundary>
                  )}
                />
              );
            })}      
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;

function useEffect(arg0: () => void, arg1: Location<unknown>[]) {
  throw new Error('Function not implemented.');
}