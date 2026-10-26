---
title: "Delegation trong Power Apps: vì sao app chỉ thấy 500 dòng dữ liệu"
date: 2026-10-26
description: "Hiểu delegation để tránh lỗi âm thầm: app chạy đúng với dữ liệu thử nhưng sai khi dữ liệu thật tăng lên."
tags: ["Power Apps", "Power Fx", "tips"]
lang: vi
draft: false
---

Một lỗi rất hay gặp: app chạy ngon lúc thử với vài chục dòng, nhưng khi dữ liệu thật lên vài nghìn dòng thì tìm kiếm **thiếu kết quả** mà không báo lỗi gì. Nguyên nhân thường là **delegation**.

## Delegation là gì

Khi bạn dùng `Filter`, `Search`, `Sort`... trên một nguồn dữ liệu, Power Apps có hai cách xử lý:

- **Delegable**: câu truy vấn được gửi cho nguồn dữ liệu (Dataverse, SQL, SharePoint...) xử lý, rồi chỉ trả về kết quả.
- **Không delegable**: Power Apps chỉ tải về một số dòng giới hạn (mặc định **500**, tối đa chỉnh được **2000**) rồi lọc ngay trên thiết bị. Dữ liệu nằm ngoài số dòng đó sẽ bị bỏ sót.

Dấu hiệu nhận biết: công thức bị **gạch chân xanh/vàng** kèm cảnh báo delegation.

## Cách xử lý

1. Ưu tiên các hàm và toán tử mà nguồn dữ liệu hỗ trợ delegate. Ví dụ với SharePoint, `StartsWith` delegable còn `Search` thì không.
2. Lọc dữ liệu **ngay từ đầu** thay vì tải hết rồi lọc.
3. Chuyển dữ liệu lớn sang **Dataverse** hoặc SQL, hỗ trợ delegation tốt hơn.
4. Tránh ép dữ liệu qua `AddColumns` hay `Collect` khi chưa lọc.

```powerfx
// Tốt hơn: lọc theo cột có hỗ trợ delegate
Filter(
    DonHang,
    TrangThai = "Moi" && StartsWith(MaDon, txtTimKiem.Text)
)
```

## Lưu ý

Danh sách hàm và toán tử delegable **khác nhau tùy nguồn dữ liệu và thay đổi theo thời gian**, hãy kiểm tra tài liệu chính thức của Microsoft cho nguồn bạn dùng. Quan trọng nhất: luôn **thử với lượng dữ liệu thật** trước khi bàn giao.
