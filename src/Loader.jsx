import App from "App";
import ErrorBoundary from "shared/ErrorBoundary";

function Loader() {
    return (
        <ErrorBoundary>
            <App></App>
        </ErrorBoundary>
    );
}

export default Loader;