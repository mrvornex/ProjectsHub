"use client";

import { colors } from "@/app/constants/colors";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FiSend, FiMail, FiPhone, FiMapPin, FiCheck, FiUser, FiMessageSquare } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { fetchProjects } from "@/app/utils/fetchProjects";

export default function Contact() {
    const [projectsCount, setProjectsCount] = useState(0);
    useEffect(() => {
        fetchProjects().then((projects) => setProjectsCount(projects.length));
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeField, setActiveField] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('https://formsubmit.co/ajax/bilalusman1291@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    subject: formData.subject || 'New Contact Form Submission',
                    message: formData.message,
                    _subject: `New Message from JSProjectForge website Contact`,
                    _template: 'table',
                    _autoresponse: `Hi ${formData.name},\n\nThank you for contacting me! I've received your message and will get back to you within 24 hours.\n\nHere's what you sent:\nName: ${formData.name}\nEmail: ${formData.email}${formData.phone ? `\nPhone: ${formData.phone}` : ''}${formData.subject ? `\nSubject: ${formData.subject}` : ''}\nMessage: ${formData.message}\n\nBest regards,\nMuhammad Bilal`
                })
            });

            const result = await response.json();

            if (result.success) {
                setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                setIsSubmitted(true);
                setTimeout(() => setIsSubmitted(false), 5000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (err) {
            console.error("Email sending failed:", err);
            setError("Failed to send message. Please try again or use the alternative contact methods below.");

            const mailtoLink = `mailto:bilalusman1291@gmail.com?subject=${encodeURIComponent(formData.subject || 'Contact from Portfolio')}&body=${encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
            )}`;

            if (confirm("Email sending failed. Would you like to open your email client instead?")) {
                window.open(mailtoLink, '_blank');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const socialLinks = [
        { icon: <FaGithub />, label: "GitHub", href: "https://github.com/mrvornex" },
        { icon: <FaLinkedin />, label: "LinkedIn", href: "https://www.linkedin.com/in/mrvornex/" },
        { icon: <FaTwitter />, label: "Twitter", href: "https://twitter.com/mrvornex" },
    ];

    const contactInfo = [
        { icon: <FiMail />, label: "Email", value: "bilalali.office.pk@gmail.com", href: "mailto:bilalali.office.pk@gmail.com" },
        { icon: <FiPhone />, label: "Phone", value: "+92 370 2675457", href: "tel:+923702675457" },
        { icon: <FiMapPin />, label: "Location", value: "Karachi, Pakistan", href: "https://maps.google.com/?q=Karachi,Pakistan" },
    ];

    return (
        <section className="min-h-screen flex items-center justify-center px-4 md:px-8 py-24" style={{ background: colors.background }}>
            <div className="w-full max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-10"
                    >
                        <div>
                            <div
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border text-sm font-medium"
                                style={{ borderColor: colors.primary, color: colors.primary }}
                            >
                                Let's Connect
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold mb-5" style={{ color: colors.color }}>
                                Get in Touch
                            </h2>

                            <p className="text-lg opacity-70 leading-relaxed" style={{ color: colors.color }}>
                                Have a project in mind? Let's collaborate and build something great.
                                I'm always open to discussing new opportunities and ideas.
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            {contactInfo.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="flex items-center gap-4 p-4 rounded-xl border hover:shadow-sm transition-shadow"
                                    style={{ borderColor: colors.border }}
                                >
                                    <div
                                        className="p-3 rounded-lg"
                                        style={{ background: colors.border, color: colors.primary }}
                                    >
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div className="text-sm opacity-70" style={{ color: colors.color }}>
                                            {item.label}
                                        </div>
                                        <div className="font-medium" style={{ color: colors.color }}>
                                            {item.value}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.color }}>
                                Connect Socially
                            </h3>
                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-lg border text-lg hover:shadow-sm transition-shadow"
                                        style={{ borderColor: colors.border, color: colors.color }}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative"
                    >
                        <div
                            className="relative rounded-2xl border p-8 md:p-10"
                            style={{ borderColor: colors.border, background: colors.background }}
                        >
                            {/* Success Overlay */}
                            <AnimatePresence>
                                {isSubmitted && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center rounded-2xl"
                                        style={{ background: colors.primary }}
                                    >
                                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-5">
                                            <FiCheck className="text-3xl text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                                        <p className="text-white/90 text-sm mb-1">
                                            Thank you for reaching out. Check your email for confirmation.
                                        </p>
                                        <p className="text-white/80 text-sm">I'll get back to you within 24 hours.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <h3 className="text-xl font-bold mb-2" style={{ color: colors.color }}>
                                Send a Message
                            </h3>
                            <p className="opacity-70 mb-6 text-sm" style={{ color: colors.color }}>
                                Fill out the form below and I'll respond promptly.
                            </p>

                            {error && (
                                <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: colors.color }}>
                                        <FiUser className="opacity-50" /> Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onFocus={() => setActiveField('name')}
                                        onBlur={() => setActiveField(null)}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none"
                                        style={{ borderColor: activeField === 'name' ? colors.primary : colors.border, color: colors.color }}
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: colors.color }}>
                                        <FiMail className="opacity-50" /> Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => setActiveField('email')}
                                        onBlur={() => setActiveField(null)}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none"
                                        style={{ borderColor: activeField === 'email' ? colors.primary : colors.border, color: colors.color }}
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: colors.color }}>
                                        <FiPhone className="opacity-50" /> Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="+92 335 2121077"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        onFocus={() => setActiveField('phone')}
                                        onBlur={() => setActiveField(null)}
                                        className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none"
                                        style={{ borderColor: activeField === 'phone' ? colors.primary : colors.border, color: colors.color }}
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: colors.color }}>
                                        <FiMessageSquare className="opacity-50" /> Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="Project Inquiry or Question"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        onFocus={() => setActiveField('subject')}
                                        onBlur={() => setActiveField(null)}
                                        className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none"
                                        style={{ borderColor: activeField === 'subject' ? colors.primary : colors.border, color: colors.color }}
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: colors.color }}>
                                        <FiMessageSquare className="opacity-50" /> Your Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        placeholder="Tell me about your project, ideas, or questions..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        onFocus={() => setActiveField('message')}
                                        onBlur={() => setActiveField(null)}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none resize-none"
                                        style={{ borderColor: activeField === 'message' ? colors.primary : colors.border, color: colors.color }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                                    style={{ background: colors.primary, color: colors.background }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FiSend />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-6 pt-5 border-t text-center" style={{ borderColor: colors.border }}>
                                <p className="text-xs opacity-50" style={{ color: colors.color }}>
                                    Messages are sent directly to bilalusman1291@gmail.com
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}