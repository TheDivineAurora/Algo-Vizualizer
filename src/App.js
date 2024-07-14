import MainPage from "./components/MainPage";
import { VisualizerProvider } from "./contexts/VisualizerContext";

function App() {
  return (
    <VisualizerProvider>
      <MainPage/>
    </VisualizerProvider>
  );
}

export default App;
