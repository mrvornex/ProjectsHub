"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
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
import { FiStar, FiCamera, FiX, FiCheck, FiUpload } from "react-icons/fi";
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

type UploadState = {
  progress: number;
  isUploading: boolean;
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
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState({ submit: false, fetch: true, auth: true });
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [uploadState, setUploadState] = useState<UploadState>({ progress: 0, isUploading: false });
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  const router = useRouter();

  const avgRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    return Math.round((total / reviews.length) * 10) / 10;
  }, [reviews]);

  const ratingDistribution = useMemo(() => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        distribution[review.rating as keyof typeof distribution]++;
      }
    });
    return distribution;
  }, [reviews]);

  const formatTime = useCallback((createdAt: any) => {
    if (!createdAt) return "Recently";
    const date = createdAt?.toDate ? createdAt.toDate() : new Date(createdAt);
    if (isNaN(date.getTime())) return "Recently";
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    if (diffSec < 60) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    if (diffDay < 7) return `${diffDay}d ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: diffDay > 365 ? "numeric" : undefined,
    });
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
        toast.error("Authentication error");
      } finally {
        setLoading((prev) => ({ ...prev, auth: false }));
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, fetch: true }));
      const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"), ...(maxReviews ? [limitQuery(maxReviews)] : []));
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
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const removePhoto = useCallback(() => {
    setPhoto(null);
    setPhotoPreview(null);
  }, []);

  const handleSubmit = async () => {
    if (!rating) return toast.error("Please select a rating");
    if (!reviewText.trim() || reviewText.trim().length < 10) return toast.error("Review must be at least 10 characters");

    if (!user && guestName.trim().length < 2) return toast.error("Please enter your name");

    setLoading((prev) => ({ ...prev, submit: true }));
    setUploadState({ progress: 0, isUploading: true });

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
      setPhotoPreview(null);
      setShowModal(false);
      setUploadState({ progress: 0, isUploading: false });
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Try again.");
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
      setUploadState({ progress: 0, isUploading: false });
    }
  };

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const sizeClasses = { sm: "text-lg", md: "text-xl", lg: "text-2xl" };
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} ${sizeClasses[size]} transition-transform hover:scale-110`}
          />
        ))}
      </div>
    );
  };

  const getInitials = (name: string) => name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  const displayedReviews = maxReviews ? reviews.slice(0, maxReviews) : reviews;

  return (
    <section className="max-w-7xl mx-auto py-30 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="text-center mb-12">
         <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6 px-4 py-2 rounded-ful bg-[#213448]/5">
            <div className="w-2 h-2 rounded-full bg-[#FFFF80]" />
            <span className="text-sm font-medium text-[#213448]">Testimonials ProjectsHub</span>
            <div className="w-2 h-2 rounded-full bg-[#FFD166]" />
          </div>
          
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#213448] to-[#213448] bg-clip-text text-transparent mb-4">Testimonials</h2>
        <p className="text-[#283746] text-lg max-w-2xl mx-auto mb-8">
          Hear what our customers have to say about their experience
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-[#213448]">{avgRating.toFixed(1)}</div>
            <div className="flex justify-center mt-2">{renderStars(avgRating, "lg")}</div>
            <p className="text-[#283746] mt-2">Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => setShowModal(true)} className="cursor-pointer px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#213448] to-[#213448] text-white hover:shadow-lg hover:shadow-[#213448] transition-all duration-300 min-w-[200px] flex items-center justify-center gap-3">
            <MdOutlineRateReview className="text-xl" /> Write a Review
          </button>
          {showViewAllButton && reviews.length > 0 && (
            <button onClick={() => router.push("/testimonials")} className="cursor-pointer px-6 py-3 border-2 border-[#213448] text-[#213448]  rounded-xl font-semibold hover:bg-[#213448] hover:text-white dark:hover:bg-[#213448] transition-all duration-300 hover:-translate-y-0.5 min-w-[200px]">
              View All Reviews
            </button>
          )}
        </div>
      </div>

      {loading.fetch ? (
        <div className="flex justify-center items-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B85C1B]"></div></div>
      ) : displayedReviews.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-2xl font-bold text-[#213448] mb-3">No Reviews Yet</h3>
          <p className="text-[#213448] max-w-md mx-auto mb-8">Be the first to share your experience.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6 mb-12">
          {displayedReviews.map((review) => (
            <article key={review.id} className="group relative  rounded-2xl border border-[#213448] p-6 transition-all duration-300 hover:shadow-xl hover:border-[#213448]/30 hover:-translate-y-1 flex flex-col h-full">
              <div className="mb-4">{renderStars(review.rating)}</div>
              <div className="flex-grow mb-6">
                <p className={`${review.review.length > 150 && !expanded[review.id ?? ""] ? "line-clamp-4" : ""}`}>{review.review}</p>
                {review.review.length > 150 && (
                  <button onClick={() => toggleExpand(review.id)} className="mt-2 text-[#213448] font-medium hover:underline">
                    {expanded[review.id ?? ""] ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-[#213448]">
                {review.photo ? (
                  <Image src={review.photo} alt={review.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover border-2 border-[#213448]/20" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#213448] to-[#213448] flex items-center justify-center text-white font-bold">{getInitials(review.name)}</div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[#213448] truncate">{review.name}</h4>
                  <p className="text-sm text-[#213448]">{formatTime(review.createdAt)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
            {!user && (
              <div className="space-y-3 mb-4">
                <input type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} placeholder="Your Name*" className="w-full px-4 py-2 border rounded-xl dark:bg-gray-800 dark:text-white" />
                <input type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} placeholder="Your Email (optional)" className="w-full px-4 py-2 border rounded-xl dark:bg-gray-800 dark:text-white" />
              </div>
            )}
            <div className="mb-4 flex gap-1">{[1, 2, 3, 4, 5].map((star) => <FiStar key={star} className={`text-3xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`} onClick={() => setRating(star)} />)}</div>
            <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} rows={4} className="w-full px-4 py-3 border rounded-xl dark:bg-gray-800 dark:text-white mb-4" placeholder="Your review..." />
            <button onClick={handleSubmit} className="cursor-pointer w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#213448] to-[#213448] text-white font-semibold">{loading.submit ? "Submitting..." : "Submit Review"}</button>
          </div>
        </div>
      )}
    </section>
  );
}
