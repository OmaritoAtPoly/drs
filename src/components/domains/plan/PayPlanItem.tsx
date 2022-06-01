import {
  createStyles,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useCallback } from "react";
import STRINGS from "../../../utils/strings";
import PrimaryButton from "../../buttons/PrimaryButton";
import Icon from "../../Icon/Icon";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = makeStyles((theme) =>
  createStyles({
    cardContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: theme.spacing(2),
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
      maxWidth: "350px",
      boxShadow:
        "2px 2px 4px #D6E3F3, -6px -6px 20px rgba(255, 255, 255, 0.4), 4px 4px 20px #D6E3F3",
      position: "relative",
    },
    premiumCardContainer: {
      background: "linear-gradient(#5E17EB, #E5E5E5)",
    },
    basicCardContainer: {
      backgroundColor: "#F9F9F9",
      boxShadow:
        "2px 2px 4px #D6E3F3, -6px -6px 20px rgba(255, 255, 255, 0.4), 4px 4px 20px #D6E3F3",
    },
    cardTitle: {
      fontWeight: 800,
      fontSize: "22px",
      lineHeight: "16px",
    },
    basicCardTitle: {
      color: theme.palette.primary.main,
    },
    premiumCardTitle: {
      color: "#ffff",
    },
    ul: {
      width: "100%",
      margin: 0,
      marginBottom: theme.spacing(1),
    },
    innerUl: {
      paddingLeft: theme.spacing(1),
    },
    li: {},
    benefitItems: {
      fontSize: "16px",
      lineHeight: "22px",
    },
    premiumBenefitItems: {
      color: "#ffff",
    },
    basicBenefitItems: {
      color: theme.palette.primary.main,
    },
    dividerStyle: {
      display: "flex",
      height: "1px",
      width: "100%",
      alignSelf: "center",
    },
    premiumDividerStyle: {
      backgroundColor: "#ffff",
    },
    basicDividerStyle: {
      backgroundColor: theme.palette.primary.main,
    },
    payItem: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
    },
    button: {
      display: "flex",
      alignSelf: "center",
      backgroundColor: "#ffff",
      color: theme.palette.primary.main,
      width: "150px",
      boxShadow:
        "2px 2px 4px rgba(114, 142, 171, 0.1), 4px 4px 20px rgba(111, 140, 176, 0.41)",
    },
    checkedContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "25px",
      height: "25px",
      backgroundColor: "#7ED957",
      borderRadius: "50%",
      position: "absolute",
      top: theme.spacing(-1),
      right: theme.spacing(-1),
    },
    checkedIcon: {
      marginTop: theme.spacing(0.25),
    },
    subtitle: {
      display: "flex",
      alignSelf: "flex-start",
      fontWeight: "bold",
    },
  }),
);

interface Props {
  premium?: boolean;
  current?: boolean;
  plan: Schemas.SubscriptionData;
  activateOption?: boolean;
  onActive: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PayPlanItem({
  plan,
  premium = false,
  current = false,
  activateOption = true,
  onActive,
}: Props) {
  const classes = styles();

  const splitByNewLine = useCallback(
    (feature: string) => feature.split("\n"),
    [],
  );

  const renderSubItems = useCallback(
    (feats: string[]) => (
      <ul className={classes.innerUl}>
        {feats?.map((feat, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <Typography
              className={`${classes.benefitItems} ${
                premium
                  ? classes.premiumBenefitItems
                  : classes.basicBenefitItems
              }`}>
              {feat}
            </Typography>
          </li>
        ))}
      </ul>
    ),
    [
      classes.basicBenefitItems,
      classes.benefitItems,
      classes.innerUl,
      classes.premiumBenefitItems,
      premium,
    ],
  );

  const renderSubList = useCallback(
    (feature: string) => {
      const feats = splitByNewLine(feature);
      const featureHeader = feats.length >= 0 ? feats[0] : "";
      return (
        <li>
          <Typography
            className={`${classes.benefitItems} ${
              premium ? classes.premiumBenefitItems : classes.basicBenefitItems
            }`}>
            {featureHeader}
          </Typography>
          {renderSubItems(feats.length >= 1 ? feats.slice(1) : [])}
        </li>
      );
    },
    [
      classes.basicBenefitItems,
      classes.benefitItems,
      classes.premiumBenefitItems,
      premium,
      renderSubItems,
      splitByNewLine,
    ],
  );

  return (
    <div
      className={`${classes.cardContainer} ${
        premium ? classes.premiumCardContainer : classes.basicCardContainer
      }`}>
      <Typography
        className={`${classes.cardTitle} ${
          premium ? classes.premiumCardTitle : classes.basicCardTitle
        }`}>
        {plan.name}
      </Typography>

      {plan.features && plan.features.length > 0 && (
        <>
          <Typography className={`${classes.subtitle}`}>
            {STRINGS.payPlan.BENEFITS}
          </Typography>
          <ul className={classes.ul}>
            {plan.features?.map((feature) => renderSubList(feature))}
          </ul>
        </>
      )}
      {plan.featuresExtra && plan.featuresExtra.length > 0 && (
        <>
          <Typography className={`${classes.subtitle} `}>
            {STRINGS.payPlan.OTHER_BENEFITS}
          </Typography>
          <ul className={classes.ul}>
            {plan.featuresExtra?.map((feature) => renderSubList(feature))}
          </ul>
        </>
      )}
      {plan.noFeatures && plan.noFeatures.length > 0 && (
        <>
          <Typography className={`${classes.subtitle}`}>
            {STRINGS.payPlan.NOT_INCLUDE}
          </Typography>
          <ul className={classes.ul}>
            {plan.noFeatures?.map((feature) => renderSubList(feature))}
          </ul>
        </>
      )}
      {plan.noFeaturesExtra && plan.noFeaturesExtra.length > 0 && (
        <>
          <Typography className={`${classes.subtitle}`}>
            {STRINGS.payPlan.NOT_INCLUDE_EXTRA}
          </Typography>
          <ul className={classes.ul}>
            {plan.noFeaturesExtra?.map((feature) => renderSubList(feature))}
          </ul>
        </>
      )}
      <Divider
        className={`${classes.dividerStyle} ${
          premium ? classes.premiumDividerStyle : classes.basicDividerStyle
        }`}
      />
      <div className={classes.payItem}>
        <Typography>{STRINGS.payPlan.SUBTOTAL}</Typography>
        <Typography>{`$ ${plan.price}`}</Typography>
      </div>
      <div className={classes.payItem}>
        <Typography>{STRINGS.payPlan.IVA}</Typography>
        <Typography>{`$ ${plan.tax}`}</Typography>
      </div>
      <div className={classes.payItem}>
        <Typography>{STRINGS.payPlan.DISCOUNT}</Typography>
        <Typography>{`$ ${plan.discount}`}</Typography>
      </div>
      <div className={classes.payItem}>
        <Typography>{STRINGS.payPlan.TOTAL}</Typography>
        <Typography>{`$ ${plan.total}`}</Typography>
      </div>
      {plan.code !== "free" && activateOption && !current && (
        <PrimaryButton
          label={STRINGS.payPlan.ACTIVATE}
          className={classes.button}
          onClick={onActive}
        />
      )}
      {current && (
        <div className={classes.checkedContainer}>
          <Icon className={classes.checkedIcon} name="checkIcon" />
        </div>
      )}
      {plan.favorite && (
        <div className={classes.checkedContainer}>
          <Icon
            className={classes.checkedIcon}
            width={40}
            height={37}
            name="favoriteStar"
          />
        </div>
      )}
      {current && plan.favorite && (
        <div className={classes.checkedContainer}>
          <Icon className={classes.checkedIcon} name="checkIcon" />
        </div>
      )}
    </div>
  );
}
