import AppBarMaterial from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { useCallback, useEffect, useState } from "react";
import { queryCache } from "react-query";
import { useHistory } from "react-router-dom";
import NewConsultDialogContainer from "../../../containers/customer/newConsult/NewConsultDialogContainer";
import InviteContainer from "../../../containers/Professional/invite/InviteContainer";
import { usePlanExpiredQuery } from "../../../modules/payment/query";
import STRINGS from "../../../utils/strings";
import { ValueAndLabelType } from "../../../utils/types";
import { fullName } from "../../../utils/user";
import Avatar from "../../Avatar";
import CustomerSimpleRow from "../../domains/customers/CustomerSimpleRow/CustomerSimpleRow";
import Icon from "../../Icon/Icon";
import Autocomplete from "../../inputs/Search/Autocomplete";
import { useUpdateTabVisible } from "../SideBar/query";
import AdjustAccountDialogContainer from "./AdjustAccountDialogContainer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      boxShadow:
        "2px 2px 4px -1px rgb(0 0 0 / 20%), 5px 4px 5px 0px rgb(0 0 0 / 14%), 10px 1px 10px 0px rgb(0 0 0 / 12%)",
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      color: theme.palette.primary.main,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "70%",
      [theme.breakpoints.up("sm")]: {
        width: 300,
      },
      display: "flex",
      alignItems: "center",
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.common.white,
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    flex: {
      display: "flex",
    },
    toolbar: {
      backgroundColor: theme.palette.common.white,
    },
    avatar: {
      marginRight: 10,
      width: 50,
      height: 50,
    },
    // TODO: Add this color to the theme
    menu: {
      borderColor: "#D6E3F3",
      borderWidth: 2,
      borderStyle: "solid",
      borderRadius: 10,
    },
    text: {
      // TODO: Add this color to the theme
      color: "#323232",
      fontFamily: "Nunito",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: 16,
      lineHeight: 22,
    },
    item: {
      height: 50,
    },
    divider: {
      borderColor: "#D6E3F3",
      borderWidth: 1,
      borderStyle: "solid",
      height: 2,
    },
    menuIconButton: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      display: "flex",
      alignItems: "baseline",
    },
  }),
);

interface Props {
  currentProfessional?: Schemas.ProfessionalData;
  loading?: boolean;
  loadingSearch?: boolean;
  onDebounceSearch?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  customersOptions?: Schemas.CustomerData[];
  showSearch?: boolean;
  onClick: (customer: Schemas.CustomerData) => () => void;
  handleEdit: (customer: Schemas.CustomerData) => () => void;
  handleAdd: (customer: Schemas.CustomerData) => (reason: string[]) => void;
  isAssistant: () => boolean;
  currentProfessionalHeathCenter?: Schemas.ProfessionalHealthCenterResponse;
  loadingCurrentHeathCenter?: boolean;
  updateCurrentHealthCenter: (
    healthCenter?: Schemas.ProfessionalHealthCenterResponse | undefined,
  ) => void;
  gendersOptions: ValueAndLabelType[];
}

export default function AppBar({
  currentProfessional,
  loading,
  loadingSearch,
  customersOptions = [],
  onDebounceSearch = () => {},
  showSearch,
  onClick,
  handleEdit,
  handleAdd,
  isAssistant,
  currentProfessionalHeathCenter,
  loadingCurrentHeathCenter,
  updateCurrentHealthCenter,
  gendersOptions,
}: Props) {
  const classes = useStyles();
  const { push } = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showAdjustAccount, setShowAdjustAccount] = useState(false);
  const { data } = usePlanExpiredQuery();
  useEffect(() => {
    setShowAdjustAccount(data?.planExpired || false);
  }, [data]);
  const isMenuOpen = Boolean(anchorEl);
  const [showInviteDialog, setInviteDialog] = useState<boolean>(false);
  const { updateTabVisible } = useUpdateTabVisible();

  const [currentOption, setCurrentOption] = useState<
    Schemas.CustomerData | undefined
  >();

  const [showNewConsultDialog, setShowNewConsultDialog] = useState(false);

  const handleShowNewConsultDialog = useCallback(
    (customer?: Schemas.CustomerData) => {
      setCurrentOption(customer);
      setShowNewConsultDialog(!showNewConsultDialog);
    },
    [showNewConsultDialog],
  );

  const handleAddCallBack = useCallback(
    (customer?: Schemas.CustomerData) => (reason: string[]) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      customer && handleAdd(customer)(reason);
      setShowNewConsultDialog(!showNewConsultDialog);
      setCurrentOption(undefined);
    },
    [handleAdd, showNewConsultDialog],
  );

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleShow = useCallback(() => {
    !data?.planExpired && setShowAdjustAccount(!showAdjustAccount);
  }, [data?.planExpired, showAdjustAccount]);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logOut = useCallback(() => {
    localStorage.clear();
    updateTabVisible(false);
    queryCache.clear();
    handleMenuClose();
    push("/login");
  }, [push, updateTabVisible]);

  const handleAdjustAccount = useCallback(() => {
    !data?.planExpired && handleMenuClose();
    handleShow();
  }, [data?.planExpired, handleShow]);

  // todo fix bug for firefox (it request for the same, infinitive times)
  const handleShowPublicProfile = useCallback(
    () => !data?.planExpired && push("/show-professional-profile"),
    [data?.planExpired, push],
  );
  const handleFaqs = useCallback(() => !data?.planExpired && push("/faqs"), [
    data?.planExpired,
    push,
  ]);

  const menuId = "primary-search-account-menu";

  const StyledMenu = withStyles({
    paper: {
      borderColor: "#D6E3F3",
      borderWidth: 2,
      borderStyle: "solid",
      borderRadius: 10,
    },
  })((props: MenuProps) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));

  const handleInviteDialogVisibility = useCallback(() => {
    if (data?.planExpired) return;
    setInviteDialog(!showInviteDialog);
    handleMenuClose();
  }, [data?.planExpired, showInviteDialog]);

  const renderMenu = (
    <StyledMenu
      style={{
        zIndex: 1500,
      }}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>
        <div className={classes.flex}>
          <Avatar
            src={currentProfessional?.avatarUrl}
            loading={loading}
            className={classes.avatar}
          />
          {!loading && (
            <span>
              {!isAssistant() ? (
                <Typography className={classes.title} variant="h6">
                  {fullName(currentProfessional)}
                </Typography>
              ) : (
                <Typography className={classes.title} variant="h6">
                  {currentProfessional?.assistantName}
                </Typography>
              )}
            </span>
          )}
        </div>
      </MenuItem>
      <MenuItem onClick={handleShowPublicProfile} className={classes.item}>
        <Typography className={classes.text} variant="h6">
          {STRINGS.generals.PUBLIC_PROFILE}
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleAdjustAccount} className={classes.item}>
        <Typography className={classes.text} variant="h6">
          {STRINGS.generals.ADJUST_ACCOUNT}
        </Typography>
      </MenuItem>
      <div className={classes.divider} />
      <MenuItem onClick={handleFaqs} className={classes.item}>
        <Typography className={classes.text} variant="h6">
          {STRINGS.generals.FAQS}
        </Typography>
      </MenuItem>

      <MenuItem onClick={logOut} className={classes.item}>
        <Typography className={classes.text} variant="h6">
          {STRINGS.generals.END_SESSION}
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleInviteDialogVisibility} className={classes.item}>
        <Icon name="shareIcon" />
      </MenuItem>
    </StyledMenu>
  );

  return (
    <div className={classes.grow}>
      <AppBarMaterial position="relative" className={classes.container}>
        <Toolbar className={classes.toolbar}>
          {!loading && (
            <span>
              {!isAssistant() ? (
                <Typography className={classes.title} variant="h6" noWrap>
                  {`${STRINGS.generals.HELLO} ${fullName(currentProfessional)}`}
                </Typography>
              ) : (
                <Typography className={classes.title} variant="h6" noWrap>
                  {`${STRINGS.generals.HELLO} ${currentProfessional?.assistantName}`}
                </Typography>
              )}
            </span>
          )}
          {loading && <CircularProgress size={24} />}
          <div className={classes.grow} />
          <div className={classes.flex}>
            <div className={classes.flex}>
              <div className={classes.search}>
                <Autocomplete
                  notIcon
                  loading={loadingCurrentHeathCenter}
                  value={{ ...currentProfessionalHeathCenter }}
                  classes={{ root: classes.search }}
                  options={currentProfessional?.healthCenters || []}
                  getOptionLabel={
                    (option: Schemas.ProfessionalHealthCenterResponse) =>
                      option.name || ""
                    // eslint-disable-next-line react/jsx-curly-newline
                  }
                  inputProps={{
                    placeholder: STRINGS.generals.CHOOSE_CURRENT_HEALTH_CENTER,
                  }}
                  freeSolo={false}
                  onChange={updateCurrentHealthCenter}
                  renderOption={(
                    option: Schemas.ProfessionalHealthCenterResponse,
                  ) => (
                    <div>
                      <Typography>{option.name || ""}</Typography>
                    </div>
                  )}
                />
                <NewConsultDialogContainer
                  open={showNewConsultDialog}
                  handleShow={handleShowNewConsultDialog}
                  onBegin={
                    currentOption ? handleAddCallBack(currentOption) : () => {}
                  }
                />
              </div>
              {showSearch && (
                <div className={classes.search}>
                  <Autocomplete
                    loading={loadingSearch}
                    classes={{ root: classes.search }}
                    options={customersOptions}
                    getOptionLabel={
                      (option: Schemas.CustomerData) => fullName(option)
                      // eslint-disable-next-line react/jsx-curly-newline
                    }
                    freeSolo={false}
                    inputProps={{
                      placeholder: STRINGS.generals.FIND_PATIENT_BY_NAME,
                    }}
                    onDebounce={onDebounceSearch}
                    renderOption={(option: Schemas.CustomerData) => (
                      <CustomerSimpleRow
                        customer={option}
                        handleEdit={handleEdit(option)}
                        handleAdd={handleShowNewConsultDialog}
                        onClick={onClick(option)}
                        handleDelete={() => {}}
                        alwaysShort
                        alwaysShowAction
                        iconWidth={10}
                        iconHeight={10}
                        hideDeleteIcon
                        showOnlyName
                        gendersOptions={gendersOptions || []}
                      />
                    )}
                  />
                  <NewConsultDialogContainer
                    open={showNewConsultDialog}
                    handleShow={handleShowNewConsultDialog}
                    onBegin={
                      currentOption
                        ? handleAddCallBack(currentOption)
                        : () => {}
                    }
                  />
                </div>
              )}
            </div>
            {/* // TODO: hide momently */}
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <Icon name="notification" />
              </Badge>
            </IconButton> */}
            <IconButton
              onClick={handleProfileMenuOpen}
              color="inherit"
              className={classes.menuIconButton}>
              <Badge badgeContent={0} color="secondary">
                <Icon name="user" />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBarMaterial>
      {renderMenu}
      <AdjustAccountDialogContainer
        showAdjustAccount={showAdjustAccount}
        handleShow={handleShow}
      />
      <InviteContainer
        handleShow={handleInviteDialogVisibility}
        visible={showInviteDialog}
      />
    </div>
  );
}
