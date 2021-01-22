import React from "react";
import {useHistory} from "react-router-dom";

export default function ChooseUsername({initialUsername = "", ...props}) {
  const history = useHistory();
  const [username, setUsername] = React.useState(initialUsername);
  const input = React.useRef();

  const setCleanUsername = e =>
    setUsername(e.target.value.trim().toLowerCase());

  const commitUsername = e => {
    e.preventDefault();
    username.length && history.push(`/${username}`);
    setUsername("");
    input.current.blur();
  }

  return (
    <form onSubmit={commitUsername} className="choose-username" {...props}>
      <input type="text" onChange={setCleanUsername} value={username} ref={input}
        placeholder="Browse @username"/>
    </form>
  );
}
