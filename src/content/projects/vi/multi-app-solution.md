---
lang: vi
title: "Giải pháp Power Platform nhiều ứng dụng: quét mã vạch, phê duyệt nhiều cấp, báo cáo"
summary: "Bộ giải pháp gồm 3 ứng dụng canvas và 18 luồng tự động: quét mã vạch, quản lý ảnh, so sánh dữ liệu tự động, phê duyệt nhiều cấp và báo cáo Power BI."
date: 2026-10-22
icon: "🏷️"
order: 1
featured: true
sample: false
role: "Thiết kế & phát triển"
stack: ["Power Apps", "Power Automate", "SharePoint", "Power BI", "Microsoft 365"]
results:
  - "Số hóa quy trình thu thập dữ liệu định kỳ bằng quét mã vạch, tự so sánh với dữ liệu hệ thống và ghi nhận chênh lệch"
  - "Phê duyệt nhiều cấp có theo dõi trạng thái, người duyệt xử lý từ email hoặc từ ứng dụng"
  - "Phân quyền theo vai trò, báo cáo Power BI tự làm mới"
---

## Bối cảnh

Quy trình thu thập và đối chiếu dữ liệu định kỳ thường dựa vào bảng tính và giấy tờ: khó so khớp số liệu thực tế với dữ liệu hệ thống, khó theo dõi tiến độ phê duyệt, và hình ảnh không được quản lý tập trung.

## Giải pháp

Một bộ giải pháp Power Platform gồm:

- **Ứng dụng chính (điện thoại và máy tính)** cho người thu thập dữ liệu và người dùng chung: quét mã vạch, cập nhật ảnh, gửi yêu cầu, xem lịch sử.
- **Ứng dụng phê duyệt trên máy tính** cho người duyệt xem chi tiết kết quả và xử lý yêu cầu.
- **Ứng dụng quản trị**: quản lý người dùng và vai trò, mở hoặc đóng kỳ thu thập, cấu hình, sinh mã vạch, nhúng báo cáo Power BI.
- **18 luồng Power Automate** xử lý tạo danh sách cần thu thập, nộp kết quả, tự so sánh dữ liệu, chuyển cấp phê duyệt, gửi email thông báo, ghi log và làm mới báo cáo.

## Điểm đáng chú ý

- Phân quyền theo vai trò, menu và chức năng hiển thị theo quyền của từng người.
- Mọi loại yêu cầu đi qua cùng một cơ chế phê duyệt nhiều cấp, nên dễ mở rộng thêm loại yêu cầu mới.
- Email thông báo có đường dẫn mở thẳng đúng màn hình cần xử lý trong ứng dụng.
- Dữ liệu lưu trên SharePoint, kết nối Power BI để báo cáo.

*Mô tả ở mức khái quát, chi tiết cụ thể không được công bố.*
