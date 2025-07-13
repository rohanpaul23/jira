import { css } from '@emotion/react';

export const styles = {
  workspaceDetailsContainer: () => css`
    border: 1px solid #1d4ed8;
    padding: 40px;
    border-radius: 10px;
    width: 500px;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  workspaceDetailsTitle: () => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  workspaceDetail: () => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  inviteMembers: () => css`
    display: flex;
    flex-direction: column;
    gap: 5px;
  `,
  inviteLink: () => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  inviteLinkInput: () => css`
    background: whitesmoke;
    border: 1.5px solid #1d4ed8;
    border-radius: 10px;
    width: 90%;
    height: 35px;
  `,
};
