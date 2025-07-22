// ReviewsPage.jsx
import { Info, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { useToast } from "../../../../contexts/ToastContext";
import api from "../../../../utils/api";
import { API_ENDPOINTS } from "../../../../utils/constants";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const { error, success } = useToast();

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await api.get(API_ENDPOINTS.REVIEWS);
      setReviews(res.data.reviews);
    } catch (err) {
      error(err.res.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`${API_ENDPOINTS.DELETE_REVIEW}/${id}`);
      success("Review deleted successfully");
      fetchReviews();
    } catch (err) {
      error(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Reviews
      </h2>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm bg-white dark:bg-gray-800 rounded-lg">
            <thead className="bg-gold-100 dark:bg-gold-600 text-left text-gray-900 dark:text-white">
              <tr>
                <th className="px-4 py-2">Guest</th>
                <th className="px-4 py-2">Room</th>
                <th className="px-4 py-2">Rating</th>
                <th className="px-4 py-2">Comment</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 dark:text-gray-200">
              {reviews.map((review) => (
                <tr key={review._id} className="border-t dark:border-gray-700">
                  <td className="px-4 py-2">{review.guest?.name || "-"}</td>
                  <td className="px-4 py-2">
                    {review.room?.roomNumber || "-"}
                  </td>
                  <td className="px-4 py-2">{review.rating} / 5</td>
                  <td className="px-4 py-2 max-w-xs truncate">
                    {review.comment}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center items-center space-x-2">
                      <button
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-white"
                        onClick={() => setSelectedReview(review)}
                      >
                        <Info className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(review._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {reviews.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center px-4 py-4 text-gray-500 dark:text-gray-400"
                  >
                    No reviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl max-w-xl w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Review Details
            </h3>
            <p className="text-sm dark:text-gray-300">
              <strong>Guest:</strong> {selectedReview.guest?.name || "-"}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Room:</strong> {selectedReview.room?.roomNumber || "-"}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Rating:</strong> {selectedReview.rating} / 5
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Comment:</strong> {selectedReview.comment}
            </p>
            <button
              onClick={() => setSelectedReview(null)}
              className="mt-4 bg-gold-500 text-white px-4 py-2 rounded hover:bg-gold-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
