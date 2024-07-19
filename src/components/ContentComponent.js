import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

const ContentComponent = () => {

    
    return (
        <Router>
            <AppRoutes></AppRoutes>
        </Router>
    )
}

export default ContentComponent;
