import { useContext } from "react";
import { AppBar, Toolbar, styled, Box } from "@mui/material";

import { AccountContext } from "../context/AccountProvider";

//StyledComponents
import ChatDialog from "./chat/ChatDialog";
import LoginDialog from "./account/LoginDialog";

const StyledComponent = styled(Box)`
  height: 100vh;
  background: #dcdcdc;
`;

const StyledHeader = styled(AppBar)`
  background-color: #00a884;
  height: 125px;
  box-shadow: none;
`;

const StyledLoginHeader = styled(AppBar)`
  background: #00bfa5;
  height: 200px;
  box-shadow: none;
`;

const Messenger = () => {
  const { account } = useContext(AccountContext);

  return (
    <StyledComponent>
      {account ? (
        <>
          <StyledHeader>
            <Toolbar></Toolbar>
          </StyledHeader>
          <ChatDialog />
        </>
      ) : (
        <>
          <StyledLoginHeader>
            <Toolbar></Toolbar>
          </StyledLoginHeader>
          <LoginDialog />
        </>
      )}
    </StyledComponent>
  );
};

export default Messenger;
