// Thông tin chung của site. Chỉnh tại đây, các trang sẽ tự cập nhật.
// Các mục để trống ('') sẽ tự ẩn khỏi giao diện.
type Testimonial = { quote: string; name: string; role?: string };
type Certification = { name: string; issuer?: string; year?: string; url?: string };

export const SITE = {
  brand: 'Đinh Duy Khang',
  author: 'Đinh Duy Khang',
  years: 3, // số năm kinh nghiệm
  url: 'https://khang293.github.io',

  // Liên hệ (để trống nếu chưa muốn công khai)
  email: 'khangdinh2930@gmail.com',
  github: '',
  linkedin: '',
  zalo: 'https://zaloapp.com/qr/p/8srplan6dk7h',      // số điện thoại Zalo hoặc link zalo.me/...
  telegram: '',  // username, không có @

  // Link đặt lịch trao đổi (Calendly, Cal.com, Google Calendar...). Để trống = ẩn nút đặt lịch.
  booking: '',

  // Thống kê truy cập không dùng cookie. Để trống = tắt.
  //   provider 'cloudflare'  : id là mã token của Cloudflare Web Analytics
  //   provider 'goatcounter' : id là tên site (phần trước .goatcounter.com)
  //   provider 'plausible'   : id là tên miền, ví dụ 'khang293.github.io'
  analytics: { provider: '', id: '' },

  // Form liên hệ: tạo form miễn phí tại https://formspree.io rồi dán ID (phần sau /f/)
  formspree: 'xljjjjen',

  // Giá tham khảo cho 3 gói dịch vụ, theo thứ tự: khảo sát và tư vấn, xây dựng theo dự án, bảo trì và hỗ trợ.
  // Để trống ('') thì web hiện "Liên hệ báo giá". Ví dụ: 'Từ 3.000.000 đ' hoặc 'Từ 500 USD'.
  packagePrices: {
    vi: ['500.000 - 1.000.000 đ', 'Từ 3.000.000 đ (ứng dụng hoặc luồng nhỏ)', '500.000 - 1.000.000 đ/tháng'],
    en: ['20 - 40 USD', 'From 120 USD (small app or flow)', '20 - 40 USD/month'],
  },

  // Nhận xét của khách hàng hoặc đồng nghiệp. Chỉ đăng khi người đó đồng ý, có thể ghi tắt tên.
  // Để trống = ẩn cả mục. Ví dụ: { quote: 'Làm việc nhanh, hiểu đúng nhu cầu.', name: 'A. N.', role: 'Quản lý vận hành' }
  testimonials: { vi: [] as Testimonial[], en: [] as Testimonial[] },

  // Chứng chỉ. Để trống = ẩn cả mục. Ví dụ: { name: 'PL-300: Power BI Data Analyst', issuer: 'Microsoft', year: '2025', url: '' }
  certifications: [] as Certification[],

  // Công nghệ chính (Power Platform) và công nghệ phụ (phát triển web)
  stack: ['Power Apps', 'Power Automate', 'Power BI', 'Dataverse', 'Power Fx', 'DAX', 'SharePoint', 'Microsoft Teams'],
  stackSecondary: ['TypeScript', 'Node.js', 'SQL'],
  // Công nghệ đã biết ở mức cơ bản (hiện kèm nhãn "cơ bản" / "basic")
  stackBasic: ['KNIME'],

  text: {
    vi: {
      role: 'Power Platform Developer',
      description: 'Power Platform Developer: xây dựng ứng dụng Power Apps, tự động hóa Power Automate và báo cáo Power BI. Nhận thêm làm website theo yêu cầu.',
      heroTitle: 'Còn quản lý công việc bằng Excel, email và giấy tờ?',
      heroSub: 'Mình xây dựng ứng dụng Power Apps, quy trình tự động bằng Power Automate và dashboard Power BI để bạn bớt việc thủ công, ít sai sót và có dữ liệu để ra quyết định. Ngoài ra mình nhận làm website và ứng dụng web theo yêu cầu.',
      about: 'Mình là Khang, một Power Platform Developer với 3 năm kinh nghiệm. Mình giúp cá nhân và doanh nghiệp số hóa quy trình bằng Power Apps, Power Automate, Power BI và Dataverse, đồng thời nhận làm website, ứng dụng web khi cần. Blog này là nơi mình chia sẻ tips và kinh nghiệm làm nghề.',
    },
    en: {
      role: 'Power Platform Developer',
      description: 'Power Platform Developer: Power Apps solutions, Power Automate workflows and Power BI reports. Custom websites on request.',
      heroTitle: 'Still running your work on spreadsheets, email and paper?',
      heroSub: 'I build Power Apps solutions, Power Automate workflows and Power BI dashboards so you have less manual work, fewer mistakes and data to decide with. I also build custom websites and web apps on request.',
      about: 'I am Khang, a Power Platform Developer with 3 years of experience. I help individuals and businesses digitize their processes with Power Apps, Power Automate, Power BI and Dataverse, and I build websites and web apps when needed. This blog is where I share tips and lessons from the job.',
    },
  },
};
