---
title: "5 mẹo Power Fx giúp ứng dụng Power Apps nhanh và gọn hơn"
date: 2026-10-24
description: "Concurrent, With, Coalesce, named formulas và quy ước đặt tên: những thói quen nhỏ mang lại khác biệt lớn."
tags: ["Power Apps", "Power Fx", "tips"]
lang: vi
draft: false
---

Vài thói quen nhỏ khi viết Power Fx giúp app chạy nhanh hơn và dễ bảo trì hơn.

## 1. Dùng Concurrent để tải dữ liệu song song

Thay vì tải từng nguồn nối tiếp nhau, hãy chạy chúng cùng lúc, đặc biệt trong `App.OnStart` hoặc `OnVisible`.

```powerfx
Concurrent(
    ClearCollect(colKhachHang, Filter(KhachHang, TrangThai = "Active")),
    ClearCollect(colSanPham, SanPham)
)
```

## 2. Dùng With để tránh tính toán lặp lại

```powerfx
With(
    { tong: Sum(galDonHang.AllItems, ThanhTien) },
    Text(tong, "#,##0") & " đ"
)
```

## 3. Dùng Coalesce thay cho If lồng nhau

`Coalesce` trả về giá trị đầu tiên không rỗng, gọn hơn nhiều so với `If(IsBlank(...), ..., ...)`.

```powerfx
Coalesce(txtGhiChu.Text, "Chưa có ghi chú")
```

## 4. Dùng named formulas cho giá trị dùng chung

Khai báo trong thuộc tính **App.Formulas**, giá trị luôn được tính lại tự động và không cần `Set` thủ công.

```powerfx
EmailNguoiDung = User().Email;
LaQuanLy = EmailNguoiDung in colQuanLy.Email;
```

## 5. Đặt tên control có tiền tố

`btnLuu`, `txtHoTen`, `galDonHang`, `lblTieuDe`... Nhìn tên là biết loại control, và công thức dễ đọc hơn rất nhiều khi app lớn lên.

Bạn có mẹo nào hay muốn chia sẻ thêm? Gửi mình qua trang liên hệ nhé.
