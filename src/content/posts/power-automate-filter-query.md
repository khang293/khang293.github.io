---
title: "Power Automate: lọc dữ liệu ngay từ nguồn bằng Filter Query"
date: 2026-10-16
description: "Lấy đúng các dòng cần thiết thay vì lấy hết rồi lọc bằng Condition. Luồng nhanh hơn và ít tốn lượt chạy hơn."
tags: ["Power Automate", "SharePoint", "tips"]
lang: vi
draft: false
---

Kiểu làm hay gặp: **Get items** lấy cả danh sách, rồi **Apply to each** kèm **Condition** để chọn dòng phù hợp. Cách này chậm, tốn nhiều hành động, và có thể bỏ sót dữ liệu vì giới hạn số dòng trả về.

## Cách tốt hơn: lọc ngay trong Get items

Trong hành động **Get items** của SharePoint, dùng các ô:

- **Filter Query**: điều kiện lọc theo cú pháp OData.
- **Order By**: sắp xếp.
- **Top Count**: giới hạn số dòng trả về.

Ví dụ lấy các yêu cầu còn "Chờ duyệt":

```text
TrangThai eq 'Cho duyet'
```

Kết hợp nhiều điều kiện:

```text
TrangThai eq 'Cho duyet' and Created ge '2026-01-01T00:00:00Z'
```

## Lưu ý quan trọng

- Filter Query dùng **tên nội bộ** của cột, không phải tên hiển thị. Tên có khoảng trắng thường bị đổi, ví dụ `Ngay Tao` thành `Ngay_x0020_Tao`. Xem tên nội bộ trên URL khi sửa cột trong SharePoint.
- Nếu **không đặt Top Count** và không bật phân trang, Get items thường chỉ trả về một số lượng mặc định (100 dòng). Hãy đặt Top Count rõ ràng, hoặc bật **Pagination** trong Settings và đặt ngưỡng phù hợp khi cần lấy nhiều.
- Lọc trên cột **chưa đánh chỉ mục** của danh sách lớn có thể lỗi hoặc chậm, xem thêm bài về chỉ mục SharePoint.

## Mẹo thêm: Apply to each chạy song song

Nếu vẫn cần lặp qua nhiều dòng, vào **Settings** của Apply to each và bật **Concurrency control** để xử lý nhiều dòng cùng lúc (có thể đặt mức song song). Cân nhắc:

- Chỉ dùng khi các dòng **độc lập** với nhau, vì thứ tự xử lý không còn đảm bảo.
- Vòng lặp chạy song song không dùng được một số hành động về biến, ví dụ **Set variable**.
