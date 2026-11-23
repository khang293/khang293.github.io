---
title: "Tự động hóa duyệt đơn bằng Power Automate và Teams: không còn nhắn tin, email qua lại"
date: 2026-11-23
description: "Đơn xin nghỉ, đề nghị mua hàng, phê duyệt chi phí: cách để người duyệt bấm một nút trong Teams, còn hệ thống tự cập nhật trạng thái và thông báo cho người gửi."
tags: ["Power Automate", "Teams", "phê duyệt", "doanh nghiệp nhỏ"]
lang: vi
draft: false
---

Nhiều doanh nghiệp vẫn duyệt đơn theo kiểu: nhân viên gửi email hoặc nhắn Zalo, sếp trả lời "ok", rồi ai đó chép kết quả vào file Excel. Cách này có ba vấn đề quen thuộc: đơn bị trôi trong hộp thư, không biết đơn đang nằm ở ai, và khi cần tra lại thì không có lịch sử rõ ràng.

Nếu công ty đã dùng Microsoft 365, bạn có thể làm quy trình duyệt tự động mà không cần phần mềm mới.

## Quy trình sau khi tự động hóa

1. Nhân viên điền đơn (một form hoặc một app đơn giản).
2. Hệ thống gửi yêu cầu duyệt đến đúng người, **hiện ngay trong Teams** và qua email.
3. Người duyệt bấm **Phê duyệt** hoặc **Từ chối**, có thể ghi chú lý do.
4. Trạng thái tự cập nhật vào danh sách đơn, người gửi nhận thông báo.
5. Mọi đơn đều được lưu lại: ai gửi, ai duyệt, khi nào, kết quả ra sao.

## Cách hoạt động bên dưới

Mình dùng hành động **Start and wait for an approval** của Power Automate (nhóm Approvals). Hành động này gửi yêu cầu đến người duyệt, **chờ** họ trả lời, rồi chạy tiếp các bước sau. Có thể chọn:

- **Một người duyệt**, hoặc **nhiều người** (chỉ cần một người đồng ý, hoặc tất cả phải đồng ý).
- **Duyệt nhiều cấp**: ví dụ trưởng phòng duyệt trước, rồi đến giám đốc nếu số tiền lớn hơn một ngưỡng.
- **Nhắc nhở** nếu quá hạn mà người duyệt chưa trả lời.

Sau khi có kết quả, luồng kiểm tra điều kiện (Phê duyệt hay Từ chối), cập nhật trạng thái trong SharePoint hoặc Dataverse, và gửi thông báo cho người gửi.

## Phù hợp với ai

- Doanh nghiệp nhỏ và vừa đã dùng Microsoft 365 nhưng vẫn duyệt thủ công.
- Các loại đơn lặp đi lặp lại: nghỉ phép, mua sắm, thanh toán, tạm ứng, đăng ký xe, đăng ký phòng họp.

## Kết quả thường thấy

Trong các dự án mình đã làm (xem mục Dự án):

- Quy trình tiếp nhận nhân viên mới: tự thông báo đến đúng bộ phận, mỗi lần cấp máy tính, email hay đồng phục đều có bước phê duyệt rõ ràng, và có nhắc việc khi chưa xử lý, nên ít bị sót việc.
- Ứng dụng duyệt hồ sơ nhà thầu: duyệt nhiều cấp, có người duyệt thay, và lưu lịch sử xác nhận để tra lại khi cần.
- Hệ thống hợp đồng: phê duyệt theo cấu hình, có ủy quyền và lịch sử phê duyệt.

## Cần chuẩn bị gì

- Tài khoản Microsoft 365 của công ty (hầu hết gói đã có sẵn Power Automate cho các hành động tiêu chuẩn như Approvals và SharePoint; nên kiểm tra gói cụ thể của bạn).
- Danh sách ai duyệt loại đơn nào, và ngưỡng nào thì lên cấp cao hơn.

Thời gian làm và chi phí phụ thuộc số cấp duyệt, số loại đơn và nơi lưu dữ liệu. Mình báo giá cụ thể sau khi trao đổi, và việc trao đổi ban đầu là miễn phí.

## Bạn muốn làm cho công ty mình?

Cho mình biết quy trình duyệt hiện tại đang chạy thế nào, mình sẽ tư vấn miễn phí cách tự động hóa và ước tính thời gian làm. Xem trang Liên hệ hoặc nhắn qua Zalo ở góc màn hình.
