import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import LoadingWrapper from "../components/LoadingWrapper";
import LoginRoute from "./LoginRoute";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const LoginPage = lazy(() => import("../pages/LoginPage"));

const HomePage = lazy(() => import("../pages/HomePage/HomePageContainer"));
const PatientsPage = lazy(
  () => import("../pages/PatientsPage/PatientsPageContainer"),
);
const PatientPage = lazy(
  () => import("../pages/PatientPage/PatientPageContainer"),
);
const NewConsultPage = lazy(
  () => import("../pages/NewConsultPage/NewConsultPageContainer"),
);
const RecoveryPasswordPage = lazy(
  () => import("../pages/RecoveryPassword/RecoveryPasswordPage"),
);
const ChangePasswordPage = lazy(
  () => import("../pages/ChangePassword/ChangePasswordPage"),
);
const SignUpPage = lazy(() => import("../pages/SignUp/SignUp"));
const CreateProfessionalPage = lazy(
  () => import("../pages/SignUp/CreateProfessionalPage"),
);
const AddOrEditCustomerPageContainer = lazy(
  () => import("../pages/AddOrEditCustmerPage/AddOrEditCustomerPageContainer"),
);
const ProfessionalProfilePage = lazy(
  () => import("../pages/Profile/ProfessionalProfilePage"),
);
const AssistantProfilePage = lazy(
  () =>
    import(
      "../pages/Profile/AssistantProfilePage/AssistantProfilePageContainer"
    ),
);
const PayPlanPage = lazy(
  () => import("../pages/PayPlanPage/PayPlanPageContainer"),
);
const EditPublicProfilePage = lazy(
  () => import("../pages/Profile/EditPublicProfilePage"),
);
const SchedulePage = lazy(
  () => import("../pages/SchedulePage/SchedulePageContainer"),
);
const FaqsPage = lazy(() => import("../pages/Faqs/FaqsPageContainer"));

const ServicePage = lazy(
  () => import("../pages/ServicePage/ServicePageContainer"),
);

const OrderPage = lazy(() => import("../pages/OrderPage/OrderPageContainer"));

const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const Routes = () => (
  <Suspense
    fallback={
      <LoadingWrapper loading>
        <></>
      </LoadingWrapper>
    }>
    <Switch>
      <LoginRoute path="/login" exact>
        <LoginPage />
      </LoginRoute>
      <PrivateRoute path="/" exact>
        <HomePage />
      </PrivateRoute>
      <PrivateRoute path="/patients" exact>
        <PatientsPage />
      </PrivateRoute>
      <PrivateRoute path="/edit-patient/:id" exact>
        <AddOrEditCustomerPageContainer />
      </PrivateRoute>
      <PrivateRoute path="/new-patient" exact>
        <AddOrEditCustomerPageContainer />
      </PrivateRoute>
      <PrivateRoute path="/patient/:id" exact>
        <PatientPage />
      </PrivateRoute>
      <PrivateRoute path="/patient/:id/new-consult/:appointmentId" exact>
        <NewConsultPage />
      </PrivateRoute>
      <PublicRoute path="/recovery-password" exact>
        <RecoveryPasswordPage />
      </PublicRoute>
      <PublicRoute path="/change-password" exact>
        <ChangePasswordPage />
      </PublicRoute>
      <PublicRoute path="/sign-up" exact>
        <SignUpPage />
      </PublicRoute>
      <PublicRoute path="/create-professional-user" exact>
        <CreateProfessionalPage />
      </PublicRoute>
      <PublicRoute path="/show-professional-profile" exact>
        <ProfessionalProfilePage />
      </PublicRoute>
      <PublicRoute path="/create-assistant/:id" exact>
        <AssistantProfilePage />
      </PublicRoute>
      <PrivateRoute path="/pay/plan/:code" exact>
        <PayPlanPage />
      </PrivateRoute>
      <PrivateRoute path="/edit-professional-public-profile" exact>
        <EditPublicProfilePage />
      </PrivateRoute>
      <PrivateRoute path="/schedule" exact>
        <SchedulePage />
      </PrivateRoute>
      <PrivateRoute path="/faqs" exact>
        <FaqsPage />
      </PrivateRoute>
      <PrivateRoute path="/service" exact>
        <ServicePage />
      </PrivateRoute>
      <PrivateRoute path="/order" exact>
        <OrderPage />
      </PrivateRoute>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  </Suspense>
);

export default Routes;
