package com.beyondthemap.service;

import com.beyondthemap.model.TripInquiry;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

/** Checks that the email texts follow the language stored with the inquiry. */
class MailServiceTest {

    private static TripInquiry inquiry(TripInquiry.Lang lang) {
        TripInquiry i = new TripInquiry();
        i.setName("Ana");
        i.setEmail("ana@example.com");
        i.setDestinations("japan");
        i.setTravelers(2);
        i.setBudget("1,500 - 3,000 EUR / person");
        i.setTravelStyle("culture");
        i.setConsent(true);
        i.setLang(lang);
        return i;
    }

    @Test
    void englishVisitorGetsEnglishConfirmation() {
        MailService.Mail m = MailService.visitorConfirmation(inquiry(TripInquiry.Lang.EN));
        assertThat(m.subject()).isEqualTo("Thank you! Your journey starts here");
        assertThat(m.body()).startsWith("Hi Ana,").contains("within 24h");
    }

    @Test
    void romanianVisitorGetsRomanianConfirmation() {
        MailService.Mail m = MailService.visitorConfirmation(inquiry(TripInquiry.Lang.RO));
        assertThat(m.subject()).isEqualTo("Mulțumesc! Călătoria ta începe aici");
        assertThat(m.body()).startsWith("Bună, Ana,").contains("în 24 de ore");
    }

    @Test
    void ownerNotificationSaysWhichLanguageToReplyIn() {
        MailService.Mail ro = MailService.ownerNotification(inquiry(TripInquiry.Lang.RO));
        assertThat(ro.subject()).endsWith("[ro]");
        assertThat(ro.body()).contains("Reply in:     Romanian (ro)");

        MailService.Mail en = MailService.ownerNotification(inquiry(TripInquiry.Lang.EN));
        assertThat(en.subject()).endsWith("[en]");
        assertThat(en.body()).contains("Reply in:     English (en)");
    }

    @Test
    void unknownOrMissingLanguageCodesFallBackToEnglish() {
        assertThat(TripInquiry.Lang.fromCode(null)).isEqualTo(TripInquiry.Lang.EN);
        assertThat(TripInquiry.Lang.fromCode("")).isEqualTo(TripInquiry.Lang.EN);
        assertThat(TripInquiry.Lang.fromCode("fr")).isEqualTo(TripInquiry.Lang.EN);
        assertThat(TripInquiry.Lang.fromCode("RO")).isEqualTo(TripInquiry.Lang.RO);
    }
}
