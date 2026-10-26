---
lang: vi
title: "Ứng dụng quản lý và phê duyệt hồ sơ nhà thầu (Power Apps)"
summary: "Ứng dụng Power Apps (máy tính và điện thoại) cho nhân viên nội bộ duyệt hồ sơ nhà thầu: duyệt nhiều cấp, phân công người duyệt thay, theo dõi lịch sử, chạy trên dữ liệu SharePoint."
date: 2026-10-12
icon: "🧱"
order: 3
featured: true
sample: false
role: "Thiết kế & phát triển Power Apps"
stack: ["Power Apps", "Power Fx", "Power Automate", "SharePoint"]
results:
  - "Mở rộng quy trình duyệt hồ sơ nhà thầu từ một người duyệt sang nhiều người duyệt, có lịch sử xác nhận"
  - "Thêm chức năng phân công người duyệt thay, giữ bản máy tính và bản điện thoại đồng bộ"
  - "Kiểm thử luồng duyệt với dữ liệu thật trên ứng dụng thử nghiệm, ghi lại thiết kế và công thức để người khác tiếp quản được"
---

## Bối cảnh

Hệ thống quản lý nhà thầu có hai phía: nhà thầu gửi hồ sơ qua một cổng riêng, còn nhân viên nội bộ xử lý và duyệt trên ứng dụng Power Apps. Hai bên dùng chung dữ liệu trên SharePoint. Ứng dụng có hai phiên bản, một cho máy tính và một cho điện thoại.

## Phần việc của mình

Mình phụ trách ứng dụng Power Apps: thiết kế các màn hình duyệt, viết công thức Power Fx, giữ hai phiên bản đồng bộ và phối hợp với các luồng Power Automate gửi email có sẵn bằng cách ghi dữ liệu đúng để luồng nhận.

## Những việc đáng chú ý

**1. Duyệt hồ sơ nhiều cấp**
Trước đây chỉ một người duyệt. Mình mở rộng để nhiều người cùng tham gia duyệt một hồ sơ. Mỗi người chỉ thấy và xử lý phần việc của mình, có thể từ chối kèm lý do, và lịch sử xác nhận được ghi lại để theo dõi.

**2. Phân công người duyệt thay**
Người đang giữ một vị trí duyệt có thể phân công người khác xử lý thay. Ứng dụng kiểm tra điều kiện, ghi lại lịch sử phân công và thông báo cho người được phân công. Màn hình và công thức giống nhau trên bản máy tính và bản điện thoại.

**3. Đồng bộ hai phiên bản ứng dụng**
Mình kiểm tra từng điều khiển và công thức giữa hai bản để chắc rằng chúng cho kết quả giống nhau, thay vì sửa một bản rồi quên bản còn lại.

**4. Đánh giá hiệu năng**
Rà soát hai ứng dụng về cảnh báo delegation, số lần gọi dữ liệu và cách tải dữ liệu, đưa ra danh sách cải thiện theo mức ưu tiên, trong đó có lưu ý về danh sách SharePoint lớn cần đặt chỉ mục.

**5. Tài liệu bàn giao**
Viết tài liệu thiết kế kèm các điều khiển và công thức Power Fx, ghi rõ phần đã kiểm thử và phần chưa, để người khác tiếp quản mà không phải hỏi lại từ đầu.

*Mô tả ở mức khái quát, thông tin nội bộ không được công bố.*
