package com.beyondthemap.config;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/** The app must refuse to start outside the dev profile with a default or weak admin password. */
class AdminPasswordGuardTest {

    @Test
    void rejectsDefaultMissingOrShortPasswordOutsideDev() {
        for (String weak : new String[] {"change-me", "", "   ", null, "short-pass1"}) {
            assertThatThrownBy(() -> SecurityConfig.requireStrongAdminPassword(weak, false))
                    .isInstanceOf(IllegalStateException.class)
                    .hasMessageContaining("ADMIN_PASSWORD");
        }
    }

    @Test
    void acceptsStrongPasswordAndAnythingInDev() {
        assertThatCode(() -> SecurityConfig.requireStrongAdminPassword("a-long-random-Secret-42", false))
                .doesNotThrowAnyException();
        assertThatCode(() -> SecurityConfig.requireStrongAdminPassword("change-me", true))
                .doesNotThrowAnyException();
    }
}
