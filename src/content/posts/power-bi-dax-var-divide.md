---
title: "Power BI: viết DAX sạch hơn với VAR và DIVIDE"
date: 2026-10-12
description: "Hai thói quen nhỏ giúp công thức DAX dễ đọc, chạy nhanh hơn và không lỗi khi chia cho 0."
tags: ["Power BI", "DAX", "tips"]
lang: vi
draft: false
---

Công thức DAX càng dài càng khó đọc và khó sửa. Hai công cụ đơn giản giúp ích rất nhiều.

## 1. Dùng VAR để đặt tên cho các bước tính

`VAR` lưu kết quả trung gian để dùng lại, vừa dễ đọc vừa tránh tính cùng một thứ nhiều lần.

```dax
Ty Le Tang Truong =
VAR DoanhThuNay = [Doanh Thu]
VAR DoanhThuNamTruoc = CALCULATE([Doanh Thu], SAMEPERIODLASTYEAR('Lich'[Ngay]))
RETURN
    DIVIDE(DoanhThuNay - DoanhThuNamTruoc, DoanhThuNamTruoc)
```

## 2. Dùng DIVIDE thay cho dấu /

`DIVIDE(tử, mẫu, [giá trị thay thế])` tự xử lý trường hợp **mẫu bằng 0** (mặc định trả về trống), không để báo cáo hiện lỗi.

```dax
Ty Le Hoan Thanh = DIVIDE([So Hoan Thanh], [Tong So], 0)
```

## 3. Ưu tiên measure hơn cột tính toán

- **Measure** tính khi người dùng tương tác, không tăng kích thước mô hình, hợp để tổng hợp (tổng, tỷ lệ, trung bình).
- **Cột tính toán** lưu vào mô hình và tăng dung lượng, chỉ dùng khi bạn cần dùng nó để lọc, phân nhóm hoặc làm quan hệ.

## 4. Mô hình dữ liệu quan trọng hơn công thức

Hầu hết công thức DAX rối là do mô hình dữ liệu chưa tốt. Hãy hướng tới **star schema**: một bảng dữ kiện ở giữa, các bảng chiều (ngày, sản phẩm, khách hàng) xung quanh. Mô hình sạch giúp công thức ngắn và báo cáo nhanh.

## 5. Đặt tên rõ ràng

Đặt measure trong một bảng riêng, tên mô tả ý nghĩa (`Doanh Thu`, `Ty Le Hoan Thanh`) và ghi chú ngắn nếu công thức phức tạp. Sau vài tháng bạn sẽ cảm ơn chính mình.
