---
lang: vi
title: "Ứng dụng ghi nhận theo vị trí kèm ảnh, tính toán tự động và phê duyệt"
summary: "Hệ thống trên Power Platform: ghi nhận vào/ra theo vị trí kèm ảnh xác nhận, tính toán tự động theo quy tắc cấu hình được, phê duyệt và nhắc việc tự động."
date: 2026-01-01
icon: "📍"
order: 4
featured: true
sample: false
role: "Thiết kế & phát triển"
stack: ["Power Apps", "Power Automate", "SharePoint", "Power BI"]
results:
  - "Ghi nhận theo vị trí kèm ảnh, lưu lại làm bằng chứng thay cho việc ghi tay"
  - "Tính toán tự động theo quy tắc, giảm việc tổng hợp thủ công cuối kỳ"
  - "Phê duyệt và nhắc việc chạy tự động, báo cáo trên Power BI"
---

## Bối cảnh

Quản lý dữ liệu bằng bảng tính thường làm thông tin rải rác: dữ liệu người dùng một nơi, dữ liệu ghi nhận một nơi, kết quả tính toán một nơi. Việc tổng hợp cuối kỳ mất nhiều thời gian, dễ sai sót và khó kiểm chứng dữ liệu thực tế.

## Giải pháp

Hệ thống xây dựng trên Power Platform: **Power Apps** làm giao diện, **Power Automate** tự động hóa quy trình, **SharePoint** lưu dữ liệu và **Power BI** làm báo cáo.

- **Quản lý thông tin người dùng** tập trung.
- **Ghi nhận vào/ra theo vị trí**: ứng dụng ghi lại vị trí khi thực hiện để xác nhận đúng nơi cần có mặt.
- **Chụp ảnh khi ghi nhận**: ảnh được lưu cùng bản ghi để làm bằng chứng và dễ kiểm tra khi cần.
- **Tính toán theo quy tắc**: tự tính từ dữ liệu đã ghi nhận theo các quy tắc cấu hình được (thời gian, hệ số, khoản bổ sung).
- **Phê duyệt và nhắc việc tự động**: Power Automate xử lý luồng duyệt và gửi nhắc nhở đến đúng người, đúng lúc.
- **Báo cáo**: dashboard Power BI để người quản lý theo dõi.

## Điểm đáng chú ý

- Kết hợp **vị trí và ảnh** giúp dữ liệu đáng tin cậy hơn.
- **Quy tắc được áp dụng tự động** từ cùng một nguồn dữ liệu, giảm sai lệch giữa các bước.
- **Luồng duyệt và nhắc việc** giúp không bị sót yêu cầu, giảm việc nhắc nhau bằng tay.
- Hệ thống chứa dữ liệu cá nhân nên cần phân quyền chặt chẽ.

*Mô tả ở mức khái quát, chi tiết cụ thể không được công bố.*
