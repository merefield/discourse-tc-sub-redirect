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
        { name: "trust_level_0" },
        { name: "trust_level_1" },
        { name: "trust_level_2" },
        { name: "trust_level_3" },
        { name: "trust_level_4" },
      ],
    };

    const juniorUser = {
      groups: [{ name: "trust_level_0" }, { name: "trust_level_1" }],
    };

    const mixedUser = {
      groups: [
        { name: "trust_level_0" },
        { name: "trust_level_1" },
        { name: "trust_level_3" },
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
