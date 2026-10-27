---
lang: vi
title: "Ứng dụng quản lý nhân sự: chấm công theo vị trí kèm ảnh và tính lương"
summary: "Hệ thống quản lý nhân sự trên Power Platform: hồ sơ nhân viên, chấm công vào/ra theo vị trí kèm ảnh xác nhận, tính lương theo giờ làm, tăng ca và phụ cấp, phê duyệt và nhắc việc tự động, báo cáo Power BI."
icon: "👥"
order: 4
featured: true
sample: false
role: "Thiết kế & phát triển"
stack: ["Power Apps", "Power Automate", "SharePoint", "Power BI"]
flow: ["Chấm công vào/ra, ghi vị trí và ảnh", "Lưu dữ liệu tập trung", "Phê duyệt trường hợp cần xác nhận", "Tính lương theo quy tắc", "Báo cáo Power BI"]
results:
  - "Chấm công vào/ra theo vị trí kèm ảnh, lưu lại làm bằng chứng thay cho việc chấm tay hoặc ghi sổ"
  - "Tính lương tự động theo giờ làm, tăng ca và phụ cấp, giảm việc tổng hợp thủ công cuối tháng"
  - "Phê duyệt và nhắc việc chạy tự động, báo cáo nhân sự trên Power BI"
---

## Bối cảnh

Quản lý nhân sự bằng bảng tính thường làm dữ liệu rải rác: thông tin nhân viên một nơi, chấm công một nơi, bảng lương một nơi. Việc tổng hợp cuối tháng mất nhiều thời gian, dễ sai sót và khó kiểm chứng giờ làm thực tế.

## Giải pháp

Hệ thống xây dựng trên Power Platform: **Power Apps** làm giao diện, **Power Automate** tự động hóa quy trình, **SharePoint** lưu dữ liệu và **Power BI** làm báo cáo.

- **Quản lý thông tin nhân viên**: hồ sơ, vị trí, trạng thái làm việc.
- **Chấm công vào/ra theo vị trí**: ứng dụng ghi lại vị trí của nhân viên khi chấm công để xác nhận họ đang ở đúng nơi làm việc.
- **Chụp ảnh khi chấm công**: ảnh được lưu cùng bản ghi để làm bằng chứng và dễ kiểm tra khi cần.
- **Tính lương theo quy tắc**: tự tính từ dữ liệu chấm công dựa trên giờ làm, tăng ca, phụ cấp và các khoản liên quan.
- **Phê duyệt và nhắc việc tự động**: Power Automate xử lý các luồng duyệt và gửi nhắc nhở đến đúng người, đúng lúc.
- **Báo cáo**: dashboard Power BI cho người quản lý theo dõi chấm công và chi phí nhân sự.

## Điểm đáng chú ý

- Kết hợp **vị trí và ảnh** khi chấm công giúp dữ liệu giờ làm đáng tin cậy hơn.
- **Quy tắc lương được áp dụng tự động** từ cùng một nguồn dữ liệu chấm công, giảm sai lệch giữa chấm công và bảng lương.
- **Luồng duyệt và nhắc việc** giúp không bị sót yêu cầu và giảm việc đi nhắc người khác bằng tay.
- Hệ thống chứa dữ liệu cá nhân và lương nên cần phân quyền chặt chẽ.

*Mô tả ở mức khái quát, thông tin nội bộ không được công bố.*
