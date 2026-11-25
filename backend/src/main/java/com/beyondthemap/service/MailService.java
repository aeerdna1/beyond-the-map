package com.beyondthemap.service;

import com.beyondthemap.config.AppProperties;
import com.beyondthemap.model.TripInquiry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Sends (1) a notification to the owner for every new trip request and
 * (2) a confirmation to the visitor. Disabled by default (app.mail.enabled=false),
 * in which case messages are only logged.
 */
@Service
public class MailService {

    private static final Logger log = LoggerFactory.getLogger(MailService.class);

    private final JavaMailSender sender;
    private final AppProperties props;

    public MailService(JavaMailSender sender, AppProperties props) {
        this.sender = sender;
        this.props = props;
    }

    /** Subject and body of an email. */
    record Mail(String subject, String body) {
    }

    @Async
    public void sendInquiryEmails(TripInquiry i) {
        Mail owner = ownerNotification(i);
        send(props.mail().notifyTo(), i.getEmail(), owner.subject(), owner.body());

        Mail visitor = visitorConfirmation(i);
        send(i.getEmail(), props.mail().notifyTo(), visitor.subject(), visitor.body());
    }

    /** Notification to the owner. Always in English; it says which language to reply in. */
    static Mail ownerNotification(TripInquiry i) {
        String reply = i.getLang() == TripInquiry.Lang.RO ? "Romanian (ro)" : "English (en)";
        return new Mail(
                "New trip request from " + i.getName() + " [" + i.getLang().code() + "]",
                """
                New "Plan my trip" request (#%d)

                Reply in:     %s
                Name:         %s
                Email:        %s
                Phone:        %s
                Destinations: %s
                Dates:        %s -> %s
                Travellers:   %d
                Budget:       %s
                Style:        %s

                Message:
                %s
                """.formatted(i.getId(), reply, i.getName(), i.getEmail(), orDash(i.getPhone()), i.getDestinations(),
                        orDash(i.getTravelFrom()), orDash(i.getTravelTo()), i.getTravelers(), i.getBudget(),
                        i.getTravelStyle(), orDash(i.getMessage())));
    }

    /** Confirmation to the visitor, in the language they used on the site. */
    static Mail visitorConfirmation(TripInquiry i) {
        if (i.getLang() == TripInquiry.Lang.RO) {
            return new Mail(
                    "Mulțumesc! Călătoria ta începe aici",
                    """
                    Bună, %s,

                    Mulțumesc pentru cererea ta de călătorie! Îți răspund în 24 de ore cu idei
                    și pașii următori.

                    Pe curând,
                    Beyond the Map
                    """.formatted(i.getName()));
        }
        return new Mail(
                "Thank you! Your journey starts here",
                """
                Hi %s,

                Thank you for your trip request! I'll get back to you within 24h with ideas
                and next steps.

                Talk soon,
                Beyond the Map
                """.formatted(i.getName()));
    }

    private void send(String to, String replyTo, String subject, String body) {
        if (!props.mail().enabled()) {
            log.info("[mail disabled] to={} subject={}", to, subject);
            return;
        }
        try {
            SimpleMailMessage m = new SimpleMailMessage();
            m.setFrom(props.mail().from());
            m.setTo(to);
            m.setReplyTo(replyTo);
            m.setSubject(subject);
            m.setText(body);
            sender.send(m);
        } catch (MailException e) {
            // The inquiry is already saved; a mail failure must not fail the request.
            log.error("Could not send mail to {}: {}", to, e.getMessage());
        }
    }

    private static String orDash(Object o) {
        return o == null || o.toString().isBlank() ? "-" : o.toString();
    }
}
