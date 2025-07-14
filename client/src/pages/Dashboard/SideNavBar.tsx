import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { IoHomeOutline } from 'react-icons/io5';
import { FaTasks } from 'react-icons/fa';
import { IoSettingsOutline, IoAddCircleOutline } from 'react-icons/io5';
import { MdPeopleOutline } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useWorkspaces } from '../../useQueries/useWorkspaces';
import Select from 'react-select';
import { useWorkspacesState } from '../../hooks/useWorkspacesState';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CreateOrEditWorkspace from '../Workspaces/CreateWorkpace';

const SideNavBar = () => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const { data, error, isLoading } = useWorkspaces();
  const [createWorkspace, setCreateWorkspace] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState();
  const dispatch = useDispatch();

  const menuItems = [
    { icon: <IoHomeOutline />, label: 'Home' },
    { icon: <FaTasks />, label: 'My Tasks' },
    {
      icon: <IoSettingsOutline />,
      label: 'Settings',
      onClick: () => navigate('/settings'),
    },
    { icon: <MdPeopleOutline />, label: 'Members' },
  ];

  const menuItemStyle = css({
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    cursor: 'pointer',
    gap: '1rem',
    '&:hover': {
      backgroundColor: '#507eff',
      color: '#333',
    },
  });

  const menuItemSelectedStyle = css({
    backgroundColor: '#1d4ed8',
    color: '#fff',
  });


  const options = useMemo(() => {
    console.log('options useMemo', data);
    return data?.map((workspace) => ({
      value: workspace._id,
      label: workspace.name,
    }));
  }, [data]);

  const handleSelectedMenuItem = useCallback((index, item) => {
    setSelectedMenuItem(index);
    if (item === 'Settings') {
      navigate('/settings');
    }
  }, []);

  const handleSelect = (selectedOption) => {
    const selectedWorkSpace = data?.find(
      (workspace) => workspace._id === selectedOption.value,
    );
    dispatch({ type: 'UPDATE_SELECTED_WORKSPACE', payload: selectedWorkSpace });
  };

  return (
    <>
      {createWorkspace && (
        <CreateOrEditWorkspace
          workspaces={data}
          initialValues={{ name: '', description: '' }}
          isEdit={false}
          show={createWorkspace}
          handleClose={() => setCreateWorkspace(false)}
        />
      )}
      <div>
        <div
          css={css({
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            alignItems: 'center',
            padding: 10,
          })}
        >
          {t('workspaces.title')}{' '}
          <IoAddCircleOutline onClick={() => setCreateWorkspace(true)} />
        </div>
        <Select
          options={options}
          css={css({
            width: '80%',
            margin: '0px 10px',
          })}
          onChange={handleSelect}
        />
        <div
          css={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '100%',
          })}
        >
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                handleSelectedMenuItem(
                  index,
                  item.label === 'Settings' ? item.label : '',
                )
              }
              css={
                selectedMenuItem === index
                  ? css([menuItemStyle, menuItemSelectedStyle])
                  : menuItemStyle
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideNavBar;
