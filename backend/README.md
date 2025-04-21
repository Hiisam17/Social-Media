# Social Media Backend

Backend API cho ứng dụng mạng xã hội sử dụng Node.js, Express và PostgreSQL.

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Tạo file .env từ file .env.example và cập nhật các biến môi trường:
```bash
cp .env.example .env
```

3. Chạy migrations:
```bash
npm run migrate
```

4. Khởi động server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST /api/auth/register - Đăng ký tài khoản mới
- POST /api/auth/login - Đăng nhập
- GET /api/auth/me - Lấy thông tin người dùng hiện tại

### Users
- GET /api/users - Lấy danh sách người dùng
- GET /api/users/:id - Lấy thông tin người dùng theo ID
- PUT /api/users/:id - Cập nhật thông tin người dùng
- DELETE /api/users/:id - Xóa người dùng

### Posts
- GET /api/posts - Lấy danh sách bài viết
- POST /api/posts - Tạo bài viết mới
- GET /api/posts/:id - Lấy thông tin bài viết theo ID
- PUT /api/posts/:id - Cập nhật bài viết
- DELETE /api/posts/:id - Xóa bài viết

### Comments
- GET /api/posts/:postId/comments - Lấy danh sách bình luận của bài viết
- POST /api/posts/:postId/comments - Thêm bình luận mới
- PUT /api/comments/:id - Cập nhật bình luận
- DELETE /api/comments/:id - Xóa bình luận

### Likes
- POST /api/posts/:postId/like - Like bài viết
- DELETE /api/posts/:postId/like - Bỏ like bài viết

## Công nghệ sử dụng
- Node.js
- Express
- PostgreSQL
- Sequelize
- JWT Authentication
- Bcrypt
- CORS
- Dotenv 