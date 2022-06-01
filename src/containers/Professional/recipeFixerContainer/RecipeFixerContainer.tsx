import React from "react";
import HealthCenterUrlContainer from "../healthCenterUrlContainer/HealthCenterUrlContainer";
import LogoRecipeContainer from "../logoRecipe/LogoRecipeContainer";
import ElectronicSignatureContainer from "../signatureContainer/ElectronicSignatureContainer";
import SignatureContainer from "../signatureContainer/SignatureContainer";

const RecipeFixerContainer = () => (
  <div>
    <HealthCenterUrlContainer />
    <LogoRecipeContainer />
    <SignatureContainer />
    <ElectronicSignatureContainer />
  </div>
);
export default RecipeFixerContainer;
