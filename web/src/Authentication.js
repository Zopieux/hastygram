import React from "react";
import {API_BASE, apiFetch} from "./const";

export default function Authentication() {
  const [sessionId, setSessionId] = React.useState(null);
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    if (!sessionId) return;
    apiFetch({path: `${API_BASE}/authenticate`, method: "POST", body: {sessionid: sessionId}})
      .then(r => r.json())
      .then(setUserData);
  }, [sessionId]);

  React.useEffect(() => {
    let cookieData;
    if ((cookieData = document.cookie.split(";").find(c => c.trim().startsWith("sessionid=")))) {
      setSessionId(cookieData.split("=")[1]);
    }
  }, []);

  const authenticate = e => {
    const reply = (prompt("Copy-paste 'sessionid' cookie from Instagram:") || "").trim();
    if (reply.length) {
      setSessionId(reply);
    }
  }

  return (
    <button className={`authentication ${userData ? "authed" : "anonymous"}`}
            type="button" onClick={authenticate}>{userData ? userData.name : "Authenticate"}</button>
  );
}
