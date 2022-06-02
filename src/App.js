import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "components/Layout";
import Home from "pages/Home";
import Evolution from "pages/Evolution";
import Box from "pages/Box";
import Mining from "pages/Mining";
import Shop from "pages/Shop";
import Governance from "pages/Governance";
import Create from "pages/Create";
import Proposal from "components/Proposal";

function App() {
  return (
    <Router>
      <Layout>
        <Routes basename="/">
          <Route path="/" element={<Home />} />
          <Route path="/evolution" element={<Evolution />} />
          <Route path="/box" element={<Box />} />
          <Route path="/mining" element={<Mining />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/proposal" element={<Create />} />
          <Route path="/proposal/:id" element={<Proposal />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
