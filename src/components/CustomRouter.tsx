import { createBrowserHistory } from "history";
import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { Router } from "react-router-dom";

// Can be used to manage navigation state outside of React components
// ex : Redux, Axios interceptors, ...
export const customHistory = createBrowserHistory();

export function CustomRouter({ children }: { children: ReactNode }) {
  const historyRef = useRef<any>();
  if (historyRef.current == null) {
    historyRef.current = customHistory;
  }
  const history = historyRef.current;
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}
