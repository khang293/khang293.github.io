---
lang: vi
title: "Hệ thống quản lý hợp đồng và tài liệu (Power Apps)"
summary: "Bộ ứng dụng Power Apps quản lý vòng đời hợp đồng và các tài liệu liên quan: soạn theo mẫu, phê duyệt theo cấu hình, ủy quyền, hồ sơ đối tác. Giao diện song ngữ Việt - Anh."
date: 2026-03-28
icon: "📑"
order: 2
featured: true
sample: false
role: "Thiết kế & phát triển Power Apps"
stack: ["Power Apps", "Power Fx", "SharePoint", "Microsoft 365"]
results:
  - "Gom hợp đồng và các tài liệu liên quan vào một hệ thống thay cho email và file rời"
  - "Phê duyệt theo cấu hình, có ủy quyền và lịch sử phê duyệt"
  - "Có ứng dụng quản trị riêng, người quản trị tự cấu hình mà không cần sửa ứng dụng chính"
---

## Bối cảnh

Một hợp đồng đi qua nhiều người: người đề xuất, bộ phận pháp lý, các cấp phê duyệt và đối tác. Quản lý bằng email và thư mục khiến rất khó biết hợp đồng đang ở đâu, ai đã duyệt và bản nào là bản cuối.

## Giải pháp

Hệ thống gồm một ứng dụng chính cho người dùng và một ứng dụng quản trị, chạy trên dữ liệu SharePoint và tài khoản Microsoft 365.

**Ứng dụng chính**
- Trang chủ, danh sách **việc cần xử lý**, **yêu cầu của tôi** và **bản nháp**.
- Soạn và quản lý hợp đồng cùng các tài liệu liên quan dựa trên mẫu.
- **Hồ sơ đối tác** và người đại diện.
- **Quản lý tệp đính kèm** (bản nháp, bản đã ký) và màn hình chi tiết.
- **Ủy quyền** phê duyệt cho người khác.
- Hướng dẫn sử dụng ngay trong ứng dụng.

**Ứng dụng quản trị**
Cho người quản trị tự cấu hình dữ liệu nền, mẫu tài liệu, vai trò và quy tắc phê duyệt mà không cần sửa ứng dụng chính.

## Điểm đáng chú ý

- **Phê duyệt theo cấu hình**: người duyệt được xác định từ dữ liệu cấu hình, không viết cứng trong ứng dụng, nên đổi quy trình chỉ cần sửa cấu hình.
- **Bản ghi tiến trình và lịch sử** cho từng bước, có thành phần hiển thị lịch sử dùng lại ở nhiều màn hình.
- **Giao diện song ngữ Việt - Anh** với thành phần chữ song ngữ dùng chung, phù hợp với đối tác trong và ngoài nước.
- **Menu theo quyền**: mỗi người chỉ thấy chức năng thuộc vai trò của mình.
- **Thành phần dùng lại** (tiêu đề, menu, lịch sử, báo tải, thông báo) giúp ứng dụng lớn vẫn nhất quán và dễ bảo trì.
- Lấy thông tin người dùng từ Microsoft 365, không bắt nhập lại.

*Mô tả ở mức khái quát, thông tin nội bộ không được công bố.*
