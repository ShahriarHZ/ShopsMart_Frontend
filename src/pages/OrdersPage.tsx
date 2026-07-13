import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { useMyOrders } from '@/hooks/useCheckout';
import { OrderStatus } from '@/types/cart.types';

const STATUS_BADGE: Record<OrderStatus, string> = {
  pending: 'badge-ghost',
  confirmed: 'badge-info',
  packed: 'badge-info',
  shipped: 'badge-primary',
  out_for_delivery: 'badge-primary',
  delivered: 'badge-success',
  cancelled: 'badge-error',
  refunded: 'badge-warning',
};

const formatStatus = (status: OrderStatus) => status.replace(/_/g, ' ');

export const OrdersPage = () => {
  const { data: orders, isLoading } = useMyOrders();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-28 bg-base-300 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-24">
        <Package className="mx-auto text-base-content/30 mb-3" size={48} />
        <p className="text-lg text-base-content/60">No orders yet.</p>
        <Link to="/products" className="btn btn-primary mt-4">Start shopping</Link>
      </div>
    );
  }

  return (
    <div className="bg-base-200 min-h-[calc(100vh-4rem)] px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Order History</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="card bg-base-100 border border-base-300">
              <div className="card-body p-5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <p className="text-xs text-base-content/40">Order #{order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-sm text-base-content/60">
                      {new Date(order.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <span className={`badge ${STATUS_BADGE[order.status]} capitalize`}>{formatStatus(order.status)}</span>
                </div>

                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {order.items.map((item, idx) => (
                    <img
                      key={idx}
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 rounded-lg object-cover bg-base-200 flex-shrink-0"
                      title={`${item.title} × ${item.quantity}`}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-base-300">
                  <span className="text-sm text-base-content/50">{order.items.length} item(s)</span>
                  <span className="font-semibold">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
