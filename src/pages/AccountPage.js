import React, { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccountGeneral from "../features/user/AccountGeneral";
import AccountSocialLink from "../features/user/AccountSocialLink";
import useAuth from "../hooks/useAuth";
import { Box, Card, Container, Tab, Tabs, Typography } from "@mui/material";
import { capitalCase } from "change-case";

import ShareIcon from "@mui/icons-material/Share";

function AccountPage() {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState("general");

  const handleChangeTab = (newTab) => {
    setCurrentTab(newTab);
  };
  const ACCOUNT_TABS = [
    {
      value: "general",
      icon: <AccountBoxIcon sx={{ fontSize: 24 }} />,
      component: <AccountGeneral account={user} />,
    },
    {
      value: "socialLinks",
      icon: <ShareIcon sx={{ fontSize: 24 }} />,
      component: <AccountSocialLink account={user} />,
    },
  ];
  return (
    <Container>
      <Typography variant="h4">Account Settings</Typography>
      <Tabs
        value={currentTab}
        scrollButtons="auto"
        allowScrollButtonsMobile
        onChange={(e, value) => handleChangeTab(value)}
      >
        {ACCOUNT_TABS.map((tab) => (
          <Tab
            label={capitalCase(tab.value)}
            key={tab.value}
            value={tab.value}
            icon={tab.icon}
            disableRipple
          />
        ))}
      </Tabs>
      <Box sx={{ mb: 5 }} />
      <Box sx={{ mt: 3, position: "relative" }}>
        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Box>
    </Container>
  );
}

export default AccountPage;
