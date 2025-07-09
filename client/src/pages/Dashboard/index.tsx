import { css } from "@emotion/react";
import React from "react";
import Home from "./Home";
import SideNavBar from "./SideNavBar";
import Logo from "../components/Logo";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@radix-ui/themes";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [t] = useTranslation();
  return (
    <div
      css={css({
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
      })}
    >
      <div
        css={css({
          flex: 1,
        })}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
          `}
        >
          <Logo />
          <Button
            size="2"
            css={css`
              background: var(--button-color);
              color: white;
            `}
            onClick={() => navigate("/login")}
          >
            {t("authentication.logOut")}
          </Button>
        </div>
      </div>
      <div
        css={css({
          display: "flex",
          flexDirection: "row",
          flex: 9,
        })}
      >
        <SideNavBar />
        <Home />
      </div>
    </div>
  );
};

export default Dashboard;
