---
lang: vi
title: "Hệ thống kiểm kê và quản lý tài sản bằng quét mã vạch (Power Platform)"
summary: "Bộ giải pháp gồm nhiều ứng dụng và luồng tự động: quét mã vạch để tìm và kiểm kê tài sản, so sánh số đếm với số liệu hệ thống, quản lý ảnh, phê duyệt nhiều cấp và báo cáo Power BI."
date: 2026-10-22
icon: "🏷️"
order: 1
featured: true
sample: false
role: "Thiết kế & phát triển"
stack: ["Power Apps", "Power Automate", "SharePoint", "Power BI", "Microsoft 365"]
flow: ["Chuẩn bị danh sách tài sản theo kỳ", "Quét mã vạch và nhập số đếm", "Tự so sánh với số liệu hệ thống", "Phê duyệt nhiều cấp", "Báo cáo Power BI cập nhật"]
results:
  - "Số hóa kiểm kê tài sản định kỳ bằng quét mã vạch, tự so sánh với số liệu hệ thống và ghi nhận chênh lệch"
  - "Quản lý ảnh tài sản và các yêu cầu thay đổi, có phê duyệt nhiều cấp"
  - "Phân quyền theo vai trò, báo cáo Power BI tự làm mới"
---

## Bối cảnh

Kiểm kê tài sản định kỳ thường dựa vào bảng tính và giấy tờ: người đếm ghi tay, việc đối chiếu với danh sách tài sản của hệ thống rất mất công, khó biết ai đã duyệt đến đâu, và ảnh tài sản nằm rải rác ở nhiều nơi.

## Giải pháp

Một bộ giải pháp Power Platform gồm nhiều ứng dụng và luồng tự động:

- **Ứng dụng cho người kiểm kê (điện thoại và máy tính)**: **quét mã vạch để tìm tài sản** và xem thông tin, đếm theo kỳ kiểm kê và địa điểm, chụp và cập nhật ảnh, nộp kết quả, xem lịch sử.
- **Ứng dụng phê duyệt trên máy tính**: người duyệt xem kết quả kiểm kê (số đếm so với số hệ thống, chênh lệch, ghi chú) rồi duyệt hoặc từ chối.
- **Ứng dụng quản trị**: quản lý người dùng và vai trò, mở hoặc đóng kỳ kiểm kê, cấu hình, sinh mã vạch và nhúng báo cáo Power BI.
- **Các luồng Power Automate**: tạo danh sách tài sản cần đếm, nhận kết quả, tự so sánh số đếm với số hệ thống, chuyển cấp phê duyệt, gửi email thông báo, ghi log và làm mới báo cáo.

## Điểm đáng chú ý

- Phân quyền theo vai trò, menu và chức năng hiển thị đúng với quyền của từng người.
- Các loại yêu cầu dùng chung một cơ chế phê duyệt nhiều cấp, nên dễ mở rộng.
- Email thông báo có đường dẫn mở thẳng đúng màn hình cần xử lý trong ứng dụng.
- Dữ liệu lưu trên SharePoint, kết nối Power BI để báo cáo.

*Mô tả ở mức khái quát, thông tin nội bộ không được công bố.*
