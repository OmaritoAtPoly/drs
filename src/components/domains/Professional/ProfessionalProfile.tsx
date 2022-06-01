import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import theme from "../../../styles/theme";
import STRINGS from "../../../utils/strings";
import { fullName } from "../../../utils/user";
import Avatar from "../../Avatar";
import PrimaryButton from "../../buttons/PrimaryButton";
import RatingBox from "../../rating/RatingBox";
import EcliniqLogo from "../../svg/EcliniqLogo";
import ConsultingRoom from "./ConsultingRoom";
import HealthServicePrice from "./HealthServicePrice";
import IconedProfileSection from "./IconedProfileSection";
import ProfileSectionContent from "./ProfileSectionContent";

interface Props {
  loadingProfessional: boolean;
  currentProfessional?: Schemas.ProfessionalData;
  handleHealthServiceType: (value?: string) => string;
  handleEditPublicProfile: () => void;
  handleGoBack: () => void;
  languages?: string[];
  specialties?: string[];
  insurances?: string[];
  professions: Schemas.ProfessionResponse[];
}
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(6),
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
    },
  },
  avatar: {
    display: "flex",
    alignSelf: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  large: {
    width: "100px",
    height: "100px",
    background: "grey",
  },
  bullet: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    borderRadius: "100%",
    marginRight: theme.spacing(2),
    backgroundColor: "black", // todo Add this color to merfe requets
  },
  nameAndLastNameStyle: {
    fontSize: "25px",
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  professionStyle: {
    fontSize: "20px",
    alignItems: "center",
    color: "gray", // todo add this color to theme palette
  },
  itemsContainerStyle: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  itemsContent: {
    width: "100%",
  },
  priceWarningStyle: {
    color: "#5d8cca", // todo add this color to theme palette
    maxWidth: "80%",
    paddingLeft: theme.spacing(1),
  },
  logo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  reviewStyle: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      justifyContent: "center",
    },
  },
  editOptionStyle: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  padding: {
    paddingLeft: theme.spacing(1),
  },
  padding4PX: {
    paddingLeft: theme.spacing(0.5),
  },
  padding6PX: {
    paddingLeft: theme.spacing(0.6),
  },
  serviceMargin: {
    marginTop: theme.spacing(1),
  },
  redText: {
    color: theme.palette.error.main,
    marginLeft: theme.spacing(0.5),
  },
  spanText: {
    display: "flex",
    flexDirection: "row",
  },
});

const ProfessionalProfile = ({
  loadingProfessional,
  currentProfessional,
  handleHealthServiceType,
  handleEditPublicProfile,
  handleGoBack,
  languages,
  specialties,
  insurances,
  professions,
}: Props) => {
  const classes = useStyles();

  return (
    <div id="id-profile-container" className={classes.root}>
      <div className={classes.logo}>
        <EcliniqLogo width={theme.spacing(23)} height={theme.spacing(10)} />
      </div>
      <div className={classes.avatar}>
        <Avatar
          className={classes.large}
          src={currentProfessional?.avatarUrl}
          loading={loadingProfessional}
        />
        <RatingBox disabled rateQuantity={currentProfessional?.rateAverage} />
        {currentProfessional?.firstName && (
          <Typography>{fullName(currentProfessional)}</Typography>
        )}
        <Typography className={classes.professionStyle}>
          {professions?.find((f) => f.code === currentProfessional?.profession)
            ?.name || ""}
        </Typography>
      </div>
      <div id="items-container" className={classes.itemsContainerStyle}>
        <div className={classes.itemsContent}>
          <ProfileSectionContent
            title={STRINGS.professionalProfile.PROFILE}
            content={Array(currentProfessional?.aboutMe || "")}
            showBullet={false}
          />
          <ProfileSectionContent
            title={STRINGS.signUp.CURRICULUM}
            content={currentProfessional?.curriculum}
          />
          <ProfileSectionContent
            title={STRINGS.signUp.SPECIALTIES}
            content={specialties}
          />
          <div>
            <ProfileSectionContent
              title={STRINGS.professionalProfile.LEGAL_ID}
            />
            {currentProfessional?.professionalID && (
              <div className={classes.padding4PX}>
                <IconedProfileSection
                  iconName="ecuador"
                  iconColor="grey"
                  text={Array(currentProfessional?.professionalID || "")}
                />
              </div>
            )}
          </div>
          <div className={classes.serviceMargin}>
            <ProfileSectionContent
              title={STRINGS.professionalProfile.SERVICES_TRADE}
            />
          </div>
          <div className={classes.padding}>
            {currentProfessional?.prices &&
              currentProfessional.prices.map((a) => {
                const key = Math.random();
                return (
                  a.price &&
                  a.serviceCode !== "REMOTE_EMERGENCY" && (
                    <HealthServicePrice
                      key={key}
                      price={a.price}
                      type={handleHealthServiceType(a.serviceCode)}
                    />
                  )
                );
              })}
          </div>
          {currentProfessional && (
            <span className={classes.spanText}>
              <Typography className={classes.priceWarningStyle}>
                {STRINGS.professionalProfile.PRICE_WARNING}
              </Typography>
              <Typography className={classes.redText}>
                {`(${STRINGS.account.SHORTY})`}
              </Typography>
            </span>
          )}
          <div>
            <ProfileSectionContent title={STRINGS.signUp.CONSULTING_ROOM} />
            <div className={classes.padding6PX}>
              <ConsultingRoom
                healthCenter={currentProfessional?.healthCenters}
              />
            </div>
          </div>

          <div>
            <ProfileSectionContent
              title={STRINGS.professionalProfile.HEALTH_CENTER_ASOCIATION}
            />
            <div className={classes.padding}>
              <IconedProfileSection
                iconName="hospitalVariant"
                iconColor="grey"
                text={
                  currentProfessional?.hospitals?.map(
                    (h) =>
                      `${h.name || h.address}${h.notes ? ` / ${h.notes}` : ""}`,
                  ) || []
                }
              />
            </div>
            <span>
              <ProfileSectionContent title={STRINGS.generals.LANGUAGES} />
              {languages &&
                languages?.map((a) => {
                  const key = Math.random();
                  return (
                    <div className={classes.padding}>
                      <IconedProfileSection
                        key={key}
                        text={Array(a)}
                        iconName={a === "en" ? "box" : "chat"}
                      />
                    </div>
                  );
                })}
            </span>
            <span>
              <ProfileSectionContent
                title={STRINGS.signUp.ASSOCIATED_INSURANCES}
              />
              {insurances &&
                insurances?.map((a) => {
                  const key = Math.random();
                  return (
                    <div className={classes.padding}>
                      <IconedProfileSection
                        key={key}
                        text={Array(a)}
                        iconName="shield"
                      />
                    </div>
                  );
                })}
            </span>
            <span className={classes.editOptionStyle} id="edit-public=profile">
              <PrimaryButton
                variant="contained"
                label={STRINGS.generals.BACK}
                onClick={handleGoBack}
              />
              <PrimaryButton
                variant="contained"
                label={STRINGS.account.EDIT_PUBLIC_ACCOUNT}
                onClick={handleEditPublicProfile}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfile;
