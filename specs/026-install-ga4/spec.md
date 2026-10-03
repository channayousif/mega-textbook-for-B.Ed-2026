# Feature Specification: Install GA4 on textbook.com.pk

**Feature Branch**: `agent/TEX-11`  
**Created**: 2026-10-03  
**Status**: Draft  
**Input**: Issue TEX-11 "Install GA4 on textbook.com.pk (both locales) + privacy notice"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - GA4 Tracking (Priority: P1)

As the Growth Lead, I want Google Analytics 4 (GA4) installed on textbook.com.pk so that we can measure traffic and start establishing a traffic baseline.

**Why this priority**: Required for tracking user activity and growth metrics.

**Independent Test**: Verify that the GA4 script is injected into the head of the document, and the dataLayer and gtag functions are initialized. Verify that it works on both `en` and `ur` locales.

**Acceptance Scenarios**:

1. **Given** a user visits the English locale site, **When** the page loads, **Then** the GA4 script with the correct Measurement ID is present and fires pageview events.
2. **Given** a user visits the Urdu locale site, **When** the page loads, **Then** the GA4 script is present and fires pageview events without breaking the layout or build.
3. **Given** the measurement config, **Then** IP anonymization and other privacy defaults match the expected values.

### User Story 2 - Privacy / Cookies Notice (Priority: P2)

As a site visitor, I want to be informed about how cookies are used for analytics, so that the site is transparent about tracking.

**Why this priority**: Required because GA4 sets first-party cookies.

**Independent Test**: Navigate to the footer, click the Privacy/Cookies link, and see a bilingual page explaining the analytics cookies.

**Acceptance Scenarios**:

1. **Given** a user navigates the site, **When** they scroll to the footer, **Then** they see a link to the Privacy page.
2. **Given** a user clicks the Privacy link, **When** the page loads, **Then** they see a clear, factual explanation of GA4 data collection, available in English and Urdu.

### Edge Cases

- Does the Docusaurus `preset-classic`'s `gtag` plugin handle client-side routing properly? (Yes, Docusaurus handles this natively).
- Does the privacy page exist in the translation strings for `ur`? Yes, we will provide bilingual content.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST include the `@docusaurus/plugin-google-gtag` via the `preset-classic` option.
- **FR-002**: The Measurement ID MUST be read from config (`docusaurus.config.ts` or env var) and not hardcoded in components. [NEEDS CLARIFICATION: What is the GA4 Measurement ID (`G-XXXXXXXXXX`)?]
- **FR-003**: System MUST fire GA4 on both locales (`en` and `ur`).
- **FR-004**: System MUST NOT break the `ur` build.
- **FR-005**: System MUST include a bilingual privacy/cookies page linked from the footer, stating what is collected and why, keeping it factual and not over-promising.
- **FR-006**: System MUST report the added bundle weight delta against Constitution Art. V.5 limits in the implementation PR.
- **FR-007**: System MUST use the plugin's defaults for IP anonymization (`anonymizeIP`) unless otherwise specified, and report the default in the PR.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Measurement ID supplied by the board and recorded in config.
- **SC-002**: gtag present and firing on `en` and `ur` production pages, verified against built output.
- **SC-003**: Bilingual privacy/cookies page is live and linked in the footer.
- **SC-004**: Bundle delta is measured and reported against Art. V.5.
- **SC-005**: `npm run check:all` is green.
