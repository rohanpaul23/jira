import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Alert, Button,Modal } from 'react-bootstrap';
import "./workspace.scss"
import { useCreateWorkspace } from '../../useQueries/useCreateWorkspace';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';
import "./workspace.scss"
import { FaInfoCircle } from "react-icons/fa";
import { useAuth } from '../../hooks/useAuth';



const CreateWorkspace = ({workspaces, show, handleClose }) => {
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
    <Modal show={show} onHide={handleClose}  appElement={document.getElementById('root')} style={{
      left: "38% !important"
    }}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">{t('workspaces.createWorkspace')}</Modal.Title>
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
                  {t('workspaces.saveWorkspace')}
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