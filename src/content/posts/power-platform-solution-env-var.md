---
title: "Power Platform: dùng Solution và Environment Variable để triển khai gọn gàng"
date: 2026-10-10
description: "Đóng gói app và flow vào Solution, dùng biến môi trường cho các giá trị khác nhau giữa Dev, Test, Prod."
tags: ["Power Platform", "ALM", "tips"]
lang: vi
draft: false
---

Khi chuyển ứng dụng từ môi trường thử nghiệm sang môi trường thật, nhiều người sửa tay từng đường dẫn, từng kết nối. Cách này dễ sai và khó lặp lại. **Solution** và **Environment Variable** giải quyết việc đó.

## Solution: gói mọi thứ vào một nơi

Một solution chứa app, flow, bảng Dataverse và các thành phần liên quan. Làm việc **bên trong solution** ngay từ đầu giúp bạn:

- Xuất và nhập cả bộ giải pháp sang môi trường khác chỉ với vài bước.
- Biết rõ mỗi giải pháp gồm những gì.
- Quản lý phiên bản và hạn chế bỏ sót thành phần khi triển khai.

Với môi trường thật, thường xuất ở dạng **managed** để tránh bị sửa trực tiếp; môi trường phát triển giữ dạng **unmanaged**.

## Environment Variable: tách giá trị khỏi ứng dụng

Các giá trị khác nhau giữa môi trường, như địa chỉ site SharePoint, tên danh sách, email quản trị, nên khai báo thành **environment variable** thay vì viết cứng vào công thức hay flow.

- Mỗi môi trường đặt giá trị riêng khi nhập solution.
- Không cần sửa ứng dụng khi chuyển môi trường.
- Dùng được trong flow, và trong Power Apps khi khai báo như nguồn dữ liệu.

## Connection Reference: tách kết nối

Kết nối (SharePoint, Outlook...) khai báo qua **connection reference** để mỗi môi trường tự gắn kết nối của mình, flow không phải sửa tay sau khi nhập.

## Quy trình gợi ý

1. Phát triển trong môi trường **Dev**, trong một solution.
2. Xuất solution, nhập sang môi trường **Test**, đặt environment variable và connection cho môi trường đó.
3. Kiểm thử, rồi nhập sang **Prod** với cùng quy trình.

## Lưu ý

Một số thành phần cần cấu hình thêm sau khi nhập (bật flow, chia sẻ ứng dụng, cấp quyền). Hãy ghi lại danh sách việc này để lần sau triển khai không quên.
