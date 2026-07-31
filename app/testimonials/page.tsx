"use client";

import ReviewsSection from '../components/TestimonialList/TestimonialList'

const TestimonialsPage = () => {
  return (
    <div className='py-14'>
        <ReviewsSection maxReviews={50} />

    </div>
  )
}

export default TestimonialsPage;
