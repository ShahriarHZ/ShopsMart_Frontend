import { useState } from 'react';
import { useAdminOrders, useUpdateOrderStatus } from '@/hooks/useAdmin';
import { OrderStatus } from '@/types/cart.types';

const STATUS_OPTIONS: OrderStatus[] = [
  'pending', 'confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'refunded',
];

const STATUS_BADGE: Record<string, string> = {
  pending: 'badge-ghost',
  confirmed: 'badge-info',
  packed: 'badge-info',
  shipped: 'badge-primary',
  out_for_delivery: 'badge-primary',
  delivered: 'badge-success',
  cancelled: 'badge-error',
  refunded: 'badge-warning',
};

export const AdminOrdersPage = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const { data: orders, isLoading } = useAdminOrders(statusFilter || undefined);
  const { mutate: updateStatus } = useUpdateOrderStatus();

  return (
    <div className="bg-base-200 min-h-[calc(100vh-4rem)] px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <h1 className="text-2xl font-bold">Manage Orders</h1>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-bordered select-sm"
          >
            <option value="">All statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s} className="capitalize">
                {s.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 bg-base-300 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : !orders || orders.length === 0 ? (
          <p className="text-center text-base-content/50 py-16">No orders found.</p>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order._id} className="card bg-base-100 border border-base-300">
                <div className="card-body p-4 flex-row items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-sm font-medium">{order.user?.name ?? 'Unknown customer'}</p>
                    <p className="text-xs text-base-content/50">{order.user?.email}</p>
                    <p className="text-xs text-base-content/40 mt-0.5">
                      #{order._id.slice(-8).toUpperCase()} ·{' '}
                      {new Date(order.createdAt).toLocaleDateString()} · {order.items.length} item(s)
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">${order.total.toFixed(2)}</span>
                    <span className={`badge ${STATUS_BADGE[order.status] ?? 'badge-ghost'} capitalize`}>
                      {order.status.replace(/_/g, ' ')}
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus({ orderId: order._id, status: e.target.value })}
                      className="select select-bordered select-xs"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s.replace(/_/g, ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
