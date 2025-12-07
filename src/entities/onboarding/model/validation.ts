export const canMoveFromStep1 = (selectedUserType: string | null): boolean => {
  return selectedUserType !== null;
};

export const canMoveFromStep2 = (selectedInterests: string[]): boolean => {
  return selectedInterests.length > 0;
};

export const canMoveFromStep3 = (selectedIndustries: string[]): boolean => {
  return selectedIndustries.length > 0;
};
