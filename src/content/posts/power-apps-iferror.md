---
title: "Power Apps: bắt lỗi khi lưu dữ liệu bằng IfError"
date: 2026-10-18
description: "Đừng để người dùng tưởng đã lưu thành công trong khi dữ liệu thực ra không được ghi. Dùng IfError để báo đúng."
tags: ["Power Apps", "Power Fx", "tips"]
lang: vi
draft: false
---

Một lỗi phổ biến: nút Lưu chạy `Patch` rồi hiện thông báo "Đã lưu" ngay sau đó, kể cả khi `Patch` thất bại (mất mạng, thiếu quyền, dữ liệu sai kiểu). Người dùng tin là xong, nhưng dữ liệu không có.

## Cách làm đúng với IfError

```powerfx
IfError(
    Patch(DonHang, Defaults(DonHang), { Title: txtTieuDe.Text, SoLuong: Value(txtSoLuong.Text) }),
    Notify("Lưu thất bại: " & FirstError.Message, NotificationType.Error),
    Notify("Đã lưu thành công", NotificationType.Success)
)
```

Cấu trúc: `IfError(thử làm, nếu lỗi thì làm, nếu không lỗi thì làm)`. Bên trong nhánh lỗi, `FirstError.Message` cho biết lý do.

## Một số mẹo

- Đặt các bước phụ thuộc vào kết quả (như `Navigate` sang trang khác) trong **nhánh thành công**, đừng đặt ngoài `IfError`.
- Dùng `IsError` hoặc `IsBlankOrError` để kiểm tra giá trị trước khi hiển thị.
- Với nhiều bước liên tiếp, có thể lồng `IfError` hoặc dùng dấu `;` trong mỗi nhánh để làm nhiều việc.
- Với form dùng `SubmitForm`, hãy xử lý `OnSuccess` và `OnFailure` thay vì giả định luôn thành công.

## Ghi nhật ký lỗi

Khi lỗi xảy ra ở môi trường thật, hãy ghi lại để dễ truy vết, ví dụ ghi vào một danh sách SharePoint kèm thời gian, người dùng và nội dung lỗi:

```powerfx
Patch(NhatKyLoi, Defaults(NhatKyLoi), { Title: User().Email, NoiDung: FirstError.Message })
```
