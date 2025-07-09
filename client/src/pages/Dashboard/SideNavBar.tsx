import React, { useCallback, useMemo, useState } from 'react'
import { css } from '@emotion/react'
import { IoHomeOutline } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import { IoSettingsOutline, IoAddCircleOutline } from "react-icons/io5";
import { MdPeopleOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useWorkspaces } from '../useQueries/useWorkspaces';
import Select from 'react-select'
import CreateWorkspace from '../Workspaces/CreateWorkpace';



const SideNavBar = () => {
  const [t] = useTranslation();
  // const { data, error, isLoading } = useWorkspaces();
  const [createWorkspace,setCreateWorkspace] = useState(false)
  const data = []
  const [selectedMenuItem, setSelectedMenuItem] = useState();

  const menuItems = [
    { icon: <IoHomeOutline />, label: "Home" },
    { icon: <FaTasks />, label: "My Tasks" },
    { icon: <IoSettingsOutline />, label: "Settings" },
    { icon: <MdPeopleOutline />, label: "Members" },
  ];

  const menuItemStyle = css({
    display: "flex",
    alignItems: "center",
    padding: "10px",
    cursor: "pointer",
    gap: "1rem",
    "&:hover": {
      backgroundColor: "#507eff",
      color: "#333",
    },
  });

  const menuItemSelectedStyle = css({
    backgroundColor: "#1d4ed8",
    color: "#fff",
  });

  const options = useMemo(() => {
    return data?.map((workspace) => ({
      value: workspace.id,
      label: workspace.name,
    }));
  }, [data]);

  return (
    <>
    {createWorkspace && <CreateWorkspace show={createWorkspace} handleClose={() => setCreateWorkspace(false)}/>}
    <div css={css({
      background: "#c7c5c5",
      flex: 1
    })}>
      <div css={css({
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        alignItems: "center",
        padding: 10
      })}>{t("workspaces.title")} <IoAddCircleOutline onClick={() => setCreateWorkspace(true)} /></div>
      <Select options={options} css={css({
        width: "80%",
        margin: "0px 10px"
      })} />
      <div css={css({
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%"
      })}>
        {menuItems.map((item, index) => (
          <div key={index}
            onClick={() => setSelectedMenuItem(index)}
            css={
              selectedMenuItem === index
                ? css([menuItemStyle, menuItemSelectedStyle])
                : menuItemStyle
            }>
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default SideNavBar
