---
title: "SharePoint: đánh chỉ mục cột để danh sách lớn vẫn truy vấn được"
date: 2026-10-14
description: "Vượt 5.000 dòng, nhiều truy vấn bắt đầu lỗi hoặc chậm. Chỉ mục cột là cách phòng tránh quan trọng nhất."
tags: ["SharePoint", "Power Apps", "tips"]
lang: vi
draft: false
---

Danh sách SharePoint chạy tốt lúc ít dữ liệu, rồi một ngày app hoặc flow báo lỗi hay chạy rất chậm khi danh sách vượt vài nghìn dòng. Đây là **ngưỡng xem danh sách (list view threshold)**, mặc định là **5.000** dòng.

## Hiểu đúng về ngưỡng

Ngưỡng không có nghĩa là danh sách không được chứa hơn 5.000 dòng. Nó giới hạn số dòng mà **một truy vấn phải quét**. Nếu truy vấn lọc theo cột **đã đánh chỉ mục** và kết quả lọc đủ hẹp, truy vấn vẫn chạy bình thường dù danh sách rất lớn.

## Việc nên làm

1. **Đánh chỉ mục** các cột thường dùng để lọc hoặc sắp xếp: trạng thái, ngày, mã tham chiếu, người xử lý.
2. Đánh chỉ mục **sớm**, ngay khi tạo danh sách. Đợi đến lúc danh sách đã lớn thì việc tạo chỉ mục cũng có thể bị chặn bởi chính ngưỡng này.
3. Trong **Power Apps** và **Power Automate**, lọc theo cột đã có chỉ mục và đặt điều kiện đủ hẹp ngay từ đầu.
4. Tạo **view** có bộ lọc theo cột đã đánh chỉ mục, thay vì view hiện tất cả.

## Cách đánh chỉ mục

Vào **Cài đặt danh sách (List settings)**, chọn **Indexed columns**, rồi thêm cột cần đánh chỉ mục. Mỗi danh sách chỉ có số lượng chỉ mục giới hạn (khoảng 20), nên hãy chọn cột thật sự cần.

## Lưu ý

- Một số kiểu cột (ví dụ cột nhiều giá trị) không thể đánh chỉ mục.
- Với dữ liệu rất lớn hoặc cần truy vấn phức tạp, hãy cân nhắc chuyển sang **Dataverse** hoặc cơ sở dữ liệu SQL, hỗ trợ delegation tốt hơn.
- Hạn mức và hành vi cụ thể có thể thay đổi, hãy kiểm tra tài liệu chính thức của Microsoft cho tenant của bạn.
