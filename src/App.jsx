import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ChatBotPage from "./pages/ChatBotPage";
import UploadDataPage from "./pages/UploadDataPage";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/chatbot" element={<ChatBotPage />} />
                <Route path="/uploaddata" element={<UploadDataPage />} />
                <Route path="*" element={<div>404 Not Found</div>} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
}

export default App;
