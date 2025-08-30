import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Edit, Trash2, User } from "lucide-react";
import { useReviews } from "@/hooks/useReviews";
import { useAuth } from "@/hooks/useAuth";

interface ReviewSectionProps {
  productId: string;
}

const ReviewSection = ({ productId }: ReviewSectionProps) => {
  const { reviews, userReview, submitReview, deleteReview, averageRating, totalReviews, loading } = useReviews(productId);
  const { user } = useAuth();
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [rating, setRating] = useState(userReview?.rating || 5);
  const [comment, setComment] = useState(userReview?.comment || '');

  const handleSubmitReview = async () => {
    await submitReview(rating, comment);
    setIsWritingReview(false);
    setComment('');
    setRating(5);
  };

  const handleEditReview = () => {
    if (userReview) {
      setRating(userReview.rating);
      setComment(userReview.comment);
      setIsWritingReview(true);
    }
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'fill-secondary text-secondary' : 'text-muted-foreground'
            } ${interactive ? 'cursor-pointer hover:text-secondary' : ''}`}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading reviews...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Reviews Summary */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <span>Customer Reviews</span>
            <div className="flex items-center gap-2">
              {renderStars(Math.round(averageRating))}
              <span className="text-sm text-muted-foreground">
                {averageRating.toFixed(1)} ({totalReviews} review{totalReviews !== 1 ? 's' : ''})
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user && !userReview && (
            <Button 
              onClick={() => setIsWritingReview(true)}
              className="mb-4"
            >
              Write a Review
            </Button>
          )}

          {user && userReview && !isWritingReview && (
            <div className="bg-muted/50 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Your Review</h4>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={handleEditReview}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={deleteReview}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                {renderStars(userReview.rating)}
                <span className="text-sm text-muted-foreground">
                  {formatDate(userReview.created_at)}
                </span>
              </div>
              {userReview.comment && (
                <p className="text-muted-foreground">{userReview.comment}</p>
              )}
            </div>
          )}

          {/* Write Review Form */}
          {isWritingReview && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{userReview ? 'Edit Review' : 'Write a Review'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  {renderStars(rating, true, setRating)}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Comment (Optional)</label>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts about this product..."
                    rows={4}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSubmitReview}>
                    {userReview ? 'Update Review' : 'Submit Review'}
                  </Button>
                  <Button variant="outline" onClick={() => setIsWritingReview(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      {reviews.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">All Reviews</h3>
          {reviews.map((review) => (
            <Card key={review.id} className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(review.rating)}
                      <span className="text-sm text-muted-foreground">
                        {formatDate(review.created_at)}
                      </span>
                    </div>
                    {review.comment && (
                      <p className="text-muted-foreground">{review.comment}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {reviews.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No reviews yet. Be the first to review this product!
        </div>
      )}
    </div>
  );
};

export default ReviewSection;