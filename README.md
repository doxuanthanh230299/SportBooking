# SportBooking

SportBooking là ứng dụng web đặt sân thể thao được xây dựng bằng Next.js. Người dùng có thể tìm kiếm sân, xem thông tin chi tiết và đặt lịch trực tuyến.

## Tech Stack

-   Next.js
-   React
-   JavaScript
-   CSS / Tailwind CSS (nếu có)
-   JSON Server (`db.json`) làm dữ liệu giả lập

## Features

-   Xem danh sách sân thể thao
-   Xem chi tiết sân
-   Tìm kiếm sân
-   Đặt lịch sân
-   Quản lý thông tin đặt sân
-   Responsive trên Desktop và Mobile

## Getting Started

### Clone project

```bash
git clone https://github.com/doxuanthanh230299/SportBooking.git
cd SportBooking
```

### Install dependencies

```bash
npm install
```

### Start JSON Server

```bash
npx json-server --watch db.json --port 3001
```

API sẽ chạy tại:

```text
http://localhost:3001
```

### Start Next.js

```bash
npm run dev
```

Ứng dụng sẽ chạy tại:

```text
http://localhost:3000
```

## Project Structure

```text
SportBooking/
├── app/
├── components/
├── public/
├── db.json
├── package.json
├── next.config.js
└── README.md
```

## Sample API

### Get all courts

```http
GET /courts
```

### Get court detail

```http
GET /courts/:id
```

### Create booking

```http
POST /bookings
```

## Future Improvements

-   Authentication
-   Online payment
-   Booking notifications
-   Admin dashboard
-   Real database integration

## Author

Thanh Do

GitHub: https://github.com/doxuanthanh230299/SportBooking

## License

MIT License
