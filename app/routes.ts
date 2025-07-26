import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout('routes/client/layout.tsx', [
    index('routes/client/home.tsx'),
    route('/cars', 'routes/client/cars.tsx'),
    route('/cars/:id', 'routes/client/car-details.tsx'),
    route('/my-bookings', 'routes/client/my-bookings.tsx'),
  ]),
  layout('routes/auth/layout.tsx', [
    route('/sign-in', 'routes/auth/sign-in.tsx'),
    route('/sign-up', 'routes/auth/sign-up.tsx'),
  ]),
  layout('routes/owner/layout.tsx', [
    route('/owner', 'routes/owner/dashboard.tsx'),
    route('/owner/manage-cars', 'routes/owner/manage-cars.tsx'),
    route('/owner/manage-bookings', 'routes/owner/manage-bookings.tsx'),
    route('/owner/add-car', 'routes/owner/add-car.tsx'),
  ]),
  layout('routes/admin/layout.tsx', [
    route('/admin/dashboard', 'routes/admin/dashboard.tsx'),
  ]),
  route('*', 'routes/catchall.tsx'),
] satisfies RouteConfig;
