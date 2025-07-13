import { css } from '@emotion/react'
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Alert, Button,Modal } from 'react-bootstrap';
import { useCreateWorkspace } from '../../useQueries/useCreateWorkspace';
import { useTranslation } from 'react-i18next';
import { FaInfoCircle } from "react-icons/fa";
import "./settings.scss"
import { useSelector } from 'react-redux';
import useDeleteWorkspace from '../../useQueries/useDeleteWorkSpace';
const Settings = () => {
    const [t] = useTranslation();
    const { mutate } = useCreateWorkspace();
    const { mutate : mutationToDeleteWorkSpace } = useDeleteWorkspace();
    const [deleteWorkSpace, setDeleteWorkspace] = useState(false)
    const selectedWorkspace = useSelector((state) => state.workspace.selectedWorkspace);

    const validationSchema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      description: Yup.string().optional(),
    });
  
    const initialValues = {
      name: selectedWorkspace?.name,
      description: selectedWorkspace?.description,
    };
    const onSubmit = () => {
      console.log("onSubmit")
    }

   const deleteWorkSpacePermanently = async() => {
    try {
      await mutationToDeleteWorkSpace({workspaceId : selectedWorkspace._id});
    } catch (error) {
        console.error('Error deleting workspace:', error);
    } 
    }
  return (
    <>
         {deleteWorkSpace && <Modal show={true} 
        appElement={document.getElementById('root')}>
              <Modal.Header>
                {t('workspaces.deleteWorkSpace')}
              </Modal.Header>
              <Modal.Body>
                {t('workspaces.deleteWorkspaceConfirmation')}
              </Modal.Body>
              <Modal.Footer>
                <Button disabled={false} onClick={()=>setDeleteWorkspace(false)} variant="outline-light" className="cancel-btn">
                  {t('workspaces.cancel')}
                </Button>
                <Button type="submit" onClick={()=>deleteWorkSpacePermanently()} disabled={false} variant="primary" className="submit-btn">
                  {t('workspaces.deleteWorkSpace')}
                </Button>
              </Modal.Footer>
            </Modal>}
    <div css={css({
      display : "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%"
    })}>
      <div   style={{
              border : "1px solid #1d4ed8",
              padding: 40
            }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting,errors }) => (
              <Form>
                <div className="form-group">
                  <label className="label" htmlFor="name">{t('workspaces.workspaceName')}</label>
                  <Field type="text" name="name" placeholder={t('workspaces.workspaceName')} className="form-control" />
                  <ErrorMessage name="name" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label className="label" htmlFor="description">{t('workspaces.workspaceDescription')}</label>
                  <Field type="text" name="description" placeholder={t('workspaces.workspaceDescription')} className="form-control" />
                  <ErrorMessage name="description" component="div" className="error-message" />
                </div>

                <div css={css({
                  display : "flex",
                  justifyContent: "flex-end",
                  gap :10
                })}>
                <Button type="submit" variant="danger" className="submit-btn" onClick={()=>setDeleteWorkspace(true)}>
                  {t('workspaces.deleteWorkSpace')}
                </Button>
                <Button type="submit" disabled={isSubmitting || Object.keys(errors).length !== 0 } variant="primary" className="submit-btn">
                  {t('workspaces.saveChanges')}
                </Button>
                </div>
              </Form>
            )}
          </Formik>
          </div>
    </div>
    </>
  )
}

export default Settings
