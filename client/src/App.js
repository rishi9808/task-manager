import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  StudentHome  from './pages/Student/StudentHome.jsx';
import  StudentAuth  from './pages/Student/StudentAuth.jsx';
import JmHome from './pages/JobManager/JmHome.jsx';
import JmAuth from './pages/JobManager/JmAuth.jsx';
import JmPostJob from './pages/JobManager/JmPostJob.jsx';
import Dashboard from './pages/Student/Dashboard.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/shome" element={<StudentHome />} />
          <Route path="/sauth" element={<StudentAuth />} />
          <Route path="/sdashb" element={<Dashboard />} />
          <Route path="/jmhome" element={<JmHome />} />
          <Route path="/jmauth" element={<JmAuth />} />
          <Route path="/jmPostJob/:pj_id" element={<JmPostJob />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
