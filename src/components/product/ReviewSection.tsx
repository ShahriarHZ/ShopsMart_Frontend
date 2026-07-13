import { useState } from 'react';
import { Star } from 'lucide-react';
import { useProductReviews, useCreateReview, useDeleteReview } from '@/hooks/useReviews';
import { useAuthStore } from '@/store/authStore';

export const ReviewSection = ({ productId }: { productId: string }) => {
  const { data, isLoading } = useProductReviews(productId);
  const { user, isAuthenticated } = useAuthStore();
  const { mutate: submitReview, isPending } = useCreateReview(productId);
  const { mutate: deleteReview } = useDeleteReview(productId);

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);

  const reviews = data?.reviews ?? [];
  const distribution = data?.distribution ?? {};
  const totalReviews = reviews.length;
  const alreadyReviewed = !!user && reviews.some((r) => r.user === user.id);

  const handleSubmit = () => {
    if (comment.trim().length < 3) return;
    submitReview(
      { rating, comment },
      {
        onSuccess: () => {
          setShowForm(false);
          setComment('');
        },
      }
    );
  };

  if (isLoading) {
    return <div className="h-40 bg-base-300 rounded-2xl animate-pulse mt-16" />;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Reviews {totalReviews > 0 && `(${totalReviews})`}</h2>

      {/* Rating distribution */}
      {totalReviews > 0 && (
        <div className="card bg-base-100 border border-base-300 mb-6">
          <div className="card-body p-5 space-y-1.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = distribution[star] ?? 0;
              const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-3 text-sm">
                  <span className="w-10 text-base-content/60">{star} star</span>
                  <progress className="progress progress-warning flex-1" value={pct} max={100} />
                  <span className="w-8 text-right text-base-content/50">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Write a review */}
      {isAuthenticated && !alreadyReviewed && (
        <div className="mb-6">
          {!showForm ? (
            <button onClick={() => setShowForm(true)} className="btn btn-outline btn-sm">
              Write a review
            </button>
          ) : (
            <div className="card bg-base-100 border border-base-300">
              <div className="card-body p-5 gap-3">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        size={22}
                        className={
                          star <= (hoverRating || rating) ? 'fill-warning text-warning' : 'text-base-300'
                        }
                      />
                    </button>
                  ))}
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts on this product..."
                  className="textarea textarea-bordered w-full min-h-[90px]"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSubmit}
                    disabled={isPending || comment.trim().length < 3}
                    className="btn btn-primary btn-sm"
                  >
                    {isPending ? <span className="loading loading-spinner loading-xs" /> : 'Submit review'}
                  </button>
                  <button onClick={() => setShowForm(false)} className="btn btn-ghost btn-sm">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Review list */}
      {totalReviews === 0 ? (
        <p className="text-base-content/50 text-sm">No reviews yet — be the first to share your thoughts.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="border-b border-base-300 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="avatar placeholder">
                    <div className="bg-base-300 text-base-content rounded-full w-8">
                      <span className="text-xs">{review.userName[0]?.toUpperCase()}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{review.userName}</p>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < review.rating ? 'fill-warning text-warning' : 'text-base-300'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-base-content/40">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                  {user?.id === review.user && (
                    <button
                      onClick={() => deleteReview(review._id)}
                      className="text-xs text-error hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
              <p className="text-sm text-base-content/70 mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
