# Đề 32: Hệ thống Chat / Messaging đơn giản

Hệ thống Chat thời gian thực triển khai bằng Docker Compose bao gồm ứng dụng Web, Database, Reverse Proxy và Hệ thống giám sát/Log tập trung.

## 1. Thành phần hệ thống (9 Dịch vụ)
- **Web Chat App**: Node.js, Socket.io, Express.
- **Database**: PostgreSQL 15 & pgAdmin 4.
- **Reverse Proxy**: Nginx (Port 8080).
- **Monitoring**: Prometheus (Port 9091), Grafana (Port 3001), cAdvisor.
- **Logging**: Loki & Promtail.

## 2. Hướng dẫn khởi chạy

### Yêu cầu tiên quyết
- Ubuntu OS có cài sẵn Docker và Docker Compose.

### Các bước cài đặt và vận hành
1. Clone repository:
   git clone https://github.com/hoangtimi123az-svg/dtc245180029.git
   cd dtc245180029

2. Khởi chạy toàn bộ hệ thống bằng Docker Compose:
   sudo docker-compose up -d --build

3. Kiểm tra trạng thái các container:
   sudo docker-compose ps

## 3. Danh sách Cổng & Đường dẫn Truy cập (IP Máy ảo: 192.168.252.128)
- **Ứng dụng Chat (Nginx Proxy)**: http://192.168.252.128:8080
- **Grafana Dashboard**: http://192.168.252.128:3001 (Tài khoản: admin / Mật khẩu: admin123)
- **Prometheus Metrics**: http://192.168.252.128:9091
- **pgAdmin Management**: http://192.168.252.128:8080/pgadmin/ (Tài khoản: admin@admin.com / Mật khẩu: PgAdminPassword123!)

## 4. Biện pháp Bảo mật (Hardening)
- Chạy container Node.js dưới quyền non-root user (USER node).
- Phân chia mạng nội bộ (Network Isolation): frontend, backend, monitoring.
- Thiết lập mật khẩu mạnh cho Database và dịch vụ Quản trị.
- Hạn chế expose trực tiếp cơ sở dữ liệu ra ngoài internet.
