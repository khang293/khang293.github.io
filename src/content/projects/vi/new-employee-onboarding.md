---
lang: vi
title: "Tự động hóa quy trình tiếp nhận nhân viên mới (Power Automate)"
summary: "Bộ luồng Power Automate điều phối việc chuẩn bị cho nhân viên mới: thông báo đúng bộ phận, cấp máy tính, cấp email, cấp đồng phục, kèm phê duyệt cho từng lần cấp và nhắc việc khi chưa xử lý."
icon: "🧑‍💼"
order: 5
featured: true
sample: false
role: "Thiết kế & phát triển"
stack: ["Power Automate", "Microsoft 365"]
flow: ["Có nhân viên mới", "Thông báo từng bộ phận", "Phê duyệt từng hạng mục", "Thực hiện cấp phát", "Nhắc việc nếu chưa xử lý"]
results:
  - "Thông báo tự động đến đúng bộ phận khi có nhân viên mới, không phải nhắn tay từng nơi"
  - "Mỗi lần cấp máy tính, email hoặc đồng phục đều có bước phê duyệt rõ ràng"
  - "Quy trình thống nhất cho mọi nhân viên mới, ít bị sót việc"
---

## Bối cảnh

Khi có nhân viên mới, nhiều bộ phận phải chuẩn bị cùng lúc: IT cấp máy tính và tài khoản email, hành chính cấp đồng phục và các vật dụng khác. Nếu điều phối bằng tin nhắn và email thủ công, rất dễ sót một hạng mục hoặc không ai biết việc đã được duyệt và hoàn tất chưa.

## Giải pháp

Mình xây dựng một bộ luồng **Power Automate** chạy theo quy trình tiếp nhận nhân viên mới:

- **Thông báo tự động**: khi có nhân viên mới, luồng gửi thông báo đến đúng bộ phận phụ trách từng hạng mục.
- **Các hạng mục cấp phát**: cấp máy tính, cấp email, cấp đồng phục và các vật dụng liên quan.
- **Phê duyệt cho mỗi lần cấp**: từng hạng mục đi qua bước phê duyệt trước khi thực hiện.
- **Nhắc việc** khi có hạng mục chưa được xử lý.

## Điểm đáng chú ý

- **Một quy trình chung** cho mọi nhân viên mới, thay vì phụ thuộc vào việc ai nhớ nhắn ai.
- **Tách theo hạng mục**: mỗi loại cấp phát có người phụ trách và bước duyệt riêng, dễ điều chỉnh khi quy định thay đổi.
- **Thông báo đúng người, đúng lúc**, giảm việc phải nhắc đi nhắc lại.

*Mô tả ở mức khái quát, thông tin nội bộ không được công bố.*
