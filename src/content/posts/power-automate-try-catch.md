---
title: "Power Automate: xử lý lỗi kiểu try/catch bằng Scope"
date: 2026-10-22
description: "Gom các bước vào Scope, bắt lỗi bằng Run after và gửi cảnh báo kèm nguyên nhân cụ thể."
tags: ["Power Automate", "tips"]
lang: vi
draft: false
---

Luồng chạy ổn lúc thử rồi **lỗi âm thầm** lúc vận hành là chuyện rất hay gặp. Mẫu try/catch bằng **Scope** giúp bạn biết ngay luồng hỏng ở đâu.

## Cấu trúc

1. Tạo Scope tên **Try**, kéo các bước chính của luồng vào trong.
2. Tạo Scope tên **Catch** ngay sau đó. Vào **Configure run after** của Catch, chỉ tick **has failed** và **has timed out** (bỏ tick *is successful*).
3. Trong Catch, lấy thông tin lỗi và gửi cảnh báo (Teams hoặc email).

## Lấy nguyên nhân lỗi

Trong Catch, thêm action **Filter array** với:

- **From**: `result('Try')`
- **Điều kiện**: `item()?['status']` bằng `Failed`

Rồi dùng biểu thức sau trong tin nhắn cảnh báo để lấy nội dung lỗi đầu tiên:

```text
first(body('Filter_array'))?['error']?['message']
```

Nên kèm tên luồng và đường dẫn tới lần chạy: `workflow()?['tags']?['flowDisplayName']`.

## Thêm Finally (tùy chọn)

Tạo thêm Scope **Finally** chạy sau Catch với tất cả điều kiện (success, failed, skipped, timed out) để dọn dẹp hoặc ghi log, dù luồng thành công hay thất bại.

## Lưu ý

- Đặt tên Scope rõ ràng, vì `result('Try')` gọi theo tên Scope.
- Nếu muốn luồng vẫn báo **Failed** trong lịch sử sau khi đã gửi cảnh báo, thêm action **Terminate** với trạng thái Failed ở cuối Catch.
