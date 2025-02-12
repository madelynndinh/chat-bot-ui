"use client";

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useEffect } from 'react';
import '../styles/globals.css'; // Your custom global CSS

function App({ Component, pageProps }) {
  useEffect(() => {
    // Dynamically import Bootstrap JS on the client side
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
      <Component {...pageProps} />
  );
}

export default App;
