import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <div>
      <header>
       <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={<PostsList />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
      </header>
    </div>
  )
}

export default App
