import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DollarSign, ShoppingBag, Users, Package, AlertTriangle, TrendingUp } from 'lucide-react';
import { useDashboardStats, useRevenueSeries } from '@/hooks/useAdmin';
import { RestockRow } from '@/components/admin/RestockRow';

const StatCard = ({
  icon: Icon,
  label,
  value,
  tint,
}: {
  icon: typeof DollarSign;
  label: string;
  value: string;
  tint: string;
}) => (
  <div className="card bg-base-100 border border-base-300">
    <div className="card-body p-5 flex-row items-center gap-4">
      <div className={`w-11 h-11 rounded-xl grid place-items-center ${tint}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs text-base-content/50">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);

export const AdminDashboardPage = () => {
  const { data: stats, isLoading } = useDashboardStats();
  const { data: revenueSeries } = useRevenueSeries(30);

  if (isLoading || !stats) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-base-300 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-base-200 min-h-[calc(100vh-4rem)] px-4 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Link to="/admin/orders" className="btn btn-outline btn-sm">Manage Orders</Link>
            <Link to="/admin/coupons" className="btn btn-outline btn-sm">Manage Coupons</Link>
            <Link to="/admin/products/new" className="btn btn-primary btn-sm">Add Product</Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={DollarSign} label="Total Revenue" value={`$${stats.totalRevenue.toFixed(2)}`} tint="bg-success/10 text-success" />
          <StatCard icon={TrendingUp} label="This Month" value={`$${stats.monthlyRevenue.toFixed(2)}`} tint="bg-primary/10 text-primary" />
          <StatCard icon={ShoppingBag} label="Total Orders" value={String(stats.totalOrders)} tint="bg-info/10 text-info" />
          <StatCard icon={Users} label="Customers" value={String(stats.totalUsers)} tint="bg-secondary/10 text-secondary" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Revenue chart */}
          <div className="lg:col-span-2 card bg-base-100 border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-base">Revenue — Last 30 Days</h2>
              <div className="h-64 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueSeries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--fallback-b3,oklch(var(--b3)))" />
                    <XAxis dataKey="_id" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
                      contentStyle={{ borderRadius: 8, fontSize: 12 }}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-base-content/50 mt-2">
                Average order value:{' '}
                <span className="font-medium text-base-content">${stats.averageOrderValue.toFixed(2)}</span>
              </p>
            </div>
          </div>

          {/* Low stock + out of stock alerts, with inline restock */}
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-base flex items-center gap-2">
                <AlertTriangle size={18} className="text-warning" /> Inventory Alerts
              </h2>
              {stats.outOfStockProducts.length === 0 && stats.lowStockProducts.length === 0 ? (
                <p className="text-sm text-base-content/50">Stock levels look healthy.</p>
              ) : (
                <ul className="divide-y divide-base-300">
                  {stats.outOfStockProducts.map((p) => (
                    <RestockRow key={p._id} product={p} />
                  ))}
                  {stats.lowStockProducts.map((p) => (
                    <RestockRow key={p._id} product={p} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Best sellers */}
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-base flex items-center gap-2">
                <Package size={18} /> Best Selling Products
              </h2>
              {stats.bestSellingProducts.length === 0 ? (
                <p className="text-sm text-base-content/50">No sales yet.</p>
              ) : (
                <div className="space-y-3 mt-2">
                  {stats.bestSellingProducts.map((p) => (
                    <div key={p._id} className="flex items-center gap-3">
                      <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover bg-base-200" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{p.title}</p>
                        <p className="text-xs text-base-content/50">{p.totalSold} sold</p>
                      </div>
                      <span className="text-sm font-medium">${p.revenue.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent orders */}
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-base">Recent Orders</h2>
              {stats.recentOrders.length === 0 ? (
                <p className="text-sm text-base-content/50">No orders yet.</p>
              ) : (
                <div className="space-y-2 mt-2">
                  {stats.recentOrders.map((o) => (
                    <div key={o._id} className="flex items-center justify-between text-sm">
                      <span className="line-clamp-1">{o.user?.name ?? 'Unknown'}</span>
                      <span className="badge badge-ghost badge-sm capitalize">{o.status}</span>
                      <span className="font-medium">${o.total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
