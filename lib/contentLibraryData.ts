export type ContentCategory =
  | 'youtube-course'
  | 'youtube-generic'
  | 'brochure'
  | 'ebook'
  | 'landing-page'
  | 'social-media'
  | 'contact';

export interface ContentItem {
  id: string;
  category: ContentCategory;
  label: string;
  sublabel?: string;
  url: string;
  thumbnail?: string;
  tag?: string;
  waMessageTemplate: string;
}

export const CATEGORY_LABELS: Record<ContentCategory, string> = {
  'youtube-course': 'YouTube — Courses',
  'youtube-generic': 'YouTube — General',
  brochure: 'Brochures',
  ebook: 'eBooks',
  'landing-page': 'Landing Pages',
  'social-media': 'Social & Links',
  contact: 'Contact',
};

export const FILTER_TABS = [
  { key: 'all', label: 'All' },
  { key: 'landing-page', label: 'Landing Pages' },
  { key: 'brochure', label: 'Brochures' },
  { key: 'ebook', label: 'eBooks' },
  { key: 'youtube-course', label: 'YouTube — Courses' },
  { key: 'youtube-generic', label: 'YouTube — General' },
  { key: 'social-media', label: 'Social & Links' },
] as const;

export const ALL_CONTENT: ContentItem[] = [
  // ── LANDING PAGES ──────────────────────────────────────────────
  {
    id: 'landing-modern-college',
    category: 'landing-page',
    label: 'Modern College — AEDP (Ganeshkhind, Pune)',
    sublabel: 'B.Sc. AI + B.Com AEDP · SPPU Affiliated · Earn While You Learn',
    url: 'https://www.practicaleduskills.com/modern-college',
    tag: 'SPPU Degree',
    waMessageTemplate:
      'Hi {{name}} 👋, sharing the admission page for PES\' Modern College AEDP program at Ganeshkhind, Pune. It\'s a SPPU-affiliated degree where you earn a stipend while studying! 🎓\n👉 https://www.practicaleduskills.com/modern-college\nCall/WhatsApp: +91 79724 01596',
  },
  {
    id: 'landing-tj-college',
    category: 'landing-page',
    label: 'TJ College — AEDP (Kirkee, Pune)',
    sublabel: 'B.Sc. AI + B.Com AEDP · Kirkee · Earn While You Learn',
    url: 'https://www.practicaleduskills.com/tj-college',
    tag: 'SPPU Degree',
    waMessageTemplate:
      'Hi {{name}} 👋, here\'s the TJ College AEDP admission page — a SPPU degree program at Kirkee, Pune where students earn while they learn! 🎓\n👉 https://www.practicaleduskills.com/tj-college\nCall/WhatsApp: +91 76666 76358',
  },
  {
    id: 'landing-dample-college',
    category: 'landing-page',
    label: 'MMCC College — Practical B.COM (Pune)',
    sublabel: 'Fintech & Digital Accounting · 2 Yrs OJT · Earn While You Learn',
    url: 'https://www.practicaleduskills.com/dample-college',
    tag: 'B.COM',
    waMessageTemplate:
      'Hi {{name}} 👋, sharing the Practical B.COM (Fintech & Digital Accounting) program at Maharashtriya Mandal College, Pune. Students earn stipend during OJT! 💼\n👉 https://www.practicaleduskills.com/dample-college\nCall/WhatsApp: +91 90497 93232',
  },
  {
    id: 'landing-baramati',
    category: 'landing-page',
    label: 'Baramati — Practical B.COM',
    sublabel: 'PES Flagship · Fintech & Digital Accounting · 2 Yrs OJT',
    url: 'https://www.practicaleduskills.com/baramati',
    tag: 'Baramati',
    waMessageTemplate:
      'Hi {{name}} 👋, here\'s the Practical B.COM admission page for PES Baramati. It\'s our flagship center with hands-on Fintech training and paid OJT! 💼\n👉 https://www.practicaleduskills.com/baramati\nCall/WhatsApp: +91 96893 48709',
  },

  // ── BROCHURES ──────────────────────────────────────────────────
  {
    id: 'brochure-hospitality',
    category: 'brochure',
    label: 'Bachelor in Hospitality & Tourism — Brochure',
    sublabel: '3-Year Program · OJT · International Exposure',
    url: 'https://drive.google.com/file/d/136bSUYljXGLJxMhKqrl8J-9x9qMdjsa_/view?usp=sharing',
    tag: 'PDF',
    waMessageTemplate:
      'Hi {{name}} 👋, here\'s the Hospitality & Tourism program brochure from Practical EduSkills. 3-year program with OJT and international exposure! 🏨✈️\n📄 https://drive.google.com/file/d/136bSUYljXGLJxMhKqrl8J-9x9qMdjsa_/view?usp=sharing',
  },
  {
    id: 'brochure-bsc-ai',
    category: 'brochure',
    label: 'B.Sc. AI & Business Automation — Brochure',
    sublabel: 'Future-Ready AI + Business Degree · 3 Years',
    url: 'https://drive.google.com/file/d/1dq8H9e3agfBzABL90KnCPouoRWNBb8k0/view?usp=sharing',
    tag: 'PDF',
    waMessageTemplate:
      'Hi {{name}} 👋, here\'s the B.Sc. AI & Business Automation brochure — a future-ready degree with hands-on AI, automation and digital skills! 🤖\n📄 https://drive.google.com/file/d/1dq8H9e3agfBzABL90KnCPouoRWNBb8k0/view?usp=sharing',
  },
  {
    id: 'brochure-bcom-aedp',
    category: 'brochure',
    label: 'B.COM AEDP — Brochure',
    sublabel: 'Earn While You Learn · SPPU Degree · OJT Stipend',
    url: 'https://drive.google.com/file/d/1q2a_eXKI8_uacRJjyzaFLhRBEar2WLIF/view?usp=sharing',
    tag: 'PDF',
    waMessageTemplate:
      'Hi {{name}} 👋, here\'s the B.COM AEDP brochure — a SPPU-affiliated degree where students earn while they study with paid OJT! 🎓💼\n📄 https://drive.google.com/file/d/1q2a_eXKI8_uacRJjyzaFLhRBEar2WLIF/view?usp=sharing',
  },
  {
    id: 'brochure-bcom-general',
    category: 'brochure',
    label: 'B.COM — General Brochure',
    sublabel: 'Practical B.Com · 3 Years · Dubai Placement',
    url: 'https://drive.google.com/file/d/1qJXQ49PqfaXpl-IJDiTFT5OD5gW7npFs/view?usp=sharing',
    tag: 'PDF',
    waMessageTemplate:
      'Hi {{name}} 👋, here\'s the Practical B.COM brochure from PES. 3-year program with OJT stipend and Dubai placement opportunity! 🌍\n📄 https://drive.google.com/file/d/1qJXQ49PqfaXpl-IJDiTFT5OD5gW7npFs/view?usp=sharing',
  },

  // ── eBOOKS ─────────────────────────────────────────────────────
  {
    id: 'ebook-12vi-career',
    category: 'ebook',
    label: '१२वी नंतरचं संपूर्ण करिअर मार्गदर्शन',
    sublabel: 'Free Marathi Career Guide · Best for Parents & Students',
    url: 'https://drive.google.com/file/d/1DCP6PGjuBynabOQXtezD_9W5JiclHd8O/view?usp=sharing',
    tag: 'FREE eBook',
    waMessageTemplate:
      'नमस्कार {{name}} 👋, तुमच्यासाठी एक महत्वाचे करिअर मार्गदर्शन पुस्तक शेअर करत आहे — \'१२वी नंतरचं तुमचं संपूर्ण करिअर मार्गदर्शन\' पूर्णपणे मोफत! 📚\n👉 https://drive.google.com/file/d/1DCP6PGjuBynabOQXtezD_9W5JiclHd8O/view?usp=sharing',
  },
  {
    id: 'ebook-engineering-schedule',
    category: 'ebook',
    label: 'Engineering Institute Pune District — Schedule',
    sublabel: 'College Listing & Schedules · Pune District',
    url: 'https://drive.google.com/file/d/1yVXnpJ-76aKXgwzAL0rQu1q8akAxThdF/view?usp=sharing',
    tag: 'FREE eBook',
    waMessageTemplate:
      'Hi {{name}} 👋, here\'s a complete Engineering Institute schedule for Pune District — useful for comparing college options! 📋\n👉 https://drive.google.com/file/d/1yVXnpJ-76aKXgwzAL0rQu1q8akAxThdF/view?usp=sharing',
  },
  {
    id: 'ebook-pharmacy-career',
    category: 'ebook',
    label: 'फार्मसी करिअर मार्गदर्शन',
    sublabel: 'Free Pharmacy Career Guide · Marathi',
    url: 'https://drive.google.com/file/d/1t9GdmfVz14BfyaRneziRsCN7wC-iePAf/view?usp=sharing',
    tag: 'FREE eBook',
    waMessageTemplate:
      'नमस्कार {{name}} 👋, फार्मसी करिअर बद्दल संपूर्ण माहिती या मोफत पुस्तकात आहे — नक्की वाचा! 📚\n👉 https://drive.google.com/file/d/1t9GdmfVz14BfyaRneziRsCN7wC-iePAf/view?usp=sharing',
  },
  {
    id: 'ebook-pes-library',
    category: 'ebook',
    label: 'PES General Book Library (Fiction + Non-Fiction)',
    sublabel: 'Full Google Drive Folder · Free Access',
    url: 'https://drive.google.com/drive/folders/1VfgSCKQQOIyyjBsG8NVtftQjMTrwW8Rp',
    tag: 'LIBRARY',
    waMessageTemplate:
      'Hi {{name}} 👋, sharing PES\'s free library of books — fiction, non-fiction, career guides and more! Completely free to access. 📚\n👉 https://drive.google.com/drive/folders/1VfgSCKQQOIyyjBsG8NVtftQjMTrwW8Rp',
  },

  // ── YOUTUBE — COURSES ──────────────────────────────────────────
  // B.Com
  {
    id: 'yt-bcom-what-is',
    category: 'youtube-course',
    label: 'What is Practical B.Com?',
    sublabel: 'Practical B.Com · Course Overview · English',
    url: 'https://www.youtube.com/watch?v=51ncPb8GITU',
    tag: 'B.Com',
    waMessageTemplate:
      'Hi {{name}} 👋, watch this quick overview of Practical B.Com at PES — explains everything in 2 minutes! 🎥\n👉 https://www.youtube.com/watch?v=51ncPb8GITU',
  },
  {
    id: 'yt-bcom-ceo-english',
    category: 'youtube-course',
    label: 'What is Practical B.Com? — By CEO Sanmit Shah',
    sublabel: 'Practical B.Com · English · CEO Explains',
    url: 'https://www.youtube.com/watch?v=ELy69gz6Z68',
    tag: 'B.Com',
    waMessageTemplate:
      'Hi {{name}} 👋, watch PES CEO Sanmit Shah explain Practical B.Com in English — a must-watch before applying! 🎥\n👉 https://www.youtube.com/watch?v=ELy69gz6Z68',
  },
  {
    id: 'yt-bcom-transforming-lives',
    category: 'youtube-course',
    label: 'Practical BCom Transforming Lives',
    sublabel: 'Practical B.Com · Impact & Outcomes',
    url: 'https://www.youtube.com/watch?v=rsjBlWwFPmw',
    tag: 'B.Com',
    waMessageTemplate:
      'Hi {{name}} 👋, see how Practical B.Com at PES is transforming students\' lives and careers! 🌟\n👉 https://www.youtube.com/watch?v=rsjBlWwFPmw',
  },
  {
    id: 'yt-bcom-vs-regular',
    category: 'youtube-course',
    label: 'Normal B.Com Vs Practical B.Com',
    sublabel: 'Practical B.Com · Comparison · What After 12th',
    url: 'https://www.youtube.com/watch?v=ICTFch57D8A',
    tag: 'B.Com',
    waMessageTemplate:
      'Hi {{name}} 👋, this video explains the key difference between Normal B.Com and Practical B.Com — worth watching before deciding! 🎓\n👉 https://www.youtube.com/watch?v=ICTFch57D8A',
  },
  {
    id: 'yt-bcom-real-world',
    category: 'youtube-course',
    label: 'Why Should Your BCom Include Real-World Experience?',
    sublabel: 'Practical B.Com · OJT · Industry Exposure',
    url: 'https://www.youtube.com/watch?v=UBU7SvkFhhU',
    tag: 'B.Com',
    waMessageTemplate:
      'Hi {{name}} 👋, this video answers why real-world experience in B.Com matters — and how PES delivers it! 💼\n👉 https://www.youtube.com/watch?v=UBU7SvkFhhU',
  },
  {
    id: 'yt-bcom-dubai',
    category: 'youtube-course',
    label: 'Opportunities in Dubai for Commerce Graduates',
    sublabel: 'Practical B.Com · Dubai Placement · International Careers',
    url: 'https://www.youtube.com/watch?v=CedUT0IRQQ0',
    tag: 'B.Com · Dubai',
    waMessageTemplate:
      'Hi {{name}} 👋, watch this video on Dubai career opportunities for PES B.Com graduates — real placements, real stories! 🌍✈️\n👉 https://www.youtube.com/watch?v=CedUT0IRQQ0',
  },
  {
    id: 'yt-bcom-different',
    category: 'youtube-course',
    label: 'Practical BCom is Different from Regular Commerce',
    sublabel: 'Practical B.Com · Industry-Endorsed · Short Video',
    url: 'https://www.youtube.com/watch?v=Xh8-gOf3xRg',
    tag: 'B.Com',
    waMessageTemplate:
      'Hi {{name}} 👋, watch why Practical B.Com is completely different from a regular commerce degree! 🎯\n👉 https://www.youtube.com/watch?v=Xh8-gOf3xRg',
  },
  // BBA
  {
    id: 'yt-bba-overview-english',
    category: 'youtube-course',
    label: 'Practical BBA — Empower Your Future',
    sublabel: 'Practical BBA · Course Overview · English',
    url: 'https://www.youtube.com/watch?v=8Je_bI8HvQY',
    tag: 'BBA',
    waMessageTemplate:
      'Hi {{name}} 👋, watch this quick overview of Practical BBA at PES — real-world business skills from Day 1! 🎥\n👉 https://www.youtube.com/watch?v=8Je_bI8HvQY',
  },
  {
    id: 'yt-bba-marathi',
    category: 'youtube-course',
    label: 'Practical BBA — Course Overview (Marathi)',
    sublabel: 'Practical BBA · Marathi Version',
    url: 'https://www.youtube.com/watch?v=UAhzT6s-MTk',
    tag: 'BBA · मराठी',
    waMessageTemplate:
      'नमस्कार {{name}} 👋, PES च्या Practical BBA बद्दल हे शॉर्ट व्हिडिओ नक्की पाहा! 🎥\n👉 https://www.youtube.com/watch?v=UAhzT6s-MTk',
  },
  {
    id: 'yt-bba-business-challenges',
    category: 'youtube-course',
    label: 'Practical BBA — Ready for Business World Challenges?',
    sublabel: 'Practical BBA · Industry Readiness',
    url: 'https://www.youtube.com/watch?v=OnOJaMk28qQ',
    tag: 'BBA',
    waMessageTemplate:
      'Hi {{name}} 👋, this video explains how Practical BBA prepares you for real business challenges from Day 1! 💼\n👉 https://www.youtube.com/watch?v=OnOJaMk28qQ',
  },
  // BBA-IB
  {
    id: 'yt-bba-ib-global',
    category: 'youtube-course',
    label: 'Are You Prepared for International Business? — BBA-IB',
    sublabel: 'Practical BBA-IB · International Business · English',
    url: 'https://www.youtube.com/watch?v=Zbp1Uesl5bA',
    tag: 'BBA-IB',
    waMessageTemplate:
      'Hi {{name}} 👋, watch this video on PES\' BBA-IB program — designed for the international business world! 🌐\n👉 https://www.youtube.com/watch?v=Zbp1Uesl5bA',
  },
  {
    id: 'yt-bba-ib-marathi',
    category: 'youtube-course',
    label: 'BBA-IB — International Business Program (Marathi)',
    sublabel: 'Practical BBA-IB · Marathi Version',
    url: 'https://www.youtube.com/watch?v=vAegfAJtUMc',
    tag: 'BBA-IB · मराठी',
    waMessageTemplate:
      'नमस्कार {{name}} 👋, PES च्या BBA International Business प्रोग्रामबद्दल हे व्हिडिओ नक्की पाहा! 🌐\n👉 https://www.youtube.com/watch?v=vAegfAJtUMc',
  },
  {
    id: 'yt-bba-ib-transforming-india',
    category: 'youtube-course',
    label: 'Practical BBA-IB — Transforming India (Marathi)',
    sublabel: 'Practical BBA-IB · Global Ready · Marathi',
    url: 'https://www.youtube.com/watch?v=yP9l4jxiUlw',
    tag: 'BBA-IB · मराठी',
    waMessageTemplate:
      'नमस्कार {{name}} 👋, BBA International Business — भारत आणि जगासाठी तयार करणारा कार्यक्रम! पाहा हे व्हिडिओ. 🚀\n👉 https://www.youtube.com/watch?v=yP9l4jxiUlw',
  },
  {
    id: 'yt-bba-ib-equipping',
    category: 'youtube-course',
    label: 'Is Your BBA-IB Equipping You for Global Business?',
    sublabel: 'Practical BBA-IB · Global Readiness',
    url: 'https://www.youtube.com/watch?v=ytaPuhCjN_Q',
    tag: 'BBA-IB',
    waMessageTemplate:
      'Hi {{name}} 👋, this video asks the important question — is your BBA-IB really preparing you for global success? See what PES offers! 🌍\n👉 https://www.youtube.com/watch?v=ytaPuhCjN_Q',
  },
  // MBA
  {
    id: 'yt-mba-industry-experts',
    category: 'youtube-course',
    label: 'Practical MBA — Knowledge from Industry Experts',
    sublabel: 'Applied MBA · Industry Faculty · Pune',
    url: 'https://www.youtube.com/watch?v=9t46OXfGOUQ',
    tag: 'MBA',
    waMessageTemplate:
      'Hi {{name}} 👋, watch this video on PES\' Practical MBA program — knowledge directly from industry experts! 🎓\n👉 https://www.youtube.com/watch?v=9t46OXfGOUQ',
  },
  {
    id: 'yt-mba-learn-earn',
    category: 'youtube-course',
    label: 'Practical MBA — Learn and Earn (1st in India)',
    sublabel: 'Applied MBA · Evening Batch · Learn & Earn',
    url: 'https://www.youtube.com/watch?v=cVxey017WFc',
    tag: 'MBA',
    waMessageTemplate:
      'Hi {{name}} 👋, PES introduces India\'s first "Learn and Earn" MBA! Watch this to know more 🎯\n👉 https://www.youtube.com/watch?v=cVxey017WFc',
  },
  {
    id: 'yt-mba-marathi',
    category: 'youtube-course',
    label: 'Practical MBA — मॅनेजमेंट क्षेत्रातील यशाचा नवीन मंत्र!',
    sublabel: 'Applied MBA · Marathi · Full Presentation',
    url: 'https://www.youtube.com/watch?v=Sh_g_3rLVDc',
    tag: 'MBA · मराठी',
    waMessageTemplate:
      'नमस्कार {{name}} 👋, Practical MBA बद्दल संपूर्ण माहिती या व्हिडिओमध्ये आहे — नक्की पाहा! 🎓\n👉 https://www.youtube.com/watch?v=Sh_g_3rLVDc',
  },

  // ── YOUTUBE — GENERIC ──────────────────────────────────────────
  // Student Life
  {
    id: 'yt-short-student-life',
    category: 'youtube-generic',
    label: 'Life at PES — Student Experience',
    sublabel: 'YouTube Short · Student POV',
    url: 'https://www.youtube.com/shorts/Z8usP9ePhTk',
    tag: 'YouTube Short',
    waMessageTemplate:
      'Hi {{name}} 👋, here\'s a quick look at student life at Practical EduSkills — watch to see what it\'s like! 🎬\n👉 https://www.youtube.com/shorts/Z8usP9ePhTk',
  },
  {
    id: 'yt-why-choose-us',
    category: 'youtube-generic',
    label: 'Why Choose PES? #practicaleduskills',
    sublabel: 'PES Overview · Short Video',
    url: 'https://www.youtube.com/watch?v=xqusmXTMwZE',
    tag: 'YouTube Short',
    waMessageTemplate:
      'Hi {{name}} 👋, here\'s a quick video on why students choose Practical EduSkills! 🌟\n👉 https://www.youtube.com/watch?v=xqusmXTMwZE',
  },
  {
    id: 'yt-atma-nirbhar-graduate',
    category: 'youtube-generic',
    label: 'Become an "ATMA-NIRBHAR" Graduate',
    sublabel: 'Career Guidance · Self-Reliant Graduate',
    url: 'https://www.youtube.com/watch?v=9ZoCSzE4Pow',
    tag: 'Career Guidance',
    waMessageTemplate:
      'Hi {{name}} 👋, watch this video on becoming a truly self-reliant (Atma-Nirbhar) graduate — not just a degree holder! 💡\n👉 https://www.youtube.com/watch?v=9ZoCSzE4Pow',
  },
  {
    id: 'yt-12th-career-marathi',
    category: 'youtube-generic',
    label: '१२वी नंतर कॉमर्समधील करियरच्या संधी',
    sublabel: 'Career After 12th · Marathi · Commerce',
    url: 'https://www.youtube.com/watch?v=tDmJDNyw_yk',
    tag: 'Career · मराठी',
    waMessageTemplate:
      'नमस्कार {{name}} 👋, १२वी नंतर कॉमर्समध्ये कोणत्या संधी आहेत? हे व्हिडिओ नक्की पाहा — खूप उपयुक्त माहिती आहे! 🎓\n👉 https://www.youtube.com/watch?v=tDmJDNyw_yk',
  },
  {
    id: 'yt-science-hatt-ka',
    category: 'youtube-generic',
    label: 'फक्त Science चा हट्ट का?',
    sublabel: 'Career Guidance · Science vs Commerce · Marathi',
    url: 'https://www.youtube.com/watch?v=ivSTEelkjvE',
    tag: 'Career · मराठी',
    waMessageTemplate:
      'नमस्कार {{name}} 👋, फक्त Science चाच हट्ट का? Commerce मध्ये पण उत्तम करिअर आहे! हे व्हिडिओ नक्की पाहा 👇\n👉 https://www.youtube.com/watch?v=ivSTEelkjvE',
  },
  {
    id: 'yt-mr-theory-practical',
    category: 'youtube-generic',
    label: 'Meet Mr. Theory & Mr. Practical',
    sublabel: 'Theory vs Practical Education · Fun Video',
    url: 'https://www.youtube.com/watch?v=mlzBNlwDJTs',
    tag: 'Must Watch',
    waMessageTemplate:
      'Hi {{name}} 👋, watch this fun yet powerful video — "Meet Mr. Theory & Mr. Practical" — it explains the PES approach perfectly! 🎭\n👉 https://www.youtube.com/watch?v=mlzBNlwDJTs',
  },
  // Student Testimonials
  {
    id: 'yt-student-testimony-general',
    category: 'youtube-generic',
    label: 'Student Testimony — PES',
    sublabel: 'Student Testimonial · Short',
    url: 'https://www.youtube.com/watch?v=sRlh73dOYo8',
    tag: 'Student Testimonial',
    waMessageTemplate:
      'Hi {{name}} 👋, watch what PES students say about their experience — straight from them! 🎓\n👉 https://www.youtube.com/watch?v=sRlh73dOYo8',
  },
  {
    id: 'yt-shraddha-success',
    category: 'youtube-generic',
    label: 'आत्मनिर्भर मी! Success Story — Shraddha Koli',
    sublabel: 'Student Success Story · Marathi',
    url: 'https://www.youtube.com/watch?v=yhwcDimW9Bs',
    tag: 'Success Story',
    waMessageTemplate:
      'नमस्कार {{name}} 👋, श्रद्धा कोळीची यशोगाथा — PES मधून आत्मनिर्भर होण्याचा प्रवास! हे नक्की पाहा 🌟\n👉 https://www.youtube.com/watch?v=yhwcDimW9Bs',
  },
  {
    id: 'yt-swarali-success',
    category: 'youtube-generic',
    label: 'Our Success Speaks — Swarali Vasekar',
    sublabel: 'Student Success Story',
    url: 'https://www.youtube.com/watch?v=btKD_SOFydQ',
    tag: 'Success Story',
    waMessageTemplate:
      'Hi {{name}} 👋, watch Swarali Vasekar\'s success story — how PES shaped her career! 🌟\n👉 https://www.youtube.com/watch?v=btKD_SOFydQ',
  },
  {
    id: 'yt-nishigandha-testimonial',
    category: 'youtube-generic',
    label: 'Student Testimonial — Nishigandha Bhosale (Baramati)',
    sublabel: 'B.Com FY · Baramati Campus',
    url: 'https://www.youtube.com/watch?v=0X6lDB6QXZw',
    tag: 'Student Testimonial',
    waMessageTemplate:
      'Hi {{name}} 👋, hear what Nishigandha Bhosale (FY B.Com, Baramati) says about PES! 🎓\n👉 https://www.youtube.com/watch?v=0X6lDB6QXZw',
  },
  {
    id: 'yt-rutuja-darwatkar',
    category: 'youtube-generic',
    label: 'Student Testimonial — Rutuja Darwatkar (SY B.Com)',
    sublabel: 'B.Com SY · Student Experience',
    url: 'https://www.youtube.com/watch?v=XkFrO8B7SO4',
    tag: 'Student Testimonial',
    waMessageTemplate:
      'Hi {{name}} 👋, hear what Rutuja Darwatkar (SY B.Com) says about her journey at PES! 🌟\n👉 https://www.youtube.com/watch?v=XkFrO8B7SO4',
  },
  {
    id: 'yt-shivani-testimonial',
    category: 'youtube-generic',
    label: 'Student Testimonial — Shivani Bhosale',
    sublabel: 'Student Experience · PES',
    url: 'https://www.youtube.com/watch?v=jnqNq8OycD8',
    tag: 'Student Testimonial',
    waMessageTemplate:
      'Hi {{name}} 👋, hear Shivani Bhosale share her PES experience! 🎓\n👉 https://www.youtube.com/watch?v=jnqNq8OycD8',
  },
  {
    id: 'yt-life-at-bcom-rutuja',
    category: 'youtube-generic',
    label: "Life at Practical B.Com — Rutuja Chougule",
    sublabel: 'Student Life · Pune Campus',
    url: 'https://www.youtube.com/watch?v=8DvJ4rfAuZA',
    tag: 'Student Life',
    waMessageTemplate:
      'Hi {{name}} 👋, watch Rutuja Chougule talk about her life at Practical B.Com, Pune Campus! 🎬\n👉 https://www.youtube.com/watch?v=8DvJ4rfAuZA',
  },
  // Parent Testimonials
  {
    id: 'yt-parent-testimonial-marathi',
    category: 'youtube-generic',
    label: 'Parent Testimonial — Commerce Career at PES',
    sublabel: 'Parent Testimonial · Marathi',
    url: 'https://www.youtube.com/watch?v=VDNnuV5UH6Q',
    tag: 'Parent Testimonial',
    waMessageTemplate:
      'नमस्कार {{name}} 👋, एका पालकाने PES बद्दल काय सांगितले ते पाहा — कॉमर्स करिअरसाठी उत्तम मार्गदर्शन! 👨‍👩‍👧\n👉 https://www.youtube.com/watch?v=VDNnuV5UH6Q',
  },
  {
    id: 'yt-munir-parent-testimonial',
    category: 'youtube-generic',
    label: 'Parent Testimonial — Munir Maniyar (Parent of PES Student)',
    sublabel: 'Parent Testimonial · B.Com FY',
    url: 'https://www.youtube.com/watch?v=levFiRaC0HA',
    tag: 'Parent Testimonial',
    waMessageTemplate:
      'Hi {{name}} 👋, hear from Munir Maniyar (parent of a PES B.Com student) about his experience with PES! 👨‍👩‍👧\n👉 https://www.youtube.com/watch?v=levFiRaC0HA',
  },
  {
    id: 'yt-student-parent-testimonial',
    category: 'youtube-generic',
    label: 'Practical B.Com — Student & Parent Testimonial',
    sublabel: 'Parent + Student Testimonial',
    url: 'https://www.youtube.com/watch?v=vWsVEEBGTDs',
    tag: 'Parent Testimonial',
    waMessageTemplate:
      'Hi {{name}} 👋, watch this combined student and parent testimonial about Practical B.Com at PES! 👨‍👩‍👧🎓\n👉 https://www.youtube.com/watch?v=vWsVEEBGTDs',
  },
  {
    id: 'yt-kothari-parent-testimonial',
    category: 'youtube-generic',
    label: 'Parent Testimonial — Mr. Sumatilal Kothari on B.Com',
    sublabel: 'Parent Testimonial · Kothari Family',
    url: 'https://www.youtube.com/watch?v=JlKYtWj5lUI',
    tag: 'Parent Testimonial',
    waMessageTemplate:
      'Hi {{name}} 👋, hear Mr. Sumatilal Kothari share his views on Practical B.Com at PES! 👨‍👩‍👧\n👉 https://www.youtube.com/watch?v=JlKYtWj5lUI',
  },
  // Industry / Expert Testimonials
  {
    id: 'yt-jayant-pawar-testimonial',
    category: 'youtube-generic',
    label: 'Testimonial — Jayant Pawar Sir (Renowned Industrialist)',
    sublabel: 'Industry Expert Testimonial',
    url: 'https://www.youtube.com/watch?v=xvbMCDvBKqE',
    tag: 'Expert Testimonial',
    waMessageTemplate:
      'Hi {{name}} 👋, hear renowned industrialist Jayant Pawar Sir speak about PES — a powerful endorsement! 💼\n👉 https://www.youtube.com/watch?v=xvbMCDvBKqE',
  },
  {
    id: 'yt-deepak-karandikar-testimonial',
    category: 'youtube-generic',
    label: 'Testimonial — Mr. Deepak Karandikar (President, MCCIA)',
    sublabel: 'Industry Leader Testimonial · MCCIA',
    url: 'https://www.youtube.com/watch?v=PBi5MT5TO7I',
    tag: 'Expert Testimonial',
    waMessageTemplate:
      'Hi {{name}} 👋, hear Mr. Deepak Karandikar (President of MCCIA) speak about Practical EduSkills! 🏆\n👉 https://www.youtube.com/watch?v=PBi5MT5TO7I',
  },
  {
    id: 'yt-deepak-shikarpur-testimonial',
    category: 'youtube-generic',
    label: 'Testimonial — Dr. Deepak Shikarpur (AICTE National IT Board)',
    sublabel: 'Expert Testimonial · AICTE',
    url: 'https://www.youtube.com/watch?v=bDXEKw1eT38',
    tag: 'Expert Testimonial',
    waMessageTemplate:
      'Hi {{name}} 👋, hear Dr. Deepak Shikarpur (Member, National IT Board AICTE) endorse PES! 🏛️\n👉 https://www.youtube.com/watch?v=bDXEKw1eT38',
  },
  {
    id: 'yt-chakor-gandhi-testimonial',
    category: 'youtube-generic',
    label: 'Mr. Chakor Gandhi (Management Guru, ICF Coach) on PES',
    sublabel: 'Expert Testimonial · Management Coach',
    url: 'https://www.youtube.com/watch?v=cqHjxamz1tc',
    tag: 'Expert Testimonial',
    waMessageTemplate:
      'Hi {{name}} 👋, Management Guru and ICF Certified Coach Mr. Chakor Gandhi speaks highly of PES — watch this! 🌟\n👉 https://www.youtube.com/watch?v=cqHjxamz1tc',
  },
  {
    id: 'yt-zee24taas-interview',
    category: 'youtube-generic',
    label: 'Zee 24 Taas Interview — PES BBA-IB, BBA, BCom',
    sublabel: 'TV Interview · Sanmit Shah · Zee24Taas',
    url: 'https://www.youtube.com/watch?v=fCsEanchWy8',
    tag: 'Media',
    waMessageTemplate:
      'Hi {{name}} 👋, watch PES CEO Sanmit Shah\'s interview on Zee 24 Taas about PES programs! 📺\n👉 https://www.youtube.com/watch?v=fCsEanchWy8',
  },
  {
    id: 'yt-pes-leading-institution',
    category: 'youtube-generic',
    label: 'PES — A Leading Institution in Practical Education',
    sublabel: 'PES Overview · Brand Video',
    url: 'https://www.youtube.com/watch?v=N0_JCKbUEUc',
    tag: 'About PES',
    waMessageTemplate:
      'Hi {{name}} 👋, watch how Practical EduSkills has established itself as a leading institution in practical education! 🏆\n👉 https://www.youtube.com/watch?v=N0_JCKbUEUc',
  },

  // ── SOCIAL MEDIA & WEBSITE ─────────────────────────────────────
  {
    id: 'social-instagram',
    category: 'social-media',
    label: 'Instagram — @practical_eduskills',
    url: 'https://www.instagram.com/practical_eduskills/',
    tag: 'Instagram',
    waMessageTemplate:
      'Hi {{name}} 👋, follow PES on Instagram for student stories, updates & placement news! 📸\n👉 https://www.instagram.com/practical_eduskills/',
  },
  {
    id: 'social-youtube-channel',
    category: 'social-media',
    label: 'YouTube Channel — @practicaleduskills2338',
    url: 'https://www.youtube.com/@practicaleduskills2338',
    tag: 'YouTube',
    waMessageTemplate:
      'Hi {{name}} 👋, subscribe to PES YouTube channel — student success stories, Dubai placements & more! 🎥\n👉 https://www.youtube.com/@practicaleduskills2338',
  },
  {
    id: 'social-linkedin',
    category: 'social-media',
    label: 'LinkedIn — Practical EduSkills',
    url: 'https://www.linkedin.com/company/practical-eduskills-pvt-ltd',
    tag: 'LinkedIn',
    waMessageTemplate:
      'Hi {{name}} 👋, connect with PES on LinkedIn for career opportunities and industry updates! 💼\n👉 https://www.linkedin.com/company/practical-eduskills-pvt-ltd',
  },
  {
    id: 'social-facebook',
    category: 'social-media',
    label: 'Facebook — PracticalEduSkills',
    url: 'https://www.facebook.com/PracticalEduSkills/',
    tag: 'Facebook',
    waMessageTemplate:
      'Hi {{name}} 👋, follow PES on Facebook for events, news and student achievements!\n👉 https://www.facebook.com/PracticalEduSkills/',
  },
  {
    id: 'social-website',
    category: 'social-media',
    label: 'Main Website — practicaleduskills.com',
    url: 'https://www.practicaleduskills.com',
    tag: 'Website',
    waMessageTemplate:
      'Hi {{name}} 👋, here\'s the official PES website — browse all courses, centres, placements and more! 🌐\n👉 https://www.practicaleduskills.com',
  },
  {
    id: 'social-whatsapp',
    category: 'social-media',
    label: 'WhatsApp — PES Direct Contact',
    url: 'https://wa.me/919890959990',
    tag: 'WhatsApp',
    waMessageTemplate:
      'Hi {{name}} 👋, you can directly WhatsApp the PES team for any queries! 💬\n👉 https://wa.me/919890959990',
  },
  {
    id: 'contact-address',
    category: 'contact',
    label: 'PES Main Office — Erandwane, Pune',
    sublabel: '3rd Floor, Butte Patil Complex, Warje Malwadi Rd, Erandwane, Pune 411052',
    url: 'https://maps.google.com/?q=Practical+EduSkills+Erandwane+Pune',
    tag: 'Address',
    waMessageTemplate:
      'Hi {{name}} 👋, here\'s our office location in Erandwane, Pune — feel free to visit us! 📍\nAddress: 3rd Floor, Butte Patil Complex, Warje Malwadi Rd, Erandwane, Pune 411052\n📞 +91-98909-59990\n🗺️ https://maps.google.com/?q=Practical+EduSkills+Erandwane+Pune',
  },
];

// Strip all emoji / pictographic characters from a string
function stripEmojis(text: string): string {
  // Remove surrogate-pair emojis (U+1F000–U+1FFFF encoded as surrogate pairs)
  // and common symbol ranges without the /u flag
  return text
    .replace(/[\uD800-\uDFFF]/g, '')   // surrogate pairs (high/low surrogates)
    .replace(/[☀-⟿]/g, '')    // misc symbols, dingbats
    .replace(/[︀-﻿]/g, '')    // variation selectors, BOM
    .replace(/‍/g, '')             // zero-width joiner
    .replace(/ {2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const MARATHI_CAT: Record<ContentCategory, string> = {
  'youtube-course': 'व्हिडिओ (कोर्स)',
  'youtube-generic': 'व्हिडिओ',
  brochure: 'माहितीपत्रक (PDF)',
  ebook: 'मोफत पुस्तक',
  'landing-page': 'प्रवेश पृष्ठ',
  'social-media': 'सोशल मीडिया',
  contact: 'संपर्क',
};

export function buildWAMessage(
  items: ContentItem[],
  leadName: string,
  _leadPhone: string,
  language: 'en' | 'mr' = 'en'
): string {
  const name = leadName.trim() || (language === 'mr' ? 'विद्यार्थी' : 'there');

  if (language === 'mr') {
    const lines = items
      .map((item) => `${MARATHI_CAT[item.category]}: ${item.label}\n${item.url}`)
      .join('\n\n');
    return stripEmojis(
      `नमस्कार ${name},\n\nPractical EduSkills (PES) कडून काही महत्वाची माहिती शेअर करत आहे:\n\n${lines}\n\nकोणताही प्रश्न असल्यास संपर्क करा:\nफोन/WhatsApp: +91-98909-59990\nवेबसाइट: www.practicaleduskills.com`
    );
  }

  const messages = items
    .map((item) => item.waMessageTemplate.replace(/\{\{name\}\}/g, name))
    .join('\n\n---\n\n');

  return stripEmojis(
    `Hi ${name}! Here is some information I wanted to share with you from Practical EduSkills:\n\n` +
    messages +
    '\n\nAny questions? Call/WhatsApp: +91-98909-59990\nWebsite: www.practicaleduskills.com'
  );
}

export function buildWAUrl(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, '');
  const fullPhone = digits.startsWith('91') ? digits : `91${digits}`;
  return `https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`;
}
