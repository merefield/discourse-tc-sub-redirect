export default function groupChecker(currentUser) {
  const provisionalUserTrustLevel = currentUser.groups.length - 1;
  const provisionallyMoreSenior =
    /* eslint-disable no-undef */
    provisionalUserTrustLevel > settings.redirect_max_trust_level;
  const expectedTrustLevels = Array.from(
    { length: provisionalUserTrustLevel + 1 },
    (_, i) => `trust_level_${i}`
  );
  const userGroupsNames = currentUser.groups.map((group) => group.name);

  // Check if user only has the trust levels from 0 to their current trust level
  const trustLevelsValid = expectedTrustLevels.every((level) =>
    userGroupsNames.includes(level)
  );

  // Check if the user does not have extra groups beyond their current trust level
  const noExtraGroups = userGroupsNames.every((level) =>
    expectedTrustLevels.includes(level)
  );

  return trustLevelsValid && noExtraGroups && !provisionallyMoreSenior;
}
