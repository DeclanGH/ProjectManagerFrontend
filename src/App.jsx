import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Dashboard from "./components/pages/Dashboard.jsx";
import Home from "./components/pages/Home.jsx";
import PrivateRoute from "./components/helpers/PrivateRoute.jsx";
import ProjectPage from "./components/pages/ProjectPage.jsx";
import {BACKLOG_ID, GROUP_ID, PROJECT_ID, ROUTE, SPRINT_ID} from "./common/constants.js";
import useUserUpdate from "./useUserUpdate.js";
import InviteHandler from "./components/helpers/InviteHandler.jsx";
import GroupPageNavigator from "./components/pages/GroupPageNavigator.jsx";
import BacklogPage from "./components/pages/BacklogPage.jsx";
import SprintPage from "./components/pages/SprintPage.jsx";
import AboutPage from "./components/pages/AboutPage.jsx";
//import {Analytics} from "@vercel/analytics/vue";

function App() {

    useUserUpdate();

    return (
        <div>
            <Router>
                <Routes>
                    <Route path={ROUTE.HOME} element={<Home/>} />

                    <Route element={<PrivateRoute />}>
                        <Route path={`${ROUTE.DASHBOARD}`} element={<Dashboard/>} />
                        <Route path={`${ROUTE.ABOUT}`} element={<AboutPage/>} />
                        <Route path={`${ROUTE.PROJECT}${PROJECT_ID}`} element={<ProjectPage />} />
                        <Route path={`${ROUTE.INVITE}${PROJECT_ID}`} element={<InviteHandler />} />
                        <Route path={`${ROUTE.PROJECT}${PROJECT_ID}${ROUTE.GROUP}${GROUP_ID}`} element={<GroupPageNavigator />} />
                        <Route path={`${ROUTE.PROJECT}${PROJECT_ID}${ROUTE.GROUP}${GROUP_ID}${ROUTE.BACKLOG}${BACKLOG_ID}`} element={<BacklogPage />} />
                        <Route path={`${ROUTE.PROJECT}${PROJECT_ID}${ROUTE.GROUP}${GROUP_ID}${ROUTE.SPRINT}${SPRINT_ID}`} element={<SprintPage />} />
                    </Route>
                </Routes>
            </Router>
            {/*<Analytics />*/}
        </div>
    );
}

export default App;
