import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

export const useReviews = (productId?: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchReviews = async () => {
    if (!productId) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
      
      // Find user's review if they're logged in
      if (user) {
        const userReviewData = data?.find(review => review.user_id === user.id);
        setUserReview(userReviewData || null);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId, user]);

  const submitReview = async (rating: number, comment: string) => {
    if (!user || !productId) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to leave a review",
        variant: "destructive"
      });
      return;
    }

    try {
      const reviewData = {
        user_id: user.id,
        product_id: productId,
        rating,
        comment
      };

      let error;
      
      if (userReview) {
        // Update existing review
        const { error: updateError } = await supabase
          .from('reviews')
          .update({ rating, comment, updated_at: new Date().toISOString() })
          .eq('id', userReview.id);
        error = updateError;
      } else {
        // Create new review
        const { error: insertError } = await supabase
          .from('reviews')
          .insert(reviewData);
        error = insertError;
      }

      if (error) throw error;
      
      await fetchReviews();
      toast({
        title: userReview ? "Review updated" : "Review submitted",
        description: "Thank you for your feedback!"
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deleteReview = async () => {
    if (!userReview || !user) return;

    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', userReview.id);

      if (error) throw error;
      
      await fetchReviews();
      toast({
        title: "Review deleted",
        description: "Your review has been removed"
      });
    } catch (error) {
      console.error('Error deleting review:', error);
      toast({
        title: "Error",
        description: "Failed to delete review",
        variant: "destructive"
      });
    }
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return {
    reviews,
    loading,
    userReview,
    submitReview,
    deleteReview,
    averageRating,
    totalReviews: reviews.length,
    refreshReviews: fetchReviews
  };
};