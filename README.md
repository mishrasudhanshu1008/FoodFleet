# FoodFleet – MERN Food Ordering & Delivery Management System

A real-world scenario-based MERN project for LPU CAP646 – Full Stack Web Development.

## Assignment coverage (all 15 required points)

| # | Assignment requirement | Where it is implemented |
|---|---|---|
| 1 | Create multiple React components | `frontend/src/components/` (Navbar, FoodCard, RestaurantCard, ProtectedRoute, Layout) |
| 2 | Responsive web design | `frontend/src/index.css` + responsive Tailwind utility classes |
| 3 | Tailwind CSS or Bootstrap | Tailwind CSS v4 using `@tailwindcss/vite` |
| 4 | Fetch API | `frontend/src/services/api.js` uses native `fetch()` for backend requests |
| 5 | Error handling | API error handling, Express error middleware, form validation and loading/error states |
| 6 | Props and State | Components receive props; React `useState` manages UI, forms and filters |
| 7 | Conditional rendering | Role-specific dashboard, login state, order states, empty/loading/error states |
| 8 | React Router and Protected Routes | `App.jsx`, `ProtectedRoute.jsx`, role restrictions |
| 9 | Forms and form validation | Register, login, restaurant and food forms |
| 10 | Hooks / Context API | `useState`, `useEffect`, `useContext`, `AuthContext`, `CartContext` |
| 11 | Create and use REST API | Express routes under `/api` |
| 12 | Secure data using environment variables | Backend `.env.example`, JWT secret and Mongo URI |
| 13 | MongoDB | MongoDB database through Mongoose |
| 14 | Integrate MongoDB Atlas | `MONGO_URI` supports Atlas SRV connection string |
| 15 | Mongoose schemas | User, Restaurant, Food, Order, Review, Delivery models |

## Technology stack
- MongoDB Atlas / MongoDB
- Express.js, Node.js
- React + Vite
- Tailwind CSS v4
- React Router
- Native Fetch API
- JWT + bcryptjs
- Mongoose

## Requirements
- Node.js 20+ recommended
- npm
- MongoDB Atlas account or local MongoDB
- VS Code

## Project structure
```text
FoodFleet/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Setup from zero

### 1. Extract the ZIP
Extract `FoodFleet.zip`. Open the extracted `FoodFleet` folder in VS Code.

### 2. Configure backend
Open a terminal:
```powershell
cd backend
npm install
```
Copy `.env.example` to `.env`:
```powershell
Copy-Item .env.example .env
```
Open `backend/.env` and set your MongoDB connection string and a long random JWT secret:
```env
PORT=5000
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/foodfleet
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```
Do not share `.env` or commit it to GitHub.

Start backend:
```powershell
npm run dev
```
Expected: `FoodFleet API running on port 5000` and `MongoDB connected`.

### 3. Configure frontend (new terminal)
```powershell
cd frontend
npm install
```
Copy `.env.example` to `.env`:
```powershell
Copy-Item .env.example .env
```
Default value:
```env
VITE_API_URL=http://localhost:5000/api
```
Start frontend:
```powershell
npm run dev
```
Open the Vite URL, normally `http://localhost:5173`.

## First-time use
1. Register an account from the website. The first registered account is a normal customer.
2. For demo role testing, create users with roles through MongoDB or use the optional admin bootstrap described below.
3. To make the first account an admin, temporarily set `ALLOW_ADMIN_REGISTER=true` in backend `.env`, register with role `admin`, then set it back to `false`. Never leave public admin registration enabled in production.
4. Restaurant owner accounts can create restaurants and menu items. Admin can manage all resources.
5. A customer can add food to cart and place an order. Restaurant owner/admin can update order status. Delivery partner/admin can update delivery status.

## API overview
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/restaurants`
- `POST /api/restaurants` (admin/restaurant)
- `GET /api/foods`
- `POST /api/foods` (admin/restaurant)
- `GET /api/orders/my`
- `POST /api/orders`
- `GET /api/orders` (admin/restaurant/delivery)
- `PATCH /api/orders/:id/status`
- `PATCH /api/orders/:id/assign-delivery`
- `POST /api/reviews`

## Important project notes
- This is an academic project starter with working core flows, not a production payment gateway.
- Checkout uses Cash on Delivery as a demo payment method. Do not collect real card details.
- Restaurant discovery is currently based on city/category/search, not live GPS. Real-time map tracking and payment gateway can be added as extensions.
- Use a valid MongoDB Atlas database user and IP access list. Avoid `0.0.0.0/0` except temporary testing.
