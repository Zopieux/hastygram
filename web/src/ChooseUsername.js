import React from "react";
import {useHistory} from "react-router-dom";

export default function ChooseUsername({initialUsername = "", ...props}) {
  const [username, setUsername] = React.useState(initialUsername);
  const history = useHistory();

  const setCleanUsername = e =>
    setUsername(e.target.value.trim().toLowerCase());

  const commitUsername = e => {
    e.preventDefault();
    username.length && history.push(`/${username}`);
    setUsername("");
  }

  return (
    <form onSubmit={commitUsername} className="choose-username" {...props}>
      <input type="text" onChange={setCleanUsername} value={username}
        placeholder="Browse @username"/>
    </form>
  );
}
