export const languages = { vi: 'Tiếng Việt', en: 'English' } as const;
export type Lang = keyof typeof languages;

export const lp = (lang: Lang, path: string) => {
  const p = path.startsWith('/') ? path : `/${path}`;
  return lang === 'en' ? `/en${p}` : p;
};

export function getLang(url: URL): Lang {
  return url.pathname === '/en' || url.pathname.startsWith('/en/') ? 'en' : 'vi';
}

// Đường dẫn tương ứng ở ngôn ngữ còn lại (nội dung chỉ có một thứ tiếng thì về trang gần nhất)
export function altPath(pathname: string, lang: Lang): string {
  const bare = lang === 'en' ? pathname.replace(/^\/en/, '') || '/' : pathname;
  let target = bare;
  if (/^\/(journal|tags)(\/|$)/.test(bare)) target = '/';
  else if (/^\/posts\/.+/.test(bare)) target = '/posts/';
  return lang === 'en' ? target : lp('en', target);
}

export const ui = {
  vi: {
    locale: 'vi-VN',
    trademark: 'Power Platform, Power Apps, Power Automate, Power BI, Dataverse, SharePoint và Microsoft Teams là nhãn hiệu của Microsoft Corporation. Trang này là của cá nhân, không liên kết hay được Microsoft bảo trợ.',
    nav: { services: 'Dịch vụ', projects: 'Dự án', blog: 'Blog', journal: 'Nhật ký', about: 'Giới thiệu', contact: 'Liên hệ' },
    getQuote: 'Nhận báo giá',
    viewServices: 'Xem dịch vụ',
    viewProjects: 'Xem dự án',
    seeAll: 'Xem tất cả →',
    readMore: 'Xem chi tiết →',
    readingTime: 'phút đọc',
    back: '← Quay lại',
    sample: 'Dự án mẫu',
    stack: 'Công nghệ',
    basic: 'cơ bản',
    results: 'Kết quả',
    role: 'Vai trò',
    features: 'Bao gồm',
    priceFrom: 'Giá tham khảo',
    visit: 'Xem sản phẩm ↗',
    home: {
      services: 'Mình có thể giúp gì cho bạn',
      servicesSub: 'Các nhóm giải pháp mình thường nhận.',
      projects: 'Dự án tiêu biểu',
      process: 'Quy trình làm việc',
      stack: 'Công nghệ thường dùng',
      latest: 'Bài viết mới',
      problemsTitle: 'Những vấn đề mình thường giải quyết',
      problems: [
        { p: 'Dữ liệu rải rác trong nhiều file Excel', s: 'Gom về một ứng dụng, một nguồn dữ liệu, có phân quyền rõ ràng.' },
        { p: 'Phê duyệt qua email chậm, dễ sót', s: 'Luồng duyệt tự động, theo dõi trạng thái và nhắc việc đúng người, đúng lúc.' },
        { p: 'Báo cáo phải làm tay mỗi tuần', s: 'Dashboard Power BI tự làm mới từ dữ liệu thật, xem được ngay.' },
        { p: 'Khó kiểm chứng và truy vết', s: 'Lưu lịch sử thao tác, kèm ảnh hoặc vị trí khi cần có bằng chứng.' },
      ],
      projectsSub: 'Một số giải pháp đã xây dựng. Thông tin khách hàng được ẩn.',
      whyTitle: 'Vì sao làm việc với mình',
      why: [
        { t: 'Trao đổi trực tiếp với người xây dựng', d: 'Bạn nói chuyện thẳng với người thiết kế và viết ứng dụng, không qua nhiều lớp trung gian.' },
        { t: 'Bám theo quy trình thực tế', d: 'Bắt đầu từ cách bạn đang làm việc, thay vì ép bạn theo một mẫu có sẵn.' },
        { t: 'Đã làm hệ thống nhiều cấp, nhiều vai trò', d: 'Quản lý hợp đồng, kiểm kê tài sản bằng quét mã vạch, quản lý nhà thầu, quản lý nhân sự: phê duyệt nhiều cấp, ủy quyền, phân quyền, giao diện song ngữ.' },
        { t: 'Có tài liệu bàn giao', d: 'Thiết kế và công thức được ghi lại để bạn không phụ thuộc vào một người.' },
      ],
      aboutStrip: 'Mình là Đinh Duy Khang, Power Platform Developer. Mình nhận xây dựng giải pháp cho cá nhân và doanh nghiệp.',
      aboutLink: 'Xem thêm về mình →',
      ctaTitle: 'Có một quy trình đang tốn thời gian?',
      ctaText: 'Kể cho mình nghe cách bạn đang làm việc. Mình sẽ phản hồi với hướng giải quyết và báo giá sơ bộ.',
    },
    process: [
      { t: 'Trao đổi nhu cầu', d: 'Tìm hiểu mục tiêu, người dùng và phạm vi công việc.' },
      { t: 'Đề xuất & báo giá', d: 'Thống nhất giải pháp, tiến độ và chi phí trước khi bắt đầu.' },
      { t: 'Phát triển & demo', d: 'Làm theo từng giai đoạn, có bản demo để bạn góp ý sớm.' },
      { t: 'Bàn giao & hỗ trợ', d: 'Triển khai, hướng dẫn sử dụng và hỗ trợ sau bàn giao.' },
    ],
    servicesPage: {
      title: 'Dịch vụ', sub: 'Giải pháp phần mềm được làm theo đúng nhu cầu của bạn.', faq: 'Câu hỏi thường gặp',
      engageTitle: 'Cách hợp tác',
      engage: [
        { t: 'Khảo sát & tư vấn', d: 'Tìm hiểu quy trình hiện tại, đề xuất giải pháp và lộ trình. Phù hợp khi bạn chưa rõ nên bắt đầu từ đâu.' },
        { t: 'Xây dựng theo dự án', d: 'Thiết kế, phát triển, kiểm thử và bàn giao theo phạm vi đã thống nhất.' },
        { t: 'Bảo trì & hỗ trợ', d: 'Sửa lỗi, điều chỉnh và hỗ trợ người dùng sau khi bàn giao.' },
      ],
      engageNote: 'Chi phí tùy phạm vi công việc. Báo giá cụ thể được gửi sau khi trao đổi.',
    },
    faq: [
      { q: 'Thời gian thực hiện bao lâu?', a: 'Tùy quy mô: một trang giới thiệu có thể xong trong vài ngày, ứng dụng quản lý thường vài tuần. Mình sẽ đưa mốc thời gian cụ thể trong báo giá.' },
      { q: 'Chi phí được tính thế nào?', a: 'Theo phạm vi công việc đã thống nhất. Sau khi trao đổi, bạn nhận báo giá rõ ràng trước khi bắt đầu.' },
      { q: 'Mã nguồn thuộc về ai?', a: 'Điều khoản này sẽ được ghi rõ trong thỏa thuận cho từng dự án để hai bên cùng yên tâm.' },
      { q: 'Có hỗ trợ sau khi bàn giao không?', a: 'Có. Mình hỗ trợ sửa lỗi và hướng dẫn sử dụng sau bàn giao, phạm vi cụ thể ghi trong báo giá.' },
    ],
    projectsPage: { title: 'Dự án', sub: 'Một vài ví dụ về cách mình giải quyết bài toán.' },
    blog: { title: 'Blog', sub: 'Tips lập trình và kinh nghiệm làm nghề.', empty: 'Chưa có bài viết nào.' },
    about: { title: 'Giới thiệu' },
    contact: {
      title: 'Liên hệ', sub: 'Mô tả ngắn gọn nhu cầu của bạn, mình sẽ phản hồi sớm.',
      name: 'Họ tên', email: 'Email', service: 'Bạn quan tâm đến', other: 'Khác / chưa rõ',
      message: 'Nội dung', send: 'Gửi tin nhắn', direct: 'Hoặc liên hệ trực tiếp',
      notConfigured: 'Form liên hệ chưa được cấu hình. Vui lòng liên hệ qua các kênh bên dưới.',
    },
    notFound: { title: 'Không tìm thấy trang', home: '← Về trang chủ' },
  },
  en: {
    locale: 'en-US',
    trademark: 'Power Platform, Power Apps, Power Automate, Power BI, Dataverse, SharePoint and Microsoft Teams are trademarks of Microsoft Corporation. This is a personal website and is not affiliated with or endorsed by Microsoft.',
    nav: { services: 'Services', projects: 'Projects', blog: 'Blog', journal: 'Journal', about: 'About', contact: 'Contact' },
    getQuote: 'Get a quote',
    viewServices: 'View services',
    viewProjects: 'View projects',
    seeAll: 'See all →',
    readMore: 'Learn more →',
    readingTime: 'min read',
    back: '← Back',
    sample: 'Sample project',
    stack: 'Tech stack',
    basic: 'basic',
    results: 'Results',
    role: 'Role',
    features: 'Includes',
    priceFrom: 'Reference price',
    visit: 'Visit ↗',
    home: {
      services: 'How I can help',
      servicesSub: 'The kinds of solutions I usually build.',
      projects: 'Featured projects',
      process: 'How we work',
      stack: 'Tools I use',
      latest: 'Latest posts',
      problemsTitle: 'Problems I usually solve',
      problems: [
        { p: 'Data scattered across many spreadsheets', s: 'Bring it into one app and one source of data, with clear access control.' },
        { p: 'Slow approvals by email, easy to miss', s: 'Automated approval flows with status tracking and reminders to the right person at the right time.' },
        { p: 'Reports built by hand every week', s: 'Power BI dashboards that refresh from real data and are ready to view.' },
        { p: 'Hard to verify and trace', s: 'Keep an action history, with a photo or location when you need evidence.' },
      ],
      projectsSub: 'A selection of solutions I have built. Client details are omitted.',
      whyTitle: 'Why work with me',
      why: [
        { t: 'Talk directly to the person building it', d: 'You speak straight to the person who designs and writes the app, without layers of middlemen.' },
        { t: 'Built around your real process', d: 'We start from how you actually work, instead of forcing you into a ready-made template.' },
        { t: 'Experience with multi-level, multi-role systems', d: 'Contract management, barcode-based asset inventory, contractor management and HR: multi-level approvals, delegation, role-based access and bilingual interfaces.' },
        { t: 'Handover documentation', d: 'Design and formulas are written down so you do not depend on a single person.' },
      ],
      aboutStrip: 'I am Đinh Duy Khang, a Power Platform Developer. I build solutions for individuals and businesses.',
      aboutLink: 'More about me →',
      ctaTitle: 'Have a process that eats your time?',
      ctaText: 'Tell me how you work today. I will reply with an approach and a rough estimate.',
    },
    process: [
      { t: 'Discuss your needs', d: 'We clarify goals, users and the scope of work.' },
      { t: 'Proposal & quote', d: 'We agree on the solution, timeline and cost before starting.' },
      { t: 'Build & demo', d: 'Work is delivered in stages with demos so you can give feedback early.' },
      { t: 'Delivery & support', d: 'Deployment, handover guidance and support after launch.' },
    ],
    servicesPage: {
      title: 'Services', sub: 'Software solutions built around what you actually need.', faq: 'Frequently asked questions',
      engageTitle: 'How we can work together',
      engage: [
        { t: 'Discovery & consulting', d: 'We study your current process and propose a solution and roadmap. A good fit when you are unsure where to start.' },
        { t: 'Project build', d: 'Design, development, testing and handover within an agreed scope.' },
        { t: 'Maintenance & support', d: 'Bug fixes, adjustments and user support after handover.' },
      ],
      engageNote: 'Cost depends on the scope of work. A specific quote is sent after we talk.',
    },
    faq: [
      { q: 'How long does a project take?', a: 'It depends on scope: a landing page can take a few days, a management app usually a few weeks. A concrete timeline comes with the quote.' },
      { q: 'How is the cost determined?', a: 'By the agreed scope of work. After we talk, you get a clear quote before anything starts.' },
      { q: 'Who owns the source code?', a: 'This is written into the agreement for each project so both sides are clear from the start.' },
      { q: 'Is there support after delivery?', a: 'Yes. I help with bug fixes and usage guidance after handover; the exact scope is stated in the quote.' },
    ],
    projectsPage: { title: 'Projects', sub: 'A few examples of how I approach problems.' },
    blog: { title: 'Blog', sub: 'Programming tips and lessons from the job.', empty: 'No English posts yet.' },
    about: { title: 'About' },
    contact: {
      title: 'Contact', sub: 'Briefly describe what you need and I will get back to you soon.',
      name: 'Name', email: 'Email', service: 'Interested in', other: 'Other / not sure',
      message: 'Message', send: 'Send message', direct: 'Or reach me directly',
      notConfigured: 'The contact form is not configured yet. Please use the channels below.',
    },
    notFound: { title: 'Page not found', home: '← Back to home' },
  },
} as const;
