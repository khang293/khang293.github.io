---
lang: vi
title: "Ứng dụng phê duyệt nhiều cấp trên máy tính và điện thoại (Power Apps)"
summary: "Ứng dụng Power Apps (máy tính và điện thoại) cho nhân viên nội bộ duyệt hồ sơ: duyệt song song nhiều người, phân công người duyệt thay, theo dõi lịch sử, chạy trên dữ liệu SharePoint."
date: 2026-10-12
icon: "✅"
order: 3
featured: true
sample: false
role: "Thiết kế & phát triển Power Apps"
stack: ["Power Apps", "Power Fx", "Power Automate", "SharePoint"]
results:
  - "Mở rộng quy trình duyệt từ một người duyệt sang nhiều người duyệt song song (tối đa 7 vị trí), có từ chối kèm lý do và lịch sử xác nhận"
  - "Thêm chức năng phân công người duyệt thay, giữ hai phiên bản máy tính và điện thoại đồng bộ"
  - "Kiểm thử luồng duyệt với dữ liệu thật trên ứng dụng thử nghiệm, ghi lại thiết kế và công thức để người khác tiếp quản được"
---

## Bối cảnh

Hồ sơ được gửi vào hệ thống qua một kênh riêng, còn nhân viên nội bộ xử lý và duyệt trên ứng dụng Power Apps. Hai bên dùng chung dữ liệu trên SharePoint. Ứng dụng có hai phiên bản, một cho máy tính và một cho điện thoại.

## Phần việc của mình

Mình phụ trách ứng dụng Power Apps: thiết kế các màn hình duyệt, viết công thức Power Fx, giữ hai phiên bản đồng bộ và phối hợp với các luồng Power Automate gửi email có sẵn bằng cách ghi dữ liệu đúng để luồng nhận.

## Những việc đáng chú ý

**1. Duyệt nhiều cấp, song song**
Trước đây chỉ một người duyệt. Mình mở rộng để nhiều vị trí duyệt cùng lúc. Mỗi người chỉ thấy và xử lý phần việc của mình. Hồ sơ hoàn tất khi tất cả đã xác nhận, còn chỉ cần một người từ chối kèm lý do là hồ sơ quay lại để chỉnh sửa. Email kết quả chỉ gửi khi có kết luận cuối cùng, và người đã xác nhận được giữ nguyên khi hồ sơ gửi lại.

**2. Phân công người duyệt thay**
Người giữ một vị trí duyệt có thể phân công người khác cùng đơn vị xử lý thay. Ứng dụng chặn người đã duyệt, ghi lại lịch sử phân công và gửi email cho người được phân công. Màn hình và công thức giống nhau trên bản máy tính và bản điện thoại.

**3. Đồng bộ hai phiên bản ứng dụng**
Mình kiểm tra từng điều khiển và công thức giữa hai bản để chắc rằng chúng cho kết quả giống nhau, thay vì sửa một bản rồi quên bản còn lại.

**4. Đánh giá hiệu năng**
Rà soát hai ứng dụng về cảnh báo delegation, số lần gọi dữ liệu và cách tải dữ liệu, đưa ra danh sách cải thiện theo mức ưu tiên, trong đó có lưu ý về danh sách SharePoint lớn cần đặt chỉ mục.

**5. Tài liệu bàn giao**
Viết tài liệu thiết kế kèm từng điều khiển và công thức Power Fx, ghi rõ phần đã kiểm thử và phần chưa, để người khác tiếp quản mà không phải hỏi lại từ đầu.

*Mô tả ở mức khái quát, chi tiết cụ thể không được công bố.*
