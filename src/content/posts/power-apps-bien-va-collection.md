---
title: "Power Apps: khi nào dùng Set, UpdateContext hay Collection?"
date: 2026-10-20
description: "Ba cách lưu dữ liệu tạm trong Power Apps khác nhau về phạm vi và mục đích. Chọn đúng giúp app gọn và dễ debug."
tags: ["Power Apps", "Power Fx", "tips"]
lang: vi
draft: false
---

Trong Power Apps có ba cách lưu dữ liệu tạm thường bị dùng lẫn lộn. Phân biệt rõ sẽ giúp ứng dụng dễ đọc và bớt lỗi lạ.

## 1. Set: biến toàn cục

Dùng được ở **mọi màn hình**. Hợp để lưu thông tin dùng chung như người dùng hiện tại, vai trò, cấu hình.

```powerfx
Set(gloVaiTro, LookUp(DanhSachVaiTro, Email = User().Email, VaiTro))
```

## 2. UpdateContext: biến cục bộ của một màn hình

Chỉ dùng trong **màn hình hiện tại**. Hợp cho trạng thái giao diện như mở/đóng popup, đang tải, chế độ sửa.

```powerfx
UpdateContext({locHienPopup: true})
```

Bạn cũng có thể truyền giá trị sang màn hình khác khi điều hướng, và nó trở thành biến cục bộ ở màn hình đó:

```powerfx
Navigate(ChiTiet, ScreenTransition.None, {locMaDon: ThisItem.ID})
```

## 3. Collection: bảng dữ liệu tạm

Lưu **nhiều dòng** trong bộ nhớ, hợp để đệm dữ liệu từ nguồn ngoài hoặc gom các dòng người dùng đang nhập trước khi lưu.

```powerfx
ClearCollect(colDonHang, Filter(DonHang, TrangThai = "Moi"))
```

## Quy ước đặt tên nên dùng

- `glo...` cho biến toàn cục, `loc...` cho biến cục bộ, `col...` cho collection.
- Nhìn tên là biết phạm vi, tránh việc không nhớ biến này tạo ở đâu.

## Lưu ý

- Đừng lạm dụng biến toàn cục cho thứ chỉ dùng ở một màn hình, dễ gây lỗi khó lần ra.
- Collection chiếm bộ nhớ, đừng nạp cả danh sách lớn nếu chỉ cần vài cột. Hãy lọc và `ShowColumns` trước khi lưu.
- Với giá trị tính từ dữ liệu khác, hãy cân nhắc named formulas (khai báo trong `App.Formulas`) thay vì `Set` thủ công.
