import React, { useEffect, useState } from "react";
import { setAccessToken } from "./accessToken";
import Routes from "./routes/Routes";

const App : React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", { 
      method: "POST",
      credentials: "include" 
    }).then(async x => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return null;
  }

  return <Routes />
}

export default App;
