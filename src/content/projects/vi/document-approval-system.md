---
lang: vi
title: "Hệ thống quản lý tài liệu và phê duyệt song ngữ (Power Apps)"
summary: "Bộ hai ứng dụng Power Apps quản lý nhiều loại tài liệu: soạn theo mẫu, phê duyệt theo ma trận cấu hình được, ủy quyền, lưu trữ hồ sơ. Giao diện song ngữ Việt - Anh."
date: 2026-03-28
icon: "📑"
order: 2
featured: true
sample: false
role: "Thiết kế & phát triển Power Apps"
stack: ["Power Apps", "Power Fx", "SharePoint", "Microsoft 365"]
results:
  - "Gom nhiều loại tài liệu vào một hệ thống thay cho email và file rời"
  - "Phê duyệt theo ma trận cấu hình được, có ủy quyền và lịch sử phê duyệt"
  - "Tách ứng dụng quản trị riêng, người quản trị tự cấu hình mà không cần sửa ứng dụng chính"
---

## Bối cảnh

Tài liệu thường đi qua nhiều người: người đề xuất, các cấp phê duyệt và các bên liên quan. Nếu quản lý bằng email và thư mục, rất khó biết tài liệu đang ở đâu, ai đã duyệt và phiên bản nào là bản cuối.

## Giải pháp

Hệ thống gồm hai ứng dụng Power Apps chạy trên dữ liệu SharePoint và tài khoản Microsoft 365.

**Ứng dụng chính, khoảng 19 màn hình**
- Trang chủ, danh sách **việc cần xử lý**, **yêu cầu của tôi** và bản nháp.
- Soạn và quản lý nhiều loại tài liệu dựa trên mẫu.
- **Hồ sơ các bên liên quan** và người đại diện.
- **Quản lý tệp đính kèm** (bản nháp, bản chính thức) và màn hình chi tiết.
- **Ủy quyền** phê duyệt cho người khác.
- Màn hình hướng dẫn sử dụng ngay trong ứng dụng.

**Ứng dụng quản trị, khoảng 13 màn hình**
Cho người quản trị tự cấu hình dữ liệu nền: danh mục, loại tài liệu, ngôn ngữ, đơn vị tiền tệ, phòng ban, địa điểm, vai trò, mẫu, ủy quyền và **ma trận phê duyệt**.

## Điểm đáng chú ý

- **Phê duyệt theo ma trận cấu hình được**: người duyệt xác định từ cấu hình, không viết cứng trong ứng dụng, nên đổi quy trình chỉ cần sửa dữ liệu.
- **Bản ghi tiến trình và lịch sử** cho từng bước, có thành phần hiển thị lịch sử dùng lại ở nhiều màn hình.
- **Giao diện song ngữ Việt - Anh** với thành phần chữ song ngữ dùng chung.
- **Menu theo quyền**: mỗi người chỉ thấy chức năng thuộc vai trò của mình.
- **Thành phần dùng lại** (tiêu đề, menu, lịch sử, báo tải, thông báo) giúp ứng dụng lớn vẫn nhất quán và dễ bảo trì.

*Mô tả ở mức khái quát, chi tiết cụ thể không được công bố.*
