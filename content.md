# Astraea Website Content

Edit any text below, then update the corresponding component file.

---

## Header

- **Logo text:** Astraea
- **Nav links:** Platform, Technology, Pipeline

---

## Hero Section
*File: `components/hero/hero-section.tsx`*

**Headline:**
Automated data analytics for clinical trials.

**Body:**
Astraea accelerates the full trial lifecycle from protocol design to FDA submission using compliant, enterprise-grade AI designed for modern healthcare.

**Hero image:** `/public/medicine1.avif`

### Pillar Card 1: Platform
- **Description:** AI-native trial automation built for regulated environments.
- **Button:** Our Platform

### Pillar Card 2: Technology
- **Description:** Proprietary engine from protocol design through FDA submission.
- **Button:** Our Technology

### Pillar Card 3: Pipeline
- **Description:** End-to-end execution across Phase II and III clinical programs.
- **Button:** Our Pipeline

---

## Dashboard Section (Real-time Trial Orchestration)
*File: `components/content-sections/dashboard-mockup.tsx`*

**Headline:**
Automated data orchestration.

**Body:**
Track every stage of clinical data analysis from a single interface. From raw and cleaned datasets to SDTM, ADaM, TFL, DSUR, IB and final outputs, everything stays visible.
**Dashboard label:** Astraea Trial Dashboard

**Trial steps (in order):**
1. Protocol
2. Site Select
3. Recruitment
4. Screening
5. Treatment
6. Data Lock
7. Analysis

---

## Pipeline Section (Stacking Blocks Animation)
*File: `components/content-sections/astraea-section.tsx`*

### Step 1: Raw Ingestion
- **Block label:** RAW INGESTION
- **Description:** Clinical data enters the pipeline from disparate sources. The ingestion layer normalizes formats and validates integrity before downstream processing.

### Step 2: CDASH Mapping
- **Block label:** CDASH MAPPING
- **Description:** Raw clinical data is mapped to CDISC CDASH standards. AI-verified completeness checks eliminate weeks of manual annotation.

### Step 3: SDTM Generation
- **Block label:** SDTM GENERATION
- **Description:** CDASH data is transformed into SDTM submission-ready datasets. Define.xml, reviewer guides, and validation reports generated with full traceability.

### Step 4: ADaM Transformation
- **Block label:** ADaM TRANSFORMATION
- **Description:** SDTM datasets transformed into analysis-ready ADaM datasets. Derivation logic, population flags, and BDS/ADSL generation with automated QC.

### Step 5: TLF Production
- **Block label:** TLF PRODUCTION
- **Description:** Analysis datasets feed into automated Tables, Listings, and Figures generation. Submission-ready TLFs with version control and audit trails.

### Features List
- Data refinement
- Standards generation
- Statistical execution
- Cross-track validation
- Report automation
- Full traceability

---

## Disciplines Section
*File: `components/content-sections/problem-solution-strip.tsx`*

### Human oversight for protocol design at AI speed.
Reduce protocol development time by up to 90% while keeping experts in control of every critical decision.

### Unified visibility across the clinical data stack.
View, organize, and manage data across multiple sources, formats, and study assets in one workspace.

### Automated SDTM and ADaM analysis with expert review built in.
Move faster on clinical analysis and downstream outputs with automation that improves speed, consistency, and traceability.

---

## CTA Section (Partner With Us)
*File: `components/content-sections/cta-section.tsx`*

**Label:** Partner With Us

**Headline:**
Ready to ship your clinical trials faster? Let's accelerate together.

**Button:** Request Demo
**Button link:** mailto:josh29@stanford.edu

---

## Footer
*File: `components/layout/footer.tsx`*

**Logo text:** Astraea

### Company
- About Us

### Platform
- Technology
- Pipeline

### Policies
- Privacy Policy
- Terms of Service

**Copyright:** Astraea Inc. 2026

---

## Metadata
*File: `app/layout.tsx`*

**Page title:** Astraea - Autonomous Clinical Trial Automation

**Description:** Astraea accelerates the full trial lifecycle from protocol design to FDA submission using compliant, enterprise-grade AI designed for modern healthcare.

**Keywords:** clinical trials, Phase II, Phase III, AI automation, pharma, CRO, clinical research, regulatory submission
