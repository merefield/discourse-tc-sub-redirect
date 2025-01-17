import { module, test } from "qunit";
import groupChecker from "../../discourse/lib/group-checker";

module("SubRedirect | Library | group-checker", function (hooks) {
  hooks.beforeEach(function () {
    /* eslint-disable no-undef */
    settings.redirect_max_trust_level = 3;
  });

  test("Returns correct value depending on groups", async function (assert) {
    const seniorUser = {
      groups: [
        {
          name: `${settings.redirect_default_locale_trust_groups_base_name}_0`,
        },
        {
          name: `${settings.redirect_default_locale_trust_groups_base_name}_1`,
        },
        {
          name: `${settings.redirect_default_locale_trust_groups_base_name}_2`,
        },
        {
          name: `${settings.redirect_default_locale_trust_groups_base_name}_3`,
        },
        {
          name: `${settings.redirect_default_locale_trust_groups_base_name}_4`,
        },
      ],
    };

    const juniorUser = {
      groups: [
        {
          name: `${settings.redirect_default_locale_trust_groups_base_name}_0`,
        },
        {
          name: `${settings.redirect_default_locale_trust_groups_base_name}_1`,
        },
      ],
    };

    const mixedUser = {
      groups: [
        {
          name: `${settings.redirect_default_locale_trust_groups_base_name}_0`,
        },
        {
          name: `${settings.redirect_default_locale_trust_groups_base_name}_1`,
        },
        {
          name: `${settings.redirect_default_locale_trust_groups_base_name}_3`,
        },
        { name: "creators" },
      ],
    };

    assert.false(
      groupChecker(seniorUser),
      "Senior user should not be redirected"
    );
    assert.true(groupChecker(juniorUser), "Junior user should be redirected");
    assert.false(
      groupChecker(mixedUser),
      "Mixed user should not be redirected"
    );
  });
});
