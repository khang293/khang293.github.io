---
title: "Báo cáo Power BI tự cập nhật: thôi làm báo cáo tay mỗi tuần"
date: 2026-11-23
description: "Cách biến báo cáo Excel làm tay hằng tuần thành dashboard tự làm mới, mở trên điện thoại là thấy số mới nhất."
tags: ["Power BI", "báo cáo", "dashboard", "doanh nghiệp nhỏ"]
lang: vi
draft: false
---

Một quy trình rất quen thuộc: cuối tuần hoặc cuối tháng, ai đó xuất dữ liệu từ phần mềm, dán vào Excel, làm bảng tổng hợp, vẽ biểu đồ, rồi gửi email cho sếp. Mất nửa ngày đến vài ngày, và đến khi báo cáo tới tay người đọc thì số liệu đã cũ.

## Power BI làm khác thế nào

Bạn thiết kế báo cáo **một lần**. Sau đó Power BI tự lấy dữ liệu mới theo lịch và cập nhật biểu đồ. Người xem mở link (hoặc ứng dụng trên điện thoại) là thấy số mới nhất, không cần ai gửi file.

## Bốn bước của một báo cáo tự cập nhật

1. **Kết nối nguồn dữ liệu**: Excel, SharePoint, SQL, phần mềm bán hàng, file CSV xuất ra tự động...
2. **Làm sạch và gộp dữ liệu** một lần (Power Query), thay cho việc chỉnh tay mỗi kỳ.
3. **Thiết kế dashboard**: các chỉ số mà lãnh đạo thật sự cần xem (doanh thu, tồn kho, công nợ, so với kế hoạch...).
4. **Đặt lịch làm mới và chia sẻ** cho đúng người, mỗi người chỉ thấy phần dữ liệu của họ nếu cần.

## Điều cần biết về làm mới tự động

- Nguồn trên đám mây (SharePoint Online, Excel trên OneDrive, nhiều dịch vụ trực tuyến) thường làm mới được trực tiếp.
- Nguồn đặt trong máy chủ nội bộ của công ty (SQL Server tại chỗ, file trên máy chủ) cần thêm một **cổng kết nối (gateway)** cài trên một máy luôn bật.
- Số lần làm mới mỗi ngày phụ thuộc gói Power BI. Gói Pro cho phép đặt lịch tối đa 8 lần mỗi ngày, gói cao hơn cho nhiều lần hơn. Nên kiểm tra giới hạn hiện hành của Microsoft khi tư vấn cho khách.

## Phù hợp với ai

- Công ty đang mất nhiều giờ mỗi kỳ để làm báo cáo bằng tay.
- Lãnh đạo cần theo dõi số liệu thường xuyên thay vì chờ cuối tháng.
- Dữ liệu nằm rải rác ở nhiều file hoặc nhiều hệ thống và cần gộp lại.

## Kết quả thường thấy

Mình đã làm báo cáo Power BI tự làm mới cho các hệ thống như kiểm kê tài sản và quản lý nhân sự (xem mục Dự án). Điều khách thấy rõ nhất là hết việc tổng hợp tay cuối kỳ: số liệu luôn mới và mọi người cùng nhìn một nguồn.

Mức tiết kiệm thời gian cụ thể tùy mỗi công ty. Khi trao đổi, mình sẽ ước tính dựa trên cách bạn đang làm báo cáo hiện nay.

## Bạn đang làm báo cáo nào bằng tay?

Mô tả báo cáo bạn đang làm mỗi tuần hoặc mỗi tháng và dữ liệu lấy từ đâu, mình sẽ cho biết có tự động hóa được không và cách làm gọn nhất. Xem trang Liên hệ hoặc nhắn qua Zalo.
