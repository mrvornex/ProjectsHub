"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/utils/firebase";

export default function TestimonialForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "feedbacks"), {
        name,
        message,
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setName("");
      setMessage("");
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      {success && <p className="text-green-500">Feedback sent successfully!</p>}
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border rounded"
      />
      <textarea
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-3 border rounded"
        rows={4}
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {loading ? "Sending..." : "Send Feedback"}
      </button>
    </form>
  );
}
