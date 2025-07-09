import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button,Modal } from 'react-bootstrap';
import "./workspace.scss"
import { useCreateWorkspace } from '../useQueries/useCreateWorkspace';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';
import "./workspace.scss"


const CreateWorkspace = ({ show, handleClose }) => {
  const [t] = useTranslation();
  const { mutate, isLoading, error } = useCreateWorkspace();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().optional(),
  });

  const initialValues = {
    name: '',
    description: '',
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await mutate(values);
      handleClose();
    } catch (error) {
        console.error('Error creating workspace:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className="workspace-modal"  appElement={document.getElementById('root')}
      style={{
        overlay: {
          position: 'fixed',
          top: "20%",
          left: "38%",
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '500px',
          margin: '0',
          backgroundColor: '#fff',
          padding: '20px',
          border: 'none',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        },
      }}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Create Workspace</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
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
                 <Button disabled={isSubmitting} onClick={handleClose} variant="outline-light" className="cancel-btn">
                  {t('workspaces.cancel')}
                </Button>
                <Button type="submit" disabled={isSubmitting || Object.keys(errors).length !== 0 } variant="primary" className="submit-btn">
                  {t('workspaces.createWorkspace')}
                </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
  );
};

export default CreateWorkspace;