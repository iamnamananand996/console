import { FC, useCallback, useState } from "react";
import { Formik } from "formik";
import { BasicProgressMessageBox } from "@instill-ai/design-system";

import { FormBase, TextArea } from "@/components/formik";
import { PrimaryButton } from "@/components/ui";
import { Model } from "@/lib/instill";
import { useDeleteModel, useUpdateModel } from "@/services/model";
import { Nullable } from "@/types/general";
import { sendAmplitudeData } from "@/lib/amplitude";
import { useAmplitudeCtx } from "context/AmplitudeContext";
import OutlineButton from "@/components/ui/Buttons/OutlineButton";
import { DeleteResourceModal } from "@/components/modals";
import useDeleteResourceModalState from "@/hooks/useDeleteResourceModalState";
import { useRouter } from "next/router";

export type ConfigureModelFormProps = {
  model: Nullable<Model>;
  marginBottom: Nullable<string>;
};

export type ConfigureModelFormValue = {
  description: Nullable<string>;
};

const ConfigureModelForm: FC<ConfigureModelFormProps> = ({
  model,
  marginBottom,
}) => {
  const { amplitudeIsInit } = useAmplitudeCtx();
  const router = useRouter();
  const [canEdit, setCanEdit] = useState(false);
  const [updateModelError, setUpdateModelError] =
    useState<Nullable<string>>(null);
  const [isUpdateingModel, setIsUpdatingModel] = useState(false);
  const updateModel = useUpdateModel();

  const validateForm = useCallback((values: ConfigureModelFormValue) => {
    const errors: Partial<ConfigureModelFormValue> = {};

    if (!values.description) {
      errors.description = "Required";
    }

    return errors;
  }, []);

  const handleEditButton = (
    values: ConfigureModelFormValue,
    submitForm: () => Promise<void>
  ) => {
    if (!canEdit) {
      setCanEdit(true);
      return;
    }

    submitForm();
  };

  // ###################################################################
  // #                                                                 #
  // # Handle delete model                                             #
  // #                                                                 #
  // ###################################################################

  const modalState = useDeleteResourceModalState();

  const deleteModel = useDeleteModel();

  const handleDeleteModel = useCallback(() => {
    if (!model) return;

    modalState.setIsDeleting(true);
    deleteModel.mutate(model.name, {
      onSuccess: () => {
        modalState.setIsDeleting(false);
        if (amplitudeIsInit) {
          sendAmplitudeData("delete_model", {
            type: "critical_action",
            process: "model",
          });
        }
        router.push("/models");
      },
      onError: (error) => {
        if (error instanceof Error) {
          modalState.setError(error.message);
          modalState.setIsDeleting(false);
        } else {
          modalState.setError("Something went wrong when deleting destination");
          modalState.setIsDeleting(false);
        }
      },
    });
    modalState.setIsDeleting(false);
  }, [model, amplitudeIsInit, router, deleteModel]);

  return (
    <>
      <Formik
        initialValues={
          {
            description: model ? model.description : null,
          } as ConfigureModelFormValue
        }
        enableReinitialize={true}
        onSubmit={(values) => {
          if (!model || !values.description) return;

          if (model.description === values.description) {
            setCanEdit(false);
            return;
          }

          setIsUpdatingModel(true);

          updateModel.mutate(
            {
              name: model.name,
              description: values.description,
            },
            {
              onSuccess: () => {
                setCanEdit(false);
                setIsUpdatingModel(false);
                if (amplitudeIsInit) {
                  sendAmplitudeData("update_model", {
                    type: "critical_action",
                    process: "model",
                  });
                }
              },
              onError: (error) => {
                if (error instanceof Error) {
                  setUpdateModelError(error.message);
                } else {
                  setUpdateModelError(
                    "Something went wrong when deploying model"
                  );
                }
              },
            }
          );
        }}
        validate={validateForm}
      >
        {({ values, errors, submitForm }) => {
          return (
            <FormBase marginBottom={marginBottom} gapY={null} padding={null}>
              <div className="mb-[60px] flex w-full flex-col">
                <TextArea
                  id="description"
                  name="description"
                  label="Description"
                  additionalMessageOnLabel={null}
                  description="Fill with a short description of your model"
                  value={values.description}
                  error={errors.description || null}
                  additionalOnChangeCb={null}
                  disabled={canEdit ? false : true}
                  readOnly={false}
                  required={true}
                  autoComplete="off"
                  placeholder=""
                  enableCounter={false}
                  counterWordLimit={0}
                />
              </div>
              <div className="flex flex-row">
                <OutlineButton
                  disabled={false}
                  onClickHandler={() => modalState.setModalIsOpen(true)}
                  position="mr-auto my-auto"
                  type="button"
                  disabledBgColor="bg-instillGrey15"
                  bgColor="bg-white"
                  hoveredBgColor="hover:bg-instillRed"
                  disabledTextColor="text-instillGrey50"
                  textColor="text-instillRed"
                  hoveredTextColor="hover:text-instillGrey05"
                  width={null}
                  borderSize="border"
                  borderColor="border-instillRed"
                  hoveredBorderColor={null}
                  disabledBorderColor="border-instillGrey15"
                >
                  Delete
                </OutlineButton>
                <PrimaryButton
                  disabled={false}
                  onClickHandler={() => handleEditButton(values, submitForm)}
                  position="ml-auto my-auto"
                  type="button"
                >
                  {canEdit ? "Done" : "Edit"}
                </PrimaryButton>
              </div>
              <div className="flex">
                {updateModelError ? (
                  <BasicProgressMessageBox width="w-[216px]" status="error">
                    {updateModelError}
                  </BasicProgressMessageBox>
                ) : isUpdateingModel ? (
                  <BasicProgressMessageBox
                    width="w-[216px]"
                    status="progressing"
                  >
                    Updating model...
                  </BasicProgressMessageBox>
                ) : null}
              </div>
            </FormBase>
          );
        }}
      </Formik>
      <DeleteResourceModal
        resource={model}
        modalIsOpen={modalState.modalIsOpen}
        setModalIsOpen={modalState.setModalIsOpen}
        handleDeleteResource={handleDeleteModel}
      />
    </>
  );
};

export default ConfigureModelForm;
