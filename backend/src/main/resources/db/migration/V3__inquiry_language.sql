-- Language the visitor used on the site when sending the trip request ('en' or 'ro').
-- It decides the language of the confirmation email and tells the owner which language to reply in.
-- Requests stored before this migration were all made on the English-only site, so they default to 'en'.
ALTER TABLE trip_inquiry ADD COLUMN lang VARCHAR(5) NOT NULL DEFAULT 'en';
ALTER TABLE trip_inquiry ADD CONSTRAINT chk_inquiry_lang CHECK (lang IN ('en', 'ro'));
