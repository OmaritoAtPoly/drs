/* eslint-disable yoda */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const getCountry = (addressArray: any[]) => {
  let country = "";
  for (let i = 0; i < addressArray.length; i++) {
    if (addressArray[i].types[0] && "country" === addressArray[i].types[0]) {
      country = addressArray[i].long_name;
      return country;
    }
  }
  return country;
};

export const getArea = (addressArray: any[]) => {
  const subLocalityLevel1 = addressArray.find((address) =>
    ((address.types || []) as string[]).find(
      (type) => type === "sublocality_level_1",
    ),
  );
  if (subLocalityLevel1 && subLocalityLevel1.long_name) {
    return subLocalityLevel1.long_name;
  }

  const locality = addressArray.find((address) =>
    ((address.types || []) as string[]).find((type) => type === "locality"),
  );
  if (locality && locality.long_name) {
    return locality.long_name;
  }
  return "";
};

export const getProvince = (addressArray: any[]) => {
  const administrativeAreaLevel1 = addressArray.find((address) =>
    ((address.types || []) as string[]).find(
      (type) => type === "administrative_area_level_1",
    ),
  );
  if (administrativeAreaLevel1 && administrativeAreaLevel1.long_name) {
    return administrativeAreaLevel1.long_name as string;
  }
  return (getArea(addressArray) as string | undefined) || "";
};

export const getCity = (addressArray: any[] = []) => {
  const administrativeAreaLevel2 = addressArray.find((address) =>
    ((address.types || []) as string[]).find(
      (type) => type === "administrative_area_level_2",
    ),
  );
  if (administrativeAreaLevel2 && administrativeAreaLevel2.long_name) {
    return administrativeAreaLevel2.long_name as string;
  }

  const province = getProvince(addressArray);
  return province;
};
