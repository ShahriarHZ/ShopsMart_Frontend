import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useUpdateStock } from '@/hooks/useAdmin';

export const RestockRow = ({ product }: { product: { _id: string; title: string; stock: number; sku: string } }) => {
  const [amount, setAmount] = useState(10);
  const { mutate: updateStock, isPending } = useUpdateStock();

  return (
    <li className="flex items-center justify-between gap-2 text-sm py-1.5">
      <div className="min-w-0 flex-1">
        <p className="line-clamp-1">{product.title}</p>
        <p className="text-xs text-base-content/40">{product.sku}</p>
      </div>
      <span className={`badge badge-sm ${product.stock === 0 ? 'badge-error' : 'badge-warning'}`}>
        {product.stock === 0 ? 'Out of stock' : `${product.stock} left`}
      </span>
      <div className="join">
        <input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(Math.max(1, Number(e.target.value)))}
          className="input input-bordered input-xs join-item w-14"
        />
        <button
          onClick={() => updateStock({ productId: product._id, stock: product.stock + amount })}
          disabled={isPending}
          className="btn btn-xs btn-primary join-item gap-1"
        >
          <Plus size={12} /> Add
        </button>
      </div>
    </li>
  );
};
