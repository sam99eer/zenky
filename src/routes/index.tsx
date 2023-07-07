import {
    Route,
    BrowserRouter as Router,
    Routes as RoutesContainer,
} from 'react-router-dom';
import Home from 'src/pages/Home';
import { Screens } from 'src/utils/Screens';

const Routes = () => {
    return (
        <Router>
            <RoutesContainer>
                <Route path={Screens.HOME} index element={<Home />} />
            </RoutesContainer>
        </Router>
    );
};

export default Routes;
