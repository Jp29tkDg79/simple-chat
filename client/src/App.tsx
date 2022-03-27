import { Routes, Route } from "react-router-dom";

import * as ROUTECONSTS from "./constants/routes";

import Chat from "./pages/Chat";
import Auth from "./pages/Auth";

import AuthProvider from "./routes/auth.routes";
import NotFound from "./errors/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path={ROUTECONSTS.HOME} element={<Auth />} />
      <Route path={ROUTECONSTS.LOGIN} element={<Auth />} />
      <Route path={ROUTECONSTS.SIGNIN} element={<Auth />} />
      <Route element={<AuthProvider />}>
        <Route path={ROUTECONSTS.CHAT} element={<Chat />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
