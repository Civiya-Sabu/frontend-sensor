// App.js
import { Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import SensorDashboard from './components/SensorDashboard/SensorDashboard';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SocketProvider } from './context/SocketContext';

function App() {
  return (
    <Provider store={store}>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<SensorDashboard />} />
          <Route path="*" element={<SignInPage />} /> {/* Redirect any unknown path */}
        </Routes>
      </SocketProvider>
    </Provider>
  );
}

export default App;
