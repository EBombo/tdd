import { accountStates, verifiedState, withdrawStates } from "./DataList";

export const userAccountState = (user) => {
  if (user.isVerified) return accountStates["valid"];

  if (user.documentImageUrl) return accountStates["inProcess"];

  return accountStates["notValid"];
};

export const userVerifiedState = (user) => {
  if (user.isVerified) return verifiedState["noVerified"];
  return verifiedState["verified"];
};
