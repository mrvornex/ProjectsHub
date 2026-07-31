"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { colors } from "@/app/constants/colors";
import { auth, db, storage } from "@/app/utils/firebase";
import { onAuthStateChanged, updateProfile, User } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit as limitQuery,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FiStar, FiX } from "react-icons/fi";
import { MdOutlineRateReview } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

type ReviewType = {
  id?: string;
  name: string;
  email: string;
  rating: number;
  review: string;
  photo?: string;
  createdAt: any;
  userId?: string | null;
};

type ReviewsProps = {
  maxReviews?: number;
  showViewAllButton?: boolean;
  autoRefresh?: boolean;
};

export default function ReviewsSection({
  maxReviews = 4,
  showViewAllButton = true,
  autoRefresh = true,
}: ReviewsProps) {
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState({ submit: false, fetch: true, auth: true });
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  const router = useRouter();

  const avgRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    return Math.round((total / reviews.length) * 10) / 10;
  }, [reviews]);

  const formatTime = useCallback((createdAt: any) => {
    if (!createdAt) return "Recently";
    const date = createdAt?.toDate ? createdAt.toDate() : new Date(createdAt);
    if (isNaN(date.getTime())) return "Recently";
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    if (diffDay < 7) return `${diffDay}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }, []);

  const toggleExpand = useCallback((id?: string) => {
    if (!id) return;
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser && (!currentUser.displayName || currentUser.displayName.trim() === "")) {
          await updateProfile(currentUser, { displayName: currentUser.email?.split("@")[0] || "User" });
        }
        setUser(currentUser);
      } catch (error) {
        console.error("Auth error:", error);
      } finally {
        setLoading((prev) => ({ ...prev, auth: false }));
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, fetch: true }));
      const q = query(
        collection(db, "testimonials"),
        orderBy("createdAt", "desc"),
        ...(maxReviews ? [limitQuery(maxReviews)] : [])
      );
      const snapshot = await getDocs(q);
      const reviewsData = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as ReviewType) }));
      setReviews(reviewsData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setLoading((prev) => ({ ...prev, fetch: false }));
    }
  }, [maxReviews]);

  useEffect(() => {
    fetchReviews();
    let interval: NodeJS.Timeout;
    if (autoRefresh) interval = setInterval(fetchReviews, 30000);
    return () => interval && clearInterval(interval);
  }, [fetchReviews, autoRefresh]);

  const handlePhotoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast.error("Image must be less than 5MB");
    if (!file.type.startsWith("image/")) return toast.error("Please select an image file");
    setPhoto(file);
  }, []);

  const handleSubmit = async () => {
    if (!rating) return toast.error("Please select a rating");
    if (!reviewText.trim() || reviewText.trim().length < 10)
      return toast.error("Review must be at least 10 characters");
    if (!user && guestName.trim().length < 2) return toast.error("Please enter your name");

    setLoading((prev) => ({ ...prev, submit: true }));

    try {
      let photoURL = "";
      if (photo) {
        const photoName = `${Date.now()}_${user?.uid || "guest"}_${photo.name.replace(/\s+/g, "_")}`;
        const photoRef = ref(storage, `testimonials/${photoName}`);
        await uploadBytes(photoRef, photo);
        photoURL = await getDownloadURL(photoRef);
      }

      const reviewData: ReviewType = {
        name: user?.displayName || guestName || "Anonymous",
        email: user?.email || guestEmail || "",
        rating,
        review: reviewText.trim(),
        photo: photoURL,
        userId: user?.uid || null,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "testimonials"), reviewData);

      toast.success("Review submitted successfully!");
      setRating(0);
      setReviewText("");
      setGuestName("");
      setGuestEmail("");
      setPhoto(null);
      setShowModal(false);
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Try again.");
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  const renderStars = (value: number, size: "sm" | "md" | "lg" = "md", interactive = false) => {
    const sizeClasses = { sm: "text-base", md: "text-xl", lg: "text-2xl" };
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            onClick={interactive ? () => setRating(star) : undefined}
            className={`${sizeClasses[size]} ${interactive ? "cursor-pointer" : ""}`}
            style={{
              color: star <= value ? "#F59E0B" : colors.border,
              fill: star <= value ? "#F59E0B" : "none",
            }}
          />
        ))}
      </div>
    );
  };

  const getInitials = (name: string) =>
    name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  const displayedReviews = maxReviews ? reviews.slice(0, maxReviews) : reviews;

  return (
    <section className="max-w-6xl mx-auto py-10 px-4" style={{ background: colors.background }}>
      <Toaster position="top-right" />

      {/* Header */}
      <div className="text-center mb-12">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border text-sm font-medium"
          style={{ borderColor: colors.primary, color: colors.primary }}
        >
          Testimonials
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.color }}>
          What People Say
        </h2>
        <p className="text-lg max-w-xl mx-auto opacity-70 mb-8" style={{ color: colors.color }}>
          Real feedback from people who've used JSProjectForge
        </p>

        <div className="mb-8">
          <div className="text-5xl font-bold" style={{ color: colors.color }}>
            {avgRating.toFixed(1)}
          </div>
          <div className="flex justify-center mt-2">{renderStars(avgRating, "lg")}</div>
          <p className="mt-2 opacity-70" style={{ color: colors.color }}>
            Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity min-w-[200px] flex items-center justify-center gap-2"
            style={{ background: colors.primary, color: colors.background }}
          >
            <MdOutlineRateReview />
            Write a Review
          </button>
          {showViewAllButton && reviews.length > 0 && (
            <button
              onClick={() => router.push("/testimonials")}
              className="px-6 py-3 rounded-lg font-semibold border hover:bg-gray-50 transition-colors min-w-[200px]"
              style={{ borderColor: colors.border, color: colors.color }}
            >
              View All Reviews
            </button>
          )}
        </div>
      </div>

      {/* Reviews Grid */}
      {loading.fetch ? (
        <div className="flex justify-center py-16">
          <div
            className="animate-spin rounded-full h-10 w-10 border-b-2"
            style={{ borderColor: colors.primary }}
          />
        </div>
      ) : displayedReviews.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-xl font-bold mb-2" style={{ color: colors.color }}>
            No Reviews Yet
          </h3>
          <p className="opacity-70" style={{ color: colors.color }}>
            Be the first to share your experience.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {displayedReviews.map((review) => (
            <article
              key={review.id}
              className="rounded-xl border p-6 hover:shadow-md transition-shadow flex flex-col"
              style={{ borderColor: colors.border }}
            >
              <div className="mb-3">{renderStars(review.rating, "sm")}</div>

              <div className="flex-grow mb-5">
                <p
                  className={`text-sm opacity-80 ${
                    review.review.length > 150 && !expanded[review.id ?? ""] ? "line-clamp-4" : ""
                  }`}
                  style={{ color: colors.color }}
                >
                  {review.review}
                </p>
                {review.review.length > 150 && (
                  <button
                    onClick={() => toggleExpand(review.id)}
                    className="mt-2 text-sm font-medium hover:underline"
                    style={{ color: colors.primary }}
                  >
                    {expanded[review.id ?? ""] ? "Show less" : "Read more"}
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: colors.border }}>
                {review.photo ? (
                  <Image
                    src={review.photo}
                    alt={review.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: colors.primary, color: colors.background }}
                  >
                    {getInitials(review.name)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate" style={{ color: colors.color }}>
                    {review.name}
                  </h4>
                  <p className="text-xs opacity-60" style={{ color: colors.color }}>
                    {formatTime(review.createdAt)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl p-6"
            style={{ background: colors.background }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 opacity-60 hover:opacity-100"
              style={{ color: colors.color }}
            >
              <FiX size={20} />
            </button>

            <h3 className="text-xl font-bold mb-4" style={{ color: colors.color }}>
              Write a Review
            </h3>

            {!user && (
              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Your Name*"
                  className="w-full px-4 py-2 border rounded-lg text-sm"
                  style={{ borderColor: colors.border, color: colors.color }}
                />
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="Your Email (optional)"
                  className="w-full px-4 py-2 border rounded-lg text-sm"
                  style={{ borderColor: colors.border, color: colors.color }}
                />
              </div>
            )}

            <div className="mb-4">{renderStars(rating, "lg", true)}</div>

            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border rounded-lg text-sm mb-4"
              style={{ borderColor: colors.border, color: colors.color }}
              placeholder="Your review..."
            />

            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full text-sm mb-4"
            />

            <button
              onClick={handleSubmit}
              disabled={loading.submit}
              className="w-full px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ background: colors.primary, color: colors.background }}
            >
              {loading.submit ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}