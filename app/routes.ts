import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout('routes/client/layout.tsx', [
    index('routes/client/home.tsx'),
    route('/cars', 'routes/client/cars.tsx'),
    route('/cars/:id', 'routes/client/car-details.tsx'),
    route('/my-bookings', 'routes/client/my-bookings.tsx'),
    route('/owner', 'routes/client/owner.tsx'),
  ]),
  layout('routes/auth/layout.tsx', [
    route('/sign-in', 'routes/auth/sign-in.tsx'),
    route('/sign-up', 'routes/auth/sign-up.tsx'),
  ]),
  layout('routes/admin/layout.tsx', [
    route('/admin/dashboard', 'routes/admin/dashboard.tsx'),
  ]),
  route('*', 'routes/catchall.tsx'),
] satisfies RouteConfig;
