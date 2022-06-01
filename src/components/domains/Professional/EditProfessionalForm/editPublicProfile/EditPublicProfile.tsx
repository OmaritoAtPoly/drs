/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, makeStyles, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useHandlerError from "../../../../../modules/utils/error/handleError";
import theme from "../../../../../styles/theme";
import STRINGS from "../../../../../utils/strings";
import { ValueAndLabelType } from "../../../../../utils/types";
import WizardAccordion, {
  StatePanel,
} from "../../../../accordion/WizardAccordion";
import Avatar from "../../../../Avatar";
import PrimaryButton from "../../../../buttons/PrimaryButton";
import Icon from "../../../../Icon/Icon";
import LoadingWrapper from "../../../../LoadingWrapper";
import SwitchButton from "../../../auth/signUp/consultatories/SwitchButton";
import ContactData from "../../../auth/signUp/generalData/ContactData";
import ProfessionalProfileData from "../../../auth/signUp/generalData/ProfessionalProfileData";
import {
  updatePublicProfileSchema,
  useValidation,
} from "../../../auth/signUp/generalData/validations";
import PublicGeneralData from "./PublicGeneralData";

interface Props {
  loading?: boolean;
  languages: ValueAndLabelType[];
  handleSubmitForm: (value: Schemas.ProfessionalRequest) => void;
  specialties: Schemas.SpecialtyResponse[];
  contactPerson: ValueAndLabelType[];
  pureInsurances: Schemas.HealthInsuranceData[];
  loadingSpecialties?: boolean;
  onSpecialtyDebounceSearch: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  professional: Schemas.ProfessionalData;
  ref?:
    | string
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>;
  image?: string;
  file?: File;
  onChangeImage?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleUpdateProfessionalAvatar: () => void;
  updatingAvatar?: boolean;
  handleGoBack: () => void;
}

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    justifyContent: "center",
  },
  errorStyle: {
    color: theme.palette.error.main,
    display: "flex",
    fontSize: "12px",
    marginLeft: 15,
    width: 500,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  errorContainer: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  roundIconStyle: {
    width: theme.spacing(12),
    paddingBottom: theme.spacing(3),
  },
  large: {
    width: "100px",
    height: "100px",
    background: "grey",
  },
  inputStyle: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  startIcon: {
    alignItems: "center",
    display: "flex",
  },
  goBackOptionStyle: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default function EditPublicProfile({
  handleSubmitForm,
  loading = false,
  languages,
  specialties,
  contactPerson,
  pureInsurances,
  onSpecialtyDebounceSearch,
  loadingSpecialties,
  professional,
  image,
  file,
  ref,
  onClick,
  onChangeImage,
  handleUpdateProfessionalAvatar,
  updatingAvatar,
  handleGoBack,
}: Props) {
  const [agreeToBePublic, setAgreeToBePublic] = useState<boolean>(
    professional?.agreeToBePublic || false,
  );

  const { handlerError } = useHandlerError();
  const [completedPanel, setCompleted] = useState<StatePanel[]>(
    new Array(3).fill(undefined),
  );
  const classes = styles();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: professional,
    enableReinitialize: true,
    validationSchema: updatePublicProfileSchema,
    onSubmit: (val) => {
      handleSubmitForm(val);
    },
  });

  const handleAgreeToBePublic = useCallback(() => {
    setAgreeToBePublic(!agreeToBePublic);
    setFieldValue("agreeToBePublic", !agreeToBePublic);
  }, [setFieldValue, agreeToBePublic]);

  const [openPanelIndex, setOpenPanelIndex] = useState<number | undefined>(0);
  const setCompletedWidthIndex = useCallback(
    (index: number, value?: StatePanel) => {
      setCompleted(completedPanel.map((v, i) => (i === index ? value : v)));
    },
    [completedPanel],
  );

  const {
    thereErrorInAccordion0,
    thereErrorInAccordion1,
    thereErrorInAccordion2,
    canBeCompleted,
  } = useValidation();
  const onSave = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      // eslint-disable-next-line @typescript-eslint/no-shadow
      canBeCompleted: boolean,
    ) => {
      if (openPanelIndex === undefined) return;
      if (!canBeCompleted) {
        handlerError(STRINGS.error.VALID_DATE_INTRODUCE);
      } else {
        setCompletedWidthIndex(openPanelIndex, "completed");
        setOpenPanelIndex(openPanelIndex + 1);
      }
    },
    [handlerError, openPanelIndex, setCompletedWidthIndex],
  );

  const onBack = useCallback(() => {
    if (openPanelIndex === undefined) return;
    if (openPanelIndex === 0) {
      setOpenPanelIndex(0);
      return;
    }
    setOpenPanelIndex(openPanelIndex - 1);
  }, [openPanelIndex]);

  useEffect(() => {
    if (openPanelIndex === 0) {
      if (thereErrorInAccordion0(errors, openPanelIndex)) {
        setCompletedWidthIndex(0, "error");
        return;
      }
      if (completedPanel[0] === "error") {
        setCompletedWidthIndex(0, undefined);
      }
    }
    if (openPanelIndex === 1) {
      if (thereErrorInAccordion1(errors, openPanelIndex)) {
        setCompletedWidthIndex(1, "error");
        return;
      }
      if (completedPanel[1] === "error") {
        setCompletedWidthIndex(1, undefined);
      }
    }
    if (openPanelIndex === 2) {
      if (thereErrorInAccordion2(errors, openPanelIndex)) {
        setCompletedWidthIndex(2, "error");
        return;
      }
      if (completedPanel[2] === "error") {
        setCompletedWidthIndex(2, undefined);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    errors,
    openPanelIndex,
    thereErrorInAccordion0,
    thereErrorInAccordion1,
    thereErrorInAccordion2,
  ]);

  const treatedCurrentSpecialties = useMemo(() => {
    const currentSpecialties = values.specialties?.map(
      (l) => specialties?.find((d) => d.code === l)?.name || l,
    );
    return currentSpecialties;
  }, [values?.specialties, specialties]);

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.content}>
        <div className={classes.logo}>
          {!image && (
            <Avatar
              className={classes.large}
              src={values.avatarUrl}
            />
          )}
          {image && <img src={image} alt="" className={classes.large} />}
          <input
            ref={ref}
            name="apiImage"
            accept="image/*"
            id="icon-button-file"
            type="file"
            hidden
            onChange={onChangeImage}
          />
          <label htmlFor="icon-button-file">
            <LoadingWrapper loading={loading}>
              <Button
                startIcon={
                  <Icon className={classes.startIcon} name="uploadIcon" />
                }
                onClick={onClick}
                color="primary"
                component="span"
                disabled={loading}>
                <span id="select-button" className={classes.inputStyle}>
                  <Typography>
                    {file?.name || STRINGS.generals.CHOOSE_FILE}
                  </Typography>
                </span>
              </Button>
            </LoadingWrapper>
          </label>
          <PrimaryButton
            loading={updatingAvatar}
            label={STRINGS.generals.UPDATE}
            onClick={handleUpdateProfessionalAvatar}
            variant="contained"
            color="primary"
          />
        </div>
        <WizardAccordion
          openPanelIndex={openPanelIndex}
          onChangeOpenPanelIndex={(index?: number) => {
            setOpenPanelIndex(index);
          }}
          mode="free"
          panels={[
            {
              title: STRINGS.generals.ADDITIONAL_PUBLIC_GENERAL_DATA,
              state: completedPanel[0] as any,
              canBeCompleted: () =>
                canBeCompleted(0, errors, values, openPanelIndex),
              onSave,
              onBack,
              renderContent: (
                <PublicGeneralData
                  errors={errors}
                  touched={touched as any}
                  setFieldValue={setFieldValue}
                  specialties={specialties}
                  languages={languages}
                  loadingSpecialties={loadingSpecialties}
                  onSpecialtyDebounceSearch={onSpecialtyDebounceSearch}
                  values={values as any}
                  currentLanguagesValues={values.languages || []}
                  treatedCurrentSpecialties={treatedCurrentSpecialties}
                />
              ),
            },
            {
              title: STRINGS.generals.PUBLIC_CONTACT_DATA,
              state: completedPanel[1] as any,
              canBeCompleted: () =>
                canBeCompleted(1, errors, values, openPanelIndex),
              onSave,
              onBack,
              renderContent: (
                <ContactData
                  errors={errors}
                  handleBlur={handleBlur}
                  touched={touched as any}
                  handleChange={handleChange}
                  values={values}
                  setFieldValue={setFieldValue}
                  contactPerson={contactPerson}
                  pureInsurances={pureInsurances}
                  showPhoneField={false}
                  showLegalField={false}
                />
              ),
            },
            {
              title: STRINGS.signUp.DR_PROFILE,
              state: completedPanel[2] as any,
              canBeCompleted: () =>
                canBeCompleted(2, errors, values, openPanelIndex),
              onSave,
              onBack,
              renderContent: (
                <ProfessionalProfileData
                  errors={errors}
                  handleBlur={handleBlur}
                  touched={touched as any}
                  handleChange={handleChange}
                  values={values}
                  setFieldValue={setFieldValue}
                  operationDataLoading={loading}
                />
              ),
            },
          ]}
        />
        <div className={classes.formGroup}>
          <SwitchButton
            checked={agreeToBePublic}
            toggleChecked={handleAgreeToBePublic}
          />
        </div>
        <div className={classes.formGroup}>
          <span className={classes.goBackOptionStyle} id="edit-public=profile">
            <PrimaryButton
              variant="contained"
              label={STRINGS.generals.BACK}
              onClick={handleGoBack}
            />
            <PrimaryButton
              loading={loading}
              variant="contained"
              type="submit"
              className={classes.button}
              label={STRINGS.generals.UPDATE}
            />
          </span>
        </div>
      </form>
    </div>
  );
}
